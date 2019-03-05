const express = require("express");
const PostController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const { body } = require('express-validator/check');


const router = express.Router();

router.get("", checkAuth, PostController.getPosts);

router.get("/:id", checkAuth, PostController.getPost);

router.post("", checkAuth,
   [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ]
  ,PostController.createPost);

router.put("/:id", checkAuth,
   [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  PostController.updatePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;