import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class Projects extends BambooClientCommand {
  static description = 'get all projects';

  static examples = [
    '$ bamboo-cli projects',
  ]

  async run() {
    return this.client?.getAllProjects()
      .then(res => {
        this.log(stringify(res.data, null, 4))
      }).catch(this.handleError)
  }
}
