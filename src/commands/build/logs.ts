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
    return new Promise(resolver => {
      let activeRequest = false
      const lines = []

      // make 4 requests a second maximum
      const intervalId = setInterval(() => {
        // don't make concurrent requests to bamboo
        if (activeRequest) {
          return
        }

        activeRequest = true
        return this.client?.getBuildLog(planKey, buildNumber, lines.length === 0 ? 0 : lines.length)
        .then(res => {
          const data = res.data as BuildStatus
          if (data.lifeCycleState === 'Finished') {
            clearInterval(intervalId)
            resolver()
            return null
          }

          const newLines = res?.data.logEntries.logEntry
          if (newLines.length > 0) {
            for (let i = lines.length; i < newLines.length; i++) {
              this.printLine(newLines[i].unstyledLog)
              lines.push(newLines[i])
            }
          }

          activeRequest = false
        }).catch(err => {
          clearInterval(intervalId)
          this.handleError(err)
        })
      }, 250)
    })
  }

  printLine(line: string) {
    const lineParts = line.split(' ')
    let fullLine = ''
    const beginning = lineParts[0]
    if (beginning === 'error') {
      fullLine += color.red(beginning)
    } else if (beginning === 'INFO:') {
      fullLine += color.blue(beginning)
    } else if (beginning === 'WARNING:') {
      fullLine += color.yellow(beginning)
    } else {
      fullLine += lineParts[0]
    }

    lineParts.splice(0, 1)
    fullLine += `\t${lineParts.join(' ')}`
    this.log(fullLine)
  }

  async run() {
    const {args, flags} = this.parse(Logs)
    if (flags.poll) {
      return this.poll(args.planKey, args.buildNumber)
    }

    return this.client?.getBuildLog(args.planKey, args.buildNumber, 0)
      .then(res => {
        const lines = res.data.logEntries.logEntry
        for (const line of lines) {
          this.printLine(line.unstyledLog)
        }
      }).catch(this.handleError)
  }
}
