// Url to send form
var url = './ezee-ajax-emailer/send-email.php';
function handleContactForm(formVals, formElement) {
    var formBlock = document.getElementById('contact-form-block');
    var statusLoading = document.getElementById('contact-status-loading');
    formBlock.classList.remove('fade-reveal');
    formBlock.classList.add('fade-hide');


    // // Set loading spinner
    // // Get formats for each data name
    // var dataWithFormats = prepJsonWithDefaultFormat(formVals);
    // emailAjaxData(dataWithFormats)
    // .then(resData=>{
    //     console.log(resData);
    // })
    // // Network failure  
    // .catch(e=>{
    //     console.log(e.message);
    // })
}

