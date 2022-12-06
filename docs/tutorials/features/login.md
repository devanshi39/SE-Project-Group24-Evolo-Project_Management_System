# Login
User can login. Checks are in place if the email id and password combination is correct, or the email id does not exist

```js
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User email does not exist',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and Password do not match',
      });
    }

    respondWithTokenAndUser(res, user);
  });
};
```