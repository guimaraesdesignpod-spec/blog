export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #252528',
      background: '#0C0C0E',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '28px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: '16px',
          color: '#3A3A3E',
          letterSpacing: '-0.02em',
        }}>
          Blog
          <span style={{
            display: 'inline-block',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#E8A838',
            marginLeft: '6px',
            marginBottom: '2px',
            verticalAlign: 'middle',
            opacity: 0.5,
          }} />
        </span>
        <span style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: '#3A3A3E',
        }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
