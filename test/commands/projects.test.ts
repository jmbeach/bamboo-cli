import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('projects', () => {
  const mock = [
    {
      id: 1,
    },
  ]

  it('runs projects', async () => {
    const cmd = await TestHelper.getCommand('projects')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/deploy/project/all.json').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })
})
