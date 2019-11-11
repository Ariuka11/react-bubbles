import React, {useState} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = (props) => {

  const [credentials, setCredentials] = useState({})

  const handleLogin = e =>{
    e.preventDefault();
    axiosWithAuth().post(`/login`, credentials)
        .then(res => {
          localStorage.setItem(`token`, res.data.payload)
          props.history.push(`/bubblesPage`)
        })
  }

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form onSubmit = {handleLogin}>
        <input
          type = 'text'
          name = 'username'
          placeholder = 'Username'
          value = {credentials.username}
          onChange = {handleChange} />
        <input
          type = 'password'
          name = 'password'
          placeholder = 'Password'
          value = {credentials.password}
          onChange = {handleChange} />
          <button>Login</button>
      </form>
    </>
  );
};

export default Login;
