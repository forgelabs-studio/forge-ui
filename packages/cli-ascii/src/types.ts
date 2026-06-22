export type ComponentId = 'ascii'

export interface ComponentMeta {
  id: ComponentId
  displayName: string
  description: string
}

export interface ForgeAsciiConfig {
  output: string
  components: Record<string, Record<string, unknown>>
}
