import _ from 'lodash'

export default (req, res, next) => {
  console.log(
    JSON.stringify(
      _.pick(req, ['method', 'url', 'originalUrl', 'query', 'params', 'body', 'headers']),
      null, 2
    )
  )
  next()
}
