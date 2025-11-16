import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/check`, {
          credentials: 'include',
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error('Login check failed:', err);
      }
    };

    checkLogin();

    const handleMessage = (event) => {
      if (event.data === 'finLogin') {
        checkLogin();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const mainColor = '#2f49ec';

  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', color: mainColor }}
      >
        멋사 6조
      </div>
      <button
        onClick={isLoggedIn ? handleLogout : handleLogin}
        style={{
          backgroundColor: mainColor,
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </header>
  );
}

export default Header;
