import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../../i18n/context';

/**
 * ToolLayout — /tool 路由统一布局
 *
 * 顶部导航栏固定 48px：
 *   左侧系统名，中间两个 Tab（与路由联动），右侧语言切换。
 * 子路由通过 <Outlet /> 渲染。
 */
export default function ToolLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, dict, setLang } = useLang();

  const isMatrixActive = location.pathname.startsWith('/tool/matrix');
  const isBrowserActive = location.pathname.startsWith('/tool/browser');

  const tabs = [
    { label: dict.tabMatrix, path: '/tool/matrix', active: isMatrixActive },
    { label: dict.tabBrowser, path: '/tool/browser', active: isBrowserActive },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
      {/* 顶部导航栏 — 固定 48px */}
      <header
        style={{
          height: '48px', background: '#fff',
          borderBottom: '1px solid #E5E6EB',
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%', maxWidth: '1400px', margin: '0 auto',
            padding: '0 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', height: '100%',
          }}
        >
          {/* 左侧：系统名 */}
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => navigate('/tool/matrix')}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1D2129', whiteSpace: 'nowrap' }}>
              {dict.systemName}
            </span>
          </div>

          {/* 中间：Tab 切换 */}
          <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {tabs.map(tab => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                style={{
                  height: '100%', padding: '0 20px', fontSize: '13px',
                  fontWeight: tab.active ? 600 : 400,
                  color: tab.active ? '#165DFF' : '#4E5969',
                  border: 'none',
                  borderBottom: tab.active ? '2px solid #165DFF' : '2px solid transparent',
                  background: 'transparent', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* 右侧：语言切换 */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span
              onClick={() => setLang('zh')}
              style={{
                fontSize: '12px', fontWeight: lang === 'zh' ? 600 : 400,
                color: lang === 'zh' ? '#165DFF' : '#86909C',
                cursor: 'pointer', padding: '4px 6px',
                borderRadius: '4px',
                background: lang === 'zh' ? '#E8F0FE' : 'transparent',
                userSelect: 'none',
              }}
            >
              {dict.langLabel}
            </span>
            <span style={{ fontSize: '12px', color: '#E5E6EB', margin: '0 2px' }}>/</span>
            <span
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              style={{
                fontSize: '12px', fontWeight: lang === 'en' ? 600 : 400,
                color: lang === 'en' ? '#165DFF' : '#86909C',
                cursor: 'pointer', padding: '4px 6px',
                borderRadius: '4px',
                background: lang === 'en' ? '#E8F0FE' : 'transparent',
                userSelect: 'none',
              }}
            >
              {dict.langSwitch}
            </span>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
