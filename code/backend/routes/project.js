const express = require("express");
const { isSignedIn } = require("../controllers/auth");
const {
  isInOrg,
  hasProjectWriteAccess,
  isInOrgForCreateProject,
} = require("../controllers/auth/middlewares");
const {
  createProject,
  getProject,
  updateProject,
  addMember,
  removeMember,
  deleteProject,
  getProjectListForUser,
} = require("../controllers/project");
const router = express.Router();

router.post("/create", isSignedIn, isInOrgForCreateProject, createProject);
router.get("/:projectID", isSignedIn, isInOrg, getProject);
router.get("/user/list/:organisationID", isSignedIn, getProjectListForUser);
router.patch(
  "/:projectID",
  isSignedIn,
  isInOrg,
  hasProjectWriteAccess,
  updateProject
);
router.patch(
  "/member/add/:projectID/:userID",
  isSignedIn,
  isInOrg,
  hasProjectWriteAccess,
  addMember
);
router.patch(
  "/member/remove/:projectID/:userID",
  isSignedIn,
  isInOrg,
  hasProjectWriteAccess,
  removeMember
);
router.delete(
  "/:projectID",
  isSignedIn,
  isInOrg,
  hasProjectWriteAccess,
  deleteProject
);

module.exports = router;
