import express from "express";
import mongoose from "mongoose";

import PostsModel from "../models/posts.js";
import UsersModel from "../models/users.js";

const router = express.Router();

// ############################# POSTS #################################

// get all posts for home feed (user's posts + user's friend posts)
export const getPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await UsersModel.findById(userId);

    const userPosts = await PostsModel.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) =>
        PostsModel.find({ userId: friendId })
      )
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(404).json(error);
  }
};

// get all posts for a particular user
export const getPost = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UsersModel.findOne({ username });

    const posts = await PostsModel.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

//add a post
export const addPost = async (req, res) => {
  const { userId, desc, comments, img, likes, timestamps } = req.body;
  const newPost = new PostsModel({
    userId,
    desc,
    comments,
    img,
    likes,
    timestamps,
  });

  try {
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

//update a post
export const editPost = async (req, res) => {
  const { postId } = req.params;
  const { editedMessage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No post with id: ${postId}`);

  await PostsModel.findByIdAndUpdate(postId, { desc: editedMessage });

  res.status(200).json("Post Updated");

  // if (post.userId === req.body.userId) {
  // } else {
  // res.status(403).json("Not your post");
  // }
};

//delete a post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No post with id: ${postId}`);

  await PostsModel.findByIdAndRemove(postId);

  res.status(200).json("Post deleted");

  // if (post.userId === req.body.userId) {
  // } else {
  // res.status(403).json("Not your post");
  // }
};

// ############################# COMMENTS #################################

// add a comment
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { commentData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No post with id: ${postId}`);

  const post = await PostsModel.findById(postId);

  await post.updateOne({ $push: { comments: commentData } });

  res.status(200).json("comment added");
};

// delete a comment
export const deleteComment = async (req, res) => {
  const { postId } = req.params;
  const { key } = req.body;

  try {
    const post = await PostsModel.findById(postId);

    await post.updateOne({ $pull: { comments: { key } } });

    res.status(200).json("comment removed");
  } catch (error) {
    res.status(404).json(error);
  }
};

// update a comment
export const updateComment = async (req, res) => {
  const { postId } = req.params;
  const { editedComment } = req.body;
  const { key } = req.body;

  try {
    const post = await PostsModel.findById(postId);

    const comment = await post.comments.find((comment) => comment.key == key);

    post.save((comment.content = editedComment));

    //   console.log(key);

    //   // const post = await PostsModel.findById(postId);

    //   await PostsModel.findOneAndUpdate(
    //     { _id: postId },
    //     { $set: { commments.content: editedComment } }
    //   );

    //   console.log(post);

    res.status(200).json("comment updated");
  } catch (error) {
    res.status(404).json(error);
  }
};

// ############################# LIKES #################################

export const addLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostsModel.findById(postId);

    await post.updateOne({ $push: { likes: userId } });

    res.status(200).json("like added");
  } catch (error) {
    res.status(404).json(error);
  }
};

export const removeLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostsModel.findById(postId);

    await post.updateOne({ $pull: { likes: userId } });

    res.status(200).json("like removed");
  } catch (error) {
    res.status(404).json(error);
  }
};

export default router;
