import _ from 'lodash';

import renameKey from '../utils/rename-key';

export const back = call => _(call)
    .value();

export default call => _(call)
    .omit(['id'])
    .value();
