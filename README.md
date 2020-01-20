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
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli hello [FILE]`](#bamboo-cli-hello-file)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)

## `bamboo-cli currentuser`

get the current user

```
USAGE
  $ bamboo-cli currentuser

EXAMPLE
  $ bamboo-cli currentuser
  hello world from ./src/hello.ts!
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli hello [FILE]`

describe the command here

```
USAGE
  $ bamboo-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ bamboo-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\hello.ts)_

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
