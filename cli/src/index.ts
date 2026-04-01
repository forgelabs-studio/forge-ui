#!/usr/bin/env node
import { Command } from 'commander'
import { runInit } from './commands/init.js'
import { runAdd } from './commands/add.js'
import { runList } from './commands/list.js'
import { runUpdate } from './commands/update.js'
import { runRemove } from './commands/remove.js'

const program = new Command()

program
  .name('forge-ui')
  .description('FORGE.ui — spectrum-aware React component library')
  .version('0.1.0')

program
  .command('init')
  .description('Create forge.config.json and forge-tokens.css')
  .action(() => runInit())

program
  .command('add <component>')
  .description('Add a component with optional flags')
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

program.parse()
