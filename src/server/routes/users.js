const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');


const dbUsers = require('../../db/users');


router.get('/', (req, res) => {
  res.render('login');
})

router.post('/', (req, res) => {
  console.log(req.body);
  dbUsers.getUser(req.body)
    .then((data) => {
      console.log(data.username);
      if (req.body.username === data.username && bcrypt.compareSync(req.body.passHash, data.pass_hash)) {
            console.log(data)
            req.session.username = data.username
            req.session.role = data.role
            console.log(req.session)
            res.redirect('../')
      } else {
        let error = 'Erm, are you sure you got the username/password right?';
        res.render('login', { error })
      }
    })
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (request, response) => {
  console.log(request.body)
  bcrypt.hash(request.body.newPassword, 10)
    .then((hash) => request.body.passHash = hash)
    .then(() => {
      console.log(request.body);
      dbUsers.createUser(request.body)
      .then(() => response.render('login'))
      .catch( err => console.log('err', err) )
    })
    .catch(err => console.log('Error has occured', err))
})


module.exports = router
