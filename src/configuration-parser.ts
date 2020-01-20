import Conf = require('conf');
const config = new Conf()

export default class ConfigurationParser {
  static parse() {
    const username = config.get('username')
    const password = config.get('password')
    const bambooUrl = config.get('url')
    let tabCount = config.get('tabCount')
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

    if (typeof tabCount !== 'undefined') {
      if (isNaN(tabCount) === false) {
        tabCount = parseInt(tabCount, 10)
      }
    }

    return {
      bambooUrl: bambooUrl,
      errorMessages: errorMessages,
      password: password,
      tabCount: tabCount,
      username: username,
    }
  }
}
