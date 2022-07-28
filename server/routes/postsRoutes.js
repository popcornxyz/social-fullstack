import express from "express";

import {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  updateComment,
  addLike,
  removeLike,
} from "../controllers/postsControllers.js";

const router = express.Router();

router.get("/home/:userId", getPosts);
router.get("/profile/:username", getPost);
router.post("/", addPost);
router.put("/:postId", editPost);
router.delete("/:postId", deletePost);

router.put("/comment/add/:postId", addComment);
router.put("/comment/delete/:postId", deleteComment);
router.put("/comment/update/:postId", updateComment);

router.put("/like/add/:postId", addLike);
router.put("/like/remove/:postId", removeLike);

export default router;
