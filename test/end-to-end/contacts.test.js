//These tests are a WIP
//Don't expect them to even resemble functioning code


let chai = require('chai');
const { expect } = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');


const app = require('../../src/server.js');

const user = {username: 'test0', passHash: '0000'}

let authenticatedUser = request.agent(app)
chai.use(chaiHttp);

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
      console.log(request.agent);
      expect(response.statusCode).to.equal(302);
      expect('Location', '/');
      done();
    });
});



describe('Routes + authentication', () => {
  it('Can login?', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        console.log(request);

        done()
      })

//   console.log('first');
//   chai.request(app)
//     .post('/login')
//     .set('content-type', 'application/x-www-form-urlencoded')
//     .send({passHash: '1111', username: 'test1'})
//     .end((err, res) => {
//       console.log('Heyoo');
// //      console.log(res);
//       console.log(res);
//       expect(res.statusCode).to.equal(200);
//       expect('Location', '/')
//       done()
//    })

  })

})
