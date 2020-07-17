import PrivateIps from 'private-ips'
import { promisify } from 'util'

const privateIps = new PrivateIps({ ipv6: true })
const isPrivate = promisify(privateIps.isPrivate.bind(privateIps))

export default hostname => isPrivate(hostname).then(isIpPrivate => {
  const isAllowed = !isIpPrivate
  return isAllowed
})
