import {flags} from '@oclif/command'
import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Releases extends BambooClientCommand {
  static description = 'gets releases available for a project';

  static flags = {
    project: flags.string({required: true, description: 'project ID', char: 'p'}),
  }

  static examples = [
    `$ bamboo-cli releases --project <project-id>
`,
  ]

  async run() {
    const {flags} = this.parse(Releases)
    return this.client?.getReleases(flags.project)
      .then(res => {
        this.log(stringify(res.data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
