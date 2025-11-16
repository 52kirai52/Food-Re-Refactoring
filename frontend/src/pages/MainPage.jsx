import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'goLogin') {
        navigate('/login');
      } else if (event.data === 'goRegister') {
        navigate('/register');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'goRecommend') {
        navigate('/recommend');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);



  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <iframe
        src="/MainPage/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Bootstrap MainPage"
      />
    </div>
  );
};

export default MainPage;
