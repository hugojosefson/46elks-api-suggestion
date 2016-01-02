import _ from 'lodash';
import {expect} from 'chai';
import {requestTransformer, responseTransformer} from '../src/transformers/sms';

const MMS = {
    id: 'ID',
    from: 'me',
    to: 'you',
    message: 'hello',
    flash: true,
    delivery_report_uri: 'https://delivery',
    images: [
        'first',
        'second',
        'third'
    ]
};

const ELKS_MMS = {
    id: 'ID',
    from: 'me',
    to: 'you',
    message: 'hello',
    flashsms: 'yes',
    whendelivered: 'http://BASE_URI/v2/proxiedcallback?type=sms_delivery_report&destination_uri=https%3A%2F%2Fdelivery',
    image: 'first',
    image2: 'second',
    image3: 'third'
};

const SMS = {
    id: 'ID',
    from: 'me',
    to: 'you',
    message: 'hello'
};

describe('transform sms', () => {

    describe('request', ()=> {
        it('transforms correctly', ()=> {
            const actual = requestTransformer('http://BASE_URI')(MMS);
            const expected = ELKS_MMS;
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('response', () => {
        it('leaves no-image, no-flash sms alone', ()=> {
            const actual = responseTransformer('http://BASE_URI')(SMS);
            const expected = _(SMS)
                .assign({_links: {self: {href: 'http://BASE_URI/v2/me/sms/ID'}}})
                .omit('id')
                .value();
            expect(actual).to.deep.equal(expected);
        });

        it('transforms correctly', ()=> {
            const actual = responseTransformer('http://BASE_URI')(ELKS_MMS);
            const expected = _(MMS)
                .assign({_links: {self: {href: 'http://BASE_URI/v2/me/sms/ID'}}})
                .omit('id')
                .value();
            expect(actual).to.deep.equal(expected);
        });
    });

});
