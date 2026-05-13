interface LogoMarkProps {
  size?: number
}

export function LogoMark({ size = 22 }: LogoMarkProps) {
  return (
    <div
      className="logo-mark"
      style={{
        width: size,
        height: size,
        background: 'var(--accent)',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={Math.round(size * 0.59)}
        height={Math.round(size * 0.59)}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="3" r="1.5" fill="white" />
        <circle cx="10" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="10" r="1.5" fill="white" />
        <line x1="3" y1="6.5" x2="6.5" y2="3" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="3" x2="10" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="6.5" x2="6.5" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="10" x2="3" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}

export function LogoFull({ size = 22 }: LogoMarkProps) {
  return (
    <span className="nav-logo">
      <LogoMark size={size} />
      <span className="logo-text">Brain<em>wire</em></span>
    </span>
  )
}