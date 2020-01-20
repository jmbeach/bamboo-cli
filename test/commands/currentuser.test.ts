import {expect, test} from '@oclif/test'
import stringify = require('json-stringify-safe');
import ConfigParser from '../../src/configuration-parser'
const config = ConfigParser.parse()

describe('currentuser', () => {
  const expected = {
    name: 'user@domain.com',
    fullName: 'John Smith',
    email: 'user@domain.com',
  }

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/currentUser.json').reply(200, expected))
  .stdout()
  .command(['currentuser'])
  .it('runs currentuser', ctx => {
    expect(ctx.stdout).to.contain(stringify(expected, null, config.tabCount))
  })

  test
  .nock(config.bambooUrl, api => api.get('/rest/api/latest/currentUser.json').reply(401))
  .stdout()
  .command(['currentuser'])
  .exit(2)
  .it('throws error when currentuser unauthenticated')
})
