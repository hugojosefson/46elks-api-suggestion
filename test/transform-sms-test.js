import {expect} from 'chai';
import transformSms from '../src/transformers/sms';
import {back as transformSmsBack} from '../src/transformers/sms';

const MMS = {
    from: 'me',
    to: 'you',
    message: 'hello',
    flash: true,
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
            const actual = transformSmsBack(MMS);
            const expected = ELKS_MMS;
            expect(actual).to.deep.equal(expected);
        });
    });

    it('leaves no-image, no-flash sms alone', ()=> {
        const actual = transformSms(SMS);
        const expected = SMS;
        expect(actual).to.deep.equal(expected);
    });

    it('transforms correctly', ()=> {
        const actual = transformSms(ELKS_MMS);
        const expected = MMS;
        expect(actual).to.deep.equal(expected);
    });
});
