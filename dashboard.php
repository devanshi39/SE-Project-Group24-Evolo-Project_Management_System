<?php
    session_start();
    require_once "pdo.php";
    if(!isset($_SESSION["name"]))
    {
        $_SESSION["error"]="You need to login first";
        header("Location: login.php");
        return;
    }
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
    
    $stmt="Select * from works JOIN project where works.p_id=project.p_id and works.u_id=:user";
    $stmt=$pdo->prepare($stmt);
    $stmt->execute(array(
        "user"=>$_SESSION["u_id"]
    ));
    $row=$stmt->fetchALL(PDO::FETCH_ASSOC);
    $size_row=count($row);
    $project=array();
    $txt="";
    for($i=0;$i<$size_row;$i++)
    {
        $project[$row[$i]["p_id"]]=$row[$i]["title"];
    }
    $project_details=array();
    $works=array();
    $members=array();
    $project_details["avail"]=false;
    if(isset($_GET["projectid"]))
    {
        $project_details["u_id"]=$_SESSION["u_id"];
        $project_details["captain"]=false;
        $project_details["avail"]=true;
        $stmt="Select p_id,title,leader_id,startdate,organization,Description from project where p_id=:pid";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array("pid"=>$_GET["projectid"]));
        $row=$stmt->fetchALL(PDO::FETCH_ASSOC);
        $size_row=count($row);
        for($i=0;$i<$size_row;$i++)
        {
            $project_details["p_id"]=$row[$i]["p_id"];
            $project_details["title"]=$row[$i]["title"];
            $project_details["leader_id"]=$row[$i]["leader_id"];
            $project_details["startdate"]=$row[$i]["startdate"];
            $project_details["organization"]=$row[$i]["organization"];
            $project_details["Description"]=$row[$i]["Description"];
        }
        if($project_details["leader_id"]==$_SESSION["u_id"])
            $project_details["captain"]=true;
        $stmt="Select work.u_id as u_id,name,t_id,task_name,description,stat,deadline,work FROM (SELECT works.u_id as u_id,name,p_id FROM works JOIN user_db on works.u_id=user_db.u_id where p_id=:project) as work LEFT OUTER JOIN tasks ON work.u_id=tasks.u_id and work.p_id=tasks.p_id ORDER BY work.u_id";
        #$stmt="Select works.u_id as u_id,name FROM works JOIN user_db ON works.u_id=user_db.u_id where works.p_id=:project";
        $stmt=$pdo->prepare($stmt);
        $stmt->execute(array("project"=>$project_details["p_id"]));
        $row=$stmt->fetchALL(PDO::FETCH_ASSOC);
        $size_row=count($row);
        for($i=0;$i<$size_row;$i++)
        {
            $works[$i]=array();
            $works[$i]["u_id"]=$row[$i]["u_id"];
            $works[$i]["name"]=$row[$i]["name"];
            $works[$i]["t_id"]=$row[$i]["t_id"];
            $works[$i]["task"]=$row[$i]["task_name"];
            $works[$i]["description"]=$row[$i]["description"];
            $works[$i]["status"]=$row[$i]["stat"];
            $works[$i]["deadline"]=$row[$i]["deadline"];
            $works[$i]["work"]=$row[$i]["work"];
            $members[$row[$i]["u_id"]]=$row[$i]["name"];
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dashboard</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/styles.css?x=13">
        <link rel="stylesheet" href="css/dash_style.css?x=1ac">
    </head>
    <body><!-- Navigation -->
        <nav class="navbar navbar-expand-sm navbar-light navbar-custom">
            <a class="navbar-brand logo-image" href="index.php"><img src="images/logo.svg" alt="alternative" class="logo-img"></a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarsExampleDefault">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="index.php">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="logout.php">Logout</a>
                    </li>
                    <!-- Dropdown Menu -->          
                    <!--<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#"><span class="item-text">Terms Conditions</span></a>
                            <div class="dropdown-items-divide-hr"></div>
                            <a class="dropdown-item" href="#"><span class="item-text">Privacy Policy</span></a>
                        </div>
                    </li>-->
                    <!-- end of dropdown menu -->
            </ul>
            </div>
        </nav> <!-- end of navbar -->
        <div class="container-fluid">
            <div class="row">
                <div class="sidebar">
                    <!--div class="logo">
                        <a href="index.php">
                            <img src="images/logo.svg" alt="logo" class="sidebar-logo">
                        </a>
                    </div>
                    <hr>-->
                    <div class="sidebar-menu">
                        <p class="menu-head">
                            PROJECTS
                        </p>
                        <ul id="project_list" >
                        </ul>
                        <div class="new_project_div">
                            <button class="new_project_btn" onclick="return show_new_project();">New Project</button>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div id="project_detail">
                        
                    </div>
                </div>
            </div>
        </div>
        
        <div id="new_project_form">
            <button id="close_project_form" onclick="return close_project_form();">X</button>
            <div id="project_form">
                <h4>Add New Project</h4>
                <form method="post">
                    <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" name="project_title" class="form-control">
                    </div>
                
                    <div class="form-group">
                    <label>Organization</label>
                    <input type="text" name="organization" class="form-control">
                    </div>

                    <button type="submit" class="btn btn-primary form-btn" name="submit_new_project">Submit</button> 
                </form>
            </div>
        </div>
        <div id="new_member_form">
            <button id="close_member_form" onclick="return close_member_form();">X</button>
            <div id="member_form">
                <h4>Add New Member</h4>
                <form method="post" action="add_member.php">
                    <div class="form-group">
                    <label>Email id:</label>
                    <input type="text" name="email" class="form-control">
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>
                    
                    <button type="submit" class="btn btn-primary form-btn" name="submit_member_form">Add Member</button> 
                </form>
            </div>
        </div>
        <div id="new_task_form">
            <button id="close_task_form" onclick="return close_task_form();">X</button>
            <div id="task_form">
                <h4>Assign Task</h4>
                <form method="post" action="assign_task.php">
                    <div class="form-group">
                    <label>Member:</label>
                    <select name="uid" class="form-control">
                        <option value="select">Select</option>
                        <?php
                            if($project_details["avail"]===true)
                            {
                                foreach($members as $i=>$n)
                                    echo "<option value=".$i.">".$n."</option>";
                            }
                        ?>
                    </select>
                    </div>
                    <div class="form-group">
                    <label>Task Name:</label>
                    <input type="text" name="title" class="form-control">
                    </div>
                    <div class="form-group">
                    <label>Description:</label>
                    <textarea name="description" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                    <label>Deadline:</label>
                    <input type="date" name="deadline" class="form-control">
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>
                    
                    <button type="submit" class="btn btn-primary form-btn" name="submit_task_form">Assign</button> 
                </form>
            </div>
        </div>
        <div id="remove_member_form">
            <button id="close_remove_member_form" onclick="return close_remove_member_form();">X</button>
            <div id="r_member_form">
                <h4>Remove member</h4>
                <form method="post" action="remove_member.php">
                    <div class="form-group">
                    <label>Member:</label>
                    <select name="uid" class="form-control">
                        <option value="select">Select</option>
                        <?php
                            if($project_details["avail"]===true)
                            {
                                foreach($members as $i=>$n)
                                    if($project_details["leader_id"]!=$i)
                                        echo "<option value=".$i.">".$n."</option>";
                            }
                        ?>
                    </select>
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>
                    
                    <button type="submit" class="btn btn-primary form-btn" name="submit_remove_member_form">Remove</button> 
                </form>
            </div>
        </div>
        <div id="delete_task_form">
            <button id="close_delete_task_form" onclick="return close_delete_task_form();">X</button>
            <div id="d_task_form">
                <h4>Delete Task</h4>
                <form method="post" action="delete_task.php">
                    <div class="form-group">
                    <label>Task:</label>
                    <select name="tid" class="form-control">
                        <option value="select">Select</option>
                        <?php
                            if($project_details["avail"]===true)
                            {
                                $size=count($works);
                                for($i=0;$i<$size;$i++)
                                    echo "<option value=".$works[$i]["t_id"].">".$works[$i]["task"]."</option>";
                            }
                        ?>
                    </select>
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>
                    
                    <button type="submit" class="btn btn-primary form-btn" name="submit_delete_task_form">Delete</button> 
                </form>
            </div>
        </div>
        <div id="new_submit_form">
            <button id="close_submit_form" onclick="return close_submit_form();">X</button>
            <div id="submit_form">
                <h4>Submit work</h4>
                <form method="post" action="add_work.php">
                    <div class="form-group">
                    <label>Work Link: </label>
                    <input type="text" name="work" class="form-control">
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="t_id" id="t_id_work"> 
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>

                    <button type="submit" class="btn btn-primary form-btn" name="submit_submit_form">Submit</button> 
                </form>
            </div>
        </div>
        <div id="new_verify_form">
            <button id="close_verify_form" onclick="return close_verify_form();">X</button>
            <div id="verify_form">
                <h4>Verify work</h4>
                <form method="post" action="verify_work.php">
                    <div class="form-group">
                    <label>Work : </label>
                    <p id="work_verification">
                    </p>
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="t_id" id="t_id_verify"> 
                    </div>
                    <div class="form-group">
                    <input type="hidden" name="project_id" value=<?=$_GET["projectid"]?>>
                    </div>

                    <button type="submit" class="btn btn-primary form-btn" name="submit_accept_form">Accept</button> 
                    <button type="submit" class="btn btn-primary form-btn" name="submit_reject_form">Reject</button> 
                </form>
            </div>
        </div>
        
    </body>
    <script>
        project_names=<?=json_encode($project)?>;
        txt="";
        for (x in project_names)
        {
            txt+="<li id="+x+"><a href='dashboard.php?projectid="+x+"'>"+project_names[x]+"</a></li>";
        }
        document.getElementById('project_list').innerHTML=txt;
    
        project_det=<?=json_encode($project_details)?>;
        if(project_det["avail"]===true)
        {
            members=<?=json_encode($works)?>;
            txt="";
            txt+="<div class='dash_header'><h2 class='project_name'>"+project_det["title"]+"</h2>";
            txt+="<h5 class='project_organization'> - "+project_det["organization"]+"</h5></div>";
            if(project_det["captain"]===true)
            {
                txt+="<button class='dash_button button_left' onclick='return show_new_member();'>Add New Member</button>";
                txt+="<button class='dash_button button_right' onclick='return show_new_task();'>Assign Task</button>";
            }
            txt+=`
                <table class='dash_table'>
                    <tr class="dash_table_header">
                        <th>Members</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Work</th>`;
                txt+='<th>Verify</th>';
            txt+="</tr>";
            for(x in members)
            {
                txt+="<tr";
                if(members[x]["u_id"]==project_det["u_id"])
                {
                    if(members[x]["task"]!=null && members[x]["status"]==0)
                        txt+=" class='my_task_to_do' ";
                    else if(members[x]["task"]!=null && members[x]["status"]==1)
                        txt+=" class='my_task_in_verification' ";
                    else if(members[x]["task"]!=null && members[x]["status"]==2)
                        txt+=" class='my_task_completed' ";
                }
                txt+=">";
                txt+="<td>"+members[x]["name"]+"</td>";

                //Task
                if(members[x]["task"]==null)
                    txt+="<td>-</td>";
                else
                    txt+="<td>"+members[x]["task"]+"</td>";

                //Description
                if(members[x]["description"]==null)
                    txt+="<td>-</td>";
                else
                    txt+="<td class='descrip'>"+members[x]["description"]+"</td>";
                
                //Status
                if(members[x]["status"]==0)
                    txt+="<td class='to_do'>To Do</td>";
                else if(members[x]["status"]==1)
                    txt+="<td class='in_verification'>Submitted</td>";
                else if(members[x]["status"]==2)
                    txt+="<td class='verified'>Done!</td>";
                else
                    txt+="<td>-</td>";

                //Deadline
                if(members[x]["deadline"]==null)
                    txt+="<td>-</td>";
                else
                    txt+="<td>"+members[x]["deadline"]+"</td>";

                //Work
                if(members[x]["u_id"]==project_det["u_id"] && members[x]["task"]!=null && members[x]["status"]==0)
                    txt+="<td><button class='dash_submit_button' onclick='return show_submit_work("+members[x]["t_id"]+");'>Submit Work</button></td>";
                else if(members[x]["task"]!=null && members[x]["status"]!=0)
                    txt+="<td><a href='"+members[x]['work']+"'><u><i>Work</i></u></a></td>";
                else
                    txt+="<td>-</td>";
                
                //Verify
                if(project_det["captain"] && members[x]["status"]==1)
                    txt+="<td><button class='dash_submit_button' onclick='return show_verify_work("+members[x]["t_id"]+",\""+members[x]['work']+"\");'>Verify Work</button></td>";
                else if(members[x]["status"]==2)
                    txt+="<td>Verified</td>"
                else if(members[x]["status"]==1)
                    txt+="<td>Not verified</td>"
                else 
                    txt+="<td>-</td>"
                
                txt+="</tr>";
            }
            txt+=`</table>`;
            if(project_det["captain"]===true)
            {
                txt+="<button class='dash_button button_left' onclick='return show_remove_member();'>Remove Member</button>";
                txt+="<button class='dash_button button_right' onclick='return show_delete_task();'>Delete Task</button>";
            }
            document.getElementById("project_detail").innerHTML=txt;
        }
        else
        {
            txt="<h5>No project selected</h5>";
            document.getElementById("project_detail").innerHTML=txt;
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js?z=wf"></script>
</html>