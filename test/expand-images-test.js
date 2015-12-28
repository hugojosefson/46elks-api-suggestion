import {expect} from 'chai';
import expandImages from '../src/transformers/sms/expand-images';
import {imagePropertiesFromArray} from '../src/transformers/sms/expand-images';

const MMS = {
    from: 'me',
    to: 'you',
    images: [
        'first',
        'second',
        'third'
    ],
    message: 'hello'
};

const EXPECTED_MMS = {
    from: 'me',
    to: 'you',
    message: 'hello',
    image: 'first',
    image2: 'second',
    image3: 'third'
};

const SMS = {
    from: 'me',
    to: 'you',
    message: 'hello'
};

const IMAGE_PROPERTIES = {
    image: 'first',
    image2: 'second',
    image3: 'third'
};

describe('expand-images', () => {

    describe('imagePropertiesFromArray', ()=> {
        it('expands images correctly', ()=> {
            const actual = imagePropertiesFromArray(MMS.images);
            const expected = IMAGE_PROPERTIES;
            expect(actual).to.deep.equal(expected);
        });
    });

    it('leaves no-image sms alone', ()=> {
        const actual = expandImages(SMS);
        const expected = SMS;
        expect(actual).to.deep.equal(expected);
    });

    it('expands images correctly', ()=> {
        const actual = expandImages(MMS);
        const expected = EXPECTED_MMS;
        expect(actual).to.deep.equal(expected);
    });
});
