document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  console.log(app)

});

var db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});


// function initFirebaseAuth() {
//   // Listen to auth state changes.
//   firebase.auth().onAuthStateChanged(authStateObserver);
// }

function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

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

// function welcomeUser() {
//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     var welcomeMessage = document.getElementById("welcome_message");
//     welcomeMessage.childNodes[0].textContent.innerHTML = "Welcome " + getUserName();
//
//     // welcome_message.innerHTML = "Welcome " + getUserName();
//   } else {
//     // No user is signed in.
//   }
// });
// }

// function pushUserUID() {
//   db.collection("users").doc(getUserUID()).set({
//     first: "uda",
//     last: "lovelace",
//     born: 2000
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
// }


function getUserUID() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      var stringv = String(userid); //stringv holds string version of user.uid
      //console.log("userid",stringv);
      // db.collection("users").doc(stringv).set({
      //   rent: 0,
      //   electric: 0,
      //   food: 0,
      //   gas: 0
      }
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
// initFirebaseAuth();
checkSetup();
setProfile();
getUserUID();
//pushUserUID();
// welcomeUser();

// Shortcuts to DOM Elements.
// var welcomeMessage = document.getElementById('welcome_message');
