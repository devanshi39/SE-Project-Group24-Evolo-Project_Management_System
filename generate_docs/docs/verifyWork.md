# Verify the project work

The leader of a project can verify the project work submitted by the various group members.When a work has been verified by the leader it is represented with a green color in the tasks table. The leader can also reject the work submitted by a team member and ask to make changes in the same. The respective member will be notified the same as well.

It will send a ```POST``` request to our Database and update the ```stat``` in the tasks table.

```php
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
```