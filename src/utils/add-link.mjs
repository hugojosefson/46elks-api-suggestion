import _ from 'lodash'

export default rel => uri => item => _.set(_.cloneDeep(item), `_links.${rel}.href`, uri)
