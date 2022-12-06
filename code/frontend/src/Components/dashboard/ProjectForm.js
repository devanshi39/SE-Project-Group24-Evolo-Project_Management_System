import React, { useState } from 'react';
import {
  close_delete_task_form,
  close_member_form,
  close_project_form,
  close_remove_member_form,
  close_submit_form,
  close_task_form,
  close_verify_form,
  show_new_project,
} from '../../utils';

export const ProjectForm = ({ organisation, handleProjRefresh }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: title,
        organisation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        // console.log(data);
        close_project_form();
        handleProjRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="new_project_form">
      <button id="close_project_form" onClick={close_project_form}>
        X
      </button>
      <div id="project_form">
        <h4>Add New Project</h4>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Project Title</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="project_title"
              class="form-control"
            />
          </div>

          <button type="submit" class="btn btn-primary form-btn" name="submit_new_project">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
