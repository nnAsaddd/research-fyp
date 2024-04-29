const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const { app, start } = require('../index'); // Adjust this path to point to where your Express app is initialized.

chai.use(chaiHttp);
const expect = chai.expect;
const loginUserAndGetToken = async() => {
    const loginDetails = { email: 'john@example.com', password: '123456' }; // Adjust accordingly
    const res = await chai.request(app)
        .post('/auth/login') // Your login route
        .send(loginDetails);
    return res.body.accessToken; // Assuming the token is returned in the body
}
describe('Comment Controller', function() {
    let token;
    before(async () => {
        this.timeout(10000);
        await start(); // Ensure DB is connected before tests
        token = await loginUserAndGetToken();
    });

    describe('GET /comments', () => {
        it('should fetch all comments when they exist', (done) => {
            chai.request(app)
                .get('/comments')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('comments').that.is.an('array');
                    done();
                });
        }).timeout(5000);
    });

    describe('POST /comments', () => {
        it('should create a comment successfully', (done) => {
            const commentData = {
                text: "This is a test comment",
                researchPaperId: "660014edfca0fa4d3a55f3d2"
            };
            chai.request(app)
                .post('/comments')
                .set('Authorization', `Bearer ${token}`)
                .send(commentData)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Comment created successfully');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if required fields are missing', (done) => {
            chai.request(app)
                .post('/comments')
                .set('Authorization', `Bearer ${token}`)
                .send({ text: "Incomplete comment" }) // missing researchPaperId
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Please Provide complete information');
                    done();
                });
        }).timeout(5000);
    });

    describe('PATCH /comments', () => {
        it('should update a comment successfully', (done) => {
            const updateData = {
                commentId: "65be2cd2dfa7e8c62083b802",
                text: "Updated text for existing comment"
            };
            chai.request(app)
                .patch('/comments')
                .set('Authorization', `Bearer ${token}`)
                .send(updateData)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Comment updated successfully');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if no comment id is provided', (done) => {
            chai.request(app)
                .patch('/comments')
                .set('Authorization', `Bearer ${token}`)
                .send({ text: "Updated text without id" })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Please provide comment Id');
                    done();
                });
        }).timeout(5000);
    });
});

/*
RESULT :
GET /comments
  √ should fetch all comments when they exist (95ms)
POST /comments
  √ should create a comment successfully (199ms)
POST /comments
  √ should return 400 if required fields are missing
PATCH /comments
  √ should update a comment successfully (186ms)
PATCH /comments
  √ should return 400 if no comment id is provided

 5 passing (3s)
 */
