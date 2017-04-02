const chai = require('chai')
const tainanOpen1999 = require('../index')

const should = chai.should()

describe('Case.getListByIds', () => {

  it('Succeed', (done) => {
    caseIds = ['UN201704020213', 'UN201704010282']
    tainanOpen1999.Case.getListByIds(caseIds, (error, data) => {
      data.num.should.equal(caseIds.length)
      data.cases[0].service_request_id.should.equal(caseIds[0])
      data.cases[1].service_request_id.should.equal(caseIds[1])
      done()
    })
  }).timeout(10000)
})
