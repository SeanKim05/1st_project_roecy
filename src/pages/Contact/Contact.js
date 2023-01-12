import React, { useState, useEffect, useRef } from 'react';

import './Contact.scss';

function Contact() {
  const EMAIL_REGEX = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const contentRef = useRef('');

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const postHandlerContact = e => {
    e.preventDefault();

    fetch('http://localhost:8000/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        content: contentRef.current.value,
      }),
    }).then(response => {
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setFailed(true);
      }
    });
  };

  return (
    <div>
      <title className="contact_header_titile">CONTACT US FOR ASSISTANCE</title>
      <section className="wrapper_content_contact">
        <div className="contact_description">
          <h1 className="contact_description_h1">NEED HELP?</h1>
          <img
            className="contact_img"
            alt="contact img"
            src="https://images.unsplash.com/photo-1600070360386-b5377405efa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          />
          <div className="description_text">
            <p>We're here to answer your questions</p>
            <p>
              Please fill out this form for all products, order,shipping, and
              website related inquiries
            </p>
            <p>
              Customer Care Team is available Monday to Friday, 9am to 5pm ET.
              We are closed on major US holiday
            </p>
            <p>
              Thank you for visiting <span>ROECY' </span>website
            </p>
          </div>
        </div>

        <form className="contact_form">
          <p className={failed ? 'errPopUp' : 'offscreen'}>Error.</p>
          <p className={success ? 'successPopUp' : 'offscreen'}>
            Thank you! <br />
            Your inquiry has been submitted successfully.
          </p>
          <label className="contact_form_label" htmlFor="name">
            Your name
          </label>
          <input
            className="contact_form_input"
            id="name"
            type="text"
            placeholder="Your name"
            ref={nameRef}
          />

          <label className="contact_form_label" htmlFor="email">
            Your email
          </label>
          <input
            className="contact_form_input"
            id="email"
            type="text"
            placeholder="Your email"
            ref={emailRef}
            onChange={e => setEmail(e.target.value)}
            required
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

          <label className="contact_form_label" htmlFor="message">
            Your message
          </label>
          <input
            className="contact_form_input_lg"
            id="message"
            type="text"
            placeholder="Your message"
            ref={contentRef}
          />
          <button onClick={postHandlerContact} className="contact_btn">
            Send message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
