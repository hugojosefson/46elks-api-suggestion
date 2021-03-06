import request from 'request-promise-native'
import _ from 'lodash'
import ComposeMiddleware from 'compose-middleware'
import bodyParser from 'body-parser'

import baseUri from '../base-uri.mjs'
import handleRequestError from './handle-request-error.mjs'

const { compose } = ComposeMiddleware

const postToCollection = ({
  uri,
  requestTransformer = () => _.identity,
  responseTransformer = () => _.identity,
}) => (req, res) => {
  const form = requestTransformer(baseUri(req))(req.body)
  console.log(form)
  request({
    uri,
    method: 'post',
    headers: _.pick(req.headers, 'authorization'),
    form: form,
  })
    .then(resultString => {
      const result = JSON.parse(resultString)
      const entity = responseTransformer(baseUri(req))(result)
      res
        .status(201)
        .type('application/hal+json')
        .header('Location', entity._links.self.href)
        .send(entity)
    })
    .catch(handleRequestError(res))
}

export default (...args) =>
  compose([bodyParser.json(), postToCollection(...args)])
