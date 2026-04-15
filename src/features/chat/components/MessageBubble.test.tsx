import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MessageBubble } from './MessageBubble'

describe('MessageBubble', () => {
  it('renders incoming layout with author and timestamp', () => {
    render(
      <ul>
        <MessageBubble
          author="NINJA"
          text="Great resource, thanks"
          timeLabel="10 Mar 2018 9:55"
          isOwn={false}
        />
      </ul>,
    )
    expect(screen.getByText('NINJA')).toBeInTheDocument()
    expect(screen.getByText('Great resource, thanks')).toBeInTheDocument()
    expect(screen.getByText('10 Mar 2018 9:55')).toBeInTheDocument()
  })

  it('renders outgoing layout without sender line (matches mockup)', () => {
    render(
      <ul>
        <MessageBubble
          author="Paul Ekunola"
          text="Hello"
          timeLabel="12 Mar 2018 14:38"
          isOwn
        />
      </ul>,
    )
    expect(screen.queryByText('Paul Ekunola')).not.toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('12 Mar 2018 14:38')).toBeInTheDocument()
  })
})
