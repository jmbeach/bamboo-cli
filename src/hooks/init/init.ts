import {Hook} from '@oclif/config'

const hook: Hook<'init'> = async function (opts: any) {
  if (opts.id !== 'help' || opts.argv[0] !== 'conf') {
    return
  }

  const confCommand = this.config.findCommand('conf')
  if (typeof confCommand === 'undefined') {
    return
  }

  confCommand.examples = [
    '"*" = required',
    '',
    '*\t$ bamboo-cli conf username <username>',
    '*\t$ bamboo-cli conf password <password>',
    '*\t$ bamboo-cli conf url <url>',
    '\t$ bamboo-cli conf tabCount <tabCount>',
  ]
}

export default hook
