/* eslint-env mocha */
import chai from 'chai'
const { expect } = chai
import collectImages, { imagesFromMms } from '../src/transformers/sms/collect-images'

const MMS = {
  from: 'me',
  to: 'you',
  image20: 'twentieth',
  image10: 'tenth',
  image2: 'second',
  message: 'hello',
  image: 'first',
  image3: 'third'
}

const SMS = {
  from: 'me',
  to: 'you',
  message: 'hello'
}

const IMAGES = [
  'first',
  'second',
  'third',
  'tenth',
  'twentieth'
]

describe('collect-images', () => {
  describe('imagesFromMms', () => {
    it('collects images correctly', () => {
      const actual = imagesFromMms(MMS)
      const expected = IMAGES
      expect(actual).to.deep.equal(expected)
    })
  })

  it('leaves no-image sms alone', () => {
    const actual = collectImages(SMS)
    const expected = SMS
    expect(actual).to.deep.equal(expected)
  })

  it('collects images correctly', () => {
    const actual = collectImages(MMS)
    const expected = {
      from: 'me',
      to: 'you',
      message: 'hello',
      images: IMAGES
    }
    expect(actual).to.deep.equal(expected)
  })
})
