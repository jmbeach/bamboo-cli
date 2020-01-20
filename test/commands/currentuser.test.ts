import {expect, test} from '@oclif/test'
import stringify = require('json-stringify-safe');
import TestHelper from '../test-helper'

const config = TestHelper.getConfig()

describe('currentuser', () => {
  const expected = {
    name: 'user@domain.com',
    fullName: 'John Smith',
    email: 'user@domain.com',
  }
  test
  .nock(config.baseUrl, api => api.get('/rest/api/latest/currentUser.json').reply(200, expected))
  .stdout()
  .command(['currentuser'])
  .it('runs currentuser', ctx => {
    expect(ctx.stdout).to.contain(stringify(expected, null, config.tabCount))
  })
})
