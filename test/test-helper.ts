import * as proxyquire from 'proxyquire'
function fakeConfigurationParserFactory(url: string, tabCount: number) {
  return class FakeConfigurationParser {
    static parse() {
      return {
        bambooUrl: url,
        errorMessages: [],
        password: 'test1234',
        tabCount: tabCount,
        username: 'test',
      }
    }
  }
}

export default class TestHelper {
  static baseUrl = 'http://localhost:54663'

  static tabCount = 4

  static async getCommand(commandName: string, argv?: Array<any>) {
    const BambooClientCommandClone = proxyquire('../src/bamboo-client-command', {
      './configuration-parser': {default: fakeConfigurationParserFactory(TestHelper.baseUrl, TestHelper.tabCount)},
    }).default
    const Command = proxyquire.noCallThru()(`../src/commands/${commandName}`, {'../bamboo-client-command': {default: BambooClientCommandClone}}).default
    const cmd = new Command()
    cmd.log = (message: any) => {
      if (typeof message !== 'string') {
        return
      }

      cmd.stdout.push(message)
    }

    cmd.stderr = []
    cmd.stdout = []
    cmd.tabCount = TestHelper.tabCount
    cmd.config = {
      debug: false,
    }
    cmd.argv = argv || []
    await cmd.init()
    return cmd
  }
}
