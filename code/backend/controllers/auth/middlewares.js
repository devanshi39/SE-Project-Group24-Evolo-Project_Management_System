const expressjwt = require("express-jwt");
const Organisation = require("../../models/Organisation");
const Project = require("../../models/Project");
const Task = require("../../models/Task");

exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isInOrgForCreateProject = (req, res, next) => {
  const { organisation: organisationID } = req.body;
  const userID = req.auth.id;

  Organisation.findById(organisationID).exec((error, organisation) => {
    if (error) {
      return res.status(400).send({ error });
    }

    if (!organisation) {
      return res.status(400).send({ error: "Organisation does not exist" });
    }

    if (!organisation.members.map((arr) => arr.toString()).includes(userID)) {
      return res.status(400).send({ error: "You do not have authorization" });
    }

    next();
  });
};

exports.isProjLeaderForCreateTask = (req, res, next) => {
  const { project: projectID } = req.body;
  const userID = req.auth.id;

  Project.findById(projectID).exec((error, project) => {
    if (error) {
      return res.status(400).send({ error });
    }

    if (!project) {
      return res.status(400).send({ error: "Project does not exist" });
    }

    if (project.leader.toString() !== userID) {
      return res.status(400).send({ error: "You do not have authorization" });
    }

    next();
  });
};

exports.isInOrg = (req, res, next) => {
  const { projectID } = req.params;
  const userID = req.auth.id;

  Project.findById(projectID)
    .populate("organisation", "members")
    .exec((error, project) => {
      if (error) {
        return res.status(400).send({ error });
      }

      if (!project) {
        return res.status(400).send({ error: "Project does not exist" });
      }

      if (
        !project.organisation.members
          .map((arr) => arr.toString())
          .includes(userID)
      ) {
        return res.status(400).send({ error: "You do not have authorization" });
      }

      next();
    });
};

exports.isInProj = (req, res, next) => {
  const { taskID } = req.params;
  const userID = req.auth.id;

  Task.findById(taskID)
    .populate("project", "members")
    .exec((error, task) => {
      if (error) {
        return res.status(400).send({ error });
      }

      if (!task) {
        return res.status(400).send({ error: "Task does not exist" });
      }

      if (!task.project.members.map((arr) => arr.toString()).includes(userID)) {
        return res.status(400).send({ error: "You do not have authorization" });
      }

      next();
    });
};

exports.hasOrgWriteAccess = (req, res, next) => {
  const { organisationID } = req.params;
  const userID = req.auth.id;

  Organisation.findById(organisationID).exec((error, organisation) => {
    if (error) {
      return res.status(400).send({ error });
    }

    if (!organisation) {
      return res.status(400).send({ error: "Organisation does not exist" });
    }

    if (organisation.leader.toString() !== userID) {
      console.log(organisation.leader.toString(), userID);
      return res.status(400).send({ error: "You do not have authorization" });
    }

    req.user = userID;

    next();
  });
};

exports.hasProjectWriteAccess = (req, res, next) => {
  const { projectID } = req.params;
  const userID = req.auth.id;

  Project.findById(projectID).exec((error, project) => {
    if (error) {
      return res.status(400).send({ error });
    }

    if (!project) {
      return res.status(400).send({ error: "Project does not exist" });
    }

    if (project.leader.toString() !== userID) {
      return res.status(400).send({ error: "You do not have authorization" });
    }

    req.user = userID;

    next();
  });
};
