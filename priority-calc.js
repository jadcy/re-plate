// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyBOBBNZIvImKFJIpJeMrEswpopwY0nnlQk",
  authDomain: "re-plate-d1d8a.firebaseapp.com",
  databaseURL: "https://re-plate-d1d8a.firebaseio.com",
  projectId: "re-plate-d1d8a",
  storageBucket: "re-plate-d1d8a.appspot.com",
  messagingSenderId: "983654362441",
  appId: "1:983654362441:web:629d13cf84fdb70c1f7e98",
  measurementId: "G-NLK3FKYFC0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
firebase.analytics();

var ref = database.ref('customer');
ref.on('value', gotData, errData);

function gotData(data) {
  var customers = data.val();
  var keys = Object.keys(customers);
  console.log(keys);
  for(var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var username = customers[k].Username;
    var hist = customers[k].OrderHist;
    var tardy = customers[k].Tardies;

    firebase.database().ref('customer/' + username).set({
      priority: calculate(user, hist, tardy)
    });

  }
}

function errData(err) {
  console.log('Error');
  console.log(err);
}

function calculate(user, history, tardies) {
  //calculate how much priority
  if(history == 0 && tardies == 0) {
    return 0;
  }
  return 1/(.75*history + .25*tardies);
}
