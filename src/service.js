const request = require('request')
const lodash = require('lodash')
const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const utils = require('./utils')
const config = require('./config')

const wrapServiceResource = (o) => ({
  code: o.service_code,
  name: o.service_name,
  subjects: o.subproject.split(',').filter(d => '' !== d).map(d => {
    const [code, name] = d.split(' ')
    return {
      code: code,
      name: name,
    }
  })
})

const getList = (callback) => {
  const body = json2xml(utils.wrapValueCdataTag({city_id: config.CITY_ID}))
  request.get({
    url: `${config.API_HOST}/ServiceList.aspx`,
    json: false,
    body: body,
  }, function() {
    utils.validateResponse(...arguments, (e, data) => {
      if (e) {
        return callback(e, null)
      }
      callback(null, {
        num: parseInt(data.root.count),
        services: data.root.records.record.map(wrapServiceResource),
      })
    })
  })
}

module.exports = {
  getList: getList,
}
