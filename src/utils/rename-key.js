import _ from 'lodash';

export default (fromKey, toKey) => object => _.omit(_.assign({}, object, {[toKey]: object[fromKey]}), fromKey);
