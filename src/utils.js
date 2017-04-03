const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')
const lodash = require('lodash')

const wrapValueCdataTag = (obj) => {
  const traverse = (o) => {
    for (let prop in o) {
      if ('object' === typeof(o[prop])) {
        traverse(o[prop])
      }
      else {
        o[prop] = json2xml.cdata(`${o[prop]}`)
      }
    }
    return o
  }
  return traverse(obj)
}

const camel2Snake = (obj) => {
  const traverse = (o) => {
    for (let prop in o) {
      if ('object' === typeof(o[prop])) {
        const newProp = lodash.snakeCase(prop)
        o[newProp] = Object.assign({}, o[prop])
        delete o[prop]
        traverse(o[newProp])
      }
      else {
        o[lodash.snakeCase(prop)] = o[prop]
        delete o[prop]
      }
    }
    return o
  }
  return traverse(Object.assign({}, obj))
}

const validateResponse = (err, res, body, callback) => {
  let data = null
  if (err) {
    return callback(err, data)
  }
  data = JSON.parse(xmlJsonParser.toJson(body))
  if (!Object.keys(data).length) {
    return callback('Empty object', null)
  }
  if (parseInt(data.root.returncode)) {
    if ('查無案件資料' !== data.root.description) {
      return callback(data.root.description, null)
    }
    return callback(null, data)
  }
  callback(null, data)
}

module.exports = {
  wrapValueCdataTag: wrapValueCdataTag,
  validateResponse: validateResponse,
  camel2Snake: camel2Snake,
}
