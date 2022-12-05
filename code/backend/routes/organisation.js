const express = require("express");
const {
  hasOrgWriteAccess,
  isSignedIn,
} = require("../controllers/auth/middlewares");
const {
  createOrganisation,
  getOrganisation,
  updateOrganisation,
  deleteOrganisation,
  getOrganisationOfUser,
  addMember,
  removeMember,
} = require("../controllers/organisation");
const router = express.Router();

router.post("/create", isSignedIn, createOrganisation);
router.get("/:organisationID", getOrganisation);
router.get("/user/list", isSignedIn, getOrganisationOfUser);
router.patch(
  "/:organisationID",
  isSignedIn,
  hasOrgWriteAccess,
  updateOrganisation
);
router.patch(
  "/member/add/:organisationID/:userID",
  isSignedIn,
  hasOrgWriteAccess,
  addMember
);
router.patch(
  "/member/remove/:organisationID/:userID",
  isSignedIn,
  hasOrgWriteAccess,
  removeMember
);
router.delete(
  "/:organisationID",
  isSignedIn,
  hasOrgWriteAccess,
  deleteOrganisation
);

module.exports = router;
