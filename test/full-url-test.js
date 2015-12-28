import {expect} from 'chai';

import {path} from '../src/utils/full-url';

describe('full-url.path', () => {
    it("adds / between four args", ()=> {
        expect(path('one', 'two', 'three', 'four')).to.equal('one/two/three/four');
    });

    it("does not add '/' when second arg starts with '?'", ()=> {
        expect(path('first', '?second')).to.equal('first?second');
    });
});
