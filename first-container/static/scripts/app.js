// Creating new Angular module, we call it angularApp, but it could be any name you wish
// For example "myGreatApp", you define references in brackets
var app = angular.module("angularApp", ['ngSanitize']);

var DEBUGENV = true;

if(log.dd == null){
	log.dd = function(message){
		if(DEBUGENV == true){
			console.log(message);
		}
	};
}

function printPage(){
    alert("Print page");
    //document.print();
    window.print();
}

function createEvalText(text) {
	try{
		spl = text.split("%");
		//log.info(" Call createEvalText");
		
		for (var i = 1; i < spl.length; i++) {
		var param = spl[i];
		if (param != null && param.trim() != "") {
			try {
				spl[i] = eval(param);
			} catch (e) {}
		}
		    return spl.join("");
        }
    }
	catch{
		//log.info("Error in createEvalText");
		return text;
	}
}

function invokeCreateEvalText(){
    try {
        var result = createEvalText("2 +2 = %2 + 2%! Funkcijo ste klicali ob % new Date()%");
        console.log(result);
        $("#numberJQMessage").text(result);
    } catch (error) {
        console.error("Error in invokeCreateEvalText!");
    }
}



function onLoad()
    {
        //alert("Function onLoad called!!!");
        console.log('Page is loaded at: ' + Date());

        console.log("Call log.dd");
        log.dd("Hello World");

        //document.getElementById('timestamp').innerHTML = Date();
        //console.log('Call getAPIData(), from onLoad event, source app.js');
        //getAPIData();
        console.log('Call getLocalAPIData(), from onLoad event, source app.js');
        getLocalAPIData();

        var TYPEOFDAY = "čudovit";
        var EMPLOYEE = "Peter";
        var ACTIVITY = "smučat";
        
        
        console.log(TYPEOFDAY);
        
        var item = ("Danes je %TYPEOFDAY% dan.%EMPLOYEE% je šel %ACTIVITY%!");
        
        var itemEval = createEvalText(item);
        
        console.log(itemEval);
    }


    function myFunction() {
        var x = 10;
        var y = 20;
        var a = eval("x * y") + "<br>";
        var b = eval("2 + 2") + "<br>";
        var c = eval("x + 17") + "<br>";
      
        var res = a + b + c;
        console.log(res);
        

        
      }

function checkNumber(){
    var theNumber, theMessage;

    theNumber = document.getElementById("smallNumber").value;

    theMessage = 'You entered: ' + theNumber;
    
    console.log(theMessage);

    if(isNaN(theNumber)|| theNumber < 1 || theNumber > 10){
        theMessage = "Number was expected to be between 1 and 10";
    }
    else{
        theMessage = "Number is good";
    }
    //alert(theMessage);
    document.getElementById("numberMessage").innerHTML = theMessage;
}

function checkNumberByJQuery(){
    var theNumber, theMessage;

    // Get the value of the input 
    theNumber = $('#smallJQNumber').val();

    //If number is Not a Number or less than one or greater than 10
    if(isNaN(theNumber)|| theNumber < 1 || theNumber > 10){
        theMessage = "Number was expected to be between 1 and 10";
    }
    else{
        theMessage = "Number is good";
    }

    //alert(theMessage);
    $("#numberJQMessage").text(theMessage);
}

// Get data from restfull API
function getAPIData(){
    var apiURL = "https://petstore.swagger.io/v2/pet/findByStatus/?status";
    $.get(apiURL, function(data){
            console.log('Get was performed on resource: ' + apiURL)
            if(data !== null)
            {
                console.log(JSON.stringify(data));
                $("#apiResult").html(JSON.stringify(data));
            }
            else{
                console.log('No data was returned...');
            }


    });

}

// Get data from restfull API, hosted in local proces
function getLocalAPIData(){
    var apiURL = "https://localhost:44307/api/employee";
    $.get(apiURL, function(data){
            console.log('Get local data was performed on resource: ' + apiURL)
            if(data !== null)
            {
                console.log(JSON.stringify(data));
                $("#apiResult").html(JSON.stringify(data));
            }
            else{
                console.log('No data was returned...');
            }


    });

}