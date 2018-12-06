document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  console.log(app);

});

var db = firebase.firestore();

//db.settings({
//   timestampsInSnapshots: true
// });



var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

var rent;
var electric;
var food;
var gas;
var car_insurance;
var dog_expenses;
var dental_insurance;
var going_out_expenses;
var netflix;
var spotify;
var internet;
var cell_phone;
var health_insurance;
var dog_insurance;
var mortgage;
var household;

$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });
    data.push(h);
    rent = data[0];
    //console.log("rent: ", rent.spent);
    electric = data[1];
    food = data[2];
    gas = data[3];
    car_insurance = data[4];
    health_insurance = data[5];
    dog_expenses = data[6];
    dental_insurance = data[7];
    dog_insurance = data[8];
    going_out_expenses = data[9];
    netflix = data[10];
    spotify = data[11];
    internet = data[12];
    cell_phone = data[13];
    mortgage = data[14];
    household = data[15];
  });
  //getUserUID();
  // Output the result

  $EXPORT.text(JSON.stringify(data));
});

function setProfile() {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
                 }
}

function writedata() {
  console.log("now running write data");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      var stringv = String(userid); //stringv holds string version of user.uid
      // console.log("userid",stringv);
      db.collection("users").doc(stringv).set({
        value1: rent,
        value2: electric,
        value3: food,
        value4: gas,
        value5: car_insurance,
        value6: health_insurance,
        value7: dog_expenses,
        value8: dental_insurance,
        value9: dog_insurance,
        value10: going_out_expenses,
        value11: netflix,
        value12: spotify,
        value13: internet,
        value14: cell_phone,
        value15: mortgage,
        value16: household
      })
      // console.log(rent);
      // console.log(electric);
      //getData();

      //return user.uid;
    }
  });
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
};

function pushUserUID() {
  db.collection("users").doc(stringv).set({
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

var stringUser;

function getStringUserUID() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid; //NON STRING OF ID
      var stringv = String(userid); //stringv holds string version of user.uid
      console.log("userid",stringv);
      stringUser = stringv.valueOf();
      console.log("heeere", stringUser);
      return stringv;
    }
  });
}

var totalspent = 0;

var rentcost = 0;
var electriccost = 0;
var foodcost = 0;
var gascost = 0;
var carinscost = 0;
var healthinscost = 0;
var dogexpcost = 0;
var dentalinscost = 0;
var goingoutexpcost = 0;
var netflixcost = 0;
var spotifycost = 0;
var internetcost = 0;
var cellphonecost = 0;
var dentalinscost = 0;
var mortagecost = 0;
var householdcost = 0;

var rentspent = 0;
var electricspent = 0;
var foodspent = 0;
var gasspent = 0;
var carinsspent = 0;
var healthinsspent= 0;
var dogexpspent = 0;
var dentalinsspent = 0;
var goingoutexpspent = 0;
var netflixspent = 0;
var spotifyspent= 0;
var internetspent = 0;
var cellphonespent = 0;
var dentalinsspent = 0;
var mortgagespent = 0;
var householdspent = 0;

function getData(){
    console.log("now running getdata");
    firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            var docRef= db.collection('users').doc(user.uid);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
          item = JSON.stringify(doc.data());
          item1 = JSON.parse(item);
          //console.log("hereee", item1.value1.cost);
        rentspent = parseInt(item1.value1.spent);
        electricspent = parseInt(item1.value2.spent);
        foodspent = parseInt(item1.value3.spent);
        gasspent = parseInt(item1.value4.spent);
        carinsspent = parseInt(item1.value5.spent);
        healthinsspent = parseInt(item1.value6.spent);
        dogexpspent = parseInt(item1.value7.spent);
        dentalinsspent = parseInt(item1.value8.spent);
        goingoutexpspent = parseInt(item1.value9.spent);
        netflixspent = parseInt(item1.value10.spent);
        spotifyspent = parseInt(item1.value11.spent);
        internetspent = parseInt(item1.value12.spent);
        cellphonespent = parseInt(item1.value13.spent);
        dentalinsspent = parseInt(item1.value14.spent);
        mortgagespent = parseInt(item1.value15.spent);
        householdspent = parseInt(item1.value16.spent);
         
        
        rentcost = parseInt(item1.value1.cost);
        electriccost = parseInt(item1.value2.cost);
        foodcost = parseInt(item1.value3.cost);
        gascost = parseInt(item1.value4.cost);
        carinscost = parseInt(item1.value5.cost);
        healthinscost = parseInt(item1.value6.cost);
        dogexpcost = parseInt(item1.value7.cost);
        dentalinscost = parseInt(item1.value8.cost);
        goingoutexpcost = parseInt(item1.value9.cost);
        netflixcost = parseInt(item1.value10.cost);
        spotifycost = parseInt(item1.value11.cost);
        internetcost = parseInt(item1.value12.cost);
        cellphonecost = parseInt(item1.value13.cost);
        dentalinscost = parseInt(item1.value14.cost);
        mortagecost = parseInt(item1.value15.cost);
        householdcost = parseInt(item1.value16.cost);
        
        totalcost = parseInt(item1.value1.cost) + parseInt(item1.value2.cost) + parseInt(item1.value3.cost) + parseInt(item1.value4.cost) + parseInt(item1.value5.cost) + parseInt(item1.value6.cost) + parseInt(item1.value7.cost) + parseInt(item1.value8.cost) + parseInt(item1.value9.cost) + parseInt(item1.value10.cost) + parseInt(item1.value11.cost)+ parseInt(item1.value12.cost)+ parseInt(item1.value13.cost)+ parseInt(item1.value14.cost)+ parseInt(item1.value15.cost)+ parseInt(item1.value16.cost);
          db.collection('users').doc(firebase.auth().currentUser.uid).update({
              value0: totalcost
          });
          //console.log('totalcost: ', totalcost);
          
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        }
    });

}


function printstuff(){
    console.log("now running print stuff");
    firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            var docRef= db.collection('users').doc(user.uid);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        }
    });

}

function writegraph(){
    var rentcostt;
    firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            var docRef= db.collection('users').doc(user.uid);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
          item = JSON.stringify(doc.data());
          item1 = JSON.parse(item);
          //console.log("hereee", item1.value1.cost);
        rentspent = parseInt(item1.value1.spent);
        electricspent = parseInt(item1.value2.spent);
        foodspent = parseInt(item1.value3.spent);
        gasspent = parseInt(item1.value4.spent);
        carinsspent = parseInt(item1.value5.spent);
        healthinsspent = parseInt(item1.value6.spent);
        dogexpspent = parseInt(item1.value7.spent);
        dentalinsspent = parseInt(item1.value8.spent);
        goingoutexpspent = parseInt(item1.value9.spent);
        netflixspent = parseInt(item1.value10.spent);
        spotifyspent = parseInt(item1.value11.spent);
        internetspent = parseInt(item1.value12.spent);
        cellphonespent = parseInt(item1.value13.spent);
        mortgagespent = parseInt(item1.value14.spent);
        householdspent = parseInt(item1.value15.spent);
         
        
        rentcost = parseInt(item1.value1.cost);
        electriccost = parseInt(item1.value2.cost);
        foodcost = parseInt(item1.value3.cost);
        gascost = parseInt(item1.value4.cost);
        carinscost = parseInt(item1.value5.cost);
        healthinscost = parseInt(item1.value6.cost);
        dogexpcost = parseInt(item1.value7.cost);
        dentalinscost = parseInt(item1.value8.cost);
        goingoutexpcost = parseInt(item1.value9.cost);
        netflixcost = parseInt(item1.value10.cost);
        spotifycost = parseInt(item1.value11.cost);
        internetcost = parseInt(item1.value12.cost);
        cellphonecost = parseInt(item1.value13.cost);
        mortgagecost = parseInt(item1.value14.cost);
        householdcost = parseInt(item1.value15.cost);
          //console.log('totalcost: ', totalcost);
        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Your Budget"
	},	
	axisY: {
		title: "Cost",
		titleFontColor: "#4F81BC",
		lineColor: "#4F81BC",
		labelFontColor: "#4F81BC",
		tickColor: "#4F81BC",
        maximum: 700,
	},
	axisY2: {
		title: "Spent",
		titleFontColor: "#C0504E",
		lineColor: "#C0504E",
		labelFontColor: "#C0504E",
		tickColor: "#C0504E",
        maximum: 700,
	},	
	toolTip: {
		shared: true
	},
	legend: {
		cursor:"pointer",
		itemclick: toggleDataSeries
	},
    
	data: [{
		type: "column",
		name: "Cost",
		legendText: "Cost",
		showInLegend: true, 
		dataPoints:[
			{ label: "Rent", y: rentcost },
			{ label: "Electric", y: electriccost },
			{ label: "Food", y: foodcost },
			{ label: "Gas", y: gascost },
			{ label: "Car Insurance", y: carinscost},
			{ label: "Health Insurance", y: healthinscost },
            { label: "Dog Expenses",y: dogexpcost},
            { label: "Dental Insurance",y: dentalinscost},
            { label: "Going Out",y: goingoutexpcost},
            { label: "Netflix",y: netflixcost},
            { label: "Spotify",y: spotifycost},
            { label: "Internet",y: internetcost},
            { label: "Cell Phone",y: cellphonecost},
            { label: "Mortgage",y: mortgagecost},
            { label: "Household",y: householdcost},
		]
	},
	{
		type: "column",	
		name: "Spent",
		legendText: "Spent",
		axisYType: "secondary",
		showInLegend: true,
		dataPoints:[
			{ label: "Rent", y: rentspent },
			{ label: "Electric", y: electricspent },
			{ label: "Food", y: foodspent },
			{ label: "Gas", y: gasspent},
			{ label: "Car Insurance", y: carinsspent },
			{ label: "Health Insurance", y: healthinsspent},
            { label: "Dog Expenses",y: dogexpspent},{ label: "Dental Insurance",y: dentalinsspent},
            { label: "Going Out",y: goingoutexpspent},
            { label: "Netflix",y: netflixspent},
            { label: "Spotify",y: spotifyspent},
            { label: "Internet",y: internetspent},
            { label: "Cell Phone",y: cellphonespent},
            { label: "Mortgage",y: mortgagespent},
            { label: "Household",y: householdspent},
		]
	}]
});
chart.render();

function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}
          
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        }
    });
    

}
//writedata();
//getData();
//printstuff();
writegraph();