import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    author: String,
    authorId: String,
    content: String,
    key: String,
    // date: Date,
    // index: Number,
  },
  {
    timestamps: true,
    _id: false,
  }
);

const postsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [commentsSchema],
    // {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

var PostsModel = mongoose.model("Posts", postsSchema);

export default PostsModel;
