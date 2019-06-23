import baseUri from '../utils/base-uri'

export default (req, res) => res.type('application/hal+json').send({
  _links: {
    self: { href: baseUri(req) + '/v2' },
    me: { href: baseUri(req) + '/v2/me' }
  }
})
