// Mock API URL from Mocky (replace with your actual URL)
const mockApiUrlCity = 'https://run.mocky.io/v3/6a9ca29e-52ba-43f3-96b9-e913c9dcbabf';
const mockApiUrlCourse = 'https://run.mocky.io/v3/4fb0ac50-484b-4ffe-98ed-76f58a46782c';


// Function to fetch data from the Mock API using jQuery
function fetchData() {
    return $.ajax({
        url: mockApiUrlCity,
        method: 'GET',
        dataType: 'json'
    });
}


// Function to populate the dropdown with options from the Mock API
function populateDropdownCity() {
    const dropdown = $("#cityDropdown");

    // Clear existing options
    dropdown.empty().append('<option value="" disabled selected>City</option>');

    // Fetch data from the Mock API
    fetchData().done(function (citiesApi) {
        if (citiesApi && citiesApi.cities) {
            // Add options from the Mock API
            $.each(citiesApi.cities, function (index, city) {
                dropdown.append($("<option>").val(city.id).text(city.name));
            });
        }
    }).fail(function (error) {
        console.error('Error fetching data:', error.statusText);
    });
}

// Call the function to populate the dropdown on document ready
$(document).ready(populateDropdownCity);

function fetchDataCourses() {
    return $.ajax({
        url: mockApiUrlCourse,
        method: 'GET',
        dataType: 'json'
    });
}
function populateDropdown() {
    const courseDropDown = $("#courseTypeDropdown");

    // Clear existing options
    courseDropDown.empty().append('<option value="" disabled selected>Course</option>');

    // Fetch data from the Mock API
    fetchDataCourses().done(function (coursesApi) {
        if (coursesApi && coursesApi.courseTypes) {
            // Add options from the Mock API
            $.each(coursesApi.courseTypes, function (index, course) {
                courseDropDown.append($("<option>").val(course.id).text(course.name));
            });
        }
    }).fail(function (error) {
        console.error('Error fetching data:', error.statusText);
    });
}

$(document).ready(populateDropdown);


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]+)?$/;
    return emailRegex.test(email);
}


function validateTurkishMobileNumber(phoneNumber) {
    // Define regular expression for Turkish mobile numbers with specific area codes
    const turkishMobileRegex = /^(212|216|232|312|532|533|534|535|536|537|538|539|505|506|507|551|552|553|554|555)\d{7}$/;
    return turkishMobileRegex.test(phoneNumber);
}


function checkBoxControl(){
    if ($("#terms").is(":checked")) {
return true;
    }else{
        return false;
    }
}

function checkTexts() {
    var textInputs = $("input[type='text']");

    // Use .map() to get an array of boolean values indicating whether each input meets the condition
    var conditions = textInputs.map(function() {
        // Split the value into words and check if there is at least one word with a length of three or more characters
        var words = $(this).val().split(/\s+/); // Split by whitespace
        return words.some(function(word) {
            return word.length >= 3;
        });
    }).get();

    // Use .every() to check if all conditions are true
    return conditions.every(Boolean);
}
function checkDropdowns() {
    var dropdowns = $("select");

    // Use .map() to get an array of boolean values indicating whether each dropdown has a selected value
    var conditions = dropdowns.map(function() {
        return $(this).val() !== null && $(this).val() !== "";
    }).get();

    // Use .every() to check if all conditions are true
    return conditions.every(Boolean);
}


function validateInputs() {
    //var email = $("#emailText").val();
    //var phoneNumber = $("phoneNumber").val();
    var email = document.getElementById("emailText").value;
    var phoneNumber = document.getElementById("phoneNumber").value;


    if (validateEmail(email) && validateTurkishMobileNumber(phoneNumber) && checkBoxControl() && checkTexts() && checkDropdowns()) {
        window.location.href = 'submit.html';
    } else {
      //  alert("Not valid");
      $('#exampleModal').modal('show');
    }

}




$(document).ready(function() {
    $("#request-button").click(function() {
     validateInputs();
    });
});
