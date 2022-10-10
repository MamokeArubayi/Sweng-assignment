'use strict'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'

chai.use(chaiHttp)

const expect = chai.expect

describe('calculatorRoute',  () => {
    it('should respond with a status 404 because there is an invalid string', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .then(res => {
                expect(res.status).to.be.equal(404)
        })
    })
    it('should respond with a status 200 because there is a valid string', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .then(res => {
                expect(res.status).to.be.equal(404)
        })
    })
    it('should respond with a status 200 because there is a valid string', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '1+1' })
            .then(res => {
                expect(res.status).to.be.equal(200)
        })
    })
    it('Should assert that the response is 2 given the input 1+1', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '1+1' })
            .then(res => {
                expect(res.body.result).to.be.equal(2)
        })
    })
    it('Should assert that the response is 2 given the input 4-2', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '4-2' })
            .then(res => {
                expect(res.body.result).to.be.equal(2)
        })
    })
    it('Should assert that the response is 4 given the input 2*2', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '2*2' })
            .then(res => {
                expect(res.body.result).to.be.equal(4)
        })
    })
    it('Should assert that the response is 20 given the input 10+10', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '10+10' })
            .then(res => {
                expect(res.body.result).to.be.equal(20)
        })
    })
    it('Should assert that the response is 2 given the input 4/2', async () => {
        return chai
            .request(app)
            .get('/calculator')
            .send({ expression: '4/2' })
            .then(res => {
                expect(res.body.result).to.be.equal(2)
        })
    })
})