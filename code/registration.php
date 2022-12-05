<?php
require_once "pdo.php";
session_start();
if(isset($_POST["cancel"])){
    header("Location: index.php");
    return;
}

$name = trim($_POST['name']);    
$email = trim($_POST['email']);
$pass = $_POST['password'];
$uppercase = preg_match('@[A-Z]@', $pass);
$lowercase = preg_match('@[a-z]@', $pass);
$number    = preg_match('@[0-9]@', $pass);
$specialChars = preg_match('@[^\w]@', $pass);

if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($pass) < 8) {
    echo '<script type="text/javascript">
        window.alert("Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.");
        history.back();
        </script>';

}
else
{
    echo 'Strong password.';

$pass = hash('sha256',$pass);
$contact = trim($_POST['contact']);
if($contact=="")
{
    $contact=0;
}

$stmt =$pdo->prepare("select * from user_db where email =:email");
$stmt->execute(array("email"=>$email));
$row=$stmt->fetchALL(PDO::FETCH_ASSOC);
if(sizeof($row)==1){
    #" Email already in use.";
    header('Location:login.php');
    return;
}
else{
    $reg="insert into user_db (name, email, password, contact) values(:n,:e,:p,:c)";
    $stmt=$pdo->prepare($reg);
    $stmt->execute(array(
    "n"=>$name,
    "e"=>$email,
    "p"=>$pass,
    "c"=>$contact
    ));
    header("Location:login.php");
    return;
}
}
