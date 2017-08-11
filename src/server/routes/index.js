const express = require('express');
const app = express();
const router = express.Router();
const contacts = require('./contacts')
const users = require('./users');
const DbContacts = require('../../db/contacts');

router.get('/', (request, response) => {
  if (!request.session.role) {
    let error = 'Not logged in!'
    response.render('login', {error})
  } else {
    DbContacts.getContacts()
      .then((contacts) => {
        let userinfo = request.session
        console.log(contacts);
        response.render('index', { contacts, userinfo })})
      .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/login', users);

module.exports = router;
