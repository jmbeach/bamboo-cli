import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'
import BuildStatus from '../../interfaces/build-status'
import color from '@oclif/color'

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
    return new Promise(resolver => {
      let activeRequest = false
      const intervalId = setInterval(() => {
        // don't make concurrent requests to bamboo
        if (activeRequest) {
          return
        }

        activeRequest = true
        return this.client?.getBuilds(planKey, buildNumber)
        .then(res => {
          activeRequest = false
          const data = res.data as BuildStatus
          if (data.lifeCycleState === 'Finished') {
            clearInterval(intervalId)
            if (data.state === 'Successful') {
              this.action.stop(color.green('Build succeeded!'))
            } else {
              this.action.stop(color.red('Build failed!'))
            }
            resolver()
          } else {
            this.action.start(`polling build status for ${planKey}-${buildNumber}`, data.progress?.percentageCompletedPretty)
          }
        }).catch(err => {
          clearInterval(intervalId)
          this.handleError(err)
        })
      }, 250)
    })
  }

  async run() {
    const {flags, args} = this.parse(Status)
    if (flags.poll) {
      this.action.start(`polling build status for ${args.planKey}-${args.buildNumber}`)
      return this.poll(args.planKey, args.buildNumber)
    }

    return this.client?.getBuilds(args.planKey, args.buildNumber)
      .then(res => {
        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
