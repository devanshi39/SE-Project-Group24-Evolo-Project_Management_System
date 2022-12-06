# Delete a Task

Various tasks can be assigned to the project memebrs, with a deadline. Submitted tasks can be checked and reviews can be directly conveyed to the team members using this platform. The assigned tasks will be visbile to all the members assigned t this task on there dashboard respectively.

```js
exports.deleteTask = (req, res) => {
  const { taskID } = req.params;

  Task.findByIdAndDelete(taskID)
    .exec()
    .then((project) => {
      res.send(project);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
```