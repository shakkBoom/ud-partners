var mainApp = {};

(function(){
    var firebase = app_fireBase;
    
    // Get a reference to the database service
    var db = firebase.firestore();

    var uid = null; // used to save user id for future use
    var displayName = null;
    var email = null;
    var emailVerified = null;
    var photoURL = null;
    var isAnonymous = null;
    var providerData = null; 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;

          displayName = user.displayName;
          email = user.email;
          emailVerified = user.emailVerified;
          photoURL = user.photoURL;
          isAnonymous = user.isAnonymous;
          providerData = user.providerData;

          db.collection("partners").doc(uid).set({
            name: "Shakk"
          })
          .then(function() {
            window.alert("Document successfully written!");
            
          })
          .catch(function(error) {
            window.alert("Error writing document: ", error);
          });

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