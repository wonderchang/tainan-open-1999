const request = require('request')
const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const utils = require('./utils')
const config = require('./config')

const get = (caseId, callback) => {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseId,
    },
  }))
  request({
    url: `${config.API_HOST}/ServiceRequestsQuery.aspx`,
    json: false,
    body: body,
  }, function() {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      callback(e, (data.root.records) ? data.root.records.record : null)
    })
  })
}

const getListByIds = (caseIds, callback) => {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseIds.join(','),
    },
  }))
  request({
    url: `${config.API_HOST}/ServiceRequestsQuery.aspx`,
    json: false,
    body: body,
  }, function() {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      const num = parseInt(data.root.count)
      switch (num) {
        case 0: return callback(e, {
          num: num,
          cases: [],
        })
        case 1: return callback(e, {
          num: num,
          cases: [data.root.records.record],
        })
        default: return callback(e, {
          num: num,
          cases: data.root.records.record,
        })
      }
    })
  })
}

module.exports = {
  get: get,
  getListByIds: getListByIds,
}
