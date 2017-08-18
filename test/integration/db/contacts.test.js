//const {  it } = require('mocha');
process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test'
const { expect } = require('chai');
const helper = require('../../helpers/db.js')
const db = require('../../../src/db/contacts.js');

let user = {
first_name: 'best',
last_name: 'user'
}

let otherUser = {
  first_name: 'Dave',
  last_name: 'Script'
}


helper.resetDB(['contacts'])
console.log('contacts table has been reset');

describe('database calls via contacts.js', () => {

  describe('createContact command', () => {
    it('Will create a contact', (done) => {
      db.createContact(otherUser)
      .then(() => {
        db.createContact(user)
        .then((data) => {
          expect(data).to.be.an('array')
          expect(data[0]).to.include({first_name: 'best', last_name: 'user'})
        })
      .then(() => done())
      })
    })
  })

  describe('getContacts command', () => {
    it('Will retrieve all the contacts from the database', (done) => {
      db.getContacts()
      .then((data) => {
        expect(data.filter((e) => e.first_name === 'best').length).to.be.greaterThan(0);
        expect(data.filter((e) => e.first_name === 'Dave').length).to.be.greaterThan(0);
        expect(data.filter((e) => e.first_name === 'Rando').length).to.equal(0)
      })
      .then(() => done())
    })
  })

  describe('getContact command', () => {
    it('Will bring back the specified contact', (done) => {
      db.getContact(2)
      .then((data) => {
        expect(data.first_name).to.equal('best')
        expect(data.last_name).to.equal('user')
      })
      db.getContact(3)
      .then((data) => {
        expect(data.received).to.equal(0)
      })
      .then(() => done())
    })
  })

  describe('deleteContact command', () => {
    it('Will delete only the specified contact', (done) => {
      db.getContacts()
      .then((data) => {
        expect(data.length).to.equal(2)
      })
      db.deleteContact(2)
      .then(() => {
        db.getContacts()
        .then((data) => {
          expect(data.length).to.equal(1)
        })
      })
      .then(() => done())
    })
  })

  describe('searchForContact command', () => {
    it('Will retrieve all contacts that meet search parameters', (done) => {
      db.createContact(otherUser)
      .then(() => {
        db.searchForContact('ave')
          .then((data) => {
            expect(data[0].first_name).to.equal('Dave')
            expect(data.length).to.equal(2)
          })
        })
      .then(() => done())
    })
  })

})
