import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Queue extends BambooClientCommand {
  static description = 'queue a build';

  static args = [
    {
      name: 'planKey',
      description: 'get plan key by running "bamboo-cli plans".',
    },
  ]

  static examples = [
    `$ bamboo-cli queue <planKey>
`,
  ]

  async run() {
    const {args} = this.parse(Queue)
    return this.client?.queue(args.planKey)
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
