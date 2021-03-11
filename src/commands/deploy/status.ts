import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'
import color from '@oclif/color'

export default class Status extends BambooClientCommand {
  static description = 'get info on specific deploy';

  static examples = [
    '$ bamboo-cli deploy status <deployId>',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
    poll: flags.boolean({char: 'p'}),
  }

  static args = [
    {
      name: 'deployId',
      description: 'plan key',
    },
  ]

  loggedProperties = [
    {key: 'planName', display: 'plan', type: 'h1'} as LogPrettyField,
    'number',
    {key: 'lifeCycleState', display: 'state'} as LogPrettyField,
    {key: 'progress.percentageCompletedPretty', display: 'progress'} as LogPrettyField,
  ]

  async poll(deployId: string): Promise<any> {
    return new Promise(resolver => {
      let activeRequest = false

      // make 4 requests a second maximum
      const intervalId = setInterval(() => {
        // don't make concurrent requests to bamboo
        if (activeRequest) {
          return
        }

        activeRequest = true
        return this.client?.getDeploy(deployId)
        .then(res => {
          activeRequest = false
          const data = res.data
          if (data.lifeCycleState === 'FINISHED') {
            clearInterval(intervalId)
            this.action.stop(color.green('Deploy finished'))
            resolver()
          } else {
            this.action.start(`polling deploy status for ${deployId}`, data.progress?.percentageCompletedPretty)
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
      this.action.start(`polling deploy status for ${args.deployId}-${args.deployNumber}`)
      return this.poll(args.deployId)
    }

    return this.client?.getDeploy(args.deployId)
      .then(res => {
        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
