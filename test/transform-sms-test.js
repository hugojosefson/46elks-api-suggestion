import {expect} from 'chai';
import {requestTransformer, responseTransformer} from '../src/transformers/sms';

const MMS = {
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
    from: 'me',
    to: 'you',
    message: 'hello',
    flashsms: 'yes',
    whendelivered: 'https://delivery',
    image: 'first',
    image2: 'second',
    image3: 'third'
};

const SMS = {
    from: 'me',
    to: 'you',
    message: 'hello'
};

describe('transform sms', () => {

    describe('back', ()=> {
        it('transforms correctly', ()=> {
            const actual = requestTransformer(MMS);
            const expected = ELKS_MMS;
            expect(actual).to.deep.equal(expected);
        });
    });

    it('leaves no-image, no-flash sms alone', ()=> {
        const actual = responseTransformer(SMS);
        const expected = SMS;
        expect(actual).to.deep.equal(expected);
    });

    it('transforms correctly', ()=> {
        const actual = responseTransformer(ELKS_MMS);
        const expected = MMS;
        expect(actual).to.deep.equal(expected);
    });
});
