import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getAllComments = async (_, res) => {
  try {
    const comments = await prisma.comment.findMany();
    if (!comments) {
      return res.status(404).json({ message: 'Did Not Find Any Comments' });
    }
    else {
      res.status(200).json(comments);
    }
  } catch (error) {
    console.log("Error in Getting comments: ", error.message);
    res.status(500).json({ error: error.message });

  }
}


export const getCommentsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
      where : {userId: userId}
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'Comments Did Not Found' });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error in Getting Post of Users: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
      where : {postId: postId}
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'Comments Did Not Found' });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error in Getting Post of Users: ", error.message);
    res.status(500).json({ error: error.message });
  }
};


export const createNewComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id;
  try {
    if (!content || !userId || !postId) {
      return res.status(404).json({ error: "Please provide All Of the Comment Information" });
    }
    if (content.length < 10) {
      return res.status(400).json({ error: "You post should at least be 10 Character" });
    }

    const newComment = await prisma.comment.create({
      data: {
        content: content,
        userId: userId,
        postId: postId,
      },
    });
    return res.status(201).json(newComment);
  } catch (error) {
    console.log("Error in Creating New Comment", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const updateCommentById = async (req, res) => {
  const { content, postId } = req.body;
  const commentId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    let comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) return res.status(404).json({ error: "Comment Dose Not Exist" });
    if (!content) {
      return res.status(404).json({ error: "Please provide Comment Content" });
    }
    if (content.length < 10) {
      return res.status(400).json({ error: "Comment must be at least 10 Character" });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
        userId: userId,
        postId: postId,
      },
    })

    return res.status(201).json(updatedComment);
  } catch (error) {
    console.log("Error in Updating Comment", error.message);
    res.status(500).json({ error: error.message });
  }
}

export const deleteCommentById = async (req, res) => {
  const commentId = parseInt(req.params.id);
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) return res.status(404).json({ error: "Comment Dose Not Exist" });
    const deletedComment = await prisma.comment.delete({
      where: {id: commentId}
    })
    return res.status(204).send();
  } catch (e) {
    console.log("Error in Deleting Comment", error.message);
    res.status(500).json({ error: error.message });
  }
}