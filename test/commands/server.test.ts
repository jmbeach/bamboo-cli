import {expect, test} from '@oclif/test'
import stringify = require('json-stringify-safe');
import ConfigParser from '../../src/configuration-parser'
const config = ConfigParser.parse()

describe('server', () => {
  const mock = {
    version: 'x.x.x',
    edition: '',
    buildDate: 'yyyy-MM-dd...',
    buildNumber: 'xxx',
    state: 'RUNNING',
  }

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/info.json').reply(200, mock))
  .stdout()
  .command(['server'])
  .it('runs server', ctx => {
    expect(ctx.stdout).to.contain(stringify(mock, null, config.tabCount))
  })
})
