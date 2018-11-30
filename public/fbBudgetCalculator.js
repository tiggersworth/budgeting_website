firebase.initializeApp({
  apiKey: 'AIzaSyC57E-X0VuGn9U0rZlCTU-L5Gt1_vv07cA',
  authDomain: 'budgetbud-a9544.firebaseapp.com',
  projectId: 'budgetbud-a9544'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
