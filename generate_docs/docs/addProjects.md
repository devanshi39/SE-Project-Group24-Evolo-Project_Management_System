# Add a new Project

We can add a new project on the dashboard simply by clicking on the new project button on the sidebar. 
And filling thew new project form. We can select the title and desciption of the project and the user creating thr project is assigned leader of that project.

Submitting the form send a ```POST``` request to our Database and inserts the data into 'project' table.

Who can create new projects?

```php
if(isset($_POST["submit_new_project"]))
    {
        $stmt="Insert into project(title,leader_id,organization,startdate) values(:title,:leader,:organ,:date)";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array(
            "title"=>$_POST["project_title"],
            "leader"=>$_SESSION["u_id"],
            "organ"=>$_POST["organization"],
            "date"=>gmdate('Y\-m\-d')
        ));
        $last_id=$pdo->lastInsertId();
        $stmt="Insert into works(u_id,p_id) values(".$_SESSION['u_id'].",".$last_id.")";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array());
    }
```