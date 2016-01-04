import {parse} from 'url';

import isAllowedProtocol from './is-allowed-protocol';
import isAllowedHostname from './is-allowed-hostname';

export default (req, res, next) => {
    const {destination_uri} = req.query;
    console.log(destination_uri);
    const {protocol, hostname} = parse(destination_uri.replace(/^(https?:\/)([^/])/, '$1/$2'));

    if (!isAllowedProtocol(protocol)) {
        res.status(403).type('text').send(`Protocol '${protocol}' not allowed.`);
        return;
    }

    isAllowedHostname(hostname)
        .then(ok => {
            if (ok) {
                next();
            } else {
                const message = 'Hostname in destination_uri is not allowed because it seems to resolve to a private IP address.';
                console.warn(message, hostname, destination_uri);
                res.status(403).type('text').send(message);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).type('text').send('There was an error checking the hostname of destination_uri.');
        });
};
