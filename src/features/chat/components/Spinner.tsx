import { SpinnerIcon } from '../../../assets/icons'
import { cn } from '../../../utils'

type SpinnerProps = {
  className?: string
  'aria-hidden'?: boolean
}

export function Spinner({ className, 'aria-hidden': ariaHidden = true }: SpinnerProps) {
  return (
    <SpinnerIcon
      className={cn('inline-block shrink-0 animate-spin', className)}
      aria-hidden={ariaHidden}
    />
  )
}
