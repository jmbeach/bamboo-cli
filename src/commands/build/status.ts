import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'
import BuildStatus from '../../interfaces/build-status'
import color from '@oclif/color'
import cli from 'cli-ux'

export default class Status extends BambooClientCommand {
  static description = 'get info on specific build';

  static examples = [
    '$ bamboo-cli build status <projectKey> <buildNumber>',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
    poll: flags.boolean({char: 'p'}),
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

  async poll(planKey: string, buildNumber: string): Promise<any> {
    return this.client?.getBuilds(planKey, buildNumber)
    .then(res => {
      const data = res.data as BuildStatus

      if (data.lifeCycleState === 'Finished') {
        if (data.state === 'Successful') {
          cli.action.stop(color.green('Build succeeded!'))
        } else {
          cli.action.stop(color.red('Build failed!'))
        }
      } else {
        cli.action.start(`polling build status for ${planKey}-${buildNumber}`, data.progress?.percentageCompletedPretty)
        return this.poll(planKey, buildNumber)
      }
    }).catch(this.handleError)
  }

  async run() {
    const {flags, args} = this.parse(Status)
    if (flags.poll) {
      cli.action.start(`polling build status for ${args.planKey}-${args.buildNumber}`)
      return this.poll(args.planKey, args.buildNumber)
    }

    return this.client?.getBuilds(args.planKey, args.buildNumber)
      .then(res => {
        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
