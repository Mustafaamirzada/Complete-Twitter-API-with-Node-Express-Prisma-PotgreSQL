import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const getAllTweets = async (_, res) => {
  const tweets = await prisma.retweet.findMany();
  try {
    if (!tweets) {
      return res.status(404).json({ message: 'No Tweet Found' })
    } else {
      return res.status(200).json(tweets);
    }
  } catch (error) {
    console.log("Error in getting all Tweets: ", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const getTweetByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const tweets = await prisma.retweet.findMany({
      where: {
        userId: userId
      },
    });

    if (tweets.length === 0) {
      return res.status(404).json({ message: 'Tweets Did Not Found' });
    }
    return res.status(200).json(tweets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getTweetByPostId = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const tweets = await prisma.like.findMany({
      where: {
        postId: postId
      },
    });

    if (tweets.length === 0) {
      return res.status(404).json({ message: 'Tweets Did Not Found' });
    }
    return res.status(200).json(tweets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const createTweet = async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.id;
  try {
    if (!userId || !postId) {
      return res.status(404).json({ error: "Please provide All Of the Tweet Information" });
    }
    const post = await prisma.post.findUnique({
      where: {id: postId}
    });
    if (!post) {
      return res.status(404).json({ error : 'Post Dose Not Exist Please Select Another Post'})
    }
    const newTweet = await prisma.retweet.create({
      data: {
        userId: userId,
        postId: postId
      },
    });
    res.status(200).json(newTweet);
  } catch (error) {
    console.log('Error in creating Tweet', error)
    res.status(500).json({ error: error.message });
  }
}


export const updateTweet = async (req, res) => {
  const tweetId = parseInt(req.params.id);
  const { postId } = req.body || {};
  const userId = req.user.id;
  try {
    const post = await prisma.post.findUnique({
      where: {id: postId}
    });
    if (!post) {
      return res.status(404).json({ error : 'Post Dose Not Exist Please Select Another Post'})
    }
    if (!userId || !postId) {
      return res.status(404).json({ error: "Please provide All Of the Tweet Information" });
    }
    const id = await prisma.retweet.findUnique({
      where: {id : tweetId}
    });
    if (!id) {
      return res.status(404).json({error: 'This Tweet Dose Not Exist'})
    }
    const updatedTweet = await prisma.retweet.update({
      where : {
        // userId_postId: { userId, postId }
        id: tweetId
      },
      data: {
        userId: userId,
        postId: postId
      },
    });
    res.status(200).json(updatedTweet);
  } catch (error) {
    console.log('Error in updating Tweet', error)
    res.status(500).json({ error: error.message });
  }
}

export const deleteTweetById = async (req, res) => {
  try {
    const tweetId = parseInt(req.params.id);
    const existingTweet = await prisma.retweet.findUnique({
      where: {
        id: tweetId, // 
      }
    });
    if (!existingTweet) {
      return res.status(400).json({ message: 'You Did Not Tweet this post' });
    };

    const deletedTweet = await prisma.retweet.delete({
      where: {
        id: tweetId // if you have a @@unique([userId, postId]) constraint
      },
    });
    res.status(204).send();
  } catch (error) {
    console.log('Error in DisLiking Post', error)
    res.status(500).json({ error: error.message });
  }
}