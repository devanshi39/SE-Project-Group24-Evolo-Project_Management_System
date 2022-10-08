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
