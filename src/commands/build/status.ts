import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'

export default class Status extends BambooClientCommand {
  static description = 'get info on specific build';

  static examples = [
    '$ bamboo-cli build status <projectKey> <buildNumber>',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  static args = [
    {
      name: 'planKey',
      description: 'plan key',
    },
    {
      name: 'buildNumber',
      description: 'build number',
    },
  ]

  loggedProperties = [
    {key: 'planName', display: 'plan', type: 'h1'} as LogPrettyField,
    'number',
    {key: 'lifeCycleState', display: 'state'} as LogPrettyField,
    {key: 'progress.percentageCompletedPretty', display: 'progress'} as LogPrettyField,
  ]

  async run() {
    const {flags, args} = this.parse(Status)
    return this.client?.getBuilds(args.planKey, args.buildNumber)
      .then(res => {
        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
