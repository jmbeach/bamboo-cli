import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('server', () => {
  const mock = {
    version: 'x.x.x',
    edition: '',
    buildDate: 'yyyy-MM-dd...',
    buildNumber: 'xxx',
    state: 'RUNNING',
  }

  it('runs server', async () => {
    const cmd = await TestHelper.getCommand('server')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/info.json').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })
})
