import React, { useState } from 'react';
import { close_submit_form } from '../../utils';

export const SubmitForm = ({ task, handleTaskRefresh }) => {
  const [work, setWork] = useState('');

  return (
    <div id="new_submit_form">
      <button id="close_submit_form" onClick={close_submit_form}>
        X
      </button>
      <div id="submit_form">
        <h4>Submit work</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            fetch(`http://localhost:5000/task/${task._id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                status: 'submitted',
                work,
              }),
            })
              .then((res) => res.json())
              .then((_data) => {
                if (_data.error) {
                  alert(_data.error);
                  return;
                }
                close_submit_form();
                setWork('');
                handleTaskRefresh();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <div class="form-group">
            <label>Work Link: </label>
            <input onChange={(e) => setWork(e.target.value)} type="text" name="work" class="form-control" />
          </div>
          <div class="form-group">
            <input type="hidden" name="t_id" id="t_id_work" />
          </div>
          <div class="form-group">
            <input type="hidden" name="project_id" value="" />
          </div>

          <button type="submit" class="btn btn-primary form-btn" name="submit_submit_form">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
