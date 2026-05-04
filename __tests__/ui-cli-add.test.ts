import { describe, expect, it } from 'vitest'
import { splitAddArgs, suggestComponentId } from '../cli/src/commands/add'

describe('forge-ui add helpers', () => {
  it('splits component ids from shared flags', () => {
    expect(
      splitAddArgs([
        'button',
        'morphblob',
        'button',
        '--color=#7F77DD',
        '--variant=glow',
      ]),
    ).toEqual({
      componentIds: ['button', 'morphblob', 'button'],
      rawFlags: ['--color=#7F77DD', '--variant=glow'],
    })
  })

  it('suggests the closest component for likely spelling errors', () => {
    expect(suggestComponentId('buton')).toBe('button')
    expect(suggestComponentId('morphblb')).toBe('morphblob')
  })

  it('does not suggest unrelated component names', () => {
    expect(suggestComponentId('not-a-forge-component')).toBeNull()
  })
})
