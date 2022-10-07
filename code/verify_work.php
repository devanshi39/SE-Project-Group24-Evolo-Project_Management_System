<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_accept_form"]))
    {
        $stmt="update tasks set stat=2 where t_id=:t";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["t_id"]
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    if(isset($_POST["submit_reject_form"]))
    {
        $stmt="update tasks set work=:w,stat=0 where t_id=:t";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["t_id"],
            "w"=>""
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>