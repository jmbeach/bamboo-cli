import {Command} from '@oclif/command'
import BambooClient from './bamboo-client/bamboo-client'
import ConfigurationParser from './configuration-parser'

export default abstract class BambooClientCommand extends Command {
  client: BambooClient | null = null;

  tabCount: string | number | null = null;

  handleError = (err: any) => {
    if (err.response && err.response.status === 401) {
      this.error('Username or password incorrect.')
    } else if (err.response && err.response.data.message) {
      this.error('Message: ' + err.response.data.message)
    } else {
      this.error('Unexpected error ocurred')
    }
  }

  async init() {
    const config = ConfigurationParser.parse()
    if (config.errorMessages.length > 0) {
      this.error(config.errorMessages.join(''))
    }

    this.tabCount = config.tabCount
    this.client = new BambooClient(config.username, config.password, config.bambooUrl)
  }
}
