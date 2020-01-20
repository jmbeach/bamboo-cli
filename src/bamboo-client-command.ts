import {Command} from '@oclif/command'
import BambooClient from './bamboo-client/bamboo-client'
import Conf = require('conf');
const config = new Conf()

export default abstract class BambooClientCommand extends Command {
  client: BambooClient | null = null;

  handleError = (err: any) => {
    if (err.response.status === 401) {
      this.error('Username or password incorrect.')
    } else if (err.response.data.message) {
      this.error('Message: ' + err.response.data.message)
    } else {
      this.error('Unexpected error ocurred')
    }
  }

  async init() {
    const username = config.get('username')
    const password = config.get('password')
    const bambooUrl = config.get('url')
    const errorMessages = []
    if (typeof username === 'undefined') {
      errorMessages.push('\nUsername not configured. "bamboo-cli conf username <username>".')
    }

    if (typeof password === 'undefined') {
      errorMessages.push('\n\tPassword not configured. "bamboo-cli conf password <password>".')
    }

    if (typeof bambooUrl === 'undefined') {
      errorMessages.push('\n\tBamboo URL not configured. "bamboo-cli conf url <url>".')
    }

    if (errorMessages.length > 0) {
      this.error(errorMessages.join(''))
    }

    this.client = new BambooClient(username, password, bambooUrl)
  }
}
