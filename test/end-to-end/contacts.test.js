let chai = require('chai');
const { expect } = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../../src/server.js');

const user = {username: 'test0', passHash: '0000'}

let authenticatedUser = request.agent(app)

// describe('End to end tests', () => {
//   describe('something here', () => {
//     it('should let me in and redirect to home', (done) => {
//       request(app)
//         .post('/login')
//         .set('content-type', 'application/x-www-form-urlencoded')
//     })
//   })
// })
before((done) => {
  authenticatedUser
    .post('/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .type('form')
    .send('passHash=0000')
    .send('username=test0')
    .end((err, response) => {
      console.log('sup');
      console.log(response);
      expect(response.statusCode).to.equal(302);
      expect('Location', '/');
      done();
    });
});

chai.use(chaiHttp);
describe('Routes + authentication', () => {
  it('Can login?', (done) => {
  console.log('first');
  chai.request(app)
    .get('/')

    .end((err, res) => {
      console.log('Heyoo');
      console.log(res);
      done()
    })
    })

})
