let express = require('express'),
  router = express.Router();
const { signup, signin, checkUser } = require('../controllers/auth.controller');
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', checkUser);

// READ users
router.route('/').get((req, res) => {
  res.json({ message: "Hello from server!" });

//   userSchema.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
});

module.exports = router;