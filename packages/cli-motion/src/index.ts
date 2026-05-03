#!/usr/bin/env node
import { Command } from 'commander'
import { runAdd } from './commands/add.js'
import { runList } from './commands/list.js'
import { runUpdate } from './commands/update.js'
import { runRemove } from './commands/remove.js'
import { runCheck } from './commands/check.js'

const program = new Command()

program
  .name('forge-motion')
  .description('FORGE.motion — scroll-triggered and viewport-aware animation presets for React')
  .version('0.1.0')

program
  .command('add <preset>')
  .description('Add a motion preset')
  .allowUnknownOption(true)
  .action((preset: string, _opts: unknown, cmd: Command) => {
    const rawFlags = cmd.args.slice(1)
    runAdd(preset, rawFlags)
  })

program
  .command('list')
  .description('List all available and installed presets')
  .action(() => runList())

program
  .command('update <preset>')
  .description('Regenerate a preset using its saved configuration')
  .action((preset: string) => runUpdate(preset))

program
  .command('remove <preset>')
  .description('Remove a preset and its files')
  .action((preset: string) => runRemove(preset))

program
  .command('check')
  .description('Check installed presets against the latest published version')
  .action(() => runCheck())

program.parse()
