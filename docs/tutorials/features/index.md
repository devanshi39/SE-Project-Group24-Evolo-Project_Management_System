# Add a Project

We can add a new project on the dashboard simply by clicking on the new project button on the sidebar. And filling thew new project form. We can select the title and desciption of the project and the user creating thr project is assigned leader of that project.

Submitting the form send a POST request to our Database and inserts the data into 'project' table.

Who can create new projects?

```jsx
const AddMember = ({ organisation, project, handleOrgRefresh }) => {
  const [memberSelected, setMemberSelected] = useState("none");
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

            memberSelected === "none" && alert("You have not selected a user");

            memberSelected !== "none" &&
              fetch(
                `http://localhost:5000/project/member/add/${project._id}/${memberSelected}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
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
              <option value={"none"}>Select an Option</option>
              {organisation &&
                project &&
                organisation.members
                  .filter(
                    (leftValue) =>
                      !project.members.some(
                        (rightValue) => leftValue._id === rightValue._id
                      )
                  )
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

          <button
            type="submit"
            class="btn btn-primary form-btn"
            name="submit_member_form"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};
```
