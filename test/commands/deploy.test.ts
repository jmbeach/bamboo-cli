import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('deploy', () => {
  const mock = {
    deploymentResultId: 1234556,
    link: {
      href: 'examplehref',
      rel: 'self',
    },
  }

  it('runs deploy -e 123 -v 456', async () => {
    const cmd = await TestHelper.getCommand('deploy', ['-e', '123', '-v', '456'])
    const api = nock(TestHelper.baseUrl).post('/rest/api/latest/queue/deployment/?environmentId=123&versionId=456').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })
})
