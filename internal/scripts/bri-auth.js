// Firebase Setup.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, updateProfile, onAuthStateChanged, sendEmailVerification, signInWithPopup, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getConfig } from "./firebaseConfig.js"
import { createPopup } from "./bri-popups.js"
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
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

try{
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
    forgotPassword();
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
}catch(err){
  // Do nothing.
}

function signOutAccount(){
  signOut(auth).then(() => {
    window.location.href = "/";
  }).catch((error) => {
    createPopup("error", error.code, error.message)
    console.error(error.code, error.message)
  });
};
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

async function isDeveloper(){
   try {
    const accountSnapshot = await get(child(dbRef(`users/${auth.currentUser.uid}/developmentAccount`)))
    const isDeveloper = accountSnapshot.val()
    console.log("isdev", isDeveloper)
    if (isDeveloper){
      console.log(isDeveloper)
      return true;
    }else{
      console.warn('test')
      return false;
    }
   } catch(error){
    console.warn(error)
    return false;
   }
}

isDeveloper().then((developer) => {
  if(developer){
    console.log("Developer")
  }else{
    console.log("Not developer")
  }
})
export function emailSignupFirebase(){
  const button = document.getElementById("signUpButton");
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
  button.disabled = true;
    const firstName = document.getElementById("firstNameInput").value;
    const secondName = document.getElementById("secondNameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;
    const tosCheck = document.getElementById("tosCheck").checked;
    var accountType;

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
            if (document.getElementById("studentRadio").checked){
              accountType = "student";
            }else if (document.getElementById("teacherRadio").checked){
              accountType = "teacher";
            }else if(document.getElementById("developmentRadio")){
              createPopup("req", 'test', "test")
              set(ref(db, 'users'), {"develpmentAccounts": ["test"]})
              accountType = "test"
            }else{
              accountType = "error";
            }
            console.log(accountType)
            set(ref(db, 'users/' + user.uid), {
              accountType: accountType
            })

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
        })
        .finally(() => {
          button.innerHTML = 'Sign Up';
          button.disabled = false;
        });
      }else{
        console.log("Passwords do not match")
      }
    }else{
      document.getElementById("tosCheckLabel").classList.add("errorText");
      console.log("TOS not checked")
      button.innerHTML = 'Sign Up';
      button.disabled = false;
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
  const button = document.getElementById("loginButton");
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
  button.disabled = true;
  const email = document.getElementById("emailLoginInput").value;
  const password = document.getElementById("passwordLoginInput").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    if(auth.currentUser.emailVerified){
      const user = userCredential.user;
      createPopup("req", "Login Successful", `<strong>You have been logged in successfully.</strong> \n ${JSON.stringify(userCredential.user, null, 4)}`, null, null)
    }else{
      createPopup("rv")
    }
  })
  .catch((error) => {
    createPopup("error", error.code, error.message)
    console.error(error.code, error.message)
  })
  .finally(() => {
    button.innerHTML = 'Login';
    button.disabled = false;
  });
}

function forgotPassword(){
  if(window.location.href != "/login"){
      var modal_title = "Forgot Password";
      var modal_body = "Enter your email address below and we'll send you a link to reset your password.";
      var modal_secondary = "Cancel";
      var modal_primary = "Send Email";
      var popup = `<div id="temporary-popup"> <div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-header"> <h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <form> <p>${modal_body}</p> <hr> <div class="mb-3"> <label for="emailLoginInput" class="form-label"><strong>Email address</strong></label> <input autocomplete="email" type="email" class="form-control" id="resetPasswordEmailInput" aria-describedby="emailHelp"> </div> </form> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modal_secondary}</button> <button type="button" id="buttonEvent" class="btn btn-primary">${modal_primary}</button> </div> </div> </div> </div> </div>`
      $('body').append(popup);
      $('#popup-modal').modal('show');
      $('#popup-modal').on('hidden.bs.modal', function (e) {
          $('#temporary-popup').remove();
      });
      document.getElementById("buttonEvent").addEventListener("click", function() {
        const button = document.getElementById("buttonEvent");
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        button.disabled = true;

        const email = document.getElementById("resetPasswordEmailInput").value;
        console.log(email)
        sendPasswordResetEmail(auth, email)
          .then(() => {
            $('#popup-modal').modal('hide').on('hidden.bs.modal', function (e) {
            createPopup("req", "Password Reset", "A password reset email has been sent to your registered email address.", null, null, '/login')
            });
          })
          .catch((error) => {
            $('#popup-modal').modal('hide').on('hidden.bs.modal', function (e) {
              createPopup("err", error.code, error.message, null, null)
              console.error(error.code, error.message)

            });
          })
          .finally(() => {
            button.innerHTML = 'Send Email';
            button.disabled = false;
          });
      });
  }else
      createPopup("error", "Forgot Password Pop-up", `You're not aloud to access this pop-up from "${window.location.href}".`);
}


export function initializePage(){
  var dropdownLinks = `
  <li><a class="dropdown-item" href="/settings">Settings</a></li>
  <li><hr class="dropdown-divider"></li>
  <li><a class="dropdown-item text-danger" href="#" id="logout-button">Logout</a></li>`
  var links = `
  <li class="nav-item">
    <a id="home-button" class="nav-link" href="/">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/dashboard">Dashboard</a>
  </li>`
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      $("#account-buttons").hide();
      $("#dropdown-button").show();
      $("#profile-picture").attr("src",user.photoURL);
      $("#account-name").text(user.displayName);

    } else {
      console.log("No user signed in")
      $("#dropdown-button").hide();
      $("#account-buttons").show();
    }
  });
  $("#nav-links").append(links)

  console.log($("#pageid").value)
  if ($('meta[name="pageid"]').attr('content') == "home"){
    $("#home-button").addClass("active");
    $("#home-button").attr("aria-current", "page");
  }

  $("#dropdown-menu").append(dropdownLinks)

  var logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener('click', function() {
    signOutAccount();
    console.log("Logout button clicked")
  });
}



export function settingsInitialize(){
  var developmentSettings = `<div class="development-container container shadow rounded-4  p-3"> <h2 class="mb-3"><strong>Development</strong></h2> <div class="text-center"> <button class="m-2 btn btn-development" onclick='window.location.href="https://github.com/BrainifyEducation/brainifyrevision.github.io?tab=readme-ov-file#development-notes"'>Documentation</button> </div> <div class="text-center"> <button class="m-2 btn btn-development" onclick="window.location.href='/settings/core_lessons'">Create Core Lesson</button> </div> </div>`
  onAuthStateChanged(auth, (user) => {
    if (user) {
      get(child(dbRef, `users/${user.uid}/accountType`)).then((snapshot) => {
        if (snapshot.val() == "development"){
          $("#settings-container").append(developmentSettings)
        }
      }).catch((error) => {});
    } else {
    }
  })
};