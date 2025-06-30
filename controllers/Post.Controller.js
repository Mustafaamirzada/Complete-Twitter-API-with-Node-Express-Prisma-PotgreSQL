import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    if (!posts) {
      return res.status(404).json({ message: 'Did Not Find Any Post' });
    }
    else {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.log("Error in Getting Posts: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const getPostById = async (req, res) => {
  try {
    const postId = parseInt(req.params['id']);
    const post = await prisma.post.findUnique({
      where : {id: postId}
    });

    if (!post) {
      return res.status(404).json({ message: 'Post Did Not Found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in Getting Post of Users: ", error.message);
    res.status(500).json({ error: error.message });

  }
};

export const createNewPost = async (req, res) => {
  const { content, mediaUrl, authorId } = req.body;
  try {
    if (!content || !authorId || !mediaUrl) {
      return res.status(404).json({ error: "Please provide All Of the Post Information" });
    }
    if (content.length < 10) {
      return res.status(400).json({ error: "You post should at least be 10 Character" });
    }

    const newPost = await prisma.post.create({
      data: {
        content: content,
        mediaUrl: mediaUrl,
        authorId: authorId,
      },
    })

    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in Creating New Post", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const updatePostById = async (req, res) => {
  const { content, mediaUrl, authorId } = req.body;
  const postId = parseInt(req.params.id);

  try {
    let post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) return res.status(404).json({ error: "Post Dose Not Exist" });
    if (!content) {
      return res.status(404).json({ error: "Please provide Post Content" });
    }
    if (content.length < 10) {
      return res.status(400).json({ error: "Post must be at least 10 Character" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
        mediaUrl: mediaUrl,
        authorId: authorId,
      },
    })

    return res.status(201).json(updatedPost);

  } catch (error) {
    console.log("Error in Updating Post", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const deletePostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    let post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return res.status(404).json({ error: "Post Dose Not Exist" });
    const deletedPost = await prisma.post.delete({
      where: {id: postId}
    })
    return res.status(204).send();
  } catch (e) {
    console.log("Error in Deleting Post", error.message);
    res.status(500).json({ error: error.message });
  }
}