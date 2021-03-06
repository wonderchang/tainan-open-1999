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

describe('getCasesByIds', () => {
  it('Succeed with two valid case IDs', (done) => {
    const caseIds = ['UN201704020213', 'UN201704010282']
    tainanOpen1999.getCasesByIds(caseIds, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(caseIds.length)
      data.cases[0].caseId.should.equal(caseIds[0])
      data.cases[1].caseId.should.equal(caseIds[1])
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with one of invalid Case ID', (done) => {
    const caseIds = ['UN201', 'UN201704010282']
    tainanOpen1999.getCasesByIds(caseIds, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(1)
      data.cases[0].caseId.should.equal('UN201704010282')
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with both invalid Case IDs', (done) => {
    const caseIds = ['U020213', 'UN2014012']
    tainanOpen1999.getCasesByIds(caseIds, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(0)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const caseIds = ['UN201704020213', 'UN201704010282']
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.getCasesByIds(caseIds, (error, data) => {
      error.should.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
})
