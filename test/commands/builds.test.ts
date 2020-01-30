import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('builds', () => {
  const mock = {
    results: {
      result: [
        TestHelper.getMockBuildResult(true, 'Successful'),
        TestHelper.getMockBuildResult(true, 'Failed'),
      ],
    },
  }

  it('runs builds', async () => {
    const cmd = await TestHelper.getCommand('builds', ['--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/result').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs builds pretty', async () => {
    const cmd = await TestHelper.getCommand('builds')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/result').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(`state: ${mock.results.result[0].state}`)
      api.done()
    })
  })
})
