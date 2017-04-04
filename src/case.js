const request = require('request')
const lodash = require('lodash')
const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const utils = require('./utils')
const config = require('./config')

const wrapPictureResource = (o) => ({
  fileName: o.fileName,
  description: o.description,
  base64: o.file,
})

const wrapCaseResource = (o) => ({
  caseId: o.service_request_id,
  status: lodash.isEmpty(o.status) ? 0 : 1,
  district: o.area,
  serviceName: o.service_name,
  subjectName: o.subproject,
  agency: o.agency,
  description: o.description,
  address: o.address_string,
  latitude: lodash.isEmpty(o.lat) ? null : o.lat,
  longitude: lodash.isEmpty(o.long) ? null: o.long,
  createAt: o.requested_datetime,
  updateAt: lodash.isEmpty(o.updated_datetime) ? null : o.updated_datetime,
  pictures: ((!o.Pictures) ? [] : (lodash.isArray(o.Pictures.Picture)) ? o.Pictures.Picture : [o.Pictures.Picture]).map(wrapPictureResource),
})

const getCase = function(caseId, callback) {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseId, },
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
      callback(e, (data.root.records) ? wrapCaseResource(data.root.records.record) : null)
    })
  })
}

const getCasesByIds = function(caseIds, callback) {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseIds.join(','),
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
          cases: [wrapCaseResource(data.root.records.record)],
        })
        default: return callback(e, {
          num: num,
          cases: data.root.records.record.map(wrapCaseResource),
        })
      }
    })
  })
}

const getCases = function() {
  if (3 === arguments.length) {
    [options, callback] = [{}, arguments[2]]
  }
  else if (4 <= arguments.length) {
    [options, callback] = [arguments[2], arguments[3]]
  }
  else {
    return
  }
  const [startFrom, endTo] = [arguments[0], arguments[1]]
  const datetimePattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
  if (!datetimePattern.exec(startFrom) || !datetimePattern.exec(endTo)) {
    return callback('Invalid time format', null)
  }
  if (options.serviceName && Array.isArray(options.serviceName)) {
    options.serviceName = options.serviceName.join(',')
  }
  const root = utils.camel2Snake(Object.assign({
    cityId: config.CITY_ID,
    startDate: startFrom,
    endDate: endTo,
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
          cases: [wrapCaseResource(data.root.records.record)],
        })
        default: return callback(e, {
          num: num,
          cases: data.root.records.record.map(wrapCaseResource),
        })
      }
    })
  })
}

module.exports = {
  getCase: getCase,
  getCases: getCases,
  getCasesByIds: getCasesByIds,
}
