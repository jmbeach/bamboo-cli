import BambooClientCommand from '../bamboo-client-command'
import stringify = require('json-stringify-safe');
import color from '@oclif/color'
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

        const loggedProperties = [
          'shortName',
          'key',
          'enabled',
          'planKey.key',
          'link.href',
        ]
        for (const plan of data.plans.plan) {
          this.log(`${color.blue('plan')}: ${color.greenBright(plan.name)}`)
          for (const key of loggedProperties) {
            const keyParts = key.split('.')
            let value = plan[keyParts[0]]
            for (let i = 1; i < keyParts.length; i++) {
              value = value[keyParts[i]]
            }

            this.log(`  ${color.blueBright(key)}: ${value}`)
          }
        }
      }).catch(this.handleError)
  }
}
