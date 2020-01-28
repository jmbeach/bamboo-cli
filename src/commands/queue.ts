import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');
import {flags} from '@oclif/command'

export default class Queue extends BambooClientCommand {
  static description = 'queue a build';

  static args = [
    {
      name: 'planKey',
      description: 'get plan key by running "bamboo-cli plans".',
    },
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  static examples = [
    `$ bamboo-cli queue <planKey>
`,
  ]

  loggedProperties = [
    'planKey',
    'buildNumber',
    'buildResultKey',
    'triggerReason',
    'link.href',
  ]

  async run() {
    const {flags, args} = this.parse(Queue)
    return this.client?.queue(args.planKey)
      .then(res => {
        if (flags.json) {
          this.log(stringify(res.data, null, this.tabCount))
        } else {
          this.logPretty(res.data)
        }
      }).catch(this.handleError)
  }
}
