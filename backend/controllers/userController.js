const user = require('../models/userModel');
const db = require('../config/db');
const bcrypt = require('bcrypt');

// 회원가입
exports.registerUser = async (req, res) => {
  const { username, password, allergies } = req.body;

  try {
    // 사용자 존재 여부 확인
    const [existingUser] = await db.query('SELECT * FROM user WHERE user_id = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    await db.query(
      'INSERT INTO user (user_id, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    for (const allergyId of allergies) {
          await db.query(
            'INSERT INTO user_allergy (user_id, allergy_id) VALUES (?, ?)',
            [username, allergyId]
          );
    }

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 알레르기
exports.getAllergies = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM allergy');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching allergies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 로그인
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 필수값 확인
    if (!username || !password) {
      return res.status(400).json({ message: '아이디와 비밀번호는 필수입니다.' });
    }

    // 사용자 조회
    const [userData] = await db.query('SELECT * FROM user WHERE user_id = ?', [username]);
    if (userData.length === 0) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, userData[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    req.session.user = {
        user_id: userData[0].user_id
    };

    // 로그인 성공 시 사용자 정보 반환
    return res.status(200).json({ message: '로그인 성공!', user_id: userData[0].user_id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류' });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 오류:', err);
      return res.status(500).json({ message: '로그아웃 실패' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: '로그아웃 성공' });
  });
};

exports.checkLogin = (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
};