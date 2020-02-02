import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../../test-helper'
import MockDataHelper from '../../mock-data-helper'
import BuildStatus from '../../../src/interfaces/build-status'

describe('build:status', () => {
  let mock: BuildStatus
  let mockUrl: string
  beforeEach(() => {
    mock = MockDataHelper.getMockBuildStatus(true, 'InProgress', 'Unknown')
    mockUrl = `/rest/api/latest/result/${mock.plan.planKey.key}/${mock.number.toString()}`
  })

  it('runs build:status', async () => {
    const cmd = await TestHelper.getCommand('build/status', [mock.plan.planKey.key, mock.number.toString(), '--json'])
    const api = nock(TestHelper.baseUrl).get(mockUrl).reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs build:status pretty', async () => {
    const cmd = await TestHelper.getCommand('build/status', [mock.plan.planKey.key, mock.number.toString()])
    const api = nock(TestHelper.baseUrl).get(mockUrl).reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain(`state: ${mock.lifeCycleState}`)
      expect(cmd.stdout.join(' ')).not.to.contain('Error: Unexpected error ocurredTypeError')
      api.done()
    })
  })

  it('runs build:status poll', async () => {
    const cmd = await TestHelper.getCommand('build/status', ['-p', mock.plan.planKey.key, mock.number.toString()])
    const finishedMock = MockDataHelper.getMockBuildStatus(true, 'Finished', 'Successful')
    nock(TestHelper.baseUrl).get(mockUrl).once().reply(200, mock)
    nock(TestHelper.baseUrl).get(mockUrl).twice().reply(200, finishedMock)
    return cmd.run()
    .then(() => {
      let progress = ''
      if (mock.progress) {
        progress = mock.progress.percentageCompletedPretty
      }

      expect(cmd.stdout.join(' ')).to.contain(`polling build status for ${mock.plan.planKey.key}-${mock.number} ${progress}`)
      expect(cmd.stdout.join(' ')).to.contain('Build succeeded!')
    })
  })

  it('runs build:status poll (Failure)', async () => {
    const cmd = await TestHelper.getCommand('build/status', ['-p', mock.plan.planKey.key, mock.number.toString()])
    const finishedMock = MockDataHelper.getMockBuildStatus(true, 'Finished', 'Failed')
    nock(TestHelper.baseUrl).get(mockUrl).once().reply(200, mock)
    nock(TestHelper.baseUrl).get(mockUrl).twice().reply(200, finishedMock)
    return cmd.run()
    .then(() => {
      let progress = ''
      if (mock.progress) {
        progress = mock.progress.percentageCompletedPretty
      }

      expect(cmd.stdout.join(' ')).to.contain(`polling build status for ${mock.plan.planKey.key}-${mock.number} ${progress}`)
      expect(cmd.stdout.join(' ')).to.contain('Build failed!')
    })
  })
})
