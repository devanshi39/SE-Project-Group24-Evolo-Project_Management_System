import '../css/styles.css';
import '../css/dash_style.css';
import {
  close_delete_task_form,
  close_member_form,
  close_project_form,
  close_remove_member_form,
  close_submit_form,
  close_task_form,
  close_verify_form,
  show_delete_task,
  show_new_member,
  show_new_org,
  show_new_project,
  show_new_task,
  show_reassign_task,
  show_remove_member,
  show_submit_work,
  show_verify_work,
} from '../utils';
import { ProjectForm } from './dashboard/ProjectForm';
import { useEffect, useState } from 'react';
import { OrgForm } from './dashboard/OrgForm';
import AddMember from './dashboard/AddMember';
import RemoveMember from './dashboard/RemoveMember';
import { AddTask } from './dashboard/AddTask';
import { SubmitForm } from './dashboard/SubmitForm';
import VerifyWork from './dashboard/VerifyWork';
// import { Reassign } from './dashboard/Reassign';

const Dashboard = () => {
  const [organisations, setOrganisations] = useState([]);
  const [organisationSelected, setOrganisationsSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectSelected, setProjectsSelected] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskSelected, setTaskSelected] = useState(null);

  const getColor = (status) => {
    const color = {
      verified: '#aad3b1',
      submitted: '#1ba6c2',
      reassigned: '#e03a4e',
      assigned: '#f5f5f5',
      created: '#f5f5f5',
    };
    return color[status];
  };

  const fetchTask = () =>
    organisationSelected &&
    projectSelected &&
    fetch('http://localhost:5000/task/all/' + projectSelected._id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        setTasks(data);
        setTaskSelected(data.find((task) => task._id == taskSelected?._id));
      })
      .catch((error) => {
        console.log(error);
      });

  const fetchProj = () =>
    organisationSelected &&
    fetch('http://localhost:5000/project/user/list/' + organisationSelected._id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        setProjects(data);
        setProjectsSelected(data.find((project) => project._id == projectSelected?._id));
      })
      .catch((error) => {
        console.log(error);
      });

  const fetchOrg = async () => {
    fetch('http://localhost:5000/organisation/user/list', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        // console.log(data);
        setOrganisations(data);
        setOrganisationsSelected(data.find((org) => org._id == organisationSelected?._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOrg();
    // const orgSync = setInterval(() => {
    //   fetchOrg();
    // }, 15000);
    return () => {
      // clearInterval(orgSync);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProj();
    return () => {};
    // eslint-disable-next-line
  }, [organisationSelected]);

  useEffect(() => {
    fetchTask();
    return () => {};
    // eslint-disable-next-line
  }, [projectSelected]);

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="sidebar">
            <div class="sidebar-menu">
              <p class="menu-head">ORGANISATIONS</p>
              <ul id="org_list">
                {organisations.map((organisation) => {
                  return (
                    <li
                      onClick={() => {
                        setOrganisationsSelected(organisation);
                      }}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          organisationSelected && organisation._id === organisationSelected._id
                            ? 'rgba(232,240,251,0.2)'
                            : '',
                      }}
                      key={organisation._id}
                    >
                      {organisation.name}
                    </li>
                  );
                })}
              </ul>
              <div class="new_org_div">
                <button class="new_project_btn" style={{ width: '7vw' }} onClick={show_new_org}>
                  New Org
                </button>
              </div>
              <p class="menu-head">PROJECTS</p>
              <ul id="project_list">
                {projects.map((project) => {
                  return (
                    <li
                      onClick={() => {
                        setProjectsSelected(project);
                      }}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          projectSelected && project._id === projectSelected._id ? 'rgba(232,240,251,0.2)' : '',
                      }}
                      key={project._id}
                    >
                      {project.name}
                    </li>
                  );
                })}
              </ul>
              <div class="new_project_div">
                <button class="new_project_btn" style={{ width: '7vw', left: '9vw' }} onClick={show_new_project}>
                  New Project
                </button>
              </div>
            </div>
          </div>
          <div class="content">
            <div id="project_detail">
              {projectSelected ? (
                <>
                  <div class="dash_header">
                    <h2 class="project_name">{projectSelected.name}</h2>
                    <h5 class="project_organization"> - {projectSelected.organisation.name}</h5>
                  </div>
                  <button class="dash_button button_left" onClick={show_new_member}>
                    Add New Member
                  </button>
                  {/* <button
                    class="dash_button"
                    style={{ float: 'right', marginRight: '15vw' }}
                    onClick={() => {
                      if (!taskSelected) {
                        alert('Select a task first');
                        return;
                      }
                      show_reassign_task();
                    }}
                  >
                    Reassign Task
                  </button> */}
                  <button class="dash_button " style={{ float: 'right', marginRight: '15vw' }} onClick={show_new_task}>
                    Assign Task
                  </button>
                  <table class="dash_table">
                    <tbody>
                      <tr class="dash_table_header">
                        <th>Members</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Work</th>
                        <th>Verify</th>
                      </tr>
                      {tasks &&
                        tasks.map((task) => {
                          const assigneesNames = task.assignees?.map((m) => {
                            return m.name;
                          });
                          return (
                            <tr
                              class="my_task_to_do"
                              onClick={() => {
                                setTaskSelected(task);
                              }}
                              style={{
                                cursor: 'pointer',
                                backgroundColor:
                                  taskSelected && task._id === taskSelected._id ? '#fffaa0' : getColor(task.status),
                              }}
                            >
                              <td>{assigneesNames.join(',')}</td>
                              <td>{task.name}</td>
                              <td>{task.description}</td>
                              <td>{task.status}</td>
                              <td>{new Date(task.deadline).toDateString()}</td>
                              <td>
                                {task.work}
                                <br />
                                <button onClick={show_submit_work} class="dash_submit_button">
                                  Submit Work
                                </button>
                              </td>
                              <td>
                                {task?.work && (
                                  <button onClick={show_verify_work} class="dash_submit_button">
                                    Verify
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <button class="dash_button button_left" onClick={show_remove_member}>
                    Remove Member
                  </button>
                  <button
                    class="dash_button button_right"
                    onClick={() => {
                      if (!taskSelected) {
                        alert('You have not selected any task');
                        return;
                      }

                      window.confirm('Are you sure you want to delete it?') &&
                        fetch('http://localhost:5000/task/' + taskSelected._id, {
                          method: 'DELETE',
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            // console.log(data);
                            if (data.error) {
                              alert(data.error);
                              return;
                            }
                            setTaskSelected(null);
                            fetchTask();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                    }}
                  >
                    Delete Task
                  </button>
                </>
              ) : (
                <h5>No project selected</h5>
              )}
            </div>
          </div>
        </div>
      </div>
      <OrgForm handleOrgRefresh={fetchOrg} />
      <ProjectForm handleProjRefresh={fetchProj} organisation={organisationSelected?._id} />
      <AddMember organisation={organisationSelected} project={projectSelected} handleOrgRefresh={fetchOrg} />
      <AddTask project={projectSelected} handleTaskRefresh={fetchTask} />
      {/* <Reassign
        project={projectSelected}
        task={taskSelected}
        handleTaskRefresh={fetchTask}
        handleProjRefresh={fetchProj}
      /> */}
      <RemoveMember organisation={organisationSelected} project={projectSelected} handleProjRefresh={fetchProj} />
      <SubmitForm task={taskSelected} handleTaskRefresh={fetchTask} />
      <VerifyWork task={taskSelected} handleTaskRefresh={fetchTask} />
    </>
  );
};

export default Dashboard;
