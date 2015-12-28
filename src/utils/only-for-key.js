/**
 * Returns an iteratee function for _.mapValues(), which only operates on one key.
 *
 * @param onlyForKey the key to operate on
 * @param valueMapper fn(currentValue) which maps current value to a new value
 */
export default (onlyForKey, valueMapper) => (value, key) => key === onlyForKey ? valueMapper(value) : value;
