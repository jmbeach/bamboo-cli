import BambooClientCommand from '../bamboo-client-command'

export default class CurrentUser extends BambooClientCommand {
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
        this.log(res.data)
      }).catch(this.handleError)
  }
}
