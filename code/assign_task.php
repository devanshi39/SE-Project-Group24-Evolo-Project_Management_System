<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_task_form"]))
    {
        $stmt="Insert into tasks(task_name,description,stat,deadline,u_id,p_id) values(:t,:d,:s,:de,:u,:p)";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["title"],
            "d"=>$_POST["description"],
            "s"=>0,
            "de"=>$_POST["deadline"],
            "u"=>$_POST["uid"],
            "p"=>$_POST["project_id"]
        ));
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>
