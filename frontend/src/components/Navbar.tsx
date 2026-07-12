import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/list?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const navItems = [
    { label: '方案与案例', path: '/list' },
    { label: '技术能力', path: '/capabilities' }
  ];

  return (
    <header className="navbar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Left Cluster: Logo & Title */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img 
            src="/logo.png" 
            alt="Beyondsoft Logo" 
            style={{ height: '32px', objectFit: 'contain' }} 
          />
          <div style={{ height: '20px', width: '1px', background: 'var(--color-text-muted)', opacity: 0.3 }}></div>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>
            AI Capability Hub <span style={{ fontWeight: 'normal', margin: '0 8px', color: 'var(--color-text-muted)', opacity: 0.5 }}>|</span> 人工智能能力中心
          </span>
        </div>

        {/* Right Cluster: Nav Links & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Navigation Links */}
          <nav className="nav-links" style={{ display: 'flex', gap: '8px' }}>
            {navItems.map(item => (
              <button 
                key={item.label}
                className="btn btn-ghost"
                style={{ border: 'none', padding: '8px 16px', fontSize: '15px' }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Area */}
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="搜索行业、场景或技术..." 
              className="search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search 
              size={16} 
              style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                pointerEvents: 'none'
              }} 
            />
          </form>
        </div>

      </div>
    </header>
  );
}
