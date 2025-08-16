import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};