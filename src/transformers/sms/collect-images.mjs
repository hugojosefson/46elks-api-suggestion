import _ from 'lodash'

const regex = () => /^image[0-9]*/

const hasImageKey = ([key, value]) => regex().test(key)
const notHasImageKey = (...args) => !hasImageKey(...args)
const removeImageFromKey = ([key, value]) => [key.replace(/^image/, ''), value]
const keyNumerically = ([key, value]) => Number(key)

export const imagesFromMms = mms =>
  _(mms)
    .map((value, key) => [key, value])
    .filter(hasImageKey)
    .map(removeImageFromKey)
    .sortBy(keyNumerically)
    .map(([key, value]) => value)
    .value()

export default mms => {
  const images = imagesFromMms(mms)
  if (images.length) {
    return _(mms)
      .map((value, key) => [key, value])
      .filter(notHasImageKey)
      .fromPairs()
      .thru(result => _.assign(result, { images }))
      .value()
  } else {
    return _.clone(mms)
  }
}
