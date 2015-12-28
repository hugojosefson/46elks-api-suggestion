import _ from 'lodash';

import renameKey from '../utils/rename-key';

export const back = number => _(number)
    .thru(renameKey('flash', 'flashsms'))
    .map(function (value, key) {
        if (key === 'flashsms') {
            return [key, value ? 'yes' : 'no'];
        } else {
            return [key, value];
        }
    })
    .object()
    .value();

export default number => _(number)
    .omit(['id'])
    .thru(renameKey('flashsms', 'flash'))
    .map(function (value, key) {
        if (key === 'flash') {
            return [key, value === 'yes'];
        } else {
            return [key, value];
        }
    })
    .object()
    .value();
