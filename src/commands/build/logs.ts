import BambooClientCommand from '../../bamboo-client-command'
import color from '@oclif/color'

export default class Logs extends BambooClientCommand {
  static description = 'get plan logs';

  static examples = [
    '$ bamboo-cli build logs <planKey> <buildNumber>',
  ]

  static args = [
    {
      name: 'planKey',
      description: 'plan key',
    },
    {
      name: 'buildNumber',
      description: 'build number',
    },
  ]

  async run() {
    const {args} = this.parse(Logs)
    return this.client?.getBuildLog(args.planKey, args.buildNumber)
      .then(res => {
        const lines = res.data.split('\n')
        for (const line of lines) {
          const lineParts = line.split('\t')
          let fullLine = ''
          if (lineParts[0] === 'error') {
            fullLine += color.red(lineParts[0])
          } else {
            fullLine += lineParts[0]
          }

          lineParts.splice(0, 1)
          fullLine += `\t${lineParts.join('\t')}`
          this.log(fullLine)
        }
      }).catch(this.handleError)
  }
}
