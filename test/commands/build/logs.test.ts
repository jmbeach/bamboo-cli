import {expect} from '@oclif/test'
import nock = require('nock')
import TestHelper from '../../test-helper'
import MockDataHelper from '../../mock-data-helper'

describe('build:logs', () => {
  let mock: any
  let mockUrl: string
  const planKey = 'testPlanKey'
  const buildNumber = 1234
  beforeEach(() => {
    mock = {
      logEntries: {
        logEntry: [
          {unstyledLog: MockDataHelper.getMockLogLine('build')},
          {unstyledLog: MockDataHelper.getMockLogLine('simple')},
          {unstyledLog: MockDataHelper.getMockLogLine('error')},
          {unstyledLog: MockDataHelper.getMockLogLine('build')},
        ],
      },
    }
    mockUrl = `/rest/api/latest/result/${planKey}-JOB1-${buildNumber}?expand=logEntries&max-results=10000`
  })

  it('runs build:logs', async () => {
    const cmd = await TestHelper.getCommand('build/logs', [planKey, buildNumber.toString()])
    const api = nock(TestHelper.baseUrl).get(mockUrl).reply(200, mock)

    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join('\n')).to.contain(mock.logEntries.logEntry.map((x: any) => x.unstyledLog).join('\n'))
      api.done()
    })
  })
})
