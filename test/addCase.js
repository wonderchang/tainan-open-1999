/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const request = require('request')
const json2xml = require('jsontoxml')
const tainanOpen1999 = require('../index')
const config = require('./config')

const should = chai.should() // eslint-disable-line 
const expect = chai.expect

chai.use(dirtyChai)

describe('addCase test cases', () => {
  it('Succeed with valid data', (done) => {
    const fakeCaseId = 'UN201704040161'
    sinon.stub(request, 'post').yields(null, { statusCode: 200 }, json2xml({
      root: { service_request_id: fakeCaseId }
    }))
    const options = {
      serviceName: '違規停車',
      subjectName: '違規停車',
      district: '中西區',
      address: '700台南市中西區民族路二段246號',
      description: '停在外側車道上',
      reporterName: '王小明',
      reporterPhoneNumber: '0912345678',
      reporterEmail: 'hsaoming@gmail.com',
      latitude: '22.9968714',
      longitude: '120.2273623',
      pictures: [
        {
          filename: 'aaa.jpg',
          description: 'aaa',
          base64: 'wefoewiofewoigboigio34ibg34g34g430g232f'
        }
      ]
    }
    tainanOpen1999.addCase(options, (error, data) => {
      expect(error).to.be.null()
      data.caseId.should.equal(fakeCaseId)
      request.post.restore()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed with empty data', (done) => {
    tainanOpen1999.addCase({}, (error, data) => {
      error.should.equal('姓名,電話,案件事項,行政區,地點,案件內容為必輸欄位!!')
      expect(data).to.be.null()
      done()
    })
  }).timeout(config.MAX_TIMEOUT)

  it('Failed arise from request error', (done) => {
    const fakeErrMsg = 'Request Error'
    const options = {
      serviceName: '違規停車',
      subjectName: '違規停車',
      district: '中西區',
      address: '700台南市中西區民族路二段246號',
      description: '停在外側車道上',
      reporterName: '王小明',
      reporterPhoneNumber: '0912345678'
    }
    sinon.stub(request, 'post').yields(fakeErrMsg, { statusCode: 500 }, null)
    tainanOpen1999.addCase(options, (error, data) => {
      error.should.equal(fakeErrMsg)
      expect(data).to.be.null()
      request.post.restore()
      done()
    })
  })
})
