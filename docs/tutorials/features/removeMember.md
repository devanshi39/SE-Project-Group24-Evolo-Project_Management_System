# Remove a Member from a project

Multiple members can be removed from any project. The leader of a project can remove members by specifying their email ids. The email of the user needs to be an already existing one, that is the user should have an account with Evolo.


```js
exports.removeMember = (req, res) => {
  const { projectID, userID } = req.params;

  Project.findById(projectID)
    .exec()
    .then((project) => {
      if (project.members.length === 1) {
        return res.status(400).send({ error: 'Project needs atleast 1 member' });
      }

      if (project.leader.toString() === userID) {
        return res.status(400).send({ error: 'You cannot remove the leader of the project' });
      }

      let tmp = project.members.map((arr) => arr.toString());

      const idx = tmp.indexOf(userID);
      tmp.splice(idx, 1);

      project.members = tmp;

      project.save((err, project) => {
        if (err) {
          return res.status(400).send({
            error: err,
          });
        }
        res.status(200).send(project);
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
```