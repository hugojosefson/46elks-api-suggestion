import {parse} from 'url';

import isAllowedProtocol from './is-allowed-protocol';
import isAllowedHostname from './is-allowed-hostname';

export default (req, res, next) => {
    const {destinationUri} = req.params;
    const {protocol, hostname} = parse(destinationUri);

    if (!isAllowedProtocol(protocol)) {
        res.status(403).type('text').send('Protocol not allowed.');
        return;
    }

    isAllowedHostname(hostname)
        .then(ok => {
            if (ok) {
                next();
            } else {
                const message = 'Hostname in the destination URI is not allowed because it seems to resolve to a private IP address.';
                console.warn(message, hostname, destinationUri);
                res.status(403).type('text').send(message);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).type('text').send('There was an error checking the hostname of the destination URI.');
        });
};
