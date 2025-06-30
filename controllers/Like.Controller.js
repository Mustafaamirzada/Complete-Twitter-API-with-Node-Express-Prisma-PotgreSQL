import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const getAllLikes = async (_, res) => {
  const likes = await prisma.like.findMany();
  try {
    if (!likes) {
      return res.status(404).json({ message: 'No Like Found' })
    } else {
      return res.status(200).json(likes);
    }
  } catch (error) {
    console.log("Error in getAllUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const getLikeByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const like = await prisma.like.findMany({
      where: {
        userId: userId
      },
    });

    if (like.length === 0) {
      return res.status(404).json({ message: 'Like Did Not Found' });
    }
    return res.status(200).json(like);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getLikeByPostId = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const like = await prisma.like.findMany({
      where: {
        postId: postId
      },
    });

    if (like.length === 0) {
      return res.status(404).json({ message: 'Like Did Not Found' });
    }
    return res.status(200).json(like);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const likePostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
  
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post Did Not Found' });
    }
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId } // if you have a @@unique([userId, postId]) constraint
      }
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    const likedPost = await prisma.like.create({
      data: {
        userId: userId,
        postId: postId
      },
    });
    res.status(200).json(likedPost);
  } catch (error) {
    console.log('Error in Liking Post', error)
    res.status(500).json({ error: error.message });
  }
}


export const dislikePostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId } // if you have a @@unique([userId, postId]) constraint
      }
    });
    if (!existingLike) {
      return res.status(400).json({ message: 'You Did Not liked this post' });
    };

    const dislikedPost = await prisma.like.delete({
      where: {
        userId_postId: { userId, postId } // if you have a @@unique([userId, postId]) constraint
      },
    });
    res.status(204).send();
  } catch (error) {
    console.log('Error in DisLiking Post', error)
    res.status(500).json({ error: error.message });
  }
}