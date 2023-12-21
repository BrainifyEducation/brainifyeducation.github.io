import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getConfig } from "./firebaseConfig.js"
const firebaseConfig = getConfig();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function createPopup(popuptype, modal_title, modal_body, modal_secondary, modal_primary, continueUrl){
    if (popuptype == "requested" || popuptype == "req" || popuptype == "request"){
        if(modal_title, modal_body){
            requestedPopup(modal_title, modal_body, modal_secondary, modal_primary, continueUrl);
        }else{
            createPopup("error", "Pop-up", "You must provide a title and body for the requested popup.")
            console.error("You must provide a title and body for the requested popup.");
        }
    }else if(popuptype == "error" || popuptype == "err"){
        if(modal_title, modal_body){
            errorPopup(modal_title, modal_body, continueUrl);
        }else{
            createPopup("error", "Pop-up", "You must provide a body for the error popup.");
            console.error("You must provide a body for the error popup.");
        }
    }else if(popuptype == "resetpassword" || popuptype == "rp"){
        forgotPassword();
    }else if(popuptype == "resendverification" || popuptype == "rv"){
        resendVerificationEmail();
    }else if(popuptype == "maya"){
        easter();
    }
    else{
        createPopup("error", "Pop-up", "You must provide a valid popup type.");
        console.error("You must provide a valid popup type.");
    }

}

window.createPopup = createPopup;
function requestedPopup(modal_title, modal_body, modal_secondary, modal_primary, continueUrl){
    var popup;
    console.log(modal_title, modal_body, modal_secondary, modal_primary)


    if(modal_secondary && !modal_primary){
        popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${modal_body}</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modal_secondary}</button></div></div></div></div></div>`
    }
    if(modal_primary && !modal_secondary){
        popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${modal_body}</div><div class="modal-footer"><button type="button" class="btn btn-primary">${modal_primary}</button></div></div></div></div></div>`
    }
    if(!modal_primary && !modal_secondary){
        popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${modal_body}</div><div class="modal-footer"></div></div></div></div></div>`
    }
    if(modal_primary && modal_secondary){
        popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${modal_body}</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modal_secondary}</button><button type="button" class="btn btn-primary">${modal_primary}</button></div></div></div></div></div>`
    }
    $('body').append(popup);
    $('#popup-modal').modal('show');
    $('#popup-modal').on('hidden.bs.modal', function (e) {
        $('#temporary-popup').remove();
        if(continueUrl){
            window.location.href = continueUrl;
        }
    });
}

function errorPopup(modal_error_title, modal_error, continueUrl){
    try{
        $('#temporary-popup').remove();
    }catch(err){
        console.log("No popup to remove.")
    }    
    var popup;
    popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp" style="color: #dc3545;">${modal_error_title}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body" style="color: #dc3545;">${modal_error}</div><div class="modal-footer"></div></div></div></div></div>`
    $('body').append(popup);
    $('#popup-modal').modal('show');
    $('#popup-modal').on('hidden.bs.modal', function (e) {
        $('#temporary-popup').remove();
        if(continueUrl){
            window.location.href = continueUrl;
        }
    });
}



// Popup locked to login page.


function resendVerificationEmail(){
    if(window.location.href != "/login"){
        var modal_title = "Account Verification";
        var modal_body = "Your account has not been verified. <strong>Please verify your account to continue.</strong>";
        var modal_secondary = "Close";
        var modal_primary = "Send Email";
        var popup = `<div id="temporary-popup"> <div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-header"> <h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"><p>${modal_body}</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modal_secondary}</button> <button type="button" id="buttonEvent" class="btn btn-primary">${modal_primary}</button> </div> </div> </div> </div> </div>`
        $('body').append(popup);
        $('#popup-modal').modal('show');
        $('#popup-modal').on('hidden.bs.modal', function (e) {
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
            $('#temporary-popup').remove();
        });
        document.getElementById("buttonEvent").addEventListener("click", function() {
            console.log(auth.currentUser)
            sendEmailVerification(auth.currentUser)
            .then(() => {
                $('#temporary-popup').remove();
              console.log("Email verification sent.")
              createPopup("req", "Account Verification", "A verification email has been sent to your registered email address.", null, null, "/login");
              signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {

              });
            }).catch((error) => {
                console.log("Email verification failed.")
                if(error.code == "auth/too-many-requests"){
                    createPopup("error", `Account Verification - ${error.code}`, "Whoa there! Slow down! Your sending too many requests.", null, null, "/login");
                }
            });
          });
    }else
        createPopup("error", "Forgot Password Pop-up", `You're not aloud to access this pop-up from "${window.location.href}".`);
}

function easter(){
    var popup;
    popup = `<div id="temporary-popup"><div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="BrainifyPopUp" style="color: #dc3545;"></h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Maya <3</div><div class="modal-footer"></div></div></div></div></div>`
    $('body').append(popup);
    $('#popup-modal').modal('show');
    $('#popup-modal').on('hidden.bs.modal', function (e) {
        $('#temporary-popup').remove();
    });
}