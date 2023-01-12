import React from 'react';
import './Account.scss';
import { useState, useEffect } from 'react';

import Logout from '../../components/Logout/Logout';

function Account() {
  const [userName, setUserName] = useState([]);
  const [orderData, setOrderData] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/order/${localStorage.getItem('token')}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data[0] == null) {
          setOrderData(false);
        }
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/users/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    })
      .then(res => res.json())
      .then(data => setUserName(data.userName));
  }, []);

  return (
    <div className="wrapper_content_account">
      <section className="account_header">
        <Logout />
        <h1 className="account_header_title"> My Account</h1>
        <p className="account_header_text">
          Welcome back,
          <span className="account_header_text_username" key={0}>
            {userName.name}
          </span>
          !
        </p>
      </section>

      <section className="account_order">
        <h2 className="account_order_title">MY ORDER STATUS</h2>
        {orderData ? (
          <ul>Your order will be shipped within 3 business day</ul>
        ) : (
          <p className="account_order_text">You haven't placed any order yet</p>
        )}
      </section>
    </div>
  );
}

export default Account;
