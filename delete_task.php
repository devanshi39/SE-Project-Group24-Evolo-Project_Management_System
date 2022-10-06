<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_delete_task_form"]))
    {
        $stmt="delete from tasks where t_id=:t and p_id=:p";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["tid"],
            "p"=>$_POST["project_id"]
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>
