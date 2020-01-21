import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import TestHelper from '../test-helper'
import nock = require('nock')

describe('currentuser', () => {
  const mock = {
    name: 'user@domain.com',
    fullName: 'John Smith',
    email: 'user@domain.com',
  }

  it('runs currentuser', async () => {
    const cmd = await TestHelper.getCommand('currentuser')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/currentUser.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })
})
