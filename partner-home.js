var mainApp = {};

(function(){
    var firebase = app_fireBase;
    
    // Get a reference to the database service
    var defaultStorage = firebase.storage();
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
          
          window.alert("Alert 1");

          if(!emailVerified){
            user.sendEmailVerification().then(function() {
                // Email sent.
                window.alert("Alert 2")
            }).catch(function(error) {
                // An error happened.
            });
          }
        
          var docRef = db.collection('partner').doc(uid);

          docRef.get().then(function(doc) {
              if (!doc.exists) {
                  // console.log("Document data:", doc.data());
                  db.collection("partners").doc(uid).set({
                    name: displayName,
                    verifiedUser : false
                  })
                  .then(function() {
                    window.alert("Alert 3 Document successfully written!");
                    
                  })
                  .catch(function(error) {
                    window.alert("Alert 4 Error writing document: ", error);
                  });
              }
          });      


          if(!emailVerified){
            // Here you can create an alert to let the user know that
            // the reason they can't log in is that they haven't verified
            // their email address.
            window.alert("Alert 5 Account is not varified yet. Please contact ugly-deals to get this sorted")
            uid = null;
            // window.alert("Account not verified yet")
            window.location.replace("partner-login.html");
          }
          
          var docRef1 = db.collection('partner').doc("verified");

          docRef1.get().then(function(doc){
                if (!doc.exists) {
                // document exists (online/offline)
                //redirect to login page
                uid = null;
                window.alert("Alert 6 Account not verified yet")
                window.location.replace("partner-login.html");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          
          
        }
        else{
          //redirect to login page
          uid = null;
          window.alert("Alert 7 ")
          window.location.replace("partner-login.html");
          
          // unsubscribe();
        }
      });

    
    function logout(){
        firebase.auth().signOut();
    }
    mainApp.logout = logout;
})()