var app_fireBase = {};
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAg8t7xdw2ID_HE0B7HxidOcmfSTH_CY5s",
    authDomain: "ugly-deals.firebaseapp.com",
    databaseURL: "https://ugly-deals.firebaseio.com",
    projectId: "ugly-deals",
    storageBucket: "ugly-deals.appspot.com",
    messagingSenderId: "738794256705"
  };
  firebase.initializeApp(config);

  app_fireBase = firebase;
})()