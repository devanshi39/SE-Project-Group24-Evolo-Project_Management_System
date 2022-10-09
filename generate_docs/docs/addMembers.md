# Add a new Member to a project

Multiple members can be added to a particular project. The leader of a project can add members to it by specifying there email ids. The email of the user needs to be an already existing one that is the user should have an account with evolo. 

A ```POST``` request to our Database add inserts the user id and the project id assocaited with it to the works table.



```php
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
```