const request = require('request')
const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const utils = require('./utils')
const config = require('./config')

const get = function(caseID, callback) {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseID, },
  }))
  request.get({
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

const getListByIDs = function(caseIDs, callback) {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseIDs.join(','),
    },
  }))
  request.get({
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

const getList = function() {
  const [startTime, endTime] = [arguments[0], arguments[1]]
  let options, callback
  switch (arguments.length) {
    case 3:
      [options, callback] = [{}, arguments[2]]
      break
    case 4:
      [options, callback] = [arguments[2], arguments[3]]
      break
    default:
      return
  }
  const datetimePattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
  if (!datetimePattern.exec(startTime) || !datetimePattern.exec(endTime)) {
    return callback('Invalid time format', null)
  }
  if (options.serviceName && Array.isArray(options.serviceName)) {
    options.serviceName = options.serviceName.join(',')
  }
  const root = utils.camel2Snake(Object.assign({
    cityId: config.CITY_ID,
    startDate: startTime,
    endDate: endTime,
  }, options))
  const body = json2xml(utils.wrapValueCdataTag({root: root}))
  request.get({
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
  getList: getList,
  getListByIDs: getListByIDs,
}
