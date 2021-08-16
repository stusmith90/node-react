const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');

exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: 'email already exists' }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }],
      });
    });
};


exports.signin = (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: 'incorrect' }] });
            }
            this.createToken(user, 200, req, res);
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};

//create token for authenticated user 
const signToken = id => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
  });
}

exports.createToken = (user, code, req, res) => {
  const token = signToken(user._id);

    //set expiry to 1 month 
    let d = new Date();
    d.setDate(d.getDate() + 30);

    //cookie settings 
    res.cookie('jwt', token, {
        expires: d, 
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
    });

    //remove user password from output
    user.password = undefined; 
    res.status(code).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

//check if user is logged in 
exports.checkUser = catchAsync(async(req, res, next) => {
  let currentUser;
  if (req.cookies.jwt) {
      const token = req.cookies.jwt;
      const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser =  null;
    }    

    res.status(200).send({ currentUser });
});
