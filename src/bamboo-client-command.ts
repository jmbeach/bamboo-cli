import {Command} from '@oclif/command'
import BambooClient from './bamboo-client/bamboo-client'

export default abstract class BambooClientCommand extends Command {
  client: BambooClient | null = null;

  async init() {
    const errorMessages = []
    if (typeof process.env.BAMBOO_USERNAME === 'undefined') {
      errorMessages.push('Environment variable BAMBOO_USERNAME not found.')
    }

    if (typeof process.env.BAMBOO_PASSWORD === 'undefined') {
      errorMessages.push('Environment variable BAMBOO_PASSWORD not found.')
    }

    if (typeof process.env.BAMBOO_URL === 'undefined') {
      errorMessages.push('Environment variable BAMBOO_URL not found.')
    }

    const error = {
      errorMessages: errorMessages,
    }

    if (errorMessages.length > 0) {
      throw error
    }

    this.client = new BambooClient(process.env.BAMBOO_USERNAME || '', process.env.BAMBOO_PASSWORD || '', process.env.BAMBOO_URL || '')
  }
}
