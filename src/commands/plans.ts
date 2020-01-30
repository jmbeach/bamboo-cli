import BambooClientCommand, {LogPrettyField} from '../bamboo-client-command'
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
    {key: 'name', display: 'plan', type: 'h1'} as LogPrettyField,
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

        this.handleCommonFlags(flags, res, 'plans.plan')
      }).catch(this.handleError)
  }
}
