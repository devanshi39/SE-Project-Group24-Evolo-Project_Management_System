# Add a new Member to a project

Multiple members can be added to a particular project. The leader of a project can add members to it by specifying there email ids. The email of the user needs to be an already existing one that is the user should have an account with evolo.

A POST request to our Database add inserts the user id and the project id assocaited with it to the works table.

```jsx
const AddMember = ({ organisation, project, handleOrgRefresh }) => {
  const [memberSelected, setMemberSelected] = useState('none');
  return (
    <div id="new_member_form">
      <button id="close_member_form" onClick={close_member_form}>
        X
      </button>
      <div id="member_form">
        <h4>Add New Member</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            memberSelected === 'none' && alert('You have not selected a user');

            memberSelected !== 'none' &&
              fetch(`http://localhost:5000/project/member/add/${project._id}/${memberSelected}`, {
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
                  close_member_form();
                  setMemberSelected(null);
                  handleOrgRefresh();
                })
                .catch((error) => {
                  console.log(error);
                });
          }}
        >
          <div class="form-group">
            <label>User:</label>
            <select
              name="user"
              class="form-control"
              id="add_member_user"
              defaultValue="none"
              onChange={(e) => {
                setMemberSelected(e.target.value);
              }}
            >
              <option value={'none'}>Select an Option</option>
              {organisation &&
                project &&
                organisation.members
                  .filter((leftValue) => !project.members.some((rightValue) => leftValue._id === rightValue._id))
                  .map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} | {member.email}
                    </option>
                  ))}
            </select>
          </div>
          <div class="form-group">
            <input type="hidden" name="project_id" value="" />
          </div>

          <button type="submit" class="btn btn-primary form-btn" name="submit_member_form">
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};
```