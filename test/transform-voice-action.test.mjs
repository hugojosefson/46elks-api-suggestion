/* eslint-env mocha */
import chai from 'chai'
import { requestTransformer, responseTransformer } from '../src/transformers/voice-action.mjs'
const { expect } = chai

const expectDeepEqual = ({ actual, expected }) => expect(actual).to.deep.equal(expected)

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
}

describe('transform voice-action', () => {
  describe('request', () => {
    it('keeps object structure intact', () => expectDeepEqual({
      actual: requestTransformer('http://BASE_URI')(DUMMY_STRUCTURE),
      expected: DUMMY_STRUCTURE
    }))
    it('renames record_call to recordcall, and proxies URI', () => expectDeepEqual({
      actual: requestTransformer('http://BASE_URI')({ record_call: 'http://recorded' }),
      expected: { recordcall: 'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Frecorded' }
    }))
    it('proxies record URI', () => expectDeepEqual({
      actual: requestTransformer('http://BASE_URI')({ record: 'http://recorded' }),
      expected: { record: 'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Frecorded' }
    }))
    it('renames caller_id to callerid', () => expectDeepEqual({
      actual: requestTransformer('http://BASE_URI')({ caller_id: '+467000' }),
      expected: { callerid: '+467000' }
    }))
  })

  describe('response', () => {
    it('keeps object structure intact', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')(DUMMY_STRUCTURE),
      expected: DUMMY_STRUCTURE
    }))
    it('renames recordcall to record_call', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')({ recordcall: 'http://recorded' }),
      expected: { record_call: 'http://recorded' }
    }))
    it('unproxies recordcall if starts with baseUri/v2/proxiedcallback', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')({ recordcall: 'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Frecorded' }),
      expected: { record_call: 'http://recorded' }
    }))
    it('unproxies record if starts with baseUri/v2/proxiedcallback?type=voice_action', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')({ record: 'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Frecorded' }),
      expected: { record: 'http://recorded' }
    }))
    it('renames callerid to caller_id', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')({ callerid: 'http://recorded' }),
      expected: { caller_id: 'http://recorded' }
    }))
    it('renames callerid to caller_id in a deep structure', () => expectDeepEqual({
      actual: responseTransformer('http://BASE_URI')({ a: { b: { callerid: 'http://recorded' } } }),
      expected: { a: { b: { caller_id: 'http://recorded' } } }
    }))
  })
})
