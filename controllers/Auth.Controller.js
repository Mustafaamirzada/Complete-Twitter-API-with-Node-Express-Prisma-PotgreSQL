import { PrismaClient } from "@prisma/client";
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()

export const signup = async (req, res) => {
  try {
    const { username, lastname, email, password, age, bio, profilePic } = req.body;
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegx.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // because username is not unique
    // const existingUser = await prisma.user.findUnique({
    //   where: {email: email }
    // });
    // if (existingUser) {
    //   return res.status(400).json({ error: 'User already exists' });
    // }

    const existingEmail = await prisma.user.findUnique({
      where: {email: email}
    });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password Must Be at least 6 Character' });
    }
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        lastname: lastname,
        email: email,
        password: hashPassword,
        age: age,
        bio: bio,
        profilePic: profilePic,
      },
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser.id, res);
      return res.status(201).json(newUser);
    } else {
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log('Error in SignUp Controller' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {email: email}
    });
    if (!user) {
      res.status(400).json({message: 'User Not Found'})
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user.password
    );

    if (!username || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid UserName or Password' });
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      username: user.username,
      lastname: user.lastname,
      email: user.email,
      bio: user.bio,
      profileImg: user.profilePic,
    });
  } catch (error) {
    console.log('Error in Login Controller ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({
      message: 'Logout Successfully',
    });
  } catch (error) {
    console.log('Error in Logout Controller ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};