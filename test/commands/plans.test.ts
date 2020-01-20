import {expect, test} from '@oclif/test'
import stringify = require('json-stringify-safe');
import ConfigParser from '../../src/configuration-parser'
const config = ConfigParser.parse()

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

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/plan.json').reply(200, mock))
  .stdout()
  .command(['plans'])
  .it('runs plans', ctx => {
    expect(ctx.stdout).to.contain(stringify(mock, null, config.tabCount))
  })

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/plan.json').reply(200, mock))
  .stdout()
  .command(['plans', '--enabled'])
  .it('runs plans --enabled', ctx => {
    expect(ctx.stdout).to.contain(stringify(expectedEnabled, null, config.tabCount))
  })
})
