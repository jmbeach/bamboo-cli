import {flags} from '@oclif/command'
import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Queue extends BambooClientCommand {
  static description = 'queue a build';

  static flags = {
    key: flags.string({required: true}),
  }

  static examples = [
    `$ bamboo-cli queue <buildKey>
`,
  ]

  async run() {
    const {flags} = this.parse(Queue)
    return this.client?.queue(flags.key)
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
