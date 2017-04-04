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

describe('getCase', () => {
  it('Succeed with valid case ID', (done) => {
    const caseId = 'UN201704030228'
    tainanOpen1999.getCase(caseId, (error, data) => {
      expect(error).to.be.null()
      expect(data.caseId).to.equal(caseId)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with invalid Case ID', (done) => {
    const caseId = 'UN20172'
    tainanOpen1999.getCase(caseId, (error, data) => {
      expect(error).to.be.null()
      expect(data).to.be.null()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const caseId = 'UN201704010282'
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.getCase(caseId, (error, data) => {
      expect(error).to.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
})
