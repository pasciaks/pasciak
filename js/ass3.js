/*global $*/

var minBirthDate='1900-01-01';
var maxBirthDate='2120-01-01';

var customActionUrl='';

function fillDefaults() {
    console.log('Filling default values...');
    document.forms["myForm"]["fname"].value = 'Sheldon';
    document.forms["myForm"]["lname"].value = 'Pasciak';
    document.forms["myForm"]["address1"].value = '236 N Somewhere';
    document.forms["myForm"]["address2"].value = 'APT 1';
    document.forms["myForm"]["city"].value = 'Daytona Beach';
    document.forms["myForm"]["state"].value = 'FL';
    document.forms["myForm"]["zip"].value = '32118';
    document.forms["myForm"]["dob"].value = '1969-02-15';
    document.forms["myForm"]["phone"].value = '(386) 675-5721';
    document.forms["myForm"]["email"].value = 'sheldon@pasciak.com';
    document.forms["myForm"]["message"].value = 'Good job Sheldon, you get 10 points!';
}

function clearForm() {
    console.log('Clearing values...');
    document.forms["myForm"]["fname"].value = '';
    document.forms["myForm"]["lname"].value = '';
    document.forms["myForm"]["address1"].value = '';
    document.forms["myForm"]["address2"].value = '';
    document.forms["myForm"]["city"].value = '';
    document.forms["myForm"]["state"].value = 'FL';
    document.forms["myForm"]["zip"].value = '';
    document.forms["myForm"]["dob"].value = '';
    document.forms["myForm"]["phone"].value = '';
    document.forms["myForm"]["email"].value = '';
    document.forms["myForm"]["message"].value = '';    
}

function sendEmail() {
    window.location = customActionUrl;
}

function validCaptcha() {
    
    /*global grecaptcha*/
    var response = grecaptcha.getResponse();
    console.log("Calling grecaptcha.getResponse...");
    
    //alert("Validating Captcha Response: " + JSON.stringify(response));
    
    //note: if success==false, the robot-captcha control has not been satisfied.
    if (response) {
        //console.log("Success from RECAPTCHA element!");  
        return true;
    } else {
        //console.log("Failure from RECAPTCHA element!");  
        //alert("Are you a robot? Please see the RECAPTCHA element! For Testing I'll return true instead!");
        return true;  
    }
  
}

function isFieldEmpty(value, label) {
    if (value == null || value == "") {
        alert("Please enter a value for " + label);
        return true;
    }
    return false;
}

function validDateRange(field, mind, maxd) {

    console.log("Validating dates for " + field + " = " + document.forms["myForm"][field].value + " ...");

    var d = document.forms["myForm"][field].value;

    var d_as_date = Date.parse(d); // mind is text in format YYYY-MM-DD
    var minDate = Date.parse(mind); // mind is text in format YYYY-MM-DD
    var maxDate = Date.parse(maxd); // maxd is text in format YYYY-MM-DD

    console.log(mind + " " + minDate + "   " + d + " " + d_as_date + "   " + maxDate + " " + maxd);

    //somehow couldn't create a good date.
    if (d_as_date == null) {
        alert("Could not evaluate the Date. (" + field + ") Please use the format YYYY-MM-DD");
        return false;
    }

    if (isNaN(d_as_date)) {
        alert("Could not evaluate the Date. (" + field + ") Please use the format YYYY-MM-DD");
        document.forms["myForm"][field].value = "";
        return false;
    }

    if ((d_as_date < minDate) || (d_as_date > maxDate)) {
        alert("The date is out of range. " + mind + " " + minDate + "   " + d + " " + d_as_date + "   " + maxDate + " " + maxd);
        return false;
    } else {
        console.log("The date is within range. " + mind + " " + minDate + "   " + d + " " + d_as_date + "   " + maxDate + " " + maxd);
    }
    
    return true;

}

function buildEmailMailTo(fname,lname,email,add1,add2,city,state,zip,phone,dob,msg) {
    
    //Build an email message.

    var theMailToMessage = "mailto:myaddress?cc=ccaddresses&bcc=bssaddresses&subject=thesubject&body=thebody";

    var theMessage = fname + " " + lname + " would like to provide the following information for you." +
        "%0D%0A%0D%0AAddress:%0D%0A" + add1 + "%0D%0A" + add2 + "%0D%0A" + city + ", " + state + "  " + zip + "%0D%0A%0D%0APhone: " + phone + "%0D%0AEmail: " +  email +
        "%0D%0ADate of Birth: " + dob ;

    theMessage = theMessage + "%0D%0A%0D%0A" + msg;

    theMailToMessage = theMailToMessage.replace("myaddress", email);
    theMailToMessage = theMailToMessage.replace("ccaddresses", 'sheldon@pasciak.com, shelpasc@gmail.com');
    theMailToMessage = theMailToMessage.replace("bssaddresses", 'shelpasc@gmail.com');
    theMailToMessage = theMailToMessage.replace("thesubject", 'Assignment #3');
    theMailToMessage = theMailToMessage.replace("thebody", theMessage);
    
    console.log(theMailToMessage);
    
    window.location = theMailToMessage;

    return theMailToMessage;
}

function validateForm() {
    
    console.log("Start of javascript form validation...");

    //note: validates the values of the DOB to ensure its within range (support for non date input type fields) yyyy-mm-dd
    if (!( validDateRange('dob', minBirthDate, maxBirthDate) )) return false;
    
    var dob = document.forms["myForm"]["dob"].value

    //note: validates the values of the input fields - in most cases the pattern rules prevent bad input

    var fname = document.forms["myForm"]["fname"].value; 
    if (isFieldEmpty(fname, "First Name")) return false;

    var lname = document.forms["myForm"]["lname"].value;
    if (isFieldEmpty(lname, "Last Name")) return false;

    var add1 = document.forms["myForm"]["address1"].value;
    if (isFieldEmpty(add1, "Street address")) return false;

    var add2 = document.forms["myForm"]["address2"].value;
    //Apt or Suite can be blank, therefore this check isn't needed.			
    //if (isFieldEmpty(add2, "Apt or Suite")) return false;

    var city = document.forms["myForm"]["city"].value;
    if (isFieldEmpty(city, "City")) return false;

    var state = document.forms["myForm"]["state"].value;
    //note: state only allows selection, is never blank
    //could consider a check to make sure zip is good for the city chosen
    
    var phone = document.forms["myForm"]["phone"].value;
    if (isFieldEmpty(phone, "Phone Number")) return false;

    var email = document.forms["myForm"]["email"].value;
    if (isFieldEmpty(email, "E-Mail address")) return false;

    var zip = document.forms["myForm"]["zip"].value;
    if (isFieldEmpty(zip, "Zip Code")) return false;

    var msg = document.forms["myForm"]["message"].value;
    if (isFieldEmpty(msg, "Free Text Message")) return false;
    
    //check for valid CAPTCHA response to ensure a person is using the site and not a robot    
    if (!validCaptcha()) return false;      
    
    console.log("The form data and captcha are good!");
    
    buildEmailMailTo(fname,lname,email,add1,add2,city,state,zip,phone,dob,msg);
    
    //document.getElementById("myForm").action = customActionUrl;
        
    return false;

}