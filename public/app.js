document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  console.log(app)

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

function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// initFirebaseAuth();
checkSetup();
setProfile();
// welcomeUser();

// Shortcuts to DOM Elements.
var welcomeMessage = document.getElementById('welcome_message');
