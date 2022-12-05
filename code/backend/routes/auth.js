const express = require("express");
const {
  signUp,
  signIn,
  isSignedIn,
  //   forgotPassword,
  //   changePassword,
} = require("../controllers/auth");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
// router.post("/forgot-password", forgotPassword);
// router.post("/change-password", changePassword);

router.get("/protected", isSignedIn, (req, res) => res.send(req.auth));

module.exports = router;
