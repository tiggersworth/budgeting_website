function sendEmail(){

  if(checkMissingFields()) {

  var templateParams = {
    name: $('#name').val(),
    comment: $('#comment').val(),
    email: $('#email').val()
};

emailjs.send('gmail', 'template_lyD1lTsf', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

  confirm("Submission received!"); }
}
