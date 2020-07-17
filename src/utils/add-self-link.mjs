import _ from 'lodash'

export default collectionUri => item =>
  _.set(
    _.cloneDeep(item),
    '_links.self.href',
    collectionUri + '/' + encodeURIComponent(item.id)
  )
