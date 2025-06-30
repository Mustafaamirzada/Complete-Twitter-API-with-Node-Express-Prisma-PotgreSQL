import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getAllUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(404).json({ message: 'Did Not Find Users' });
    }
    else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.log("Error in getAllUsers: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params['id']);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });

  }
};

export const updateUser = async (req, res) => {
  const { username, lastname, email, password, age, bio, profilePic } = req.body;
  const userId = parseInt(req.params.id);

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ error: "User Not Found" });
    if (!password) {
      return res.status(404).json({ error: "Please provide Password" });
    }
    console.log(bcrypt.compareSync(password, user.password));
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) return res.status(400).json({ error: "Passwords are the same" });
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must at least 6 Character" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (email) {
      const emailExists = await prisma.user.findFirst({ where: { email } });
      if (emailExists) res.status(401).json({ message: 'Email already exists' });
    }
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username,
        lastname: lastname,
        email: email,
        password: hash,
        age: age,
        bio: bio,
        profilePic: profilePic,
      },
    })

    return res.status(201).json(updateUser);

  } catch (error) {
    console.log("Error in Update User", error.message);
    res.status(500).json({ error: error.message });
  }
}


export const deletedUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ error: "User Not Found" });
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return res.status(204).send();

  } catch (error) {
    console.log("Error in Deleting User", error.message);
    res.status(500).json({ error: error.message });
  }
}

