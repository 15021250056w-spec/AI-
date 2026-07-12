export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Global AI Capability Hub</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>Beyondsoft AI能力聚合展示与查询平台</p>
        <p style={{ color: 'var(--color-text-body)', fontSize: '14px' }}>
          联系方式：<a href="mailto:IHQ-BMO@beyondsoft.com" style={{ textDecoration: 'underline' }}>IHQ-BMO@beyondsoft.com</a>
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '24px' }}>
          &copy; {new Date().getFullYear()} Beyondsoft. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
