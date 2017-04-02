const request = require('request')
const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const utils = require('./utils')
const config = require('./config')

const getList = (callback) => {
  const body = json2xml(utils.wrapValueCdataTag({city_id: config.CITY_ID}))
  request({
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
        services: data.root.records.record,
      })
    })
  })
}

module.exports = {
  getList: getList,
}
