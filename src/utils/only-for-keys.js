import {includes} from 'lodash';

/**
 * Returns an iteratee function for _.mapValues(), which only operates on one key.
 *
 * @param onlyForKeys array of keys to operate on
 * @param valueMapper fn(currentValue) which maps current value to a new value
 */
export default (onlyForKeys, valueMapper) => (value, key) => includes(onlyForKeys, key) ? valueMapper(value) : value;
