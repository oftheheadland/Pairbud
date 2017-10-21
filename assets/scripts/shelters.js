const SHELTER_BASE_URL = `https://api.petfinder.com/shelter.find?da27018a67011f3d70782e87862dfc22&key=a0dfc184bf111549c0051ebd81dae259&format=json&count=10`
let SHELTER_URL;
let map = null;
let markers = [];
var contentString;

$(document).ready(function () {
    setLoading(false);
    isLoaded(false);
    displayMap();

    $("#shelter-location-form").submit(submitLocation);

    function submitLocation(event) {
        event.preventDefault();
        setLoading(true);
        const shelterLocationInput = $("#shelter-location-input").val();
        SHELTER_URL = SHELTER_BASE_URL + `&location=${shelterLocationInput}&callback=?`;
        getShelterData();
    };

    function getShelterData() {
        $.getJSON(SHELTER_URL)
            .then(locationObject)
            .catch();
    }

    function locationObject(shelterReturnData) {
        const shelterData = shelterReturnData.petfinder.shelters.shelter;
        let mapMarkerData = [];
        let viewportLatLng = [];
        $.each(shelterData, function (index, value) {
            let shelterLocate = {
                lat: parseFloat(shelterData[index].latitude.$t),
                lng: parseFloat(shelterData[index].longitude.$t),
                name: shelterData[index].name.$t,
                city: shelterData[index].city.$t,
                state: shelterData[index].state.$t,
                zip: shelterData[index].zip.$t,
                phone: shelterData[index].phone.$t,
                email: shelterData[index].email.$t
            };
            mapMarkerData.push(shelterLocate);
            viewportLatLng.push({
                lat: shelterLocate["lat"],
                lng: shelterLocate["lng"]
            })
        });
        setLoading(false);
        isLoaded(true);
        dropMarker(mapMarkerData);
        defineMapBoundries(viewportLatLng);
        displayTable(shelterData);
    };

    function displayMap() {
        let denver = {
            lat: 39.833333333333336,
            lng: -98.58333333333333
        }
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: denver,
            styles: MAP_STYLE
        });
    };

    function dropMarker(markerData) {
        clearMarkers();
        for (var i = 0; i < markerData.length; i++) {
            addMarkerWithTimeout(markerData[i], i * 300);
        };
    };

    function addMarkerWithTimeout(position, timeout) {
        let marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: position.name,
        })
        window.setTimeout(function () {
            markers.push(marker);
        }, timeout);
        addInfoWindowToMarker(marker, position);
    };

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        };
        markers = [];
    };

    function addInfoWindowToMarker(marker, position) {
        let infowindow = new google.maps.InfoWindow({
            content: `<div><h5>${position.name}</h5><p><strong>Location: </strong>${position.city}, ${position.state} ${position.zip}</p><p><strong>Email: </strong>${position.email}<p><p><strong>Phone: </strong>${position.phone}<p></div>`
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker)
        });
    }

    //  Set up map boundries
    function defineMapBoundries(viewportLatLng) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < viewportLatLng.length; i++) {
            bounds.extend(viewportLatLng[i]);
        }
        map.fitBounds(bounds);
    }

    function displayTable(data) {
        $("#shelter-table").empty();
        // console.log(data);
        $.each(data, function (index, value) {
            let shelterName = data[index].name.$t;
            let shelterAddress = data[index].address1.$t;
            let shelterCity = data[index].city.$t;
            let shelterState = data[index].state.$t;
            let shelterZip = data[index].zip.$t;
            let shelterPhone = data[index].phone.$t;
            let shelterEmail = data[index].email.$t;

            $("#shelter-table").append(
                `<tr class="table">
          <td>
            <strong>${shelterName}</strong>
          </td>
          <td><i class="material-icons tiny">location_on</i> ${shelterAddress}, ${shelterCity}, ${shelterState}, ${shelterZip}</td>
          <td><i class="material-icons tiny">phone</i> ${shelterPhone}</td>
          <td><i class="material-icons tiny">email</i> ${shelterEmail}</td>
        </tr>`
            );
        });
    }

    function isLoaded(loaded) {
        if (loaded) {
            $("#table-section").show();
        } else {
            $("#table-section").hide();
        }
    }

    function setLoading(isLoading) {
        if (isLoading) {
            $(".loading").show();
            $("form").hide();
            $("#map").hide();
        } else {
            $(".loading").hide();
            $("form").show();
            $("#map").show();
        }
    }
}); //END DOCUMENT READY

var MAP_STYLE = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -30
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#353535"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#656565"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#505050"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#808080"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#454545"
            }
        ]
    }
]
