import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'

export default class Latest extends BambooClientCommand {
  static description = 'get latest build data';

  static examples = [
    '$ bamboo-cli build latest --planKey <plan key>',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  static args = [
    {
      name: 'planKey',
      description: 'plan key',
    },
  ]

  loggedProperties = [
    {key: 'plan.shortName', display: 'plan', type: 'h1'} as LogPrettyField,
    'number',
  ]

  async run() {
    try {
      const {args} = this.parse(Latest)
      let latestRes = await this.client?.getLatestBuild(args.planKey)
      if (!latestRes) {
        this.log('Unknown error occurred.')
        return
      }

      if (latestRes.data.finished) {
        // try to get active build
        try {
          const active = await this.client?.getBuilds(args.planKey, (parseInt(latestRes.data.buildNumber, 10) + 1).toString())
          if (active) {
            latestRes = active
          }
        } catch (_) {}
      }

      this.handleCommonFlags(Latest.flags, latestRes)
    } catch (error) {
      this.handleError(error)
    }
  }
}
