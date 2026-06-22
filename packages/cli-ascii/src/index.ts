#!/usr/bin/env node
import { Command } from 'commander'
import { runAdd } from './commands/add.js'
import { runList } from './commands/list.js'
import { runUpdate } from './commands/update.js'
import { runRemove } from './commands/remove.js'
import { runCheck } from './commands/check.js'
import { PACKAGE_VERSION } from './version.js'

const program = new Command()

program
  .name('forge-ascii')
  .description('FORGE.ascii - image-to-ASCII-art component generator for React')
  .version(PACKAGE_VERSION)

program
  .command('add <component>')
  .description('Add the ascii component')
  .allowUnknownOption(true)
  .action((component: string, _opts: unknown, cmd: Command) => {
    const rawFlags = cmd.args.slice(1)
    runAdd(component, rawFlags)
  })

program
  .command('list')
  .description('List all available and installed components')
  .action(() => runList())

program
  .command('update <component>')
  .description('Regenerate a component using its saved configuration')
  .action((component: string) => runUpdate(component))

program
  .command('remove <component>')
  .description('Remove a component and its files')
  .action((component: string) => runRemove(component))

program
  .command('check')
  .description('Check installed components against the latest published version')
  .action(() => runCheck())

program.parse()
