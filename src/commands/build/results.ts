import BambooClientCommand, {LogPrettyField} from '../../bamboo-client-command'
import {flags} from '@oclif/command'
import color from '@oclif/color'

export default class Results extends BambooClientCommand {
  static description = 'get info on builds';

  static examples = [
    '$ bamboo-cli build results',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
    failed: flags.boolean({char: 'f'}),
  }

  loggedProperties = [
    {key: 'plan.name', display: 'plan', type: 'h1'} as LogPrettyField,
    'plan.shortName',
    'plan.key',
    'buildResultKey',
    {key: 'state', customFormat: {ifValue: 'Failed', color: color.red}} as LogPrettyField,
    'buildState',
    'number',
  ]

  async run() {
    const {flags} = this.parse(Results)
    return this.client?.getBuilds()
      .then(res => {
        const data = res.data
        if (flags.failed) {
          data.results.result = data.results.result.filter((p: any) => p.state === 'Failed')
        }

        this.handleCommonFlags(flags, res, 'results.result')
      }).catch(this.handleError)
  }
}
