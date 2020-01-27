import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('plans', () => {
  const mock = {
    plans: {
      plan: [
        {
          name: 'plan 1 - enabled',
          enabled: true,
        },
        {
          name: 'plan 1 - false',
          enabled: false,
        },
      ],
    },
  }

  const expectedEnabled = {
    plans: {
      plan: [
        {
          name: 'plan 1 - enabled',
          enabled: true,
        },
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

  it('runs plans', async () => {
    const cmd = await TestHelper.getCommand('plans')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/plan.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      // eslint-disable-next-line unicorn/escape-case
      expect(cmd.stdout.join(' ')).to.contain('\u001b[94mplan\u001b[39m: \u001b[92mplan 1 - enabled\u001b[39m')
      api.done()
    })
  })

  it('runs plans --enabled', async () => {
    const cmd = await TestHelper.getCommand('plans', ['--enabled', '--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/plan.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(expectedEnabled, null, TestHelper.tabCount))
      api.done()
    })
  })
})
