import { describe, it, expect } from 'vitest'

import toCamelCase from '@/utils/toCamelCase'

describe('toCamelCase', () => {
  it('converts a string in kebab-case to camel case', () => {
    expect(toCamelCase('to-camel-case')).toBe('toCamelCase')
  })

  it('converts a string in snake_case to camel case', () => {
    expect(toCamelCase('to_camel_case')).toBe('toCamelCase')
  })

  it('converts a string in PascalCase to camel case', () => {
    expect(toCamelCase('ToCamelCase')).toBe('toCamelCase')
  })
})
