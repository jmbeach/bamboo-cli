import {flags} from '@oclif/command'
import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Deploy extends BambooClientCommand {
  static description = 'deploy a build';

  static flags = {
    env: flags.string({required: true, char: 'e', description: 'environment ID'}),
    version: flags.string({required: true, char: 'v', description: 'build version ID'}),
  }

  static examples = [
    `$ bamboo-cli deploy -e 123 -v 456
`,
  ]

  async run() {
    const {flags} = this.parse(Deploy)
    return this.client?.deploy(flags.env, flags.version)
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
