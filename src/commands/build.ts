import {Command} from '@oclif/command'
import HelpCommand from '@oclif/plugin-help/lib/commands/help'

export default class Build extends Command {
  static description = 'commands for getting build results/status';

  static flags = {
  }

  async run() {
    await HelpCommand.run(['build'])
  }
}
