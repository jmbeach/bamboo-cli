import Command from '@oclif/command'
import BambooClient from '../src/bamboo-client/bamboo-client'
export default abstract class FakeCommand extends Command {
  stderr: Array<string> = []

  stdout: Array<string> = []

  client = new BambooClient('test', 'test1234', 'http://localhost:54663')

  tabCount: string | number | null = 0;

  handleError = (err: any) => {
    this.stderr.push(err)
  }

  log(message: any) {
    if (typeof message !== 'string') {
      return
    }

    this.stdout.push(message)
  }
}
