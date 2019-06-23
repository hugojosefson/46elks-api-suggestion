import gitInfo from 'git-repo-info'
import _ from 'lodash'
import loadPkg from 'load-pkg'

const version = loadPkg.sync().version

export default (req, res) => res.send(_.assign({ version }, gitInfo()))
