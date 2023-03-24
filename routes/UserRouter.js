const express = require('express');
const router = express.Router();

const {
  userSignup,
  userLogin,
  getUser,
} = require('../controllers/UserControllers');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/:id', getUser);

module.exports = router;
