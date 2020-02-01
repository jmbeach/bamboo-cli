import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'
import MockDataHelper from '../mock-data-helper'

describe('builds', () => {
  const mock = {
    plans: {
      plan: [
        MockDataHelper.getMockPlan(true),
        MockDataHelper.getMockPlan(false),
      ],
    },
  }

  it('runs plans', async () => {
    const cmd = await TestHelper.getCommand('plans', ['--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/plan.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs plans pretty', async () => {
    const cmd = await TestHelper.getCommand('plans')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/plan.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(mock.plans.plan[0].name)
      api.done()
    })
  })

  it('runs plans --enabled', async () => {
    const cmd = await TestHelper.getCommand('plans', ['--enabled', '--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/plan.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(stringify(mock.plans.plan[0].name, null, TestHelper.tabCount))
      api.done()
    })
  })
})
