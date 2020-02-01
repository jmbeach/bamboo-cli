import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'
import MockDataHelper from '../mock-data-helper'

describe('build:status', () => {
  const mock = MockDataHelper.getMockBuildStatus(true, 'InProgress')

  it('runs build:status', async () => {
    const cmd = await TestHelper.getCommand('build/status', [mock.plan.planKey.key, mock.number.toString(), '--json'])
    const mockUrl = `/rest/api/latest/result/${mock.plan.planKey.key}/${mock.number.toString()}`
    const api = nock(TestHelper.baseUrl).get(mockUrl).reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs build:status pretty', async () => {
    const cmd = await TestHelper.getCommand('build/status', [mock.plan.planKey.key, mock.number.toString()])
    const api = nock(TestHelper.baseUrl).get(`/rest/api/latest/result/${mock.plan.planKey.key}/${mock.number.toString()}`).reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(`state: ${mock.lifeCycleState}`)
      expect(cmd.stdout.join(' ')).not.to.contain('Error: Unexpected error ocurredTypeError')
      api.done()
    })
  })
})
