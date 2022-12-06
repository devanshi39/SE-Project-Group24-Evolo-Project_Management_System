import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <header id="header" class="header">
        {/* <!--<div class="header-content">--> */}
        <div class="form-content">
          <div class="container">
            <div class="row">
              <div class="col-md-6 container-login">
                <h2> Login </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetch('http://localhost:5000/auth/signIn', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email,
                        password,
                      }),
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
                  }}
                >
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
                  <button type="submit" class="btn btn-primary form-btn" name="submit">
                    Login
                  </button>

                  <p class="alter">
                    Dont have an account,
                    {/* <a href="signup.php">Sign up</a> */}
                    <Link to={'/signup'}>Sign up </Link>
                    {/* <li class="nav-item" onClick={()=>navigate('/login')}><a class="nav-link page-scroll" >Login/Signup</a></li> */}
                  </p>
                </form>
              </div>
              <Header />
              {/* <!-- end of col --> */}
            </div>
            {/* <!-- end of row --> */}
          </div>
          {/* <!-- end of container --> */}
        </div>
        {/* <!-- end of header-content --> */}
      </header>
    </div>
  );
};
export default Login;
