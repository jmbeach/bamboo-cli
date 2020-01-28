import {expect} from '@oclif/test'
import stringify = require('json-stringify-safe');
import nock = require('nock')
import TestHelper from '../test-helper'

describe('queue', () => {
  const mock = {
    planKey: 'example',
    buildNumber: 123,
    buildResultKey: 'example result key',
    triggerReason: 'Manual build',
    link: {
      href: TestHelper.baseUrl,
      rel: 'self',
    },
  }

  it('runs queue example', async () => {
    const cmd = await TestHelper.getCommand('queue', ['example', '--json'])
    const api = nock(TestHelper.baseUrl).post('/rest/api/latest/queue/example').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout).to.contain(stringify(mock, null, TestHelper.tabCount))
      api.done()
    })
  })

  it('runs queue example pretty', async () => {
    const cmd = await TestHelper.getCommand('queue', ['example'])
    const api = nock(TestHelper.baseUrl).post('/rest/api/latest/queue/example').reply(200, mock)
    return cmd.run()
    .then(() => {
      expect(cmd.stdout.join(' ')).to.contain('planKey: example')
      api.done()
    })
  })
})
