import React, { useState } from 'react';
import { close_org_form } from '../../utils';

export const OrgForm = ({ handleOrgRefresh }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/organisation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        console.log(data);
        close_org_form();
        handleOrgRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="new_org_form">
      <button id="close_org_form" onClick={close_org_form}>
        X
      </button>
      <div id="org_form">
        <h4>Add New Organisation</h4>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="org_title"
              class="form-control"
            />
          </div>

          <button type="submit" class="btn btn-primary form-btn" name="submit_new_org">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
