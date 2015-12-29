import {expect} from 'chai';
import {responseTransformer} from '../src/transformers/call-callback';

const expectDeepEqual = ({actual, expected}) => expect(actual).to.deep.equal(expected);

const DUMMY_STRUCTURE = {
    a: 'A',
    b: 'B',
    o: {
        c: 'C',
        t: true,
        n: 2,
        d: {
            another: 'value'
        }

    }
};

describe('transform call-callback (recording etc)', () => {

    describe('response', ()=> {
        it('keeps object structure intact', ()=> expectDeepEqual({
            actual: responseTransformer('http://BASE_URL')(DUMMY_STRUCTURE),
            expected: DUMMY_STRUCTURE
        }));
        it('converts wav to link', ()=> expectDeepEqual({
            actual: responseTransformer('http://BASE_URL')({wav: 'http://wav'}),
            expected: {_links: {wav: {href: 'http://wav'}}}
        }));
        it('converts callid to calls/:id link', ()=> expectDeepEqual({
            actual: responseTransformer('http://BASE_URL')({callid: 'qwerty'}),
            expected: {_links: {call: {href: 'http://BASE_URL/v2/me/calls/qwerty'}}}
        }));
        it('converts both callid and wav if available', ()=> expectDeepEqual({
            actual: responseTransformer('http://BASE_URL')({
                callid: 'qwerty',
                wav: 'http://wav',
                duration: 5
            }),
            expected: {
                _links: {
                    call: {href: 'http://BASE_URL/v2/me/calls/qwerty'},
                    wav: {href: 'http://wav'}
                },
                duration: 5
            }
        }));

    });
});
