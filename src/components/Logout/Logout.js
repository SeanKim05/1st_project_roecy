import React from 'react';
import './Logout.scss';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const handleLogout = () => {
    localStorage.clear();
  };
  const navigate = useNavigate();
  const go_main = () => {
    navigate('/');
  };
  return (
    <div>
      <button
        className="logout_btn"
        onClick={() => {
          handleLogout();
          go_main();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
