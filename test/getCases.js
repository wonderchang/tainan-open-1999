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

describe('getCases test cases', () => {
  it('Succeed with valid time interval', (done) => {
    const options = {
      startFrom: '2017-04-01 10:00:00',
      endTo: '2017-04-01 16:59:59'
    }
    tainanOpen1999.getCases(options, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(61)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with single service and valid time interval', (done) => {
    const options = {
      startFrom: '2017-04-01 10:00:00',
      endTo: '2017-04-01 16:59:59',
      serviceName: '違規停車'
    }
    tainanOpen1999.getCases(options, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(33)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with multiple services and valid time interval', (done) => {
    const options = {
      startFrom: '2017-04-01 10:00:00',
      endTo: '2017-04-01 16:59:59',
      serviceName: ['違規停車', '道路維修']
    }
    tainanOpen1999.getCases(options, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(36)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with valid time interval at tick', (done) => {
    const options = {
      startFrom: '2017-04-01 10:51:00',
      endTo: '2017-04-01 10:51:00',
      serviceName: ['違規停車', '道路維修']
    }
    tainanOpen1999.getCases(options, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(1)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Succeed with valid time interval but empty data', (done) => {
    const options = {
      startFrom: '2000-04-01 10:51:00',
      endTo: '2000-04-01 10:51:00'
    }
    tainanOpen1999.getCases(options, (error, data) => {
      expect(error).to.be.null()
      data.num.should.equal(0)
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with empty options', (done) => {
    const options = {}
    tainanOpen1999.getCases(options, (error, data) => {
      error.should.equal('Require time interval options (startFrom, endTo)')
      expect(data).to.be.null()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with invalid time interval', (done) => {
    const options = {
      startFrom: '2017:00',
      endTo: '2017-0 16:59:59'
    }
    tainanOpen1999.getCases(options, (error, data) => {
      error.should.equal('Invalid time format')
      expect(data).to.be.null()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const options = {
      startFrom: '2017-04-01 10:51:00',
      endTo: '2017-04-01 10:51:00'
    }
    const fakeErrMsg = 'Request Error'
    sinon.stub(request, 'get').yields(fakeErrMsg, null, null)
    tainanOpen1999.getCases(options, (error, data) => {
      error.should.equal(fakeErrMsg)
      request.get.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)
})
