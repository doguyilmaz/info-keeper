import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import AlertContext from "../../Context/Alert/alertContext";
import AuthContext from "../../Context/Auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === "Invalid Credentials") {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill all fields', 'danger');
    }
    else {
      login({
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Login</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
        <p>Don't have an accout? {" "}
          <Link to="/register" className="text-purple">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login;