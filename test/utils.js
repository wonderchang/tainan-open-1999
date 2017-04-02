const chai = require('chai')
const utils = require('../src/utils')

const should = chai.should()
const expect = chai.expect

describe('utils.validateResponse', () => {

  it('With error', (done) => {
    const errMsg = 'Error: OMG'
    utils.validateResponse(errMsg, null, null, (err, data) => {
      err.should.equal(errMsg)
      expect(data).to.be.null
      done()
    })
  })

  it('With invalid body format', (done) => {
    const body = 'wefowfoenwfoiwefoewinfewf'
    utils.validateResponse(null, null, body, (err, data) => {
      err.should.equal('Empty object')
      expect(data).to.be.null
      done()
    })
  })

  it('With no data error return code', (done) => {
    const body = '<?xml version="1.0" encoding="utf-8"?><root><returncode>1</returncode><count>0</count><description><![CDATA[查無案件資料]]></description><stacktrace><![CDATA[]]></stacktrace></root>'
    utils.validateResponse(null, null, body, (err, data) => {
      expect(err).to.be.null
      expect(data).to.have.deep.property('root.count', '0')
      expect(data).to.have.deep.property('root.description', '查無案件資料')
      done()
    })
  })

  it('With error return code', (done) => {
    const body = '<?xml version="1.0" encoding="utf-8"?><root><returncode>1</returncode><count>0</count><description><![CDATA[最大查詢數量1000筆]]></description><stacktrace><![CDATA[]]></stacktrace></root>'
    utils.validateResponse(null, null, body, (err, data) => {
      err.should.equal('最大查詢數量1000筆')
      expect(data).to.be.null
      done()
    })
  })

})
