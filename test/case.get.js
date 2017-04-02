const chai = require('chai')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()
const expect = chai.expect

describe('Case.get', () => {

  it('Succeed with valid case ID', (done) => {
    const caseId = 'UN201704010282'
    tainanOpen1999.Case.get(caseId, (error, data) => {
      data.service_request_id.should.equal(caseId)
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

})
