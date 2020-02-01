import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'
import MockDataHelper from '../mock-data-helper'

describe('projects', () => {
  const mock = [
    MockDataHelper.getMockProject(),
  ]

  it('runs projects', async () => {
    const cmd = await TestHelper.getCommand('projects', ['--json'])
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/deploy/project/all.json').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs projects pretty', async () => {
    const cmd = await TestHelper.getCommand('projects')
    const api = nock(TestHelper.baseUrl).get('/rest/api/latest/deploy/project/all.json').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain('plan key', `plan key: ${mock[0].planKey.key}`)
      api.done()
    })
  })
})
