import BambooClientCommand, {LogPrettyField} from '../bamboo-client-command'
import {flags} from '@oclif/command'

export default class Builds extends BambooClientCommand {
  static description = 'get info on builds';

  static examples = [
    '$ bamboo-cli builds',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  loggedProperties = [
    {key: 'plan.name', display: 'plan', type: 'h1'} as LogPrettyField,
    'plan.shortName',
    'plan.key',
    'buildResultKey',
    'state',
    'buildState',
    'number',
  ]

  async run() {
    const {flags} = this.parse(Builds)
    return this.client?.getBuilds()
      .then(res => {
        this.handleCommonFlags(flags, res, 'results.result')
      }).catch(this.handleError)
  }
}
