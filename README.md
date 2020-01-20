bamboo-cli
==========

command-line tool to interact with Atlassian Bamboo

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bamboo-cli.svg)](https://npmjs.org/package/bamboo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bamboo-cli.svg)](https://npmjs.org/package/bamboo-cli)
[![License](https://img.shields.io/npm/l/bamboo-cli.svg)](https://github.com/jmbeach/bamboo-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bamboo-cli
$ bamboo-cli COMMAND
running command...
$ bamboo-cli (-v|--version|version)
bamboo-cli/0.0.0 win32-x64 node-v12.14.1
$ bamboo-cli --help [COMMAND]
USAGE
  $ bamboo-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bamboo-cli conf [KEY] [VALUE]`](#bamboo-cli-conf-key-value)
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)

## `bamboo-cli conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ bamboo-cli conf [KEY] [VALUE]

ARGUMENTS
  KEY    key of the config
  VALUE  value of the config

OPTIONS
  -d, --cwd=cwd          config file location
  -d, --delete           delete?
  -h, --help             show CLI help
  -k, --key=key          key of the config
  -n, --name=name        config file name
  -p, --project=project  project name
  -v, --value=value      value of the config
```

_See code: [conf-cli](https://github.com/natzcam/conf-cli/blob/v0.1.9/src\commands\conf.ts)_

## `bamboo-cli currentuser`

get the current user

```
USAGE
  $ bamboo-cli currentuser

EXAMPLE
  $ bamboo-cli currentuser
  {
     name: 'jaredbeachdesign@gmail.com',
     fullName: 'Jared Beach',
     email: 'jaredbeachdesign@gmail.com'
  }
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli help [COMMAND]`

display help for bamboo-cli

```
USAGE
  $ bamboo-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_
<!-- commandsstop -->
