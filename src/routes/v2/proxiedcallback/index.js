import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import requireAllowedDestinationUri from './require-allowed-destination-uri';
import mapTypeToMiddleware from './map-type-to-middleware';

import smsCallback from './type/sms-callback';
import voiceStartCallback from './type/voice-start-callback';
import voiceActionCallback from './type/voice-action-callback';

export default compose([
    requireAllowedDestinationUri,
    bodyParser.urlencoded(),
    mapTypeToMiddleware({
        sms: smsCallback,
        sms_delivery_report: smsCallback,
        voice_start: voiceStartCallback,
        voice_action: voiceActionCallback
    }),
    (req, res) => {
        res.status(400).send(`Invalid type '${req.query.type}'.`);
    }
]);
