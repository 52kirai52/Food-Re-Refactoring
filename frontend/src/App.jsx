import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import RecommendPage from "./pages/RecommendPage";
import Header from './components/Header';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data?.userId) setUserId(data.userId);
      } catch (err) {
        console.error("사용자 정보 가져오기 실패:", err);
      }
    };

    fetchUser();

    const handleMessage = (event) => {
      if (event.data === 'finLogin') {
        fetchUser(); // 로그인 성공 메시지 수신 시 상태 갱신
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
