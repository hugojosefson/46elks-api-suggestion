import { URL } from 'url'
import _ from 'lodash'

export default baseUri => uri => {
  const expected = _.pick(new URL(`${baseUri}/v2/proxiedcallback`), [
    'protocol',
    'host',
    'pathname',
  ])
  const parsedUri = new URL(uri)

  if (_.matches(expected)(parsedUri)) {
    return parsedUri.searchParams.get('destination_uri')
  } else {
    return uri
  }
}
