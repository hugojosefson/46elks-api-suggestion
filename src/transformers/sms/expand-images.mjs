import _ from 'lodash'

export const imagePropertiesFromArray = images =>
  _(images)
    .map((value, index) => [`image${index === 0 ? '' : index + 1}`, value])
    .fromPairs()
    .value()

export default mms => {
  const result = _.clone(mms)
  if (result.images) {
    if (result.images.length) {
      _.assign(result, imagePropertiesFromArray(result.images))
    }
    delete result.images
  }
  return result
}
