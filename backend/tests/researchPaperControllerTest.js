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

describe('Research Paper Controller', function() {
    let token;

    before(async () => {
        this.timeout(10000);
        await start(); // Ensure DB is connected before tests
        token = await loginUserAndGetToken();
    });

    describe('GET /researchPapers', () => {
        it('should fetch all research papers when they exist', (done) => {
            chai.request(app)
                .get('/researchPapers')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('researchPapers').that.is.an('array');
                    done();
                });
        }).timeout(5000);
    });

    describe('POST /researchPapers', () => {

        it('should return 400 if required fields are missing', (done) => {
            chai.request(app)
                .post('/researchPapers')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Please send data in form-data form');
                    done();
                });
        }).timeout(5000);
    });

    describe('DELETE /researchPapers', () => {
        it('should return 500 if the research paper does not exist', (done) => {
            const invalidResearchPaperId = '6600140bfca0fa4d3a55f3bc';
            chai.request(app)
                .delete(`/researchPapers/${invalidResearchPaperId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ researchPaperId: invalidResearchPaperId })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message', 'No research paper found with given id');
                    done();
                });
        }).timeout(5000);
    });

    describe('PATCH /researchPapers', () => {
        it('should update a research paper successfully', (done) => {
            const updateData = {
                name: 'Updated Research Paper Name',
                physicalLocation: 'Updated Location',
                id : '660014edfca0fa4d3a55f3d2'
            };

            chai.request(app)
                .patch('/researchPapers')
                .set('Authorization', `Bearer ${token}`)
                .send(updateData)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Research Paper updated Successfully.');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if no research paper id is provided', (done) => {
            const updateData = {
                name: 'Updated Research Paper Name'
            };

            chai.request(app)
                .patch('/researchPapers')
                .set('Authorization', `Bearer ${token}`)
                .send(updateData) // Missing researchPaperId
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Please provide research paper id');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if no paper with given id found', (done) => {
            const id = '6600140bfca0fa4d3a55f3bc';
            const updateData = {
                name: 'Updated Research Paper Name'
            };

            chai.request(app)
                .patch('/researchPapers')
                .set('Authorization', `Bearer ${token}`)
                .send({ id, ...updateData })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'No paper with given id found');
                    done();
                });
        }).timeout(5000);
    });
});


/*
RESULT :
Research Paper Controller
Connected to DB
GET /researchPapers
  √ should return 200 if research papers found
POST /researchPapers
  √ should return 400 if required fields are missing
DELETE /researchPapers
  √ should return 500 if the research paper does not exist
PATCH /researchPapers
  √ should update a research paper successfully
PATCH /researchPapers
  √ should return 400 if no research paper id is provided
PATCH /researchPapers
  √ should return 400 if no paper with given id found (187ms)

6 passing (2s)
 */