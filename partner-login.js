(function(){
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var db = firebase.firestore();

    var uiConfig = {
        callbacks: {
            
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            
            var user = firebase.auth().currentUser;
            
            if(!user.emailVerified){
                
                user.sendEmailVerification().then(function() {
                    // Email sent.
                    //window.alert("Alert 2 - Verification mail is sent. Please verify email before signing in.")
                    window.alert("Email not verified. Verification email have been sent. Please verify before logging in.");    
                    // document.getElementById("signin-cov").innerHTML = "Alert 2 - Verification mail is sent. Please verify email before signing in.";
                    // $(".valMsg").show();
                    // $(".signin-cover").hide();
                    // uid = null;
                    // // window.alert("Account not verified yet")
                    // window.location.replace("partner-login.html");
                    // $("#valMsgBtn").click(function(){
                    //     logout()
                    // });
                    // $(".valMsg").hide();
                    window.location.replace("partner-login.html");
                }).catch(function(error) {
                    // An error happened.
                });
            } else{
                return true;
            }  
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            
            //var user = firebase.auth().currentUser;
            // var userId = firebase.auth().currentUser.uid;

            // var user = authResult.user;
            // var credential = authResult.credential;
            // var isNewUser = authResult.additionalUserInfo.isNewUser;
            // var providerId = authResult.additionalUserInfo.providerId;
            // var operationType = authResult.operationType;
        
            // if (isNewUser)
            // {
            //     console.log("new signin");
            //     user.sendEmailVerification();
            // }


            // user.sendEmailVerification().then(function() {
            //     // Email sent.
            //   }).catch(function(error) {
            //     // An error happened.
            //   });

            // Add a new document in collection "Partners"
            // db.collection("partners").doc(userId).set({
            //     name: "Shakk"
            // })
            // .then(function() {
            //     window.alert("Document successfully written!");
                
            // })
            // .catch(function(error) {
            //     window.alert("Error writing document: ", error);
            // });

            // window.alert(userId + " " + user.displayName );

            
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'partner-home.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url. ***needs to be changed
        tosUrl: 'main.html',
        // Privacy policy url.   ***needs to be changed
        privacyPolicyUrl: 'main.html'
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);


})()


  