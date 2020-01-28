import BambooClientCommand from '../bamboo-client-command'
import color from '@oclif/color'
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
    json: flags.boolean({char: 'j'}),
  }

  loggedProperties = [
    'shortName',
    'key',
    'enabled',
    'planKey.key',
    'link.href',
  ]

  async run() {
    const {flags} = this.parse(Plans)
    return this.client?.getAllPlans()
      .then(res => {
        const data = res.data
        if (flags.enabled) {
          data.plans.plan = data.plans.plan.filter((p: any) => p.enabled !== false)
        }

        if (flags.json) {
          this.log(stringify(data, null, this.tabCount))
          return
        }

        for (const plan of data.plans.plan) {
          this.log(`${color.blue('plan')}: ${color.greenBright(plan.name)}`)
          this.logPretty(plan)
        }
      }).catch(this.handleError)
  }
}
