import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');
import {flags} from '@oclif/command'

export default class Plans extends BambooClientCommand {
  static description = 'get all plans';

  static examples = [
    '$ bamboo-cli plans',
    '$ bamboo-cli plans --enabled',
  ]

  static flags = {
    enabled: flags.boolean({char: 'e'}),
  }

  async run() {
    const {flags} = this.parse(Plans)
    return this.client?.getAllPlans()
      .then(res => {
        const data = res.data
        if (flags.enabled) {
          data.plans.plan = data.plans.plan.filter((p: any) => p.enabled !== false)
        }

        this.log(stringify(data, null, this.tabCount))
      }).catch(this.handleError)
  }
}
