type IconProps = {
  src: string
  size?: number
  className?: string
}

// Renders every icon (editor-uploaded or fallback) as a CSS mask, never as
// inlined SVG markup / dangerouslySetInnerHTML — so a malicious <script> or
// event handler embedded in an uploaded SVG can never execute. The mask also
// gives us the single-color "tinted via currentColor" look the design relies
// on for icon tiles.
export function Icon({ src, size = 24, className }: IconProps) {
  const mask = `url("${src}") center / contain no-repeat`
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: 'currentColor',
        WebkitMask: mask,
        mask,
      }}
    />
  )
}
