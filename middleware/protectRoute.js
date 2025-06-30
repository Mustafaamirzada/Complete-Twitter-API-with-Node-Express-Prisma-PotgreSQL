import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // ✅ if you're using cookies;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: No Token Provieded' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
    }

    const user = await prisma.user.findUnique({
      where: {id: decoded.userId}
    });

    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
