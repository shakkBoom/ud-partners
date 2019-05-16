var mainApp1 = {};

(function(){
    var firebase = app_fireBase;
    
    // Get a reference to the database service
    var defaultStorage = firebase.storage();
    var db = firebase.firestore();
    

    // var uid = null; // used to save user id for future use
    // var displayName = null;
    // var email = null;
    // var emailVerified = null;
    // var photoURL = null;
    // var isAnonymous = null;
    // var providerData = null;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var uid = user.uid;

          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var providerData = user.providerData;
          
          // window.alert("Alert 1");
          // window.alert(emailVerified);
          

            // if(!emailVerified){
                
            //     user.sendEmailVerification().then(function() {
            //         // Email sent.
            //         //window.alert("Alert 2 - Verification mail is sent. Please verify email before signing in.")
                        
            //         document.getElementById("signin-cov").innerHTML = "Alert 2 - Verification mail is sent. Please verify email before signing in.";
            //         $(".valMsg").show();
            //         $(".signin-cover").hide();
            //         // uid = null;
            //         // // window.alert("Account not verified yet")
            //         // window.location.replace("partner-login.html");
            //         $("#valMsgBtn").click(function(){
            //             logout()
            //         });
            //         // $(".valMsg").hide();
            //         // logout();
            //     }).catch(function(error) {
            //         // An error happened.
            //     });
            // }  else {
            //     // document.getElementById("test").disabled = true;
            //     //var dialog = document.querySelector('#test');
            //     $(".valMsg").hide();
            // }
            
            var docRef = db.collection('partners').doc(uid);

            docRef.get().then(function(doc) {
                // window.alert(!doc.exists); // <-- Check if its working or not
                if (!doc.exists) {
                    // console.log("Document data:", doc.data());
                    $(".signin-cover").hide();
                    
                    $("#regButton").click(function(){
                        
                        db.collection("partners").doc(uid).set({
                            email: email,
                            name: displayName,
                            // location: document.getElementById("#location").val(),
                            verifiedUser : false
                            })
                            .then(function() {
                                $(".signin-cover").show();
                                user.sendEmailVerification();
                                window.alert("Thank you for registering. A verification email will be sent to you shortly. Please verify your email before signing in.");
                                logout();
                            })
                            .catch(function(error) {
                            window.alert("Alert 4 Error writing document: ", error);
                            });

                    });
                    // $(".signin-cover").show();
                
                    
                }
            });      



            //   // if email is not verified, user is signed out and redirected to the login page.
            //   if(!emailVerified){
            //     // Here you can create an alert to let the user know that
            //     // the reason they can't log in is that they haven't verified
            //     // their email address.
            //     window.alert("Alert 5 Account is not varified yet. Please contact ugly-deals to get this sorted")
            //     uid = null;
            //     // window.alert("Account not verified yet")
            //     window.location.replace("partner-login.html");
            //   }




        // var docRef2 = db.collection("partners").doc(uid);

        //     docRef2.get().then(function(doc) {
        //         if (doc.exists) {
        //             console.log("Document data:", doc.data());
        //             window.alert("we are in");
        //             if (!doc.data().verifiedUser){
        //                 document.getElementById("signin-cov").innerHTML = "Alert 5 Account is not varified yet. Please contact ugly-deals to get this sorted";
        //                 $(".valMsg").show();    
        //                 $(".signin-cover").hide();
                        
        //                 // window.alert("Alert 5 Account is not varified yet. Please contact ugly-deals to get this sorted")
        //                 uid = null;
        //                 // // window.alert("Account not verified yet")
        //                 // window.location.replace("partner-login.html");
        //                 $("#valMsgBtn").click(function(){
        //                     logout()
        //                 });
        //                 // $(".valMsg").hide();
        //                 //logout();
        //             } else{
        //                 window.location.replace("partner-home.html");
        //             }
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     }).catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });

          
        //   var docRef1 = db.collection('partner').doc(uid).verifiedUser;

        //   docRef1.get().then(function(doc){
        //         if (!doc.exists) {
        //         // document exists (online/offline)
        //         //redirect to login page
        //         uid = null;
        //         window.alert("Alert 6 Account not verified yet")
        //         window.location.replace("partner-login.html");
        //         }
        //     }).catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });
          
          
           // window.alert("Done");
        }
        else{
          //redirect to login page
          uid = null;
          window.alert("Alert 7 - You are not signed in.")
          window.location.replace("partner-login.html");
          
          // unsubscribe();
        }
      });
      
    
    function logout(){
        firebase.auth().signOut();
    }
    mainApp1.logout = logout;
})()