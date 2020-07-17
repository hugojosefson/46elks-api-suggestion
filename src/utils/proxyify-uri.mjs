export const proxyForType = type => baseUri => uri =>
  `${baseUri}/v2/proxiedcallback?type=${encodeURIComponent(
    type
  )}&destination_uri=${encodeURIComponent(uri)}`

export default proxyForType('voice_action')
