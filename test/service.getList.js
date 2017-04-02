const chai = require('chai')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()

describe('Service.getList', () => {
  it('Succeed', (done) => {
    tainanOpen1999.Service.getList((error, data) => {
      data.num.should.equal(10)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
})
