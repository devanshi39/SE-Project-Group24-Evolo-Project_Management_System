const Task = require("../models/Task");

exports.createTask = (req, res) => {
  const { name, description, deadline, assignees, project, tags } = req.body;
  const task = new Task({
    ...{ name, description, deadline, assignees, project, tags },
  });
  const currTime = Date.now();
  task.activity.push({ timestamp: currTime, content: "Task was created" });
  if (assignees && assignees.length > 0) {
    task.status = "assigned";
    task.assignees = assignees.sort();
    task.activity.push({
      timestamp: currTime,
      content: `The task is assigned to ${String(assignees)}`,
    });
  }
  if (tags && tags.length > 0) {
    task.tags = tags.sort();
    task.activity.push({
      timestamp: currTime,
      content: `The task is tagged ${String(tags)}`,
    });
  }
  task.save((err, task) => {
    if (err) {
      return res.status(400).send({
        error: err,
      });
    }
    res.status(201).send(task);
  });
};

exports.getTask = (req, res) => {
  const { taskID } = req.params;

  Task.findById(taskID)
    .populate("assignees", "name email")
    .populate({
      path: "project",
      select: "name organisation",
      populate: { path: "organisation", select: "name" },
    })
    .exec((err, task) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      if (!task) {
        return res.status(400).send({ error: "Task not found" });
      }

      res.send(task);
    });
};

exports.getProjectTasks = (req, res, archived) => {
  const { projectID } = req.params;

  const query = archived
    ? Task.find({ project: projectID, status: "archived" })
    : Task.find({ project: projectID, status: { $ne: "archived" } });

  query
    .populate("assignees", "name email")
    .populate({
      path: "project",
      select: "name organisation",
      populate: { path: "organisation", select: "name" },
    })
    .exec((err, tasks) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send(tasks);
    });
};

exports.updateTask = (req, res) => {
  const { taskID } = req.params;
  const { name, description, status, deadline, work } = req.body;

  // TODO add logic to update activity

  Task.findByIdAndUpdate(taskID, {
    name,
    description,
    status,
    deadline,
    work,
  })
    .exec()
    .then((project) => {
      res.send(project);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.reassignTask = (req, res) => {
  const { taskID } = req.params;
  const { assignees } = req.body;

  Task.findById(taskID).exec((err, task) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    if (assignees.sort().toString() === task.assignees.toString()) {
      return res
        .status(400)
        .send({ error: "Assignees are the same as before. Nothing to update" });
    }

    task.assignees = assignees.sort();

    task.save((err, task) => {
      if (err) {
        return res.status(400).send({
          error: err,
        });
      }
      res.status(200).send(task);
    });
  });
};

exports.reTagTask = (req, res) => {
  const { taskID } = req.params;
  const { tags } = req.body;

  Task.findById(taskID).exec((err, task) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    if (tags.sort().toString() === task.tags.toString()) {
      return res
        .status(400)
        .send({ error: "tags are the same as before. Nothing to update" });
    }

    task.tags = tags.sort();

    task.save((err, task) => {
      if (err) {
        return res.status(400).send({
          error: err,
        });
      }
      res.status(200).send(task);
    });
  });
};

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
