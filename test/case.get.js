const chai = require('chai')
const sinon = require('sinon')
const request = require('request')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()
const expect = chai.expect

describe('Case.get', () => {

  it('Succeed with valid case ID', (done) => {
    const caseId = 'UN201704030228'
    tainanOpen1999.Case.get(caseId, (error, data) => {
      data.caseId.should.equal(caseId)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
  
  it('Failed with invalid Case ID', (done) => {
    const caseId = 'UN20172'
    tainanOpen1999.Case.get(caseId, (error, data) => {
      expect(data).to.be.null
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const caseId = 'UN201704010282'
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.Case.get(caseId, (error, data) => {
      error.should.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

})
