import * as proxyquire from 'proxyquire'
import * as sinon from 'sinon'
import fakeConfigurationParserFactory from './fake-configuration-parser'
import {FakeColor} from './fake-color'
import faker = require('faker')

export default class TestHelper {
  static baseUrl = 'http://localhost:54663'

  static tabCount = 4

  static getMockPlan(enabled: boolean) {
    return {
      shortName: faker.random.alphaNumeric(10),
      shortKey: faker.random.alphaNumeric(5),
      type: faker.random.alphaNumeric(5),
      enabled: enabled,
      link: {
        href: faker.random.alphaNumeric(50),
        rel: 'self',
      },
      key: faker.random.alphaNumeric(20),
      name: faker.random.alphaNumeric(20),
      planKey: {
        key: faker.random.alphaNumeric(20),
      },
    }
  }

  static getMockBuildResult(enabled: boolean, state: 'Successful' | 'Failed') {
    return {
      link: {
        href: faker.random.alphaNumeric(50),
        rel: 'self',
      },
      plan: this.getMockPlan(enabled),
      buildResultKey: faker.random.alphaNumeric(10),
      lifeCycleState: 'Finished',
      id: faker.random.number(100),
      key: faker.random.alphaNumeric(20),
      planResultKey: {
        key: faker.random.alphaNumeric(20),
        entityKey: {
          key: faker.random.alphaNumeric(20),
        },
        resultNumber: faker.random.number(100),
      },
      state: state,
      buildState: state,
      number: faker.random.number(100),
      buildNumber: faker.random.number(100),
    }
  }

  static getMockProject() {
    return {
      id: faker.random.number(1000),
      oid: faker.random.alphaNumeric(20),
      key: {
        key: faker.random.alphaNumeric(10),
      },
      name: faker.random.alphaNumeric(50),
      planKey: {
        key: faker.random.alphaNumeric(10),
      },
    }
  }

  static async getCommand(commandName: string, argv?: Array<any>) {
    const BambooClientCommandClone = proxyquire('../src/bamboo-client-command', {
      './configuration-parser': fakeConfigurationParserFactory(TestHelper.baseUrl, TestHelper.tabCount),
      '@oclif/color': {default: FakeColor},
    }).default
    const pathParts = commandName.split('/')
    const dirsUp = pathParts.map(() => '../').join('')
    const proxies = {
      '@oclif/color': {default: FakeColor},
    } as any
    proxies[`${dirsUp}bamboo-client-command`] = {default: BambooClientCommandClone}
    const Command = proxyquire.noCallThru()(`../src/commands/${commandName}`, proxies).default
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
