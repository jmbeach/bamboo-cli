import * as proxyquire from 'proxyquire'
import FakeCommand from './fake-command'
export default class TestHelper {
  static baseUrl = 'http://localhost:54663'

  static tabCount = 4

  static async getCommand(commandName: string, argv?: Array<any>) {
    const Command = proxyquire.noCallThru()(`../src/commands/${commandName}`, {'../bamboo-client-command': {default: FakeCommand}}).default
    const cmd = new Command()
    cmd.tabCount = TestHelper.tabCount
    cmd.config = {
      debug: false,
    }
    cmd.argv = argv || []
    await cmd.init()
    return cmd
  }
}
