/* eslint-env mocha */
import chai from 'chai'
import { requestTransformer } from '../src/transformers/call.mjs'
const { expect } = chai

describe('transform call', () => {
  describe('request', () => {
    it('renames voice_start_uri and voice_end_uri to voice_start and whenhangup, and proxies the URIs', () => {
      const actual = requestTransformer('http://BASE_URI')({
        from: 'me',
        to: 'you',
        voice_start_uri: 'http://start',
        voice_end_uri: 'http://end',
      })
      const expected = {
        from: 'me',
        to: 'you',
        voice_start:
          'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Fstart',
        whenhangup:
          'http://BASE_URI/v2/proxiedcallback?type=voice_action&destination_uri=http%3A%2F%2Fend',
      }
      expect(actual).to.deep.equal(expected)
    })
    it('renames voice_start_action to voice_start, translates to json string', () => {
      const actual = requestTransformer('http://BASE_URI')({
        from: 'me',
        to: 'you',
        voice_start_action: { play: 'http://play' },
      })
      const expected = {
        from: 'me',
        to: 'you',
        voice_start: '{"play":"http://play"}',
      }
      expect(actual).to.deep.equal(expected)
    })
  })
})
