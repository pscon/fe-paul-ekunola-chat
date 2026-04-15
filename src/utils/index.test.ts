import { describe, expect, it } from 'vitest'
import { decodeHtmlEntities, formatMessageTime } from './index'

describe('formatMessageTime', () => {
  it('formats day, month, year and 24h time (local)', () => {
    const d = new Date(2018, 2, 10, 9, 55, 0)
    expect(formatMessageTime(d)).toBe('10 Mar 2018 09:55')
  })
})

describe('decodeHtmlEntities', () => {
  it('decodes numeric and common named entities', () => {
    expect(decodeHtmlEntities('It&#39;s super easy')).toBe("It's super easy")
    expect(decodeHtmlEntities('&quot;Hi&quot;')).toBe('"Hi"')
    expect(decodeHtmlEntities('a &amp; b')).toBe('a & b')
  })
})
