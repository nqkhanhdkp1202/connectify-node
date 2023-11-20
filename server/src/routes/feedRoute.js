const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const feedController = require("../controllers/feedController");
const { verifyToken } = require("../handlers/tokenHandler");


// GET /feed/posts
router.get("/posts", verifyToken, feedController.getPosts);

router.post(
  "/post",
  verifyToken,
  feedController.createPost
);

router.get("/post/:postId", verifyToken, feedController.getPost);

router.put(
  "/post/:postId",
  verifyToken,
  feedController.updatePost
);

router.delete("/post/:postId", verifyToken, feedController.deletePost);

module.exports = router;
