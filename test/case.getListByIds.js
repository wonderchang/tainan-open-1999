const chai = require('chai')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()

describe('Case.getListByIDs', () => {

  it('Succeed with two valid case IDs', (done) => {
    const caseIds = ['UN201704020213', 'UN201704010282']
    tainanOpen1999.Case.getListByIDs(caseIds, (error, data) => {
      data.num.should.equal(caseIds.length)
      data.cases[0].service_request_id.should.equal(caseIds[0])
      data.cases[1].service_request_id.should.equal(caseIds[1])
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with one of invalid Case ID', (done) => {
    const caseIds = ['UN201', 'UN201704010282']
    tainanOpen1999.Case.getListByIDs(caseIds, (error, data) => {
      data.num.should.equal(1)
      data.cases[0].service_request_id.should.equal('UN201704010282')
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with both invalid Case IDs', (done) => {
    const caseIds = ['U020213', 'UN2014012']
    tainanOpen1999.Case.getListByIDs(caseIds, (error, data) => {
      data.num.should.equal(0)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

})
