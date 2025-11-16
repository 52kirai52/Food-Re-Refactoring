import React, { useState, useEffect } from 'react';

function SignUpForm({ toggle }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/users/allergies`);
        const data = await res.json();
        setAllergies(data);
      } catch (err) {
        console.error("Failed to fetch allergies", err);
      }
    };
    fetchAllergies();
  }, [apiUrl]);

  const handleAllergyChange = (id) => {
    setSelectedAllergies((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!username.trim() || !password || !confirmPassword) {
      alert("모든 칸을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, allergies: selectedAllergies }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("회원가입 성공!");
        toggle();
      } else {
        alert(data.message || '회원가입 실패');
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <div className="col align-items-center flex-col sign-up">
      <div className="form-wrapper align-items-center">
        <div className="form sign-up">
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
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            {allergies.map((allergy) => (
              <div key={allergy.allergy_id} className="checkbox-group">
                <input
                  type="checkbox"
                  checked={selectedAllergies.includes(allergy.allergy_id)}
                  onChange={() => handleAllergyChange(allergy.allergy_id)}
                />
                <label>{allergy.allergy_name}</label>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Sign up</button>
          <p>
            <span>Already have an account?</span>
            <b onClick={toggle} className="pointer">Sign in here</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
