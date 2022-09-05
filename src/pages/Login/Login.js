import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.scss';

function Login() {
  const pwdRef = useRef('');
  const emailRef = useRef('');

  const EMAIL_REGEX = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const go_signup = () => {
    navigate('/signup');
  };
  const go_main = () => {
    navigate('/');
  };

  const sendHandler = e => {
    e.preventDefault();
    console.log(pwdRef.current.value);
    console.log(emailRef.current.value);

    fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pwd: pwdRef.current.value,
        email: emailRef.current.value,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      });
  };

  // const getToken = () => {
  //   if (localStorage.getItem('token') !== '') {
  //     console.log('token');
  //   }
  // };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // useEffect(() => {
  //   getToken();
  // }, []);

  return (
    <section className="wrapper_content_login">
      <div className="border_box_login">
        <div className="header_content_login">
          <h1 className="login-text-h">Login</h1>
          <p className="login-text-p">Please enter your e-mail password:</p>
        </div>

        <div className="input_content_login">
          <input
            className="login_input"
            placeholder="Email"
            type="text"
            ref={emailRef}
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? 'cond_msg' : 'offscreen'
            }
          >
            E-mail should include "@"
            <br />
            Please check your email address
          </p>

          <input
            className="login_input"
            type="password"
            placeholder="Password"
            ref={pwdRef}
            onChange={e => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? 'false' : 'ture'}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && pwd && !validPwd ? 'cond_msg' : 'offscreen'}
          >
            Password length should be 8 to 24 characters. Must includes
            <br />
            uppercase, lowercase and one special characters(!,@,#,$).
            <br />
          </p>

          <button
            type="button"
            className="login_btn"
            onClick={go_main}
            onMouseDown={sendHandler}
            disabled={!validPwd || !validEmail ? true : false}
          >
            Login
          </button>
        </div>

        <div className="link_content_login">
          <span className="span_link login_span">Don't have an account? </span>
          <span className="login_span" onClick={go_signup}>
            Create one
          </span>
        </div>
      </div>
    </section>
  );
}

export default Login;
