import BambooClientCommand from '../bamboo-client-command'
import Status from './build/status'
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
    poll: flags.boolean({char: 'p'}),
  }

  static examples = [
    `$ bamboo-cli queue <planKey>
$ bamboo-cli queue <planKey> -p
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
        if (flags.poll) {
          return Status.run([args.planKey, res.data.buildNumber.toString(), '-p'])
        }

        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
