import PrivateIps from 'private-ips';
import {promisifyAll} from 'bluebird';

const checker = promisifyAll(new PrivateIps({ipv6: true}));

export default hostname => checker.isPrivateAsync(hostname).then(isPrivate => {
    const isAllowed = !isPrivate;
    return isAllowed;
});
