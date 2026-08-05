import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import '@/styles/components/button.scss'

type Variant = 'primary' | 'secondary'
type Tone = 'light' | 'dark'
type Size = 'md' | 'lg'

function buttonClasses(variant: Variant, tone: Tone, size: Size, fullWidth: boolean | undefined, className: string | undefined) {
  return ['as-btn', `as-btn--${variant}`, `as-btn--tone-${tone}`, `as-btn--${size}`, fullWidth ? 'as-btn--full' : '', className]
    .filter(Boolean)
    .join(' ')
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  tone?: Tone
  size?: Size
  fullWidth?: boolean
}

export function Button({ variant = 'primary', tone = 'light', size = 'md', fullWidth, className, ...rest }: ButtonProps) {
  return <button className={buttonClasses(variant, tone, size, fullWidth, className)} {...rest} />
}

// Same visual system as Button, rendered as an anchor — lets CTAs that just
// scroll to an anchor (e.g. "#contact") work via native CSS smooth-scroll
// with no client-side JS needed.
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  tone?: Tone
  size?: Size
  fullWidth?: boolean
}

export function ButtonLink({ variant = 'primary', tone = 'light', size = 'md', fullWidth, className, ...rest }: ButtonLinkProps) {
  return <a className={buttonClasses(variant, tone, size, fullWidth, className)} {...rest} />
}
