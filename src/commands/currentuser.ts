import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');

export default class CurrentUser extends BambooClientCommand {
  static description = 'get the current user';

  static title = 'currentuser';

  static examples = [
    `$ bamboo-cli currentuser
{
  name: 'user@domain.com',
  fullName: 'John Smith',
  email: 'user@domain.com'
}
`,
  ]

  async run() {
    return this.client?.getCurrentUser()
      .then(userData => {
        this.log(stringify(userData.data, null, 2))
      }).catch(this.handleError)
  }
}
