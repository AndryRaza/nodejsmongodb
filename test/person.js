const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Person Tests', () => {
    /**
     * 
     * Test GET create
     */
    describe('GET /create', () => {
        it('It should render a page to add a user', (done) => {
            chai.request('http://localhost:3000')
                .get('/create')
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        })
    })
    /**
     * 
     * Test GET Personnes 
     */
    describe('GET /personnes', () => {
        it('It should render a page with a list of persons', (done) => {
            chai.request('http://localhost:3000')
                .get('/personnes')
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        })
    })
    /**
     * 
     * Test PUT personne
     */
    describe('PUT /personne', () => {
        it('It should add a person in db', (done) => {
            chai.request('http://localhost:3000')
                .put('/personne')
                .send({ firstName: 'Andry', lastName: 'Moi' })
                .end((err, response) => {
                    expect(err).to.be.null
                    response.should.have.status(200);
                })
            done();
        })
    })
    /**
     * 
     * Test PUT personne
     */
    describe('PUT /personne', () => {
        it('It should return error 403', (done) => {
            chai.request('http://localhost:3000')
                .put('/personne')
                .send({ firstName: 'Andry<script>', lastName: 'Moi' })
                .end((err, response) => {
                    response.should.have.status(403);
                })
            done();
        })
    })

})