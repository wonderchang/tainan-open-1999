const request = require('request')
const lodash = require('lodash')
const xmlJsonParser = require('xml2json')
const json2xml = require('jsontoxml')
const utils = require('./utils')
const config = require('./config')

const wrapPictureResource = (o) => ({
  fileName: o.fileName,
  description: o.description,
  base64: o.file
})

const wrapCaseResource = (o) => ({
  caseId: o.service_request_id,
  status: lodash.isEmpty(o.status) ? '處理中' : o.status,
  district: o.area,
  serviceName: o.service_name,
  subjectName: o.subproject,
  agency: o.agency,
  description: o.description,
  address: o.address_string,
  latitude: lodash.isEmpty(o.lat) ? null : o.lat,
  longitude: lodash.isEmpty(o.long) ? null : o.long,
  createAt: o.requested_datetime,
  updateAt: lodash.isEmpty(o.updated_datetime) ? null : o.updated_datetime,
  pictures: ((!o.Pictures) ? [] : (lodash.isArray(o.Pictures.Picture)) ? o.Pictures.Picture : [o.Pictures.Picture]).map(wrapPictureResource)
})

const addCase = (options, callback) => {
  const root = Object.assign(
    { city_id: config.CITY_ID },
    (options.serviceName) ? { service_name: options.serviceName } : {},
    (options.subjectName) ? { subproject: options.subjectName } : {},
    (options.district) ? { area: options.district } : {},
    (options.address) ? { address_string: options.address } : {},
    (options.description) ? { description: options.description } : {},
    (options.reporterName) ? { name: options.reporterName } : {},
    (options.reporterPhoneNumber) ? { phone: options.reporterPhoneNumber } : {},
    (options.reporterEmail) ? { email: options.reporterEmail } : {},
    (options.latitude) ? { lat: options.latitude } : {},
    (options.longitude) ? { long: options.longitude } : {},
    (options.pictures) ? {
      pictures: {
        picture: options.pictures.map(p => ({
          fileName: p.fileName,
          description: p.description,
          file: p.base64
        }))
      }
    } : {}
  )
  const body = json2xml(utils.wrapValueCdataTag({ root: root }))
  request.post({
    url: `${config.API_HOST}/ServiceRequestAdd.aspx`,
    json: false,
    body: body
  }, (err, res, data) => {
    if (err) {
      return callback(err, null)
    }
    data = JSON.parse(xmlJsonParser.toJson(data))
    if (parseInt(data.root.returncode)) {
      return callback(data.root.description, null)
    }
    callback(err, { caseId: data.root.service_request_id })
  })
}

const getCase = (caseId, callback) => {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseId }
  }))
  request.get({
    url: `${config.API_HOST}/ServiceRequestsQuery.aspx`,
    json: false,
    body: body
  }, function () {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      callback(e, (data.root.records) ? wrapCaseResource(data.root.records.record) : null)
    })
  })
}

const getCasesByIds = (caseIds, callback) => {
  const body = json2xml(utils.wrapValueCdataTag({
    root: {
      city_id: config.CITY_ID,
      service_request_id: caseIds.join(',')
    }
  }))
  request.get({
    url: `${config.API_HOST}/ServiceRequestsQuery.aspx`,
    json: false,
    body: body
  }, function () {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      const num = parseInt(data.root.count)
      switch (num) {
        case 0: return callback(e, {
          num: num,
          cases: []
        })
        case 1: return callback(e, {
          num: num,
          cases: [wrapCaseResource(data.root.records.record)]
        })
        default: return callback(e, {
          num: num,
          cases: data.root.records.record.map(wrapCaseResource)
        })
      }
    })
  })
}

const getCases = (options, callback) => {
  if (!options.startFrom || !options.endTo) {
    return callback('Require time interval options (startFrom, endTo)', null)
  }
  const dtPattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
  if (!dtPattern.exec(options.startFrom) || !dtPattern.exec(options.endTo)) {
    return callback('Invalid time format', null)
  }
  if (options.serviceName && Array.isArray(options.serviceName)) {
    options.serviceName = options.serviceName.join(',')
  }
  const root = utils.camel2Snake(Object.assign({
    cityId: config.CITY_ID,
    startDate: options.startFrom,
    endDate: options.endTo
  }, options))
  const body = json2xml(utils.wrapValueCdataTag({root: root}))
  request.get({
    url: `${config.API_HOST}/ServiceRequestsQuery.aspx`,
    json: false,
    body: body
  }, function () {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      const num = parseInt(data.root.count)
      switch (num) {
        case 0: return callback(e, {
          num: num,
          cases: []
        })
        case 1: return callback(e, {
          num: num,
          cases: [wrapCaseResource(data.root.records.record)]
        })
        default: return callback(e, {
          num: num,
          cases: data.root.records.record.map(wrapCaseResource)
        })
      }
    })
  })
}

module.exports = {
  addCase: addCase,
  getCase: getCase,
  getCases: getCases,
  getCasesByIds: getCasesByIds
}
