//HANDLES LOADING BETWEEN INDEX.HTML AND SEARCH RESULTS



// Page Style Functions
// Function hides and shows main navigation before and after initial search
function hideShowNavigation(pageLanded) {
    if (pageLanded) {
        $("#main-logo").hide();
        $("#top-navigation").show().fadeIn(1000);
    } else {
        $("#top-navigation").hide();
    }
}

// Function hides and shows the "page loading" icon
function setIndexPageLoading(isLoading) {
    if (isLoading) {
        $(".loading").show();
        $("#main-form").hide();
    } else {
        $(".loading").hide();
        $("#main-form").show();
    }
}

// Function will center page results before and after search
function centerResults(isLoaded) {
    if (isLoaded) {
        $("#main-form").hide();
        $("#form-section").removeClass("vertical-center", "parent")
        $("#main").addClass("vertical-center")
    }
}

// Function will format the page if an error is returned from the API
function formatErrorResult(errorUserInput) {
    if (errorUserInput) {
        $("#form-section").removeClass("vertical-center", "parent")
    };
}
