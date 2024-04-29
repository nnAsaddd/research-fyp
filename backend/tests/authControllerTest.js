const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, start} = require('../index');

chai.use(chaiHttp);
const should = chai.should();
before(async () => {
    await start();  // Ensure DB is connected before tests
});
describe('Auth Controller', () => {
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/auth/users')
                .end((err, res) => {
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('users').that.is.an('array');
                    done();
                });
        });
    });

    describe('/POST register', () => {
        it('it should not POST a user without email field', (done) => {
            let user = {
                name: "John Doe",
                password: "123456"
            };
            chai.request(app)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    should.exist(res);
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('Please provide all information');
                    done();
                });
        });

        it('it should POST a new user', (done) => {
            // Generating a random email for register
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let mailForRegister = '';
            const charactersLength = characters.length;
            for (let i = 0; i < 10; i++) {
                mailForRegister += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            mailForRegister += "@gmail.com"
            let user = {
                name: "John Doe",
                email: mailForRegister,
                password: "123456"
            };
            chai.request(app)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('User Created Successfully');
                    res.body.should.have.property('user');
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('it should not POST a login without password', (done) => {
            let login = {
                email: "ahmed@gmail.com"
            };
            chai.request(app)
                .post('/auth/login')
                .send(login)
                .end((err, res) => {
                    should.exist(res);
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('Please provide all information');
                    done();
                });
        });

        it('it should POST a login', (done) => {
            let login = {
                email: "john@example.com",
                password: "123456"
            };
            chai.request(app)
                .post('/auth/login')
                .send(login)
                .end((err, res) => {
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('User logged in Successfully');
                    res.body.should.have.property('accessToken');
                    done();
                });
        });
    });
});

/*
RESULT :
Auth Controller
/GET users
GET /auth/users
  √ it should GET all the users (293ms)
/POST register
POST /auth/register
  √ it should not POST a user without email field (61ms)
POST /auth/register
  √ it should POST a new user (381ms)
/POST login
POST /auth/login
  √ it should not POST a login without password
POST /auth/login
  √ it should POST a login (182ms)


5 passing (2s)
 */