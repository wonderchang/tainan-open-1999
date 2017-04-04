const {
  addCase,
  getCase,
  getCases,
  getCasesByIds
} = require('./src/case')

const {
  getServices
} = require('./src/service')

module.exports = {
  addCase: addCase,
  getCase: getCase,
  getCases: getCases,
  getCasesByIds: getCasesByIds,
  getServices: getServices
}
