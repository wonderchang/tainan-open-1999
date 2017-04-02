const chai = require('chai')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()

describe('Case.get', () => {

  it('Succeed', (done) => {
    caseId = 'UN201704010282'
    tainanOpen1999.Case.get(caseId, (error, data) => {
      data.service_request_id.should.equal(caseId)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
  
  it('Failed with invalid Case ID', (done) => {
    caseId = 'UN20172'
    tainanOpen1999.Case.get(caseId, (error, data) => {
      error.should.equal('查無案件資料')
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

})
