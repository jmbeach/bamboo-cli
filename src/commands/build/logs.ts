import BambooClientCommand from '../../bamboo-client-command'
import {flags} from '@oclif/command'
import color from '@oclif/color'
import BuildStatus from '../../interfaces/build-status'

export default class Logs extends BambooClientCommand {
  static description = 'get plan logs';

  static examples = [
    '$ bamboo-cli build logs <planKey> <buildNumber>',
  ]

  static flags = {
    poll: flags.boolean({char: 'p'}),
  }

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

  async poll(planKey: string, buildNumber: string): Promise<any> {
    let lines = []
    return new Promise(resolver => {
      let activeRequest = false

      // make 4 requests a second maximum
      const intervalId = setInterval(() => {
        // don't make concurrent requests to bamboo
        if (activeRequest) {
          return
        }

        activeRequest = true
        return this.client?.getBuilds(planKey, buildNumber)
        .then(res => {
          const data = res.data as BuildStatus
          if (data.lifeCycleState === 'Finished') {
            clearInterval(intervalId)
            resolver()
            return null
          }

          return this.client?.getBuildLog(planKey, buildNumber)
        }).then(res => {
          if (res === null) {
            return
          }

          const newLines = res?.data.split('\n') as string[]
          if (lines.length < newLines.length) {
            for (let i = lines.length; i < newLines.length; i++) {
              this.printLine(newLines[i])
            }

            lines = newLines
            activeRequest = false
          }
        }).catch(err => {
          clearInterval(intervalId)
          this.handleError(err)
        })
      }, 250)
    })
  }

  printLine(line: string) {
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

  async run() {
    const {args, flags} = this.parse(Logs)
    if (flags.poll) {
      return this.poll(args.planKey, args.buildNumber)
    }

    return this.client?.getBuildLog(args.planKey, args.buildNumber)
      .then(res => {
        const lines = res.data.split('\n')
        for (const line of lines) {
          this.printLine(line)
        }
      }).catch(this.handleError)
  }
}
