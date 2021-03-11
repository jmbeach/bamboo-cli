import {Command} from '@oclif/command'
import color from '@oclif/color'
import stringify = require('json-stringify-safe');
import BambooClient from './bamboo-client/bamboo-client'
import ConfigurationParser from './configuration-parser'
import {AxiosResponse} from 'axios'
import cli from 'cli-ux'

export interface LogPrettyField {
  key: string;
  customFormat: null | {
    ifValue: any;
    color: typeof color;
  };
  display: string;
  type: null | 'h1';
}

export default abstract class BambooClientCommand extends Command {
  client: BambooClient | null = null;

  tabCount: string | number | null = null;

  loggedProperties: Array<string | LogPrettyField> = [];

  action = cli.action;

  handleCommonFlags = (flags: any, res: AxiosResponse<any>, prettyRootKey: string | null = null) => {
    if (flags && flags.json) {
      this.log(stringify(res.data, null, this.tabCount))
    } else {
      this.logPretty(res.data, prettyRootKey)
    }
  }

  handleError = (err: any) => {
    if (err.response && err.response.status === 401) {
      this.error('Username or password incorrect.')
    } else if (err.response && err.response.data.message) {
      this.error('Message: ' + err.response.data.message)
    } else {
      this.error('Unexpected error ocurred: ' + err.message)
    }
  }

  async init() {
    const config = ConfigurationParser.parse()
    if (config.errorMessages.length > 0) {
      this.error(config.errorMessages.join(''))
    }

    this.tabCount = config.tabCount
    this.client = new BambooClient(config.username, config.password, config.bambooUrl)
  }

  logPretty(data: any, rootKey: string | null = null) {
    const getObjectFromKey = (key: string, baseObject: any) => {
      const keyParts = key.split('.')
      let value = baseObject[keyParts[0]]
      for (let i = 1; i < keyParts.length; i++) {
        value = value[keyParts[i]]
      }

      return value
    }

    const logObject = (obj: any) => {
      for (const key of this.loggedProperties) {
        if (typeof key === 'object') {
          const displayName = key.display ? key.display : key.key
          const value = getObjectFromKey(key.key, obj)
          if (key.type && key.type === 'h1') {
            this.log(`${color.blue(displayName)}: ${color.greenBright(value)}`)
          } else if (key.customFormat && value === key.customFormat.ifValue) {
            this.log(`  ${color.blueBright(displayName)}: ${key.customFormat.color(value)}`)
          } else {
            this.log(`  ${color.blueBright(displayName)}: ${value}`)
          }
        } else {
          const value = getObjectFromKey(key, obj)
          this.log(`  ${color.blueBright(key)}: ${value}`)
        }
      }
    }

    if (rootKey) {
      data = getObjectFromKey(rootKey, data)
    }

    if (data.results.result) {
      data = data.results.result
    }

    if (typeof data.length === 'number') {
      for (const obj of data) {
        logObject(obj)
      }
    } else {
      logObject(data)
    }
  }
}
