/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const utils = require('../src/utils')

const should = chai.should() // eslint-disable-line 
const expect = chai.expect

chai.use(dirtyChai)

describe('utils.camel2Snake', () => {
  it('Succeed with single depth object', () => {
    const obj = {
      aBcDe: 1,
      fGhIj: 2
    }
    const newObj = utils.camel2Snake(obj)
    expect(newObj).to.have.property('a_bc_de', 1)
    expect(newObj).to.have.property('f_gh_ij', 2)
  })

  it('Succeed with multiple depth object', () => {
    const obj = {
      aBcDe: 1,
      fGhIj: 2,
      kLmNo: {
        pQrSt: 3
      }
    }
    const newObj = utils.camel2Snake(obj)
    expect(newObj).to.have.property('a_bc_de', 1)
    expect(newObj).to.have.property('f_gh_ij', 2)
    expect(newObj).to.have.deep.property('k_lm_no.p_qr_st', 3)
  })
})
