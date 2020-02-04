function redirect(){

	currentLoginUsername = $("#pageHome #username").val();
	currentLoginPassword = $("#pageHome #passcode").val();

	console.log("currentLoginUsername= "+currentLoginUsername);
	console.log("currentLoginPassword= "+currentLoginPassword);

	try{
		var userList = localStorage.getItem("userList");
		if (userList == null) {
		    userList = [];
		    creatAdminAccount(userList)
		}
		else {
		    userList = JSON.parse(userList);
		}
	    if (currentLoginPassword === "0000"){
			for (var i = 0; i < userList.length; i++) {

			    var existingUsername = userList[i].Email;

			    if (existingUsername === "admin"){

			    	localStorage.setItem("currentUser", "admin");


			    	if (userList[i].agreedToLegal == false) 
			        {
			            $.mobile.changePage("#legalNotice");
						window.location.reload();
			        } 
			        else
			        {
			        	$.mobile.changePage("#pageMenu");
						window.location.reload();
			        }
			        return (true);
			    }
			}
	    }

		for (var i = 0; i < userList.length; i++) {

		    var existingUsername = userList[i].Email;
		    var existingPassword = userList[i].Password;

		    if (existingUsername == currentLoginUsername && existingPassword == currentLoginPassword){

		    	localStorage.setItem("currentUser", currentLoginUsername);

		    	if (userList[i].agreedToLegal == false) 
		        {
		            $.mobile.changePage("#legalNotice");
					window.location.reload();
		        } 
		        else
		        {
		        	$.mobile.changePage("#pageMenu");
					window.location.reload();
		        }
		        return (true);
		    }
		}

		alert("Alert! Email & Password Doesn't Match");

	}catch(e){
		
		if (window.navigator.vendor === "Google Inc."){
			if (e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage is exceeded");
			}
		} else if (e == QUOTA_EXCEEDED_ERR) {
			alert("Error: Storage is now local");
		}

		console.log(e);
	}
}

function creatAdminAccount(userList){

	var admin = {
		"FirstName"		: "admin",
		"LastName"		: "admin",
		"DateOfBirth"	: "2019-10-11",
		"Password"		: "0000",
		"ConfirmPassword": "0000",
		"Email"			: "admin",
		"Gender"		: "Male",
		"agreedToLegal"	: false
	};

	userList.push(admin);
	localStorage.setItem("userList", JSON.stringify(userList));

	console.log("Admin is Successfully Created ");
}






function signupSave() {

	
	var user = {
		"FirstName"		: $("#pageSignup #signupFirstName").val(),
		"LastName"		: $("#pageSignup #signupLastName").val(),
		"DateOfBirth"	: $("#pageSignup #dateOfBirth").val(),
		"Password"		: $("#pageSignup #addPassword").val(),
		"ConfirmPassword": $("#pageSignup #confirmPassword").val(),
		"Email"			: $("#pageSignup #signupEmail").val(),
		"Gender"		: $("#pageSignup #signupgenderType option:selected").val(),
		"agreedToLegal"	: false
	};

	try{

		var userList = localStorage.getItem("userList");
		if (userList == null) {
		    userList = [];
		    creatAdminAccount(userList)
		}
		else {
		    userList = JSON.parse(userList); 
		}

		userList.push(user);
		localStorage.setItem("userList", JSON.stringify(userList));

		localStorage.setItem("currentUser", $("#pageSignup #signupEmail").val());

		alert("Saving Information");
		$.mobile.changePage("#legalNotice");
		window.location.reload();

	}catch(e){
		
		if (window.navigator.vendor === "Google Inc."){
			if (e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage is exceeded");
			}
		} else if (e == QUOTA_EXCEEDED_ERR) {
			alert("Error: Storage is now local");
		}

		console.log(e);
	}
}

//
function addToPass(button){

	var passcode = document.getElementById("passcode").value

	if (button === 'bksp'){
		 document.getElementById("passcode").value = passcode.substring(0, passcode.length - 1);
	}
	else{
		document.getElementById("passcode").value += button;
	}	
}

function confirmDisclaimer() {

	var userList = localStorage.getItem("userList");

	var currentUser = localStorage.getItem("currentUser");

	if (userList == null) {
	    alert("No record found");
	} else {
		
		userList = JSON.parse(userList);
		for (var i = 0; i < userList.length; i++) {

		    if (currentUser === userList[i].Email){

				userList[i].agreedToLegal = true;

				console.log("Last Record (agreedToLegal = true):");
				console.log(userList[i]);

				localStorage.setItem("userList", JSON.stringify(userList));
		    }
		}

		$.mobile.changePage("#pageMenu");
		window.location.reload();
	}
}

function userformSave() {

	
	var userList = localStorage.getItem("userList");

	var currentUser = localStorage.getItem("currentUser");

	if (userList == null) {
	    alert("No record found");
	} else {

		
		userList = JSON.parse(userList);
		for (var i = 0; i < userList.length; i++) {

		    if (currentUser === userList[i].Email){

				console.log("Before Updatating User Record:");
				console.log(userList[i]);

				userList[i].FirstName = $("#pageUserInfo #signupFirstName").val();
				userList[i].LastName = $("#pageUserInfo #signupLastName").val();
				userList[i].DateOfBirth = $("#pageUserInfo #dateOfBirth").val();
				userList[i].Password = $("#pageUserInfo #editPassword").val();
				userList[i].Gender = $("#pageUserInfo #signupgenderType").val();
				userList[i].agreedToLegal = true;

				console.log("After Updatating User Record:");
				console.log(userList[i]);

				localStorage.setItem("userList", JSON.stringify(userList));

				alert("Updating Information");
				$.mobile.changePage("#pageRecords");
				window.location.reload();
		    }
		}
	}
}



function loadUserInformation(){

	
	var userList = localStorage.getItem("userList");

	var currentUser = localStorage.getItem("currentUser");

	if (userList == null) {
	    alert("No records are found");
	} else {

		
		userList = JSON.parse(userList);

		var latestRecord = userList.length - 1;
		for (var i = 0; i < userList.length; i++) {

		    if (currentUser === userList[i].Email){

				console.log("User Record (display on load of #pageRecords):");
				console.log(userList[i]);

				$("#divUserSection").html(
					"<p><b>User Profile Details: </b><br>"+
					"FirstName : "	+userList[i].FirstName +"<br>"+
					"LastName : "	+userList[i].LastName +"<br>"+
					"DateOfBirth : "+userList[i].DateOfBirth +"<br>"+
					"Password : "	+userList[i].Password +"<br>"+
					"Email : "		+userList[i].Email +"<br>"+
					"Gender : "		+userList[i].Gender +"<br>"+
					"</p>"
					);
		    }
		}
	}

}

function listRecords (){

	
	var learningList = localStorage.getItem("learningList");

	var currentUser = localStorage.getItem("currentUser");
	if (learningList == null) {
		$("#tblRecords").html("No Records!");
	}else{
		$("#tblRecords").html(
		"   <tr>" +
		"     <th>Data</th>" +
		"     <th>Learing Type</th>" +
		"     <th>Hours Spend</th>" +
		"     <th>Edit</th>" +
		"     <th>Delete</th>" +
		"   </tr>"
		);
		var table = document.getElementById('tblRecords');

		learningList = JSON.parse(learningList);

		var flage =0;
		for (var i = 0; i < learningList.length; i++) {

			if (currentUser === learningList[i].CurrentUser){

				flage++;

				var date = learningList[i].LearningDate;
			    var type = learningList[i].LearningType; 
			    var hours = learningList[i].LearningHours;

			    var r = table.insertRow();
			    r.insertCell(-1).innerHTML = date;
			    r.insertCell(-1).innerHTML = type;
			    r.insertCell(-1).innerHTML = hours;
			    r.insertCell(-1).innerHTML = '<a data-inline="true" data-mini="true" data-role="button" onclick="EditExistingRecord('+i+');" data-icon="edit" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="" class="ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-edit ui-icon-shadow">&nbsp;</span></span></a>'
			    r.insertCell(-1).innerHTML = '<a data-inline="true" data-mini="true" data-role="button" onclick="DeleteExistingRecord('+i+');" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="" class="ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'
			
			}
		}
		if (flage == 0){
			$("#tblRecords").html("No Records to display!");
		}
	}
}


function newrecordAdd() {
	console.log("Add");
	$("#btnSubmitRecord").val("Add");
}


function EditExistingRecord(index) {
	console.log("Edit");
	$("#btnSubmitRecord").val("Edit");
	localStorage.setItem("editIndex",index);
	$.mobile.changePage("#pageNewRecordForm");
	displayRecord ();
}

function showUserForm(){
	
	
	var userList = localStorage.getItem("userList");

	var currentUser = localStorage.getItem("currentUser");

	if (userList == null) {
	    alert("No record found");
	} else {

		
		userList = JSON.parse(userList);
		for (var i = 0; i < userList.length; i++) {

		    if (currentUser === userList[i].Email){

				console.log("User Record (display on load of #pageUserInfo):");
				console.log(userList[i]);

				$("#pageUserInfo #signupFirstName").val(userList[i].FirstName);
				$("#pageUserInfo #signupLastName").val(userList[i].LastName);
				$("#pageUserInfo #dateOfBirth").val(userList[i].DateOfBirth);
				$("#pageUserInfo #editPassword").val(userList[i].Password);
				$("#pageUserInfo #signupEmail").val(userList[i].Email);
				$("#pageUserInfo #signupgenderType").val(userList[i].Gender).prop('selected', true).siblings('option').removeAttr('selected'); 
				$("#pageUserInfo #signupgenderType").selectmenu("refresh", true);
		    }
		}
	}
};

function DeleteExistingRecord(index) {
	console.log("Delete");

	var currentUser = localStorage.getItem("currentUser");

	var learningList = JSON.parse(localStorage.getItem("learningList"));

	console.log("Before Deleting Learning History");
	console.log(learningList);

	learningList.splice(index,1);

	console.log("After Deleting Learning History");
	console.log(learningList);

	if (learningList.length == 0) {	    
          localStorage.removeItem("learningList");
          $("#tblRecords").html("No Records!");
      } else {
          localStorage.setItem("learningList", JSON.stringify(learningList));

          $("#tblRecords").html(
			"   <tr>" +
			"     <th>Data</th>" +
			"     <th>Learing Type</th>" +
			"     <th>Hours Spend</th>" +
			"     <th>Edit</th>" +
			"     <th>Delete</th>" +
			"   </tr>"
			);

			var table = document.getElementById('tblRecords');

			var flage = 0;

			for (var i = 0; i < learningList.length; i++) {

				if (currentUser === learningList[i].CurrentUser){

					flage++;

					var date = learningList[i].LearningDate;
				    var type = learningList[i].LearningType;
				    var hours = learningList[i].LearningHours; 

				    var r = table.insertRow();
				    r.insertCell(-1).innerHTML = date;
				    r.insertCell(-1).innerHTML = type;
				    r.insertCell(-1).innerHTML = hours;
				    r.insertCell(-1).innerHTML = '<a data-inline="true" data-mini="true" data-role="button" onclick="EditExistingRecord('+i+');" data-icon="edit" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="" class="ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-edit ui-icon-shadow">&nbsp;</span></span></a>'
			   		r.insertCell(-1).innerHTML = '<a data-inline="true" data-mini="true" data-role="button" onclick="DeleteExistingRecord('+i+');" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="" class="ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'
				}
			}
			if (flage == 0){
				$("#tblRecords").html("No Records!");
			}

      }

    
      alert("Records are  Deleted");

      $.mobile.changePage("#pageRecords");
}

function historyrecordClear(){

	var currentUser = localStorage.getItem("currentUser");

	try{

		var learningList = localStorage.getItem("learningList");

		if (learningList == null) {
		    alert("No records are found");
		}
		else {
		    learningList = JSON.parse(learningList);
		}

		console.log("Before Cleaning Learing History");
		console.log(learningList);

		for (var i = 0; i < learningList.length; i++) {

			if (currentUser == learningList[i].CurrentUser){

		        learningList.splice(i,1);
		        i--;
			}
		}
		console.log("After Cleaning Learing History");
		console.log(learningList);

		if (learningList.length == 0) {	 
            localStorage.removeItem("learningList");
        } else {
            localStorage.setItem("learningList", JSON.stringify(learningList));
        }
        $("#tblRecords").html("No Records!");

        alert("Record Deleted");
		
	}catch(e){
		
		if (window.navigator.vendor === "Google Inc."){
			if (e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage is exceeded");
			}
		} else if (e == QUOTA_EXCEEDED_ERR) {
			alert("Error: Storage is now local");
		}

		console.log(e);
	}
}

function addorEditRecord() {

	var formOperation = $("#btnSubmitRecord").val();

	if(formOperation == "Add"){
		addRecord();
		$.mobile.changePage("#pageRecord");
	}else if(formOperation == "Edit"){
		editRecord();
		$.mobile.changePage("#pageRecord");
	}
}

function displayRecord(){

	var learningList = JSON.parse(localStorage.getItem("learningList")); 
	var editRecordIndex = localStorage.getItem("editIndex");

	$("#pageNewRecordForm #datLearningDate").val(learningList[editRecordIndex].LearningDate);
	$("#pageNewRecordForm #txtType").val(learningList[editRecordIndex].LearningType);
	$("#pageNewRecordForm #txtHours").val(learningList[editRecordIndex].LearningHours);
}

function addRecord(){

	var currentUser = localStorage.getItem("currentUser");

	
	var record = {
		"CurrentUser"	: currentUser,
		"LearningDate"	: $("#datLearningDate").val(),
		"LearningType"	: $("#txtType").val(),
		"LearningHours"	: $("#txtHours").val()
	};

	try{

		var learningList = localStorage.getItem("learningList");

	
		if (learningList == null) {
		    learningList = [];
		}
		else {
		    learningList = JSON.parse(learningList); 
		}

		learningList.push(record); 

		localStorage.setItem("learningList", JSON.stringify(learningList));

		alert("Saving Information");

		$.mobile.changePage("#pageRecords");
		window.location.reload();

	}catch(e){
		
		if (window.navigator.vendor === "Google Inc."){
			if (e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage is exceeded");
			}
		} else if (e == QUOTA_EXCEEDED_ERR) {
			alert("Error: Storage is now local");
		}

		console.log(e);
	}

}


function editRecord (){

	var currentUser = localStorage.getItem("currentUser");

	var editRecordIndex = localStorage.getItem("editIndex");

	
	var editedRecord = {
		"CurrentUser"	: currentUser,
		"LearningDate"	: $("#datLearningDate").val(),
		"LearningType"	: $("#txtType").val(),
		"LearningHours"	: $("#txtHours").val()
	};

	var learningList = JSON.parse(localStorage.getItem("learningList")); 

	learningList[editRecordIndex] = editedRecord; 

	localStorage.setItem("learningList", JSON.stringify(learningList));

	alert("Updated Information");

	$.mobile.changePage("#pageRecords");
	window.location.reload();
}

$(document).on("pageshow", function () {
 	if ($('.ui-page-active').attr('id') =="pageUserInfo") {
    	showUserForm();
 	}else if ($('.ui-page-active').attr('id') == "pageRecords"){
    	loadUserInformation();
    	listRecords();
	}else if ($('.ui-page-active').attr('id') == "pageAdvice"){
    	drawAdvice();
    	resizeGraph();
	}else if ($('.ui-page-active').attr('id') == "pageGraph"){
    	drawGraph();
    	resizeGraph();
	}
});

function drawGraph(){

	var learningList = JSON.parse(localStorage.getItem("learningList"));

		if (learningList == null || learningList.length == 0 || learningList.length == 1){

			alert("Alert! Minimum 2 records need to be Added to Learing History");

			$.mobile.changePage("#pageMenu");
			return false;

		}

	learningList.sort(function(a,b){
		return Date.parse(a.LearningDate) - Date.parse(b.LearningDate);
	});
	days = Number(learningList.length);
	for(i=0;i<days;i=i+1){
		console.log(learningList[i].LearningDate+"|"+learningList[i].LearningHours);
	}
	var hoursList = [];
	var dateList = [];
	minHours = 0;
	maxHours = Number(learningList[days-1].LearningHours);
	if(days<=1){
		alert("Alert! No Graph can be drawn, Graph requires more than one learing history record");
	}else if(days<=10){
		for(i=0;i<days;i=i+1){
			record = learningList[i];
			hoursList.push(Number(record.LearningHours));
			dateList.push(record.LearningDate);
			if(maxHours<Number(record.LearningHours)){
				maxHours = Number(record.LearningHours);
			}
			if(minHours>Number(record.LearningHours)){
				minHours = Number(record.LearningHours);
			}
		}
	}else if(days>10){
		alert("Alert! Graph can only display learing history record of the last 10 days");
		for(i=days-10;i<days;i++){
			record = learningList[i];
			hoursList.push(Number(record.LearningHours));
			dateList.push(record.LearningDate);
			if(maxHours<Number(record.LearningHours)){
				maxHours = Number(record.LearningHours);
			}
			if(minHours>Number(record.LearningHours)){
				minHours = Number(record.LearningHours);
			}
		}
	}
	hoursMap = hoursList.map(Number);
	drawLines(hoursMap,maxHours,minHours,dateList);
};


function drawLines(hoursMap,maxHours,minHours,dateList){
	console.log(dateList);
	var hoursLine = new RGraph.Line("GraphCanvas",hoursMap,0,10)
	.Set("labels",dateList)
	.Set("colors",["blue"])
	.Set("shadow",true)
	.Set("shadow.offsetx",1)
	.Set("shadow.offsety",1)
	.Set("linewidth",1)
	.Set("ymax",maxHours)
	.Set("ymin",minHours)
	.Set("numxtricks",6)
	.Set("scale.decimals",2)
	.Set("xaxispos","bottom")
	.Set("gutter.left",40)
	.Set("tickmarks","filledcircle")
	.Set("ticksize",5)
	.Set("chart.labels.ingraph",[,,["Hours","blue","yellow",1,80],,])
	.Set("chart.title","Hours")
	.Set('chart.gutter.left', 50)
	.Set('chart.gutter.right', 50)
	.Draw();
}


function drawAdviceCanvas(ctx, learning) {

	ctx.font = "22px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Your current learning in hours is " + learning +  ".", 25, 320);
	ctx.fillText(
	"Your target Learning range is: 20-50 Hrs",  25, 350);
	levelwrite(ctx, learning);
	levelMeter(ctx, learning);

}


function levelwrite(ctx, learning) {

	if ((learning >= 1) && (learning <= 10)) {
		writeAdvice(ctx, "red");
	} else if ((learning > 10) && (learning <= 50)) {
		writeAdvice(ctx, "yellow");
	} else {
		writeAdvice(ctx, "green");
	}
}

function writeAdvice(ctx, level) {

	var adviceLine1 = "";
	var adviceLine2 = "";

	if (level == "red") {

		adviceLine1 = "Take care of the Learning.";
		adviceLine2 = "Spend more learning hours.";
	} else if (level == "yellow") {
		adviceLine1 = "Learning needs to be checked!!";
	} else if (level = "green") {
		adviceLine1 = "Your Learning is on track .";
	}

	ctx.fillText("Your Learning is " + level +".", 25, 380);
	ctx.fillText(adviceLine1, 25, 410);
	ctx.fillText(adviceLine2, 25, 440);
}


function levelMeter(ctx, learning) {

	if (learning <= 100) {
		var cg = new RGraph.CornerGauge("AdviceCanvas", 0, 100, learning).Set("chart.colors.ranges", [[50, 100, "#0f0"],[10, 50, "yellow"],[1, 10, "red"]]);
	} else {
	var cg = new RGraph.CornerGauge("AdviceCanvas", 0, learning, learning).Set("chart.colors.ranges", [[50, 100, "#0f0"],[10, 50, "yellow"],[0.01, 0.1, "red"],[100.01, learning, "red"]]);
	}
	drawMeter(cg);
}

function drawMeter(g) {

	g.Set("chart.value.text.units.post", " Hrs")
	.Set("chart.value.text.boxed", false)
	.Set("chart.value.text.size", 14)
	.Set("chart.value.text.font", "Verdana")
	.Set("chart.value.text.bold", true)
	.Set("chart.value.text.decimals", 2)
	.Set("chart.shadow.offsetx", 5)
	.Set("chart.shadow.offsety", 5)
	.Set("chart.scale.decimals", 2)
	.Set("chart.title", "Learning Limit in Hrs")
	.Set("chart.radius", 250)
	.Set("chart.centerx", 50)
	.Set("chart.centery", 250)
	.Draw();
}

function drawAdvice(){

	var learningList = JSON.parse(localStorage.getItem("learningList"));

		if (learningList == null || learningList.length == 0 || learningList.length == 1){

			alert("Alert! Minimum 2 records to be added in Learing History");

			$.mobile.changePage("#pageMenu");
			return false;

		}

	var learningList = JSON.parse(localStorage.getItem("learningList"));
	var canvas = document.getElementById('AdviceCanvas');
	var ctx = canvas.getContext('2d');

	var totalTime = 0;

	for(var i=0; i< learningList.length; i++){
		totalTime += Number(learningList[i].LearningHours);
	}

	drawAdviceCanvas(ctx, totalTime);

}

function drawLines(LearningArr, LearningUpper, LearningLower, Datearr) {

	var learnLine = new RGraph.Line("GraphCanvas", LearningArr, 0, 0)
	.Set("labels", Datearr)
	.Set("colors", ["blue"])
	.Set("shadow", true)
	.Set("shadow.offsetx", 1)
	.Set("shadow.offsety", 1)
	.Set("linewidth", 1)
	.Set("numxticks", 6)
	.Set("scale.decimals", 2)
	.Set("xaxispos", "bottom")
	.Set("gutter.left", 40)
	.Set("tickmarks", "filledcircle")
	.Set("ticksize", 5)
	.Set("chart.labels.ingraph", [, , ["Hours","blue", "yellow", 1, 80], , ])
	.Set("chart.title", "Learning in Hours")
	.Draw();
}

function drawgraph(){
	var Datearr = [];
	var LearningArr = [];
	var record = JSON.parse(localStorage.getItem("learningList"));

	for(var i=0; i< record.length; i++){
		Datearr.push(record[i].Date);
		LearningArr.push(Number(record[i].Hours));
	}

	console.log(Datearr);
	console.log(record);
	console.log(LearningArr);

	var LearningUpper = 10;
	var LearningLower = 5;
	drawLines(LearningArr,LearningUpper,LearningLower,Datearr);
}


function resizeGraph(){
	if ($(window).width() < 700) {
    	$("#GraphCanvas").css({"width": $(window).width() - 50});
    	$("#AdviceCanvas").css({"width": $(window).width() - 50});
	}
};

$(window).resize(function(){
 	resizeGraph();
});


function checkEmptyFields(inputDir){

	for (var i in inputDir) {
	  if (inputDir[i] == "" || inputDir[i] == "Choose Gender"){
	  	alert("All fields are required!");
	  	return (false);
	  }
	}
	return (true);
}

function checkValidEmail(email){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(mailformat))
	{
		return (true);
	}
	alert("Invalid email address!");
	return (false);
}

function checkValidPassword(password, confirm_password){
	if (password == confirm_password) {
        return (true);
    }
    alert("Entered Password and Confirm Password doesn't match!");
	return (false);
}

function checkValidDate(date){
	var varDate = new Date(date); 
	var today = new Date();
	today.setHours(0,0,0,0);

	if(varDate >= today) {
		alert("Invalid date Entered!");
		return (false);
	}
	return (true);
}

function checkValidAddress(address){
	
	var firstChar = address.trim().substr(0, 1);

	 if (isNaN(firstChar)) {
        alert("Address start with a number and must contain letter!");
        $("#address").focus();
        return (false);
    }
	return (true);
}

function checkValidPhone(phone)  {

    var tokens = phone.split('-');

	for (var i = 0; i < tokens.length; i++) {
		console.log(tokens[i]);
	    if (isNaN(tokens[i])) {
	        alert("Error! Use only numbers or hyphens!");
	        $("#phone").focus();
	        return (false);
	    }
	}

}

function clearUserForm() {
	$("#signupFirstName").val('');
	$("#signupLastName").val('');
	$("#dateOfBirth").val('');
	$("#addPassword").val('');
	$("#confirmPassword").val('');
	$("#signupEmail").val('');
}