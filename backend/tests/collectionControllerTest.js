const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, start } = require('../index'); // Adjust this path to point to where your Express app is initialized.

chai.use(chaiHttp);
const should = chai.should();

const loginUserAndGetToken = async() => {
    const loginDetails = { email: 'john@example.com', password: '123456' }; // Adjust accordingly
    const res = await chai.request(app)
        .post('/auth/login')
        .send(loginDetails);
    return res.body.accessToken;
}

describe('Collection Controller', function() {
    let token
    before(async () => {
        this.timeout(10000);
        await start(); // Ensure DB is connected before tests
        token = await loginUserAndGetToken();
    });

    describe('GET /collections', function() {
        it('should fetch all collections when collections exist', function(done) {
            chai.request(app)
                .get('/collections')
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('collections').that.is.an('array');
                    done();
                });
        }).timeout(5000);
    });

    describe('POST /collections', function() {
        it('should create a collection successfully', function(done) {
            const newCollection = {
                name: 'Test Collection',
                category: 'Books',
                userId: '65b27a7bb7257736adc056e1'
            };
            chai.request(app)
                .post('/collections')
                .set('authorization', `Bearer ${token}`)
                .send(newCollection)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Collection Created Successfully');
                    res.body.should.have.property('collection');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if required fields are missing', function(done) {
            const incompleteCollection = {
                name: 'Incomplete Collection',
                // category and userId are missing
            };
            chai.request(app)
                .post('/collections')
                .set('authorization', `Bearer ${token}`)
                .send(incompleteCollection)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('Please provide all the information');
                    done();
                });
        }).timeout(5000);
    });

    describe('DELETE /collections', function() {
        it('should return 400 if the collection does not exist', function(done) {
            const collectionId = '66229c145057d84b4e48f999';
            chai.request(app)
                .delete(`/collections/${collectionId}`)
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('No Collection found with this id');
                    done();
                });
        }).timeout(5000);
    });

    describe('PATCH /collections', function() {
        it('should update a collection successfully', function(done) {
            const updateData = {
                name: 'New Updated Name',
                category: 'New Updated Category',
                userId: '65b27a7bb7257736adc056e1',
                collectionId : '66229e4b082fd25b20d24f47'
            };
            chai.request(app)
                .patch('/collections')
                .set('authorization', `Bearer ${token}`)
                .send(updateData)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Collection Updated Successfully');
                    done();
                });
        }).timeout(5000);

        it('should return 400 if no new information is provided', function(done) {
            const collectionId = 'existingCollectionId';
            chai.request(app)
                .patch('/collections')
                .set('authorization', `Bearer ${token}`)
                .send({ collectionId }) // No new data provided
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('No new information provided');
                    done();
                });
        }).timeout(5000);
    });
});

/*
RESULT :
  Collection Controller
Connected to DB
POST /auth/login
    GET /collections
GET /collections
      √ should fetch all collections when collections exist (211ms)
    POST /collections
POST /collections
      √ should return 400 if the collection does not exist (123ms)
    PATCH /collections
PATCH /collections
      √ should update a collection successfully (182ms)
PATCH /collections
      √ should return 400 if no new information is provided

6 passing (3s)
 */