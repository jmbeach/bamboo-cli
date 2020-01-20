import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Server extends BambooClientCommand {
  static description = 'get server info';

  static examples = [
    `$ bamboo-cli server
{
  version: 'x.x.x',
  edition: '',
  buildDate: 'yyyy-MM-dd...',
  buildNumber: 'xxx',
  state: 'RUNNING'
}
`,
  ]

  async run() {
    return this.client?.getServerInfo()
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
