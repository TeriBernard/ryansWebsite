// Url to send form
var url = './ezee-ajax-emailer/send-email.php';
function handleContactForm(formVals, formElement) {
    var fadeReveal = 'fade-reveal';

    var failElem = document.getElementById("contact-status-fail");
    var formBlock = document.getElementById('contact-form-block');
    var formInviteText = document.getElementById('form-invite-text');
    var submitBtn = document.getElementById('contact-submit-btn');
    var statusLoading = document.getElementById('contact-status-loading');

    submitBtn.disabled = 'disabled';
    // Hide form and fail message
    formBlock.classList.remove(fadeReveal);
    formInviteText.classList.remove(fadeReveal);
    failElem.classList.remove(fadeReveal);
    // Show loading spinner
    statusLoading.classList.add(fadeReveal);
    
    // Get formats for each data name
    var dataWithFormats = prepJsonWithDefaultFormat(formVals);

    emailAjaxData(dataWithFormats)
    .then(resData=>{
        // Hide spinner
        statusLoading.classList.remove(fadeReveal);
        if((resData === null) || (typeof resData !== 'object') || !resData['status']){
            console.log(resData);
            throw Error('Got invalid JSend');
        } else {
            if(resData['status'] === 'success'){
                var successElem = document.getElementById('contact-status-success');
                // Show emailed values
                var nameResult = document.getElementById('sent-name').innerHTML = 
                    resData.data.sanitized.name;
                var phoneResult = document.getElementById('sent-phone').innerHTML =
                    resData.data.sanitized.phone;
                var emailResult = document.getElementById('sent-email').innerHTML =
                    resData.data.sanitized.email;
                successElem.classList.add(fadeReveal);
            } else if(resData['status'] === 'fail'){
                if(resData.data.failed){
                    var nameInput = document.getElementById('contact-name');
                    var phoneInput = document.getElementById('contact-phone');
                    var emailInput = document.getElementById('contact-email');
                    var messageInput = document.getElementById('contact-message');

                    var failed = resData.data.failed;
                    setInvalid(failed['name'], nameInput);
                    setInvalid(failed['phone'], phoneInput);
                    setInvalid(failed['email'], emailInput);
                    setInvalid(failed['message'], messageInput);
                }
                submitBtn.disabled = false;
                formBlock.classList.add(fadeReveal);
                failElem.classList.add(fadeReveal);
            } else {
                if(!resData['message']) throw Error("Status not 'success' or 'fail', but no 'message' in object");
                throw Error(resData['message']);
            }
        }
    })
    // Network failure  
    .catch(e=>{
        console.log(e.message);
        statusLoading.classList.remove(fadeReveal);
        var errorElem = document.getElementById("contact-status-error");
        errorElem.classList.add(fadeReveal);
    })
}


function setInvalid(failKey, inputElem){
    console.log(failKey);
    var invalidClass = 'invalid-input'
    if(failKey) inputElem.classList.add(invalidClass);
    else inputElem.classList.remove(invalidClass);
}


