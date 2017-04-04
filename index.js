const {
  getCase,
  getCases,
  getCasesByIds
} = require('./src/case')

const {
  getServices
} = require('./src/service')

module.exports = {
  getCase: getCase,
  getCases: getCases,
  getCasesByIds: getCasesByIds,
  getServices: getServices
}
