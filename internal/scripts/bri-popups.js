import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import { sendResetPasswordEmail } from './bri-auth.js';
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
function forgotPassword(){
    if(window.location.href != "/login"){
        var modal_title = "Forgot Password";
        var modal_body = "Enter your email address below and we'll send you a link to reset your password.";
        var modal_secondary = "Cancel";
        var modal_primary = "Send Email";
        var popup = `<div id="temporary-popup"> <div class="modal fade" id="popup-modal" tabindex="-1" aria-labelledby="BrainifyPopUp" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-header"> <h1 class="modal-title fs-5" id="BrainifyPopUp">${modal_title}</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <form> <p>${modal_body}</p> <hr> <div class="mb-3"> <label for="emailLoginInput" class="form-label"><strong>Email address</strong></label> <input autocomplete="email" type="email" class="form-control" id="resetPasswordEmailInput" aria-describedby="emailHelp"> </div> </form> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modal_secondary}</button> <button type="button" id="passwordResetButton" class="btn btn-primary">${modal_primary}</button> </div> </div> </div> </div> </div>`
        $('body').append(popup);
        $('#popup-modal').modal('show');
        $('#popup-modal').on('hidden.bs.modal', function (e) {
            $('#temporary-popup').remove();
        });
        document.getElementById("passwordResetButton").addEventListener("click", function() {
            sendResetPasswordEmail();
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