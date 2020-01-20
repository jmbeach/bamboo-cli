import {test} from '@oclif/test'

describe('hooks', () => {
  test
  .stdout()
  .hook('init', {id: 'help', argv: ['conf']})
  .it('doesn\'t error')
})
