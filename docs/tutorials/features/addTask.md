# Add Task

User can add a task and enter details like the assignee, organisation is taken as selected by the user, decsription of the task, deadline. Front-end then makes a call to the back-end which makes a database call and adds the data in the database.

```jsx
exports.getTask = (req, res) => {
  const { taskID } = req.params;

  Task.findById(taskID)
    .populate('assignees', 'name email')
    .populate({
      path: 'project',
      select: 'name organisation',
      populate: { path: 'organisation', select: 'name' },
    })
    .exec((err, task) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      if (!task) {
        return res.status(400).send({ error: 'Task not found' });
      }

      res.send(task);
    });
};
```