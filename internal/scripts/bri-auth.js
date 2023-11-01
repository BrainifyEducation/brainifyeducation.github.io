// Firebase Setup.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, updateProfile, onAuthStateChanged, sendEmailVerification, signInWithPopup, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, get, child,  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getConfig } from "./firebaseConfig.js"
import { createPopup } from "./bri-popups.js";
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';

const firebaseConfig = getConfig();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const dbRef = ref(getDatabase());

try{
  document.getElementById("signUpButton").addEventListener("click", function() {
  if(signupValuesValidation()){
     emailSignupFirebase();
  }else{
  console.log(signupValuesValidation())

    console.log("Values are not valid")
  }
});}catch(err){
  // Do nothing.
}

$('#firstNameInput').on('input',function(e){
  document.getElementById("firstNameInput").classList.remove("is-invalid");
});
$('#secondNameInput').on('input',function(e){
  document.getElementById("secondNameInput").classList.remove("is-invalid");
});
$('#emailInput').on('input',function(e){
  document.getElementById("emailInput").classList.remove("is-invalid");
});
$('#tosCheck').on('input',function(e){
  document.getElementById("tosCheckLabel").classList.remove("errorText");
});

$('#confirmPasswordInput').on('input',function(e){
    accountPasswordValidation("signup")
});
$('#passwordInput').on('input',function(e){
    accountPasswordValidation("signup")
});
$('#newPasswordInput').on('input',function(e){
    accountPasswordValidation("reset_password")
});
$('#confirmNewPasswordInput').on('input',function(e){
    accountPasswordValidation("reset_password")
});
$('#passwordReset').on('click',function(e){
  createPopup("rp")
});

$('#loginButton').on('click',function(e){
  emailLogin();
});
$('#resetPasswordConfirmButton').on('click',function(e){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
    const actionCode = urlParams.get('oobCode')
  handleResetPassword(auth, actionCode);
});


function accountPasswordValidation(type){
  if (type == "signup"){
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    document.getElementById("passwordInput").classList.remove("is-valid");
    document.getElementById("confirmPasswordInput").classList.remove("is-valid");
    document.getElementById("passwordInput").classList.remove("is-invalid");
    document.getElementById("confirmPasswordInput").classList.remove("is-invalid");
    document.getElementById("passwordFeedback").innerHTML = "";
    console.log(password, confirmPassword)

    if(password && confirmPassword){
        if(password == confirmPassword){
            if(checkPasswordStrength(password)){
                document.getElementById("passwordInput").classList.add("is-valid");
                document.getElementById("confirmPasswordInput").classList.add("is-valid");
                return true;
            }else{
                console.log("Password strength is not strong enough");
                document.getElementById("passwordInput").classList.add("is-invalid");
                document.getElementById("confirmPasswordInput").classList.add("is-invalid");
                return false;
            }
        }else{
            document.getElementById("passwordFeedback").innerHTML = "Passwords don't match.";
            console.log("Passwords do not match");
            document.getElementById("passwordInput").classList.add("is-invalid");
            document.getElementById("confirmPasswordInput").classList.add("is-invalid");
            return false;
        }
    }else{
        if(password){
          document.getElementById("confirmPasswordInput").classList.add("is-invalid");
          console.log("Confirm password is empty");
        }else{
          document.getElementById("passwordInput").classList.add("is-invalid");
          console.log("Password is empty");
        }
    }
  }else if (type == "reset_password"){
    const password = document.getElementById("newPasswordInput").value;
    const confirmPassword = document.getElementById("confirmNewPasswordInput").value;
    document.getElementById("newPasswordInput").classList.remove("is-valid");
    document.getElementById("confirmNewPasswordInput").classList.remove("is-valid");
    document.getElementById("newPasswordInput").classList.remove("is-invalid");
    document.getElementById("confirmNewPasswordInput").classList.remove("is-invalid");
    document.getElementById("passwordFeedback").innerHTML = "";
    console.log(password, confirmPassword)

    if(password && confirmPassword){
        if(password == confirmPassword){
            if(checkPasswordStrength(password)){
                document.getElementById("newPasswordInput").classList.add("is-valid");
                document.getElementById("confirmNewPasswordInput").classList.add("is-valid");
                return true;
            }else{
                console.log("Password strength is not strong enough");
                document.getElementById("newPasswordInput").classList.add("is-invalid");
                document.getElementById("confirmNewPasswordInput").classList.add("is-invalid");
                return false;
            }
        }else{
            document.getElementById("passwordFeedback").innerHTML = "Passwords don't match.";
            console.log("Passwords do not match");
            document.getElementById("newPasswordInput").classList.add("is-invalid");
            document.getElementById("confirmNewPasswordInput").classList.add("is-invalid");
            return false;
        }
    }else{
        if(password){
          document.getElementById("confirmNewPasswordInput").classList.add("is-invalid");
          console.log("Confirm password is empty");
        }else{
          document.getElementById("newPasswordInput").classList.add("is-invalid");
          console.log("Password is empty");
        }
    }
  }
}
function signupValuesValidation(){
  const firstName = document.getElementById("firstNameInput").value;
  const secondName = document.getElementById("secondNameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  const tosCheck = document.getElementById("tosCheck").checked;
  if (firstName && secondName && email && password && confirmPassword){
    if (checkPasswordStrength(password) == true){
      return true;
    }else{

      return "allValuesfalse";
    };
  }else{
    if (!firstName){
      document.getElementById("firstNameInput").classList.add("is-invalid");
    }else{
      document.getElementById("firstNameInput").classList.remove("is-valid");
    }
    if(!secondName){
      document.getElementById("secondNameInput").classList.add("is-invalid");
    }else{
      document.getElementById("secondNameInput").classList.remove("is-valid");
    }
    if(!email){
      document.getElementById("emailInput").classList.add("is-invalid");
    }else{
      document.getElementById("emailInput").classList.remove("is-valid");
    }
    if(!tosCheck){
      document.getElementById("tosCheckLabel").classList.add("errorText");    
    }
    if(!password){
      document.getElementById("passwordInput").classList.add("is-invalid");
    }else{
      document.getElementById("passwordInput").classList.remove("is-valid");
    }
    if(!confirmPassword){
      document.getElementById("confirmPasswordInput").classList.add("is-invalid");
    }else{
      document.getElementById("confirmPasswordInput").classList.remove("is-valid");
    }
    return "errorValueFalse";
 }
}
function checkPasswordStrength(password) {
    // Initialize variables
    var strength = 0;
    var tips = "";
  
    // Check password length
    if (password.length < 8) {
      tips += "Make the password longer. ";
    } else {
      strength += 1;
    }
  
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      strength += 1;
    } else {
      tips += "Use both lowercase and uppercase letters. ";
    }
  
    // Check for numbers
    if (password.match(/\d/)) {
      strength += 1;
    } else {
      tips += "Include at least one number. ";
    }
  
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) {
      strength += 1;
    } else {
      tips += "Include at least one special character. ";
    }
  
    // Return results
    if (strength < 2) {
      document.getElementById("passwordFeedback").innerHTML = "Your password is weak. " + tips;
return false;

    } else if (strength === 2) {
        document.getElementById("passwordFeedback").innerHTML = "Your password is weak. " + tips;
        return false;

    } else if (strength === 3) {
      document.getElementById("passwordFeedback").innerHTML = "Your password is weak. " + tips;
return false;

    } else {
        document.getElementById("passwordFeedback").innerHTML = "";
        return true;
    }
  }



export function emailSignupFirebase(){
    const firstName = document.getElementById("firstNameInput").value;
    const secondName = document.getElementById("secondNameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const tosCheck = document.getElementById("tosCheck").checked;
    if (signupValuesValidation() && tosCheck){
      if (password == confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: firstName + " " + secondName,
            photoURL: `https://ui-avatars.com/api/?name=${firstName + "%20" + secondName}&background=random`
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            console.error(error)
            createPopup("error", error.code, error.message)
          });
          sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent.")
            createPopup("req", "Account Verification", "A verification email has been sent to your registered email address. <strong>Please verify your account to proceed.</strong>", null, null)

          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          createPopup("error", errorCode, errorMessage)
          console.error(errorCode, errorMessage)
          // ..
        });
      }else{
        console.log("Passwords do not match")
      }
    }else{
      document.getElementById("tosCheckLabel").classList.add("errorText");    

      console.log("TOS not checked")
    }
}



export function handleEndpoint(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
    const mode = urlParams.get('mode')
    const actionCode = urlParams.get('oobCode')
    console.log(mode, actionCode)
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        $("head").append(`<title>Brainify - Password Reset</title>`);
        console.log('resetPassword')
        document.getElementById("resetPasswordForm").hidden = false;
        return 'resetPassword'
      case 'recoverEmail':
        // Display email recovery handler and UI.
        $("head").append(`<title>Brainify - Recover Email</title>`);

        console.log('recoverEmail')
        handleRecoverEmail(auth, actionCode, lang);
        return 'recoverEmail'
      case 'verifyEmail':
        console.log('verifyEmail')
        $("head").append(`<title>Brainify - Account Verification</title>`);
        // handleVerifyEmail||(auth, actionCode)
        // Display email verification handler and UI.
        handleVerifyEmail(auth, actionCode);
        return 'verifyEmail'
      default:
        $("head").append(`<title>Brainify - Endpoint Error</title>`);
        console.error("Invalid mode.")
        createPopup("error", "Invalid mode.", "The mode provided is invalid.", null, null, "/")
    }
  };
function handleVerifyEmail(auth, actionCode) {
    applyActionCode(auth, actionCode).then((resp) => {
      // Email address has been verified.
      createPopup("req", "Account Verified", "Your account has been verified. You can now sign in.", null, null)
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch((error) => {
      createPopup("error", error.code, error.message)
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
    });
  }
  
  function handleResetPassword(auth, actionCode){
    verifyPasswordResetCode(auth, actionCode).then((email) => {
      const accountEmail = email;
      var newPassword;
      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
      if(accountPasswordValidation("reset_password")){
        newPassword = document.getElementById("newPasswordInput").value;
      }else{
        console.log("Password is not valid")
        createPopup("error", "Password is not valid", "Please check your password and try again.")
      }
  
      // Save the new password.
      confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
        // Password reset has been confirmed and new password updated.
  
        // TODO: Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
        // signInWithEmailAndPassword(accountEmail, newPassword);
        createPopup("req", "Password Reset", "Your password has been reset successfully. You can now sign in.", null, null, "/login")
  
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      }).catch((error) => {
        console.error(error)
        createPopup("error", error.code, error.message)
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
      });
    }).catch((error) => {
      if(error.code == "auth/invalid-action-code"){
        console.error(error)
        createPopup("error", error.code, "The link you have used is invalid. Please try again.")
      }else{
        console.error(error)
        createPopup("error", error.code, error.message)
      }
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
    });

  }
// createPopup("", "Account Verification", "A verification email has been sent to your registered email address. <strong>Please verify your account to proceed.</strong>", null, "Okay")

function emailLogin(){
  const email = document.getElementById("emailLoginInput").value;
  const password = document.getElementById("passwordLoginInput").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    createPopup("req", "Login Successful", `<strong>You have been logged in successfully.</strong> \n ${JSON.stringify(user, null, 4)}`, null, null)
    // ...
  })
  .catch((error) => {
    createPopup("error", error.code, error.message)
    console.error(error.code, error.message)
  });
}

export function sendResetPasswordEmail(){
  console.log("test")
  const email = document.getElementById("resetPasswordEmailInput").value;
  console.log(email)
  sendPasswordResetEmail(auth, email)
  .then(() => {
    $('#popup-modal').modal('hide').on('hidden.bs.modal', function (e) {
      createPopup("req", "Password Reset", "A password reset email has been sent to your registered email address.", null, null)
    });
  })
  .catch((error) => {
    createPopup("error", error.code, error.message)
    console.error(error.code, error.message)
  });
}