interface FooterProps {
  labels: {
    footer_about: string;
    footer_copyright: string;
  }
}

export default function Footer({ labels }: FooterProps) {
  return (
    <footer style={{
      borderTop: '1px solid var(--rule)',
      padding: '2rem 2.5rem',
      marginTop: 'auto',
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: '13px',
        color: 'var(--ink-light)',
        margin: '0 0 6px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {labels.footer_about}
      </p>
      <p style={{
        fontSize: '11px',
        color: 'var(--ink-light)',
        opacity: 0.6,
        margin: 0,
      }}>
        © {new Date().getFullYear()} Brainwire. {labels.footer_copyright}
      </p>
    </footer>
  )
}
