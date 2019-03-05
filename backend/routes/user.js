const express = require('express');
const UserController = require('../controllers/user');
const { body } = require('express-validator/check');
const extractFile = require("../middleware/file");


const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      // .isAlphanumeric()
      .trim()
  ],
  // extractFile,
  UserController.createUser
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      // .isAlphanumeric()
      .trim()
  ],
  UserController.userLogin
);





////////
router.get('/user', UserController.userData );

// tests the update user profile from the settings in the client - with an image
router.post('/test', extractFile, UserController.userTest );


module.exports = router;
