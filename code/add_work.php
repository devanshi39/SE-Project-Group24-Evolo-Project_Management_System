<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_submit_form"]))
    {
        $stmt="update tasks set work=:w,stat=1 where t_id=:t";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["t_id"],
            "w"=>$_POST["work"]
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>