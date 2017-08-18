let chai = require('chai');
process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test'
const { expect } = require('chai');
let chaiHttp = require('chai-http');
const helper = require('../helpers/db.js');
const db = require('../../src/db/contacts.js');
const app = require('../../src/server.js');

const contact1 = {
  first_name: 'Jared',
  last_name: 'Grippe'
}

const contact2 = {
  first_name: 'Tanner',
  last_name: 'Welsh'
}

const contact3 = {
  first_name: 'NeEddra',
  last_name: 'James'
}

helper.resetDB(['contacts'])
chai.use(chaiHttp);

describe('Routes testing, unauthenticated', () => {

  describe('Trying to access /', () => {
    it('renders a page that includes the 3 starter names from database', (done) => {
      db.createContact(contact1)
        .then(() => {
          db.createContact(contact2)
        })
        .then(() => {
          db.createContact(contact3)
        })
        .then(() => {
          chai.request(app)
          .get('/')
          .end((err, res) => {
//        console.log(res.text)
            expect(res.text).to.include("Jared")
            expect(res.text).to.include("Tanner")
            expect(res.text).to.include("NeEddra")

            done()
          })
        })
    })
  })

  describe('Trying /contacts/new', () => {
    it('renders a page with a form that lets you add contacts', (done) => {
      chai.request(app)
      .get('/contacts/new')
      .end((err, res) => {
//        console.log(res.text)
        expect(res.text).to.include("Add Contact")

        done()
      })
    })
  })

  describe('/contacts POST route that saves contact data to the database', () => {
    it('trys to send jack black to new contact', (done) =>{
      chai.request(app)
      .post('/contacts')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({first_name: 'Jack', last_name: 'Black'})
//      .end()
      .then (() => {
      // .field('first_name', 'Jack')
      // .field('last_name', 'Black')
        chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.include('Jack')
          done()
        })
      })
    })
  })

  describe('/contacts/:contactId GET route that makes sure the correct data is returned', () => {
    it('trys seeing if Jack Black is number 4', (done) =>{
      chai.request(app)
      .get('/contacts/4')
      .end((err, res) => {
        expect(res.text).to.include('Black')
        done()
      })
    })
  })

  describe('/contacts/:contactId/delete GET route that makes sure the correct data is deleted', () => {
    it('will delete Jack Black and redirect to a homepage that includes starter names', (done) =>{
      chai.request(app)
      .get('/contacts/4/delete')
      .end((err, res) => {
        expect(res.text).to.include('Tanner')
        expect(res.text).to.include("NeEddra")
        expect(res.text).to.include("Jared")
        expect(res.text).to.not.include('Jack')
        done()
      })
    })
  })

  describe('/search GET route that checks that the search is returning the correct data and rendering the correct page', () => {
    it('will execute basic search', (done) =>{
      chai.request(app)
      .get('/contacts/search?q=tan')
      .end((err, res) => {
        expect(res.text).to.include('Tanner')
        expect(res.text).to.not.include('Jared')
        done()
      })
    })
  })
})
