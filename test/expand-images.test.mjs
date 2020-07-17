/* eslint-env mocha */
import chai from 'chai'
import expandImages, {
  imagePropertiesFromArray,
} from '../src/transformers/sms/expand-images.mjs'
const { expect } = chai

const MMS = {
  from: 'me',
  to: 'you',
  images: ['first', 'second', 'third'],
  message: 'hello',
}

const EXPECTED_MMS = {
  from: 'me',
  to: 'you',
  message: 'hello',
  image: 'first',
  image2: 'second',
  image3: 'third',
}

const SMS = {
  from: 'me',
  to: 'you',
  message: 'hello',
}

const IMAGE_PROPERTIES = {
  image: 'first',
  image2: 'second',
  image3: 'third',
}

describe('expand-images', () => {
  describe('imagePropertiesFromArray', () => {
    it('expands images correctly', () => {
      const actual = imagePropertiesFromArray(MMS.images)
      const expected = IMAGE_PROPERTIES
      expect(actual).to.deep.equal(expected)
    })
  })

  it('leaves no-image sms alone', () => {
    const actual = expandImages(SMS)
    const expected = SMS
    expect(actual).to.deep.equal(expected)
  })

  it('expands images correctly', () => {
    const actual = expandImages(MMS)
    const expected = EXPECTED_MMS
    expect(actual).to.deep.equal(expected)
  })
})
