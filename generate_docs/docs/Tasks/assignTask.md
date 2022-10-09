# Assign Tasks

Various tasks can be assigned to the project memebrs, with a deadline.
Submitted tasks can be checked and reviews can be directly conveyed to the team members using this platform.
The assigned tasks will be visbile to all the members assigned to this task on there dashboard respectively. 

A 'post' request ```$_POST(["submit_task_form"])``` will be send to the database creating a new entry in the tasks table .

```php
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
```