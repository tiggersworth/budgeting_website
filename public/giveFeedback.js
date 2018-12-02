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

function checkMissingFields(){
  var name = document.getElementById("name").value;
  var comment = document.getElementById("comment").value;
  var email = document.getElementById("email").value;

  if(name == "" || comment == "" || email == "") {
    alert("Please fill in the missing fields.");
    return false;
  } else if(!validateEmail(email)) {
    alert("Please provide a valid email.");
    return false;
  }

  return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
