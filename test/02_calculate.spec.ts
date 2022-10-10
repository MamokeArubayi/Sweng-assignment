'use strict'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'

chai.use(chaiHttp)

const expect = chai.expect

describe('calculatorRoute', async () => {
    it('should respond with a status 404 because there is an invalid string', () => {
        return chai
            .request(app)
            .get('/calculator')
            .then(res => {
                expect(res.status).to.be.equal(404)
        })
    })
    it('should respond with a status 200 because there is a valid string', () => {
        return chai
            .request(app)
            .get('/calculator')
            .then(res => {
                expect(res.status).to.be.equal(200)
        })
    })
})