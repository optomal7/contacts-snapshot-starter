const express = require('express');
const app = express();
const router = express.Router();
const contacts = require('./contacts')
const users = require('./users');
const DbContacts = require('../../db/contacts');



router.use


router.get('/', (request, response) => {
  console.log('--------------');
  console.log(request.session);
  if (!request.session.role) {
    response.redirect('/login')
  }
  DbContacts.getContacts()
    .then((contacts) => {
      let userinfo = request.session
      console.log(contacts);
      response.render('index', { contacts, userinfo })})
    .catch( err => console.log('err', err) )
})

// router.get('/login', (request, response) => {
//   response.render('login');
// })
//
// router.post('/login', (request, response) => {
//   dbUsers.getUser(request.body)
//     .then((data) => {
//       request.session.user = data
//     })
//     .then(() => console.log(request.session))
//   response.redirect('/contacts');
// })

router.get('/signup', (request, response) => {
  response.render('signup');
})



router.use('/contacts', contacts); // /contacts/search
router.use('/login', users);

module.exports = router;
