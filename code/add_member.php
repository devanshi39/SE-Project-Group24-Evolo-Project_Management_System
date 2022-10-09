<?php
    //session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
    if(isset($_POST["submit_member_form"]))
    {
        $stmt="SELECT u_id,name from user_db where email=:email";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array("email"=>$_POST["email"]));
        $row=$stmt->fetchALL(PDO::FETCH_ASSOC);
        if(sizeof($row)==1)
        {
            $stmt="Insert into works(u_id,p_id) values(:u,:p)";
            $stmt=$pdo->prepare($stmt);
            $stmt->execute(array(
                "u"=>$row[0]["u_id"],
                "p"=>$_POST["project_id"]
            ));
        }
        header("Location: dashboard.php?projectid=".$_POST["project_id"]);
        return;
    }
    header("Location: index.php");
    return;
?>