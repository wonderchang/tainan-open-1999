const chai = require('chai')
const sinon = require('sinon')
const request = require('request')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should()
const expect = chai.expect

describe('getCases', () => {

  it('Succeed with valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    tainanOpen1999.getCases(startTime, endTime, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(61)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with single service and valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    const options = {serviceName: '違規停車'}
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(33)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with multiple services and valid time interval', (done) => {
    const startTime = '2017-04-01 10:00:00'
    const endTime = '2017-04-01 16:59:59'
    const options = {serviceName: ['違規停車', '道路維修']}
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(36)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with valid time interval at tick', (done) => {
    const startTime = '2017-04-01 10:51:00'
    const endTime = '2017-04-01 10:51:00'
    const options = {serviceName: ['違規停車', '道路維修']}
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(1)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with empty data valid time interval', (done) => {
    const startTime = '2000-04-01 10:51:00'
    const endTime = '2000-04-01 10:51:00'
    const options = {}
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      expect(error).to.be.null
      data.num.should.equal(0)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with invalid time interval', (done) => {
    const startTime = '2017:00'
    const endTime = '2017-0 16:59:59'
    const options = {}
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      error.should.equal('Invalid time format')
      expect(data).to.be.null
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
  
  it('Failed arise from request error', (done) => {
    const startTime = '2017-04-01 10:51:00'
    const endTime = '2017-04-01 10:51:00'
    const options = {}
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.getCases(startTime, endTime, options, (error, data) => {
      error.should.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with empty argument passed', () => {
    tainanOpen1999.getCases()
  })
  
})
