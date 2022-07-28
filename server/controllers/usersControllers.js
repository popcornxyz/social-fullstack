import express from "express";
import mongoose from "mongoose";

import UsersModel from "../models/users.js";

const router = express.Router();

//add a user
export const addUser = async (req, res) => {
  const { email, username, id } = req.body;
  const newUser = new UsersModel({ email, username, _id: id });

  try {
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(409).json(error);
  }
};

//get a user by id
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UsersModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

//get a user by username
export const getUserByName = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UsersModel.findOne({ username });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

//get user's friends
export const getUserFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UsersModel.findById(userId);
    console.log(user);
    const friends = await Promise.all(
      user.followings.map((friendId) => UsersModel.findById(friendId))
    );
    console.log(friends);

    // let friendList = [];
    // friends.map((friend) => {
    //   const { _id, username, profilePicture } = friend;
    //   friendList.push({ _id, username, profilePicture });
    // });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json(error);
  }
};

//follow a user
export const followUser = async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.body;
  // if (userId !== currentUserId) {

  try {
    const user = await UsersModel.findById(userId);

    const currentUser = await UsersModel.findById(currentUserId);

    // if (!user.followers.includes(currentUserId)) {
    await user.updateOne({ $push: { followers: currentUserId } });

    await currentUser.updateOne({ $push: { followings: userId } });

    res.status(200).json("user followed");
    // } else {
    // res.status(403).json("you allready follow this user");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  // res.status(403).json("you cant follow yourself");
  // }
};

//unfollow a user
export const unfollowUser = async (req, res) => {
  // if (req.body.userId !== req.params.id) {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    const user = await UsersModel.findById(userId);

    const currentUser = await UsersModel.findById(currentUserId);

    // if (user.followers.includes(req.body.userId)) {
    await user.updateOne({ $pull: { followers: currentUserId } });

    await currentUser.updateOne({ $pull: { followings: userId } });

    res.status(200).json("user unfollowed");
    // } else {
    // res.status(403).json("you dont follow this user");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  // res.status(403).json("you cant unfollow yourself");
};
