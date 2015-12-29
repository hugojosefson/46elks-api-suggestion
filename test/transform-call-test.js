import {expect} from 'chai';
import {requestTransformer} from '../src/transformers/call';

describe('transform call', () => {
    describe('back', ()=> {
        it('renames voice_start_uri to voice_start', ()=> {
            const actual = requestTransformer({
                from: 'me',
                to: 'you',
                voice_start_uri: 'http://start',
                voice_end_uri: 'http://end'
            });
            const expected = {
                from: 'me',
                to: 'you',
                voice_start: 'http://start',
                whenhangup: 'http://end'
            };
            expect(actual).to.deep.equal(expected);
        });
        it('renames voice_start_action to voice_start, translates to json string', ()=> {
            const actual = requestTransformer({
                from: 'me',
                to: 'you',
                voice_start_action: {play: 'http://play'}
            });
            const expected = {
                from: 'me',
                to: 'you',
                voice_start: '{"play":"http://play"}'
            };
            expect(actual).to.deep.equal(expected);
        });
    });
});
