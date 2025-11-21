const db = require('../config/db');

// 모든 사용자 가져오기
exports.getAllUsers = () => {
  return db.query('SELECT * FROM user');
};

// ID로 사용자 가져오기
exports.getUserById = (id) => {
  return db.query('SELECT * FROM user WHERE user_id = ?', [id]);
};

// 사용자 생성
exports.createUser = (data) => {
  const { username, password } = data;
  return db.query(
    'INSERT INTO user (user_id, password) VALUES (?, ?)',
    [username, password]
  );
};

// 사용자 업데이트
exports.updateUser = (id, data) => {
  const { username, password } = data;
  return db.query(
    'UPDATE user SET user_id = ?, password = ? WHERE user_id = ?',
    [username, password, id]
  );
};

// 사용자 삭제
exports.deleteUser = (id) => {
  return db.query('DELETE FROM user WHERE user_id = ?', [id]);
};