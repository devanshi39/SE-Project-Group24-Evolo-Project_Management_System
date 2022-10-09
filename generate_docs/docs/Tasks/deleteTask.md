# Delete Tasks

Various tasks can be assigned to the project memebrs, with a deadline.
Submitted tasks can be checked and reviews can be directly conveyed to the team members using this platform.
The assigned tasks will be visbile to all the members assigned t this task on there dashboard respectively. 

A 'post' request ```$_POST(["submit_task_form"])``` will be send to the database creating a new entry in the tasks table .

```php
if(isset($_POST["submit_delete_task_form"]))
    {
        $stmt="delete from tasks where t_id=:t and p_id=:p";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "t"=>$_POST["tid"],
            "p"=>$_POST["project_id"]
        ));
```