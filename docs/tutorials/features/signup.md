# Sign up
User can sign up and enter details like Name, email, password and Contact. Contact is not a mandatory field


```js
exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      if (err.keyPattern?.email === 1) {
        return res.status(406).json({
          error: 'User with this email already exists',
        });
      }
      return res.status(400).json({
        error: err.message,
      });
    }

    respondWithTokenAndUser(res, user);
  });
};
```
```jsx
const validatePassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      console.log('Strong Pass');
      setPassword(value);
      return true;
    } else {
      alert(
        'Password must be at least 8 characters long contain a number, a special character, a lowercase letter and an uppercase letter'
      );
      console.log('Weak Pass');
    }
  };
  return (
    <div>
      <header id="header" class="header">
        <div class="form-content-sign">
          <div class="container">
            <div class="row">
              <div class="col-md-6 login-left">
                <h2> Sign up </h2>
                <form
                  onSubmit={(e) => {
                    if (!validatePassword(password)) {
                      e.preventDefault();
                    } else {
                      e.preventDefault();
                      fetch('http://localhost:5000/auth/signup', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email, password, phoneNum }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.error) {
                            alert(data.error);
                            return;
                          }
                          localStorage.setItem('token', data.token);
                          localStorage.setItem('user', JSON.stringify(data.user));
                          navigate('/dashboard');
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  }}
                >
                  <div class="form-group">
                    <label>Name</label>

                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      name="name"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group">
                    <label>Email-id</label>
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      name="email"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group">
                    <label>Password</label>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      name="password"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group">
                    <label>Contact number</label>
                    <input
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                      }}
                      type="tel"
                      name="contact"
                      class="form-control"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary form-btn">
                    Register
                  </button>
                  <p class="alter">
                    Already have an account, <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
              <Header />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
```