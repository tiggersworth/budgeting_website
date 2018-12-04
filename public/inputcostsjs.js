document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  console.log(app)

});

var db = firebase.firestore();

// db.settings({
//   timestampsInSnapshots: true
// });

function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

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
  getUserUID();
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

function getUserUID() {
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
      getData();

      return user.uid;
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

getStringUserUID();
//var docRef = db.collection("users").doc(getStringUserUID());
//console.log(stringUser);

function getData() {
  var docRef = db.collection("users").doc(String(firebase.auth().currentUser.uid));

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
console.log(stringUser);

// initFirebaseAuth();
checkSetup();
setProfile();
getUserUID();
getData();
//pushUserUID();
// welcomeUser();

// Shortcuts to DOM Elements.
// var welcomeMessage = document.getElementById('welcome_message');
