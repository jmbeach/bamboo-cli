import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'
import MockDataHelper from '../mock-data-helper'

describe('builds', () => {
  const mock = {
    results: {
      result: [
        MockDataHelper.getMockBuildResult(true, 'Successful'),
        MockDataHelper.getMockBuildResult(true, 'Failed'),
      ],
    },
  }

  it('runs builds', async () => {
    const cmd = await TestHelper.getCommand('build/results', ['--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/result').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs builds pretty', async () => {
    const cmd = await TestHelper.getCommand('build/results')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/result').reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(`state: ${mock.results.result[0].state}`)
      api.done()
    })
  })
})
