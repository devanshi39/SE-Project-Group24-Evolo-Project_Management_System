<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_remove_member_form"]))
    {
        $stmt="delete from works where u_id=:u and p_id=:p";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "u"=>$_POST["uid"],
            "p"=>$_POST["project_id"]
        ));
        $stmt="delete from tasks where u_id=:u and p_id=:p";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "u"=>$_POST["uid"],
            "p"=>$_POST["project_id"]
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>