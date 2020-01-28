import * as proxyquire from 'proxyquire'
import * as sinon from 'sinon'
import fakeConfigurationParserFactory from './fake-configuration-parser'
import {FakeColor} from './fake-color'

export default class TestHelper {
  static baseUrl = 'http://localhost:54663'

  static tabCount = 4

  static async getCommand(commandName: string, argv?: Array<any>) {
    const BambooClientCommandClone = proxyquire('../src/bamboo-client-command', {
      './configuration-parser': fakeConfigurationParserFactory(TestHelper.baseUrl, TestHelper.tabCount),
      '@oclif/color': {default: FakeColor},
    }).default
    const Command = proxyquire.noCallThru()(`../src/commands/${commandName}`, {
      '../bamboo-client-command': {default: BambooClientCommandClone},
      '@oclif/color': {default: FakeColor},
    }).default
    const cmd = new Command()
    sinon.stub(cmd, 'error').callsFake((err: any) => {
      cmd.stderr.push(err)
    })

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
