/* eslint-env mocha */
import chai from 'chai'

import renameKey from '../src/utils/rename-key.mjs'
const { expect } = chai

describe('rename-key', () => {
  it('sets b=a', () => {
    const actual = renameKey('a', 'b')({ a: 123 })
    expect(actual).to.have.property('b')
    expect(actual).to.not.have.property('a')
    expect(actual.b).to.equal(123)
  })
  it('does not copy non-existing property', () => {
    const actual = renameKey('a', 'b')({ c: 123 })
    expect(actual).to.not.have.property('b')
    expect(actual).to.not.have.property('a')
    expect(actual).to.have.property('c')
    expect(actual.c).to.equal(123)
  })
})
