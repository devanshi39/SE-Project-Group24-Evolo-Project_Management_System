import React, { useEffect, useState } from 'react';
import {
  close_delete_task_form,
  close_member_form,
  close_project_form,
  close_remove_member_form,
  close_submit_form,
  close_task_form,
  close_verify_form,
  show_new_member,
  show_new_org,
  show_new_project,
} from '../../utils';

const RemoveMember = ({ organisation, project, handleProjRefresh }) => {
  const [memberSelected, setMemberSelected] = useState('none');
  return (
    <div id="remove_member_form">
      <button id="close_remove_member_form" onClick={close_remove_member_form}>
        X
      </button>
      <div id="r_member_form">
        <h4>Remove Member</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`http://localhost:5000/project/member/remove/${project._id}/${memberSelected}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
              .then((res) => res.json())
              .then((_data) => {
                if (_data.error) {
                  alert(_data.error);
                  return;
                }
                close_remove_member_form();
                setMemberSelected(null);
                handleProjRefresh();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <div class="form-group">
            <label>Member:</label>
            <select
              name="user"
              class="form-control"
              id="remove_member_user"
              defaultValue={'none'}
              onChange={(e) => {
                setMemberSelected(e.target.value);
              }}
            >
              <option value={'none'} selected disabled hidden>
                Select an Option
              </option>
              {organisation &&
                project &&
                project.members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} | {member.email}
                  </option>
                ))}
            </select>
          </div>
          <div class="form-group">
            <input type="hidden" name="project_id" value="" />
          </div>

          <button type="submit" class="btn btn-primary form-btn" name="submit_remove_member_form">
            Remove Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveMember;
