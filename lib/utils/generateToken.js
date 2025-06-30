import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '14d',
  });

  res.cookie('token', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
}

// generate JWT token
// const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//   expiresIn: '7d',
// });

// optionally set token as cookie
// res.cookie('jwt', token, { httpOnly: true, secure: true });
