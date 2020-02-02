import {flags} from '@oclif/command'
import BambooClientCommand from '../bamboo-client-command'

export default class DirectoryInfo extends BambooClientCommand {
  static description = 'deploy a build';

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  static examples = [
    `$ bamboo-cli deploy -e 123 -v 456
`,
  ]

  async run() {
    const {flags} = this.parse(DirectoryInfo)
    return this.client?.deploy(flags.env, flags.version)
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
