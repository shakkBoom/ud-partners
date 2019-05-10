var mainApp = {};

(function(){
    var firebase = app_fireBase;
var uid = null; // used to save user id for future use 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
        }
        else{
          //redirect to login page
          uid = null;
          window.location.replace("partner-login.html");
        }
      });

    
    function logout(){
        firebase.auth().signOut();
    }
    mainApp.logout = logout;
})()