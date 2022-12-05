const Organisation = require("../models/Organisation");
const Project = require("../models/Project");
const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.createOrganisation = (req, res) => {
  const { name, address, phoneNum } = req.body;
  const user = req.auth.id;
  const organisation = new Organisation({
    ...{ name, address, phoneNum, leader: user, members: [user] },
  });
  organisation.save((err, organisation) => {
    if (err) {
      return res.status(400).send({
        error: err,
      });
    }
    res.status(201).send(organisation);
  });
};

exports.getOrganisation = (req, res) => {
  const { organisationID } = req.params;

  Organisation.findById(organisationID)
    .populate("members", "name email")
    .populate("leader", "name email")
    .exec((err, organisation) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send(organisation);
    });
};

exports.getOrganisationOfUser = (req, res) => {
  const user = req.auth.id;

  Organisation.find({ members: mongoose.mongoose.Types.ObjectId(user) })
    .populate("members", "name email")
    .populate("leader", "name email")
    .exec((err, organisations) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send(organisations);
    });
};

exports.updateOrganisation = (req, res) => {
  const { organisationID } = req.params;
  const { name, address, phoneNum, leader } = req.body;

  console.log(`Updating ${organisationID}...`);

  Organisation.findByIdAndUpdate(organisationID, {
    name,
    address,
    phoneNum,
    leader,
  })
    .exec()
    .then((organisation) => {
      res.send(organisation);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.addMember = (req, res) => {
  const { organisationID, userID } = req.params;

  Organisation.findById(organisationID)
    .exec()
    .then((organisation) => {
      let tmp = organisation.members.map((arr) => arr.toString());

      tmp.push(userID);

      organisation.members = tmp;

      organisation.save((err, organisation) => {
        if (err) {
          return res.status(400).send({
            error: err,
          });
        }
        res.status(200).send(organisation);
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.removeMember = (req, res) => {
  const { organisationID, userID } = req.params;

  Organisation.findById(organisationID)
    .exec()
    .then((organisation) => {
      if (organisation.members.length === 1) {
        return res
          .status(400)
          .send({ error: "Organisation needs atleast 1 member" });
      }

      let tmp = organisation.members.map((arr) => arr.toString());

      const idx = tmp.indexOf(userID);
      tmp.splice(idx, 1);

      organisation.members = tmp;

      organisation.save((err, organisation) => {
        if (err) {
          return res.status(400).send({
            error: err,
          });
        }
        res.status(200).send(organisation);
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.deleteOrganisation = async (req, res) => {
  const { organisationID } = req.params;

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const projects = await Project.find({ organisation: organisationID })
        .select("_id")
        .session(session)
        .exec();

      await Promise.all(
        projects.map(async (project) => {
          await Task.deleteMany({ project }).session(session);
          await Project.findByIdAndDelete(project).session(session);
        })
      );

      await Organisation.findByIdAndDelete(organisationID).session(session);
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e });
  }
  session.endSession();

  return res.status(200).send();
};
