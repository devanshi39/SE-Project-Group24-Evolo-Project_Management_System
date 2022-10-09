# Add work to a task

Any member can add there works for a task by submitting the work links. 
This work will be visible to all the memebrs of the project and the leader for reviewing.

A ```POST``` request is send to update the work attribute in the tasks table and set the status of the task as in progress. 


```php
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
```