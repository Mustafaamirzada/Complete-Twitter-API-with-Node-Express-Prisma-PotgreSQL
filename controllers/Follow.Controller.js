import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const getFollowers = async (_, res) => {
  try {
    const followers = await prisma.follow.findMany();
    if (!followers) {
      return res.status(404).json({ message: 'Did Not Find Any Follower' });
    }
    else {
      res.status(200).json(followers);
    }
  } catch (error) {
    console.log("Error in Getting Followers: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const getFollowersById = async (req, res) => {
  const followerId = parseInt(req.params['id']);
  try {
    const followers = await prisma.follow.findMany({
      where : {followerId : followerId}
    }
    );
    if (!followers) {
      return res.status(404).json({ message: 'Did Not Find Any Follower' });
    }
    else {
      res.status(200).json(followers);
    }
  } catch (error) {
    console.log("Error in Getting Followers: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const getFollowingById = async (req, res) => {
  const followingId = parseInt(req.params['id']);
  try {
    const followings = await prisma.follow.findMany({
      where : {followingId : followingId}
    }
    );
    if (!followings) {
      return res.status(404).json({ message: 'Did Not Find Any Following' });
    }
    else {
      res.status(200).json(followings);
    }
  } catch (error) {
    console.log("Error in Getting Followings: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const followUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const currentUser = req.user.id;
    const user = await prisma.user.findUnique({
      where : {id: userId}
    });

    if (!user) {
      return res.status(404).json({ message: 'Follower User Did Not Found' });
    }

    if (userId == currentUser) {
      return res.status(404).json({ message : "A User Can Not Follow Hem/Her Self"});
    }
    const followedUser = await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: currentUser
      },
    });
    res.status(200).json(followedUser);
  } catch (error) {
    console.log("Error in Following of Users: ", error.message);
    res.status(500).json({ error: error.message });

  }
};

export const unFollowUserById = async (req, res) => {
  const followerId = parseInt(req.params.id);
  const followingId = req.user.id;
  try {
    const unfollowedUser = await prisma.follow.delete({
      where : { 
        followerId_followingId: {
          followerId,
          followingId,
        }
      },
    });
    res.status(204).json(unfollowedUser);
  } catch (error) {
    console.log("Error in UnFollowing of Users: ", error.message);
    res.status(500).json({ error: error.message });

  }
};



