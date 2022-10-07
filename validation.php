<?php
require_once "pdo.php";
session_start();
if(isset($_POST["cancel"])){
    header("Location: index.php");
    return;
}
    
$email = trim($_POST['email']);
$pass = $_POST['password']; 

$stmt = "select * from user_db where email =:email";
$stmt=$pdo->prepare($stmt);
$stmt->execute(array("email"=>$email));
$row=$stmt->fetchALL(PDO::FETCH_ASSOC);
if(sizeof($row)==0 || $row[0]["password"]!==$pass)
{
    header("Location: login.php");
    return;
}
else{
    $_SESSION["name"]=$row[0]["name"];
    $_SESSION["u_id"]=$row[0]["u_id"];
    header('location:index.php');
    return;
}