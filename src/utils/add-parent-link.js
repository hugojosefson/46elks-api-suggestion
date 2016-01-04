import _ from 'lodash';

export default collectionUri => item => _.set(_.cloneDeep(item), '_links.parent.href', collectionUri);
