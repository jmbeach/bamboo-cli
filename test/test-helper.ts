import Conf = require('conf');
const config = new Conf()

export default class TestHelper {
  static getConfig() {
    const baseUrl = config.get('url')
    const tabCount = config.get('tabCount')
    return {
      baseUrl: baseUrl,
      tabCount: tabCount,
    }
  }
}
