import _ from 'lodash'

export default (fromKey, toKey) => object => {
  if (!object) {
    return {}
  }

  if (Object.prototype.hasOwnProperty.call(object, fromKey)) {
    return _.omit(_.assign({}, object, { [toKey]: object[fromKey] }), fromKey)
  } else {
    return _.assign({}, object)
  }
}
