const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.createUser = (req, res, next) => {
  const errors = validationResult(req); // errors from the validation in the router
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        imagePath: req.body.imagePath
      });

      console.log('user: ', user);
      user
      // .save((err) => { console.log(err) }) // mongoose uniqueValidator error if exits
        .save()
        .then(result => {
          let email = {
            to: ['yonikanwork@gmail.com'],
            // to: req.body.email,
            from: 'posty@posty.com',
            text: 'Awesome sauce testinggg',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          };
          transporter.sendMail(email, function(err, res) {
            if (err) { 
                console.log(err);
            }
            console.log(res);
          });
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          // const error = new Error(err);
          // error.httpStatusCode = 500;
          // return next(error);
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
   });
};

exports.userLogin = (req, res, next) => {
  // const errors = validationResult(req);
  // console.log(errors.array());
  // if (!errors.isEmpty()) {}

  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
};

// added later
exports.userData = (req, res, next) => {
  // User.findOne({ email: req.body.email })
  //   .then(user => {

  //   })
  //   .catch(err => {

  //   });
  const url = req.protocol + "://" + req.get("host");
  res.status(200).json({
    userId: '2121212122',
    userImage: url + "/images/users/profile-sm.jpg",
    userEmail: 'yonyon@rtrtrt.com',
    userFirstName: 'yonatan',
    userLastName: 'kangun',
    userPreferences: {
      theme: 'dark'
    }
  });
};

exports.userTest = (req, res, next) => {
  let imagePath = req.file;
  console.log('imagePath: ', imagePath);

  res.status(200).json({
    email: req.body.email,
    imagePath: req.file

    // fileUploaded: req.body.image
  });
}
