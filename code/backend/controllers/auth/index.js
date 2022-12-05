const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { isSignedIn } = require("./middlewares");
// const { transporter } = require("../../utils/transporter");

exports.isSignedIn = isSignedIn;

exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      if (err.keyPattern?.email === 1) {
        return res.status(406).json({
          error: "User with this email already exists",
        });
      }
      return res.status(400).json({
        error: err.message,
      });
    }

    respondWithTokenAndUser(res, user);
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    respondWithTokenAndUser(res, user);
  });
};

// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;
//   User.findOne({ email }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "Email does not exist",
//       });
//     }

//     const token = getToken(user);
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       // to: "noreply.cookbook.ncsu@gmail.com",
//       subject: "Reset Password from CookBook",
//       html: `
//         <h2>Please click on the given link to reset your password</h2>
//         <p>${process.env.FRONTEND_URL}/reset-password/${token}</p>
//       `,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         return res.json(err);
//       }
//       res.status(200).send({ email, msg: "Email sent" });
//     });
//   });
// };

// exports.changePassword = (req, res) => {
//   const { token, password } = req.body;

//   try {
//     const { id, email } = jwt.verify(token, process.env.SECRET);

//     const { salt, encry_password } = new User({ password, email });

//     User.findOneAndUpdate({ email }, { salt, encry_password }).exec(
//       (err, user) => {
//         if (err || !user) {
//           return res.status(400).json({
//             error: "Email does not exist",
//           });
//         }
//         res.json({ msg: "Changed user password" });
//       }
//     );
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// };

const getToken = (user) => {
  const { _id, email } = user;
  const token = jwt.sign({ id: _id, email }, process.env.SECRET, {
    expiresIn: "1y",
  });

  return token;
};

const respondWithTokenAndUser = (res, user) => {
  const token = getToken(user);

  //send response to front end
  res.json({
    token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
};
