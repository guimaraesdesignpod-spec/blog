export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #232326', marginTop: 'auto' }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: '16px',
          letterSpacing: '-0.02em',
          color: '#52525B',
        }}>Blog</span>
        <span style={{ fontSize: '12px', color: '#52525B' }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
