import gitRepoInfo from 'git-repo-info';
import _ from 'lodash';
import loadPkg from 'load-pkg';
import jsonFile from 'jsonfile';
import {resolve} from 'path';
import fileExists from 'file-exists';

const version = loadPkg.sync().version;
const gitInfo = gitRepoInfo();

const fileName = resolve(__dirname, '../git-info.json');
const gitInfoJson = fileExists(fileName) && jsonFile.readFileSync(fileName, {throws: false});

export default (req, res) => res.send(_.assign({version}, gitInfo.sha ? gitInfo : gitInfoJson));
