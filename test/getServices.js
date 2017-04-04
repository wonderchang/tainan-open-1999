/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const request = require('request')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should() // eslint-disable-line 
const expect = chai.expect

chai.use(dirtyChai)

describe('getServices', () => {
  it('Succeed', (done) => {
    tainanOpen1999.getServices((error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(10)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.getServices((error, data) => {
      error.should.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
})
