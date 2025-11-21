require('dotenv').config();

const express = require('express');
// const cors = require('cors');
// const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
// const guestRoutes = require('./routes/categoryGuestRoutes');
// const memberRoutes = require('./routes/categoryMemberRoutes');
// const userRouter = require('./routes/userRouter');
// const randomRoutes = require("./routes/randomRouter");

const app = express();
const PORT = 5000;

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

app.use(express.json());

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 3600000 }
// }));

app.use('/api/auth', authRoutes);
// app.use('/api/users', userRouter);
// app.use("/api/random", randomRoutes);
// app.use("/api/random/login", randomRoutes);
// app.use('/guest/category', guestRoutes);
// app.use('/member/category', memberRoutes);

// app.use((req, res, next) => {
//   res.status(404).json({ message: '요청한 경로를 찾을 수 없습니다.' });
// });

// app.use((err, req, res, next) => {
//   console.error('서버 에러 발생:', err.stack);
//   res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
