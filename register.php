<?php
/* form.php */
$serverName = "serverName\\sqlexpress"; //serverName\instanceName
$connectionInfo = array( "Database"=>"dbName", "UID"=>"userName", "PWD"=>"password");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     echo "Connection established.<br />";
         if ($_POST['password'] == $_POST['confirmpassword']) {

             //define other variables with submitted values from $_POST
             $username = $mysqli->real_escape_string($_POST['username']);
             $email = $mysqli->real_escape_string($_POST['email']);

             //md5 hash password for security
             $password = md5($_POST['password']);
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <style>
        .container {
            height: 100vh;
        }
    </style>

<body>

<div class='container'>
    <div class="d-flex align-items-center flex-column justify-content-center h-100 bg-dark text-white" id="header">
        <h1 class="display-4">Welcome!</h1>
        <div class="alert alert-error"></div>
        <form class="form" action="signup.html" method="post" enctype="multipart/form-data" autocomplete="off">
            <div class="form-group">
                <input class="form-control form-control-lg" placeholder="Email Address" type="text" required/>
            </div>
            <div class="form-group">
                <input class="form-control form-control-lg" placeholder="Username" type="text" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control form control-lg" id="exampleInputPassword1" placeholder="Password" type="text" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control form control-lg" id="exampleInputConfirm" placeholder="Confirm Password" type="text" required/>
            </div>
                <input type="submit" value = "Register" name="register" class="btn btn-info btn-lg btn-block" value="Sign Up"/>
            <!--<input type="submit" value = "Register" name="register" class="btn btn-info btn-lg btn-block" value="Sign Up" onclick="location.href = 'login.html';"/>-->
        </form>
    </div>

    <!--<div class="container" id="content">-->
    <!--<div class="row h-100 mt-5">-->
    <!--<main class="col-md-6">-->
    <!--<h1>Content...</h1>-->
    <!--</main>-->
    <!--</div>-->
    <!--</div>-->

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

</body>

</html>
?>