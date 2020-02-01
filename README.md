bamboo-cli
==========

command-line tool to interact with Atlassian Bamboo

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bamboo-cli.svg)](https://npmjs.org/package/bamboo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bamboo-cli.svg)](https://npmjs.org/package/bamboo-cli)
[![License](https://img.shields.io/npm/l/bamboo-cli.svg)](https://github.com/jmbeach/bamboo-cli/blob/master/package.json)

<!-- toc -->
* [Configuration](#configuration)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Configuration](#configuration)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Configuration](#configuration)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Configuration](#configuration)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Configuration

The following configuration settings are available:

"*" = required

* \* $ bamboo-cli conf username <username>
* \* $ bamboo-cli conf password <password>
* \* $ bamboo-cli conf url <url>
*    $ bamboo-cli conf tabCount <tabCount>

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
```sh-session
$ npm install -g bamboo-cli
$ bamboo-cli COMMAND
running command...
$ bamboo-cli (-v|--version|version)
bamboo-cli/0.0.0 win32-x64 node-v8.16.2
$ bamboo-cli --help [COMMAND]
USAGE
  $ bamboo-cli COMMAND
...
```
<!-- usagestop -->
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
```sh-session
$ npm install -g bamboo-cli
$ bamboo-cli COMMAND
running command...
$ bamboo-cli (-v|--version|version)
bamboo-cli/0.0.0 win32-x64 node-v8.16.2
$ bamboo-cli --help [COMMAND]
USAGE
  $ bamboo-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bamboo-cli autocomplete [SHELL]`](#bamboo-cli-autocomplete-shell)
* [`bamboo-cli build:results`](#bamboo-cli-buildresults)
* [`bamboo-cli build:status [PLANKEY] [BUILDNUMBER]`](#bamboo-cli-buildstatus-plankey-buildnumber)
* [`bamboo-cli conf [KEY] [VALUE]`](#bamboo-cli-conf-key-value)
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli deploy`](#bamboo-cli-deploy)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)
* [`bamboo-cli plans`](#bamboo-cli-plans)
* [`bamboo-cli projects`](#bamboo-cli-projects)
* [`bamboo-cli queue [PLANKEY]`](#bamboo-cli-queue-plankey)
* [`bamboo-cli releases`](#bamboo-cli-releases)
* [`bamboo-cli server`](#bamboo-cli-server)

## `bamboo-cli autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ bamboo-cli autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ bamboo-cli autocomplete
  $ bamboo-cli autocomplete bash
  $ bamboo-cli autocomplete zsh
  $ bamboo-cli autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.5/src\commands\autocomplete\index.ts)_

## `bamboo-cli build:results`

get info on builds

```
USAGE
  $ bamboo-cli build results

OPTIONS
  -f, --failed
  -j, --json

EXAMPLE
  $ bamboo-cli build results
```

_See code: [src\commands\build\results.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\build\results.ts)_

## `bamboo-cli build:status [PLANKEY] [BUILDNUMBER]`

get info on specific build

```
USAGE
  $ bamboo-cli build status [PLANKEY] [BUILDNUMBER]

ARGUMENTS
  PLANKEY      plan key
  BUILDNUMBER  build number

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli build status <projectKey> <buildNumber>
```

_See code: [src\commands\build\status.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\build\status.ts)_

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
     name: 'user@domain.com',
     fullName: 'John Smith',
     email: 'user@domain.com'
  }
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli deploy`

deploy a build

```
USAGE
  $ bamboo-cli deploy

OPTIONS
  -e, --env=env          (required) environment ID
  -v, --version=version  (required) build version ID

EXAMPLE
  $ bamboo-cli deploy -e 123 -v 456
```

_See code: [src\commands\deploy.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\deploy.ts)_

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

## `bamboo-cli plans`

get all plans

```
USAGE
  $ bamboo-cli plans

OPTIONS
  -e, --enabled
  -j, --json

EXAMPLES
  $ bamboo-cli plans
  $ bamboo-cli plans --enabled
```

_See code: [src\commands\plans.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\plans.ts)_

## `bamboo-cli projects`

get all projects

```
USAGE
  $ bamboo-cli projects

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli projects
```

_See code: [src\commands\projects.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\projects.ts)_

## `bamboo-cli queue [PLANKEY]`

queue a build

```
USAGE
  $ bamboo-cli queue [PLANKEY]

ARGUMENTS
  PLANKEY  get plan key by running "bamboo-cli plans".

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli queue <planKey>
```

_See code: [src\commands\queue.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\queue.ts)_

## `bamboo-cli releases`

gets releases available for a project

```
USAGE
  $ bamboo-cli releases

OPTIONS
  -p, --project=project  (required) project ID

EXAMPLE
  $ bamboo-cli releases --project <project-id>
```

_See code: [src\commands\releases.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\releases.ts)_

## `bamboo-cli server`

get server info

```
USAGE
  $ bamboo-cli server

EXAMPLE
  $ bamboo-cli server
  {
     version: 'x.x.x',
     edition: '',
     buildDate: 'yyyy-MM-dd...',
     buildNumber: 'xxx',
     state: 'RUNNING'
  }
```

_See code: [src\commands\server.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\server.ts)_
<!-- commandsstop -->
* [`bamboo-cli build`](#bamboo-cli-build)
* [`bamboo-cli build:results`](#bamboo-cli-buildresults)
* [`bamboo-cli build:status [PLANKEY] [BUILDNUMBER]`](#bamboo-cli-buildstatus-plankey-buildnumber)
* [`bamboo-cli conf [KEY] [VALUE]`](#bamboo-cli-conf-key-value)
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli deploy`](#bamboo-cli-deploy)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)
* [`bamboo-cli plans`](#bamboo-cli-plans)
* [`bamboo-cli projects`](#bamboo-cli-projects)
* [`bamboo-cli queue [PLANKEY]`](#bamboo-cli-queue-plankey)
* [`bamboo-cli releases`](#bamboo-cli-releases)
* [`bamboo-cli server`](#bamboo-cli-server)

## `bamboo-cli build`

commands for getting build results/status

```
USAGE
  $ bamboo-cli build
```

_See code: [src\commands\build.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\build.ts)_

## `bamboo-cli build:results`

get info on builds

```
USAGE
  $ bamboo-cli build:results

OPTIONS
  -f, --failed
  -j, --json

EXAMPLE
  $ bamboo-cli build results
```

_See code: [src\commands\build\results.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\build\results.ts)_

## `bamboo-cli build:status [PLANKEY] [BUILDNUMBER]`

get info on builds

```
USAGE
  $ bamboo-cli build:status [PLANKEY] [BUILDNUMBER]

ARGUMENTS
  PLANKEY      plan key
  BUILDNUMBER  build number

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli build results
```

_See code: [src\commands\build\status.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\build\status.ts)_

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
     name: 'user@domain.com',
     fullName: 'John Smith',
     email: 'user@domain.com'
  }
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli deploy`

deploy a build

```
USAGE
  $ bamboo-cli deploy

OPTIONS
  -e, --env=env          (required) environment ID
  -v, --version=version  (required) build version ID

EXAMPLE
  $ bamboo-cli deploy -e 123 -v 456
```

_See code: [src\commands\deploy.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\deploy.ts)_

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

## `bamboo-cli plans`

get all plans

```
USAGE
  $ bamboo-cli plans

OPTIONS
  -e, --enabled
  -j, --json

EXAMPLES
  $ bamboo-cli plans
  $ bamboo-cli plans --enabled
```

_See code: [src\commands\plans.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\plans.ts)_

## `bamboo-cli projects`

get all projects

```
USAGE
  $ bamboo-cli projects

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli projects
```

_See code: [src\commands\projects.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\projects.ts)_

## `bamboo-cli queue [PLANKEY]`

queue a build

```
USAGE
  $ bamboo-cli queue [PLANKEY]

ARGUMENTS
  PLANKEY  get plan key by running "bamboo-cli plans".

OPTIONS
  -j, --json

EXAMPLE
  $ bamboo-cli queue <planKey>
```

_See code: [src\commands\queue.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\queue.ts)_

## `bamboo-cli releases`

gets releases available for a project

```
USAGE
  $ bamboo-cli releases

OPTIONS
  -p, --project=project  (required) project ID

EXAMPLE
  $ bamboo-cli releases --project <project-id>
```

_See code: [src\commands\releases.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\releases.ts)_

## `bamboo-cli server`

get server info

```
USAGE
  $ bamboo-cli server

EXAMPLE
  $ bamboo-cli server
  {
     version: 'x.x.x',
     edition: '',
     buildDate: 'yyyy-MM-dd...',
     buildNumber: 'xxx',
     state: 'RUNNING'
  }
```

_See code: [src\commands\server.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\server.ts)_
<!-- commandsstop -->
* [`bamboo-cli conf [KEY] [VALUE]`](#bamboo-cli-conf-key-value)
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli deploy`](#bamboo-cli-deploy)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)
* [`bamboo-cli plans`](#bamboo-cli-plans)
* [`bamboo-cli projects`](#bamboo-cli-projects)
* [`bamboo-cli queue [PLANKEY]`](#bamboo-cli-queue-plankey)
* [`bamboo-cli releases`](#bamboo-cli-releases)
* [`bamboo-cli server`](#bamboo-cli-server)

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
     name: 'user@domain.com',
     fullName: 'John Smith',
     email: 'user@domain.com'
  }
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli deploy`

deploy a build

```
USAGE
  $ bamboo-cli deploy

OPTIONS
  -e, --env=env          (required) environment ID
  -v, --version=version  (required) build version ID

EXAMPLE
  $ bamboo-cli deploy -e 123 -v 456
```

_See code: [src\commands\deploy.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\deploy.ts)_

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

## `bamboo-cli plans`

get all plans

```
USAGE
  $ bamboo-cli plans

OPTIONS
  -e, --enabled
  -j, --json

EXAMPLES
  $ bamboo-cli plans
  $ bamboo-cli plans --enabled
```

_See code: [src\commands\plans.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\plans.ts)_

## `bamboo-cli projects`

get all projects

```
USAGE
  $ bamboo-cli projects

EXAMPLE
  $ bamboo-cli projects
```

_See code: [src\commands\projects.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\projects.ts)_

## `bamboo-cli queue [PLANKEY]`

queue a build

```
USAGE
  $ bamboo-cli queue [PLANKEY]

ARGUMENTS
  PLANKEY  get plan key by running "bamboo-cli plans".

EXAMPLE
  $ bamboo-cli queue <planKey>
```

_See code: [src\commands\queue.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\queue.ts)_

## `bamboo-cli releases`

gets releases available for a project

```
USAGE
  $ bamboo-cli releases

OPTIONS
  -p, --project=project  (required) project ID

EXAMPLE
  $ bamboo-cli releases --project <project-id>
```

_See code: [src\commands\releases.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\releases.ts)_

## `bamboo-cli server`

get server info

```
USAGE
  $ bamboo-cli server

EXAMPLE
  $ bamboo-cli server
  {
     version: 'x.x.x',
     edition: '',
     buildDate: 'yyyy-MM-dd...',
     buildNumber: 'xxx',
     state: 'RUNNING'
  }
```

_See code: [src\commands\server.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\server.ts)_
<!-- commandsstop -->
* [`bamboo-cli conf [KEY] [VALUE]`](#bamboo-cli-conf-key-value)
* [`bamboo-cli currentuser`](#bamboo-cli-currentuser)
* [`bamboo-cli deploy`](#bamboo-cli-deploy)
* [`bamboo-cli help [COMMAND]`](#bamboo-cli-help-command)
* [`bamboo-cli plans`](#bamboo-cli-plans)
* [`bamboo-cli projects`](#bamboo-cli-projects)
* [`bamboo-cli queue`](#bamboo-cli-queue)
* [`bamboo-cli releases`](#bamboo-cli-releases)
* [`bamboo-cli server`](#bamboo-cli-server)

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
     name: 'user@domain.com',
     fullName: 'John Smith',
     email: 'user@domain.com'
  }
```

_See code: [src\commands\currentuser.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\currentuser.ts)_

## `bamboo-cli deploy`

deploy a build

```
USAGE
  $ bamboo-cli deploy

OPTIONS
  -e, --env=env          (required) environment ID
  -v, --version=version  (required) build version ID

EXAMPLE
  $ bamboo-cli deploy -e 123 -v 456
```

_See code: [src\commands\deploy.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\deploy.ts)_

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

## `bamboo-cli plans`

get all plans

```
USAGE
  $ bamboo-cli plans

OPTIONS
  -e, --enabled

EXAMPLES
  $ bamboo-cli plans
  $ bamboo-cli plans --enabled
```

_See code: [src\commands\plans.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\plans.ts)_

## `bamboo-cli projects`

get all projects

```
USAGE
  $ bamboo-cli projects

EXAMPLE
  $ bamboo-cli projects
```

_See code: [src\commands\projects.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\projects.ts)_

## `bamboo-cli queue`

queue a build

```
USAGE
  $ bamboo-cli queue

OPTIONS
  --key=key  (required)

EXAMPLE
  $ bamboo-cli queue <buildKey>
```

_See code: [src\commands\queue.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\queue.ts)_

## `bamboo-cli releases`

gets releases available for a project

```
USAGE
  $ bamboo-cli releases

OPTIONS
  -p, --project=project  (required) project ID

EXAMPLE
  $ bamboo-cli releases --project <project-id>
```

_See code: [src\commands\releases.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\releases.ts)_

## `bamboo-cli server`

get server info

```
USAGE
  $ bamboo-cli server

EXAMPLE
  $ bamboo-cli server
  {
     version: 'x.x.x',
     edition: '',
     buildDate: 'yyyy-MM-dd...',
     buildNumber: 'xxx',
     state: 'RUNNING'
  }
```

_See code: [src\commands\server.ts](https://github.com/jmbeach/bamboo-cli/blob/v0.0.0/src\commands\server.ts)_
<!-- commandsstop -->
