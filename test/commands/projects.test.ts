import {expect, test} from '@oclif/test'
import stringify = require('json-stringify-safe');
import ConfigParser from '../../src/configuration-parser'
const config = ConfigParser.parse()

describe('projects', () => {
  const mock = [
    {
      id: 1,
    },
  ]

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/deploy/project/all.json').reply(200, mock))
  .stdout()
  .command(['projects'])
  .it('runs projects', ctx => {
    expect(ctx.stdout).to.contain(stringify(mock, null, config.tabCount))
  })
})
