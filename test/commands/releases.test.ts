import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('releases', () => {
  const mock = {
    size: 123,
    versions: [
      {
        id: 11111,
        name: 'release-1234',
        creationDate: 1579721288090,
        items: [],
      },
    ],
  }

  it('runs releases -p 11111', async () => {
    const cmd = await TestHelper.getCommand('releases', ['-p', '11111'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/deploy/project/11111/versions').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })
})
