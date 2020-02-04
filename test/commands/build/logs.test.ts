import {expect} from '@oclif/test'
import nock = require('nock')
import TestHelper from '../../test-helper'
import MockDataHelper from '../../mock-data-helper'

describe('build:logs', () => {
  let mock: string[]
  let mockUrl: string
  const planKey = 'testPlanKey'
  const buildNumber = 1234
  beforeEach(() => {
    mock = [
      MockDataHelper.getMockLogLine('build'),
      MockDataHelper.getMockLogLine('simple'),
      MockDataHelper.getMockLogLine('error'),
      MockDataHelper.getMockLogLine('build'),
    ]
    mockUrl = `/download/${planKey}-JOB1/build_logs/${planKey}-JOB1-${buildNumber}.log`
  })

  it('runs build:logs', async () => {
    const cmd = await TestHelper.getCommand('build/logs', [planKey, buildNumber.toString()])
    const api = nock(TestHelper.baseUrl).get(mockUrl).reply(200, mock.join('\n'))

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join('\n')).to.contain(mock.join('\n'))
      api.done()
    })
  })
})
