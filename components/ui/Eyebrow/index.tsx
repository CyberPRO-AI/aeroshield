type EyebrowProps = {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  rule?: boolean
}

export function Eyebrow({ children, tone = 'light', rule = false }: EyebrowProps) {
  return (
    <div>
      <span className={tone === 'dark' ? 'as-eyebrow as-eyebrow--on-dark' : 'as-eyebrow'}>{children}</span>
      {rule && <span className="as-eyebrow-rule" />}
    </div>
  )
}
