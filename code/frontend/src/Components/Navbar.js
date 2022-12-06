import logo from '../images/logo.svg';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-sm navbar-light navbar-custom">
      <Link to="/" class="navbar-brand logo-image">
        <img src={logo} alt="alt" />
      </Link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarsExampleDefault">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" onClick={() => navigate('/')}>
            <a class="nav-link page-scroll">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link page-scroll" href="/#services">
              Why Evolo?
            </a>
          </li>
          {isLogin ? (
            <React.Fragment>
              <li class="nav-item">
                <Link class="nav-link page-scroll" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link page-scroll" to="/profile">
                  Hi, {isLogin ? JSON.parse(localStorage.getItem('user')).name : ''}
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link page-scroll"
                  to="/"
                  onClick={() => {
                    setIsLogin(false);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                  }}
                >
                  Logout
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <li class="nav-item" onClick={() => navigate('/login')}>
              <a class="nav-link page-scroll">Login/Signup</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
