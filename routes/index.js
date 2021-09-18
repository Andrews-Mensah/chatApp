var express = require('express');
var router = express.Router();

const { SignUp } = require('../controllers/authentication/signup')
const { Login } = require('../controllers/authentication/login')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.post('/register', SignUp)
router.post('/login', Login)

module.exports = router;
