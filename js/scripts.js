function show_new_project()
{
    var bg=document.getElementById("new_project_form");
    bg.style.display="inline";
    return false;
}
function close_project_form()
{
    var bg=document.getElementById("new_project_form");
    bg.style.display="none";
    return false;
}
function show_new_member()
{
    var bg=document.getElementById("new_member_form");
    bg.style.display="inline";
    return false;
}
function close_member_form()
{
    var bg=document.getElementById("new_member_form");
    bg.style.display="none";
    return false;
}
function show_new_task()
{
    var bg=document.getElementById("new_task_form");
    bg.style.display="inline";
    return false;
}
function close_task_form()
{
    var bg=document.getElementById("new_task_form");
    bg.style.display="none";
    return false;
}
function show_submit_work(t_id)
{
    document.getElementById("t_id_work").value=t_id;
    var bg=document.getElementById("new_submit_form");
    bg.style.display="inline";
    return false;
}
function close_submit_form()
{
    var bg=document.getElementById("new_submit_form");
    bg.style.display="none";
    return false;
}
function show_verify_work(t_id,work)
{
    console.log(t_id);
    document.getElementById("t_id_verify").value=t_id;
    document.getElementById("work_verification").innerHTML="<a href="+work+">Click</a>";
    var bg=document.getElementById("new_verify_form");
    bg.style.display="inline";
    return false;
}
function close_verify_form()
{
    var bg=document.getElementById("new_verify_form");
    bg.style.display="none";
    return false;
}
function show_remove_member()
{
    var bg=document.getElementById("remove_member_form");
    bg.style.display="inline";
    return false;
}
function close_remove_member_form()
{
    var bg=document.getElementById("remove_member_form");
    bg.style.display="none";
    return false;
}
function show_delete_task()
{
    var bg=document.getElementById("delete_task_form");
    bg.style.display="inline";
    return false;
}
function close_delete_task_form()
{
    var bg=document.getElementById("delete_task_form");
    bg.style.display="none";
    return false;
}