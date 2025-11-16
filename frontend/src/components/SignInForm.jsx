import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SignInForm({ toggle }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("로그인 성공!");
        window.parent.postMessage('finLogin', '*');
        navigate('/');
      } else {
        alert(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("오류");
    }
  };

  return (
    <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
        <div className="form sign-in">
          <div className="input-group">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Sign in</button>
          <p>
            <span>Don't have an account?</span>
            <b onClick={toggle} className="pointer">Sign up here</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
