var db = null;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', onDeviceReady, false);

function onDeviceReady() {
	checkDB();
	button();
	Cancel();
	saveInput();
	//hammerHandler();
}
function button (){
	 var btnAdd = document.querySelectorAll(".btnAdd");
      for (var i=0;i<btnAdd.length; i++) {
          btnAdd[i].addEventListener("click", addThing);
      }
}
function addThing(){
	var models = document.querySelectorAll("[data-role=modal]");
	models[0].style.display = "block";
	models[1].style.display = "block";
}

function Cancel (){
	 var btnCancel = document.querySelectorAll(".btnCancel");
      for (var i=0;i<btnCancel.length; i++) {
         btnCancel[i].addEventListener("click", cancelButton);
	  }
}
function cancelButton(){
	var models = document.querySelectorAll("[data-role=modal]");
	models[0].style.display = "none";
	models[1].style.display = "none";
	models[2].style.display = "none";
	models[3].style.display = "none";
}

function saveInput(){
	 var btnSave = document.querySelectorAll(".btnSave");
      for (var i=0;i<btnSave.length; i++) {
         btnSave[i].addEventListener("click", saveButton);
	  }
}
function saveButton(){
	var models = document.querySelectorAll("[data-role=modal]");
	models[0].style.display = "none";
	models[1].style.display = "none";
}

function outputGiftsForOccasions () {
	var list = document.getElementById("giftList");
  list.innerHTML = "";
  //clear out the list before displaying everything
  db.transaction(function(trans){
    trans.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
          li.innerHTML = rs.rows.item(i).person_name;
		  li.className = "peopleList";
		  li.dataset.dataref = rs.rows.item(i).person_id;
          list.appendChild(li);
        }
      console.log("displayed the current contents of the stuff table");
	  addPeopleListeners();
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });	
}
function addPeopleListeners () {
	var peopleList = document.querySelectorAll(".peopleList");
	for (var i=0;i<peopleList.length; i++) {
		peopleList[i].addEventListener("click", personClicked, false);
	}
}
function personClicked(ev) {
	console.log("hello");
	var name = ev.target.innerHTML;
	var id = ev.target.dataset.dataref;
	console.log(ev.target.dataset);
	var peopleList = document.querySelector("#people-list");
	var giftsForPerson = document.querySelector("#gifts-for-person");
	var personName = document.querySelector("#personName");
	peopleList.style.display = "none";
	giftsForPerson.style.display = "block";
	personName.innerHTML = name;
	personName.dataset.dataref = id;
	
}

function checkDB(){
    //app start once deviceready occurs
    console.info("deviceready");
    db = openDatabase('sample', '', 'Sample DB', 1024*1024);
    if(db.version == ''){
        console.info('First time running... create tables'); 
        //means first time creation of DB
        //increment the version and create the tables
        db.changeVersion('', '1.0',
                function(trans){
                    //something to do in addition to incrementing the value
                    //otherwise your new version will be an empty DB
                    console.info("DB version incremented");
                    //do the initial setup               
                    trans.executeSql('CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name VARCHAR)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table people created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
					trans.executeSql('CREATE TABLE occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name VARCHAR)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table occasions created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
					trans.executeSql('CREATE TABLE gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea VARCHAR, purchased BOOLEAN)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table gifts created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
									
                    trans.executeSql('INSERT INTO people(person_name) VALUES(?)', ["Steve","Gerry","Mike"], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        console.info("Added row in stuff");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
                },
                function(err){
                    //error in changing version
                    //if the increment fails
                    console.info( err.message);
                },
                function(){
                    //successfully completed the transaction of incrementing the version number   
                });
        addNavHandlers();
    }else{
        //version should be 1.0
        //this won't be the first time running the app
        console.info('Version: ', db.version) ;
		/*
		db.transaction(function(trans){
			trans.executeSql('INSERT INTO people(person_name) VALUES(?)', ["Mark"], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        console.info("Added row in stuff");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
		},
		function(){
		  //error for the transaction
		  output("The insert sql transaction failed.")
		},
		function(){
		  //success for the transation
		  //this function is optional
		});	*/						  
        addNavHandlers();
    }
}

function addNavHandlers(){
    //get the lists of links and pages
    //add the tap/click events to the links
    //add the pageshow and pagehide events to the pages
    console.info("Adding nav handlers");
    //dispatch the click event on the first tab to make the home page load
    updateList();
}

function updateList(){
  var list = document.getElementById("allfriends");
  list.innerHTML = "";
  //clear out the list before displaying everything
  db.transaction(function(trans){
    trans.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
          li.innerHTML = rs.rows.item(i).person_name;
		  li.className = "peopleList";
		  li.dataset.dataref = rs.rows.item(i).person_id;
          list.appendChild(li);
        }
      console.log("displayed the current contents of the stuff table");
	  addPeopleListeners();
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
}

function transErr(tx, err){
    //a generic function to run when any transaction fails
    //navigator.notification.alert(message, alertCallback, [title], [buttonName])
    console.info("Error processing transaction: " + err);
}

function transSuccess(){
    //a generic function to run when any transaction is completed
    //not something often done generically
}

//--------HAMMER-----------//

function hammerHandler(){ 
var myTarget = document.querySelector('.wrapper');
var mc = new Hammer (myTarget, {});
	
mc.on("swipe", function(ev){
		alert("swipe");
		document.getElementById("people-list").style.display = "none";
		document.getElementById("occasion-list").style.display = "block";
	});


var AddGifts  = document.querySelector("#add-gift");
        var hammerAddGifts = new Hammer.Manager(addGifts);
        var singleTap = new Hammer.Tap({ event: 'singletap' });
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerAddGifts.add([doubleTap, singleTap]);
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
        hammerAddGifts.on("singletap", bake0255_Giftr.togglePurchase);
        hammerAddGifts.on("doubletap", bake0255_Giftr.deleteItem);
		
var AddPersonOccasions  = document.querySelector("#add-person-occasion");
        var hammerGiftsForOccasion = new Hammer.Manager(addPersonOccasion);
        var singleTap5 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap5 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerAddPersonOccasion.add([doubleTap5, singleTap5]);
        doubleTap5.recognizeWith(singleTap5);
        singleTap5.requireFailure(doubleTap5);
        hammerAddPersonOccasion.on("singletap", bake0255_Giftr.togglePurchase);
        hammerAddPersonOccasion.on("doubletap", bake0255_Giftr.deleteItem);
		
var OccasionsList  = document.querySelector("#occasion-list");
        var hammerOccasionsList = new Hammer.Manager(occasionslist);
        var singleTap1 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap1 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerOccasionsList.add([doubleTap1, singleTap1]);
        doubleTap1.recognizeWith(singleTap1);
        singleTap1.requireFailure(doubleTap1);
        hammerOccasionsList.on("singletap", bake0255_Giftr.togglePurchase);
        hammerOccasionsList.on("doubletap", bake0255_Giftr.deleteItem);
		
var GiftsForPeople  = document.querySelector("#gifts-for-person");
        var hammerGiftsForPeople = new Hammer.Manager(giftsForPeople);
        var singleTap2 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap2 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerGiftsForPeople.add([doubleTap2, singleTap2]);
        doubleTap2.recognizeWith(singleTap2);
        singleTap2.requireFailure(doubleTap2);
        hammerGiftsForPeople.on("singletap", bake0255_Giftr.togglePurchase);
        hammerGiftsForPeople.on("doubletap", bake0255_Giftr.deleteItem);
		
var GiftsForOccasions  = document.querySelector("#gifts-for-occasion");
        var hammerGiftsForOccasion = new Hammer.Manager(giftsForOccasion);
        var singleTap3 = new Hammer.Tap({ event: 'singletap' });
        var doubleTap3 = new Hammer.Tap({event: 'doubletap', taps: 2 });
        hammerGiftsForOccasion.add([doubleTap3, singleTap3]);
        doubleTap3.recognizeWith(singleTap3);
        singleTap3.requireFailure(doubleTap3);
        hammerGiftsForOccasion.on("singletap", bake0255_Giftr.togglePurchase);
        hammerGiftsForOccasion.on("doubletap", bake0255_Giftr.deleteItem);
}