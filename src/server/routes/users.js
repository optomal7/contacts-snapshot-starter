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
            req.session.passHash = data.pass_hash
            req.session.role = data.role
            console.log(req.session)
            res.redirect('../')
      } else {
        res.redirect('/')
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

    // .then((hash) => { console.log('argss::', request.body.newPassword, hash);
    //                   return bcrypt.compare(request.body.newPassword, hash) })
    // .then(function(res) {
    //   console.log("testing it out")
    //   console.log(res);
    //})
    .catch(err => console.log('Error has occured', err))

  // console.log(request.session.name)
  // console.log(request.session);
  console.log(request.body);

})


module.exports = router
