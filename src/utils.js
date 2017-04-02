const json2xml = require('jsontoxml')
const xmlJsonParser = require('xml2json')

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

const validateResponse = (err, res, body, callback) => {
  let data = null
  if (err) {
    return callback(err, data)
  }
  if (200 !== res.statusCode) {
    return callback(res.statusCode, data)
  }
  try {
    data = JSON.parse(xmlJsonParser.toJson(body))
  }
  catch(parseErr) {
    return callback(parseErr, data)
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
}
