const chai = require('chai')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()
const expect = chai.expect

describe('Case.getList', () => {

  it('Succeed with valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    const options = {}
    tainanOpen1999.Case.getList(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(61)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with single service and valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    const options = {serviceName: '違規停車'}
    tainanOpen1999.Case.getList(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(33)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with multiple services and valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    const options = {serviceName: ['違規停車', '道路維修']}
    tainanOpen1999.Case.getList(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(36)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with valid time interval at tick', (done) => {
    const startTime = '2017-04-01 10:51:00'
    const endTime = '2017-04-01 10:51:00'
    const options = {serviceName: ['違規停車', '道路維修']}
    tainanOpen1999.Case.getList(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(1)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with invalid time interval', (done) => {
    const startTime = '2017:00'
    const endTime = '2017-0 16:59:59'
    const options = {}
    tainanOpen1999.Case.getList(startTime, endTime, options, (error, data) => {
      error.should.equal('Invalid time format')
      expect(data).to.be.null
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
  
})