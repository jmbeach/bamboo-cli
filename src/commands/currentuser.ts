import BambooClientCommand from '../bamboo-client-command'

export default class CurrentUser extends BambooClientCommand {
  static description = 'get the current user';

  static title = 'currentuser';

  static examples = [
    `$ bamboo-cli currentuser
hello world from ./src/hello.ts!
`,
  ]

  async run() {
    return this.client?.getCurrentUser()
      .then(userData => {
        this.log(userData.data)
      }).catch(err => {
        if (typeof err === 'undefined') {
          this.error('Unexpected error ocurred')
        }
      })
  }
}
