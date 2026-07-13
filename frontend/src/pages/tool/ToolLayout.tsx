import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function ToolLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMatrixActive = location.pathname.startsWith('/tool/matrix');
  const isBrowserActive =
    location.pathname.startsWith('/tool/browser') ||
    location.pathname.startsWith('/tool/solution') ||
    location.pathname.startsWith('/tool/case');

  const tabs = [
    { label: '资产矩阵', path: '/tool/matrix', active: isMatrixActive },
    { label: '资产浏览器', path: '/tool/browser', active: isBrowserActive },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-page)' }}>
      {/* Navigation Bar — 56px (between spec 64px and old 48px) */}
      <header
        style={{
          height: '56px', background: 'var(--color-bg-card)',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Left: Logo + System Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/tool/matrix')}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" style={{ height: '24px', objectFit: 'contain' }} />
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>AI能力资产查询系统</span>
          </div>

          {/* Right: Tabs */}
          <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {tabs.map(tab => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                style={{
                  height: '100%', padding: '0 24px', fontSize: '14px',
                  fontWeight: tab.active ? 600 : 400,
                  color: tab.active ? 'var(--color-primary)' : 'var(--color-text-body)',
                  border: 'none',
                  borderBottom: tab.active ? '2px solid var(--color-primary)' : '2px solid transparent',
                  background: 'transparent', cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
