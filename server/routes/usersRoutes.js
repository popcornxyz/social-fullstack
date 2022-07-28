import express from "express";

import {
  addUser,
  getUserById,
  getUserByName,
  getUserFriends,
  followUser,
  unfollowUser,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", addUser);
router.get("/userId/:userId", getUserById);
router.get("/username/:username", getUserByName);
router.get("/friends/:userId", getUserFriends);
router.put("/follow/:userId", followUser);
router.put("/unfollow/:userId", unfollowUser);

export default router;
