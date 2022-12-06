import Login from './Components/Login';
import Signup from './Components/Signup';

import Navbar from './Components/Navbar';
import HomeHeader from './Components/HomeHeader';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './css/styles.css';
import React, { useEffect, useState } from 'react';
import Profile from './Components/Profile';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const authStateChange = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }, 500);
    return () => {
      clearInterval(authStateChange);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />

      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <React.Fragment>
                <HomeHeader />
                <Home />
                <Footer />
              </React.Fragment>
            }
          />

          <Route
            path="login"
            element={
              <>
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <Signup />
                <Footer />
              </>
            }
          />
          {isLogin && (
            <>
              <Route
                path="profile"
                element={
                  <>
                    <Profile />
                  </>
                }
              />
              <Route path="dashboard" element={<Dashboard />} />
            </>
          )}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;