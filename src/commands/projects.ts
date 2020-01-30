import BambooClientCommand, {LogPrettyField} from '../bamboo-client-command'
import {flags} from '@oclif/command'

export default class Projects extends BambooClientCommand {
  static description = 'get all projects';

  static examples = [
    '$ bamboo-cli projects',
  ]

  static flags = {
    json: flags.boolean({char: 'j'}),
  }

  loggedProperties = [
    {key: 'name', type: 'h1'} as LogPrettyField,
    'id',
    {key: 'key.key', display: 'key'} as LogPrettyField,
    {key: 'planKey.key', display: 'plan key'} as LogPrettyField,
  ]

  async run() {
    const {flags} = this.parse(Projects)
    return this.client?.getAllProjects()
      .then(res => {
        this.handleCommonFlags(flags, res)
      }).catch(this.handleError)
  }
}
