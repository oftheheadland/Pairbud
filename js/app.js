// Document Ready Immediately Invoked Function Expressions
(function () {
    // Hide the navigation bar on initial page load
    hideShowNavigation(false);

    // Loading icon hidden from page
    setIndexPageLoading(false);

    // Activate the materializeCSS framework dropdown function
    $('select').material_select();

    // Toggle to disable breed results for cats
    $("#animal-type").change(disableBreedInput);

    // Function to disable breed input if cat is selected.
    function disableBreedInput() {
        const animalInput = this.value;
        if (animalInput != "dog") {
            $("#breed").attr("disabled", "disabled");
        } else if (animalInput == "dog") {
            $("#breed").removeAttr("disabled")
        }
    }

    function searchFormSubmit() {
        $("#animal-search-form").submit(getFormData);
    }

    function getFormData(event) {
        event.preventDefault();
        // Empty the section every time the search is performed
        $("#available-animals").empty();
        $("#body").removeClass("bg-hero-image");
        setIndexPageLoading(true);

        //Question Variables Go Here

        var locationInput = $("#location").val();
        //var breedInput = $("#breed").val();
        var breedInput;

        var animalInput = $("#animal-type").val();



        var questionYard = $("#questionYard").val();
        var questionPark = $("#questionPark").val();
        var questionTerrarium = $("#questionTerrarium").val();
        var questionApartment = $("#questionApartment").val();
        var questionAlone = $("#questionAlone").val();
        var questionMaintain = $("#questionMaintain").val();
        var questionActiveCalm = $("#questionActiveCalm").val();
        var questionMultiple = $("#questionMultiple").val();
        var questionChildren = $("#questionChildren").val();
        var questionShed = $("#questionShed").val();
        var questionInsects = $("#questionInsects").val();
        var questionOwned = $("#questionOwned").val();

        //algorithm to determine best match

        var dogCount = 0;
        var catCount = 0;
        var smallfurryCount = 0;
        var birdCount = 0;
        var reptileCount = 0;


        if (questionYard == "Yes") {
            dogCount += 3;
        } else {
            dogCount = dogCount - 3;
        }

        if (questionPark == "Yes") {
            dogCount = dogCount + 3;
        } else {
            dogCount = dogCount - 3;
        }

        if (questionTerrarium == "Yes") {
            reptileCount += 6;
            birdCount += 6;
            smallfurryCount += 6;
        } else {
            reptileCount -= 6;
            birdCount -= 6;
            smallfurryCount -= 6;
        }

        if (questionApartment == "Yes") {
            dogCount -= 3;
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        } else {
            dogCount = dogCount + 3;
        }

        if (questionAlone == "Yes") {
            dogCount -= 3;
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        } else {
            dogCount += 3;
        }

        if (questionMaintain == "Yes") {
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;

        } else {

        }

        if (questionActiveCalm == "Yes") {
            dogCount += 3;
        } else {
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        }

        if (questionMultiple == "Yes") {
            dogCount = dogCount + 3;
        } else {
            dogCount = dogCount - 3;
        }

        if (questionChildren == "Yes") {
            dogCount = dogCount + 3;
        } else {
            dogCount = dogCount - 3;
        }

        if (questionShed == "Yes") {

        } else {

            dogCount -= 6;
            catCount -= 6;

        }

        if (questionInsects == "Yes") {
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        } else {
            reptileCount -= 3;
            catCount -= 3;
            birdCount -= 3;
            smallfurryCount -= 3;
        }

        if (questionOwned == "Yes") {
            reptileCount += 3;
            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        } else {

            catCount += 3;
            birdCount += 3;
            smallfurryCount += 3;
        }


        console.log("dogcount " + dogCount);
        console.log("catCount " + catCount);
        console.log("smallFurry " + smallfurryCount);
        console.log("birdCount " + birdCount);
        console.log("reptileCount " + reptileCount);
        console.log("breed: " + breedInput);

        var animalInput = "cat";
        var animalInput2 = "dog";
        var animalInput3 = "reptile";
        var animalInput4 = "smallfurry";
        var animalInput5 = "bird";
        var locationInput = "02360";


        //createQueryStringURL(locationInput, breedInput, animalInput);

        // document.getElementById("available-animals").innerHTML = "hello";

        if (catCount > 10) {
            createQueryStringURL(locationInput, breedInput, animalInput);
        }

     
            createQueryStringURL(locationInput, breedInput, animalInput2);
       

        if (reptileCount > 10) {
            createQueryStringURL(locationInput, breedInput, animalInput3);
        }

        if (smallfurryCount > 10) {
            createQueryStringURL(locationInput, breedInput, animalInput4);
        }

        if (birdCount > 10) {
            createQueryStringURL(locationInput, breedInput, animalInput5);
        }



    }

    function createQueryStringURL(location, breed, animal) {
        const API_URL = "https://api.petfinder.com/pet.find?da27018a67011f3d70782e87862dfc22&key=a0dfc184bf111549c0051ebd81dae259&format=json&count=9";
        let QUERY_URL;
        //if (animal == "cat" && location != "undefined") {
        if (location != "undefined") {
            QUERY_URL = API_URL + `&animal=${animal}&location=${location}&callback=?`
        } else if (animal != "undefined" && location != "undefined" && breed != "undefined") {
            QUERY_URL = API_URL + `&animal=${animal}&location=${location}&breed=${breed}&callback=?`
        } else if (location != "undefined" && !breed) {
            QUERY_URL = API_URL + `&animal=${animal}&location=${location}&callback=?`
        }
        getPetFinderData(QUERY_URL);
    }

    function getPetFinderData(QUERY_URL) {
        $.getJSON(QUERY_URL)
            .then(returnPetFinderData)
            .catch(returnPetFinderError);
    }

    function returnPetFinderData(petDataResults) {
        const petData = petDataResults.petfinder.pets.pet;
        getPetFinderDataResults(petData);
        setIndexPageLoading(false);
        hideShowNavigation(true);
        centerResults(true);
    }

    function returnPetFinderError(err) {
        $("#available-animals").append(`<p>Your search returned 0 results</p>`);
        setIndexPageLoading(false);
        hideShowNavigation(true);
        formatErrorResult(true);
    }

    function getPetFinderDataResults(petData) {
        $.each(petData, function (index, value) {
            const petDataIndex = petData[index];
            loopingFunction(petDataIndex);
        })
    }

    function loopingFunction(_petDataIndex) {
        const petName = _petDataIndex.name.$t
        const contactEmail = _petDataIndex.contact.email.$t;
        const petLocation = `${_petDataIndex.contact.city.$t}, ${_petDataIndex.contact.state.$t}`
        const petPhoto = assignPetFinderPhoto(_petDataIndex);
        const contactPhone = assignPetFinderContactPhone(_petDataIndex);
        const availableStatus = assignPetFinderAvailableStatus(_petDataIndex);
        const petDescription = assignPetFinderDescription(_petDataIndex);
        htmlString(petName, contactEmail, petLocation, petPhoto, contactPhone, availableStatus, petDescription);
    }

    function assignPetFinderPhoto(petDataIndex) {
        let _petPhoto;
        if (!petDataIndex.media.photos) {
            return _petPhoto = "img/logo.png" // placeholder image
        } else {
            return _petPhoto = petDataIndex.media.photos.photo[2].$t;
        }
    }

    function assignPetFinderContactPhone(petDataIndex) {
        let _contactPhone;
        if (petDataIndex.contact.phone.$t == undefined) {
            return _contactPhone = "Not Available";
        } else {
            return _contactPhone = petDataIndex.contact.phone.$t;
        }
    }

    function assignPetFinderAvailableStatus(petDataIndex) {
        let _availableStatus;
        if (petDataIndex.status.$t == "A") {
            return _availableStatus = "Available"
        } else {
            return _availableStatus = "Not Available"
        }
    }

    function assignPetFinderDescription(petDataIndex) {
        let _petDescription
        if (petDataIndex.description.$t == undefined) {
            return _petDescription = "No Description Available"
        } else {
            return _petDescription = petDataIndex.description.$t;
        }
    }


    (function breedResults() {
        const BREED_URL = "https://api.petfinder.com/breed.list?animal=dog&da27018a67011f3d70782e87862dfc22&key=a0dfc184bf111549c0051ebd81dae259&format=json&callback=?"
        $.getJSON(BREED_URL)
            .then(displayDogBreeds)
    })();

    // Fn to get list of available breeds to create an autocomplete form
    function displayDogBreeds(dogBreedData) {
        const breedData = dogBreedData.petfinder.breeds.breed
        let breedTypes = {};
        $.each(breedData, function (index, value) {
            breedTypes[breedData[index].$t] = null;
        });
        $('#breed').autocomplete({
            data: breedTypes,
            limit: 20,
            minLength: 1,
        });
    }; //End Fn displayDogBreeds

    function htmlString(_petName, _contactEmail, _petLocation, _petPhoto, _contactPhone, _availableStatus, _petDescription) {
        let htmlContent;
        htmlContent = `<div class="col s12 m6 l4">`;
        htmlContent += `<div class="card">`;
        htmlContent += `<div class="card-image waves-effect waves-block waves-light">`;
        htmlContent += `<img class="activator img-cropper" src="${_petPhoto}"></div>`;
        htmlContent += `<div class="card-content">`;
        htmlContent += `<span class="card-title activator grey-text text-darken-4 truncate">${_petName.substring(0,20)}<i class="material-icons right">more_vert</i></span>`;
        //htmlContent += `<span class="card-title activator grey-text text-darken-4 truncate">${_contactEmail}<i class="material-icons tiny">email</i></span>`;
        //htmlContent += `<p><i class="material-icons tiny">email</i> <a href="mailto:${_contactEmail}">Contact Email</a></p>`;
        htmlContent += `<p><i class="material-icons tiny">email</i> <a href="mailto:${_contactEmail}">Contact Email</a></p>`;
        htmlContent += `<p style="color:#666;"><i class="material-icons tiny">phone</i> ${_contactPhone.substring(0,13)}</p>`;
        htmlContent += `<p style="color:#666;"><i class="material-icons tiny">location_on</i> ${_petLocation}</p>`;
        htmlContent += `<p style="color:#666">Status: ${_availableStatus}</p></div>`;
        htmlContent += `<div class="card-reveal">`;
        htmlContent += `<span class="card-title grey-text text-darken-4">${_petName}<i class="material-icons right">close</i></span>`;
        htmlContent += `<p>${_petDescription}</p>`;
        htmlContent += `</div></div></div></div>`;
        $("#available-animals").append(htmlContent);
    }

    searchFormSubmit();

})(); //End IIFE
