import _ from 'lodash';

export default (fromKey, toKey) => object => {
    if (object.hasOwnProperty(fromKey)) {
        return _.omit(_.assign({}, object, {[toKey]: object[fromKey]}), fromKey);
    } else {
        return _.assign({}, object);
    }
}
