let express = require('express'),
  router = express.Router();
const { signup, signin, checkUser } = require('../controllers/auth.controller');
const Joi = require('joi'); 
const { validate } = require('../middleware/joiValidation');

const signinSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/signup', signup);
router.post('/signin', validate(signinSchema), signin);
router.get('/me', checkUser);

// READ users
router.route('/').get((req, res) => {
  res.json({ message: 'Hello from server!' });

  //   userSchema.find((error, data) => {
  //     if (error) {
  //       return next(error)
  //     } else {
  //       res.json(data)
  //     }
  //   })
});

module.exports = router;
