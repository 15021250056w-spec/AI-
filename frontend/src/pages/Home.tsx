import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, CheckCircle2, Building2, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { coreSolutions as solutions } from '../mock/data';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash === '#solutions') {
      const el = document.getElementById('sol-g11n');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Handle scroll spy for active section
  const handleScroll = () => {
    if (!containerRef.current) return;
    const sections = ['hero', ...solutions.map(s => s.id)];
    let currentId = 'hero';
    
    // Check which section is in view based on scroll position
    const container = containerRef.current;
    const scrollPosition = container.scrollTop + container.clientHeight / 2;

    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop;
        if (scrollPosition >= offsetTop) {
          currentId = id;
        }
      }
    }
    setActiveSection(currentId);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/list?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const trendingSearches = ['术语管控', '知识图谱', '多模态出海', '数字孪生'];

  return (
    <>
      {/* Dot Navigation */}
      <div className="dot-nav">
        {['hero', ...solutions.map(s => s.id)].map((id, index) => (
          <div 
            key={id} 
            className={`dot ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            title={id === 'hero' ? '首页' : solutions[index - 1].name}
          />
        ))}
      </div>

      <div className="scroll-container" ref={containerRef} onScroll={handleScroll}>
        
        {/* Hero Banner (Screen 1) */}
        <div id="hero" className="scroll-section hero-section">
          <h1 style={{ fontSize: 'var(--font-size-hero)', marginBottom: '16px', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Global AI Capability Hub
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--color-text-body)', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            博彦科技 AI 能力聚合展示与查询平台<br/>
          </p>
          
          {/* Giant Search Area */}
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <form onSubmit={handleHeroSearch}>
              <input 
                type="text" 
                placeholder="探索 100+ 智能化解决方案与底层 AI 能力..." 
                className="giant-search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button 
                type="submit" 
                style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '8px', 
                  bottom: '8px',
                  background: 'var(--color-primary-light)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0 24px',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                <SearchIcon size={20} />
              </button>
            </form>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              <span>热门搜索:</span>
              {trendingSearches.map(term => (
                <span 
                  key={term} 
                  style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  onClick={() => navigate(`/list?keyword=${encodeURIComponent(term)}`)}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
          
          {/* Scroll Down Indicator */}
          <div 
            onClick={() => scrollToSection('sol-g11n')}
            style={{ 
              position: 'absolute', 
              bottom: '40px', 
              cursor: 'pointer',
              animation: 'bounce 2s infinite',
              color: 'var(--color-primary-light)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '14px', letterSpacing: '1px', opacity: 0.8 }}>EXPLORE SOLUTIONS</span>
            <ChevronDown size={28} />
          </div>
        </div>

        {/* Solutions (Screens 2-4) */}
        {solutions.map((sol, index) => {
          const isEven = index % 2 === 0;
          // Prepare duplicate items for infinite marquee
          // Ensure we have at least ~6 items so the marquee track is long enough
          const baseCases = [...sol.cases, ...sol.cases, ...sol.cases, ...sol.cases, ...sol.cases].slice(0, Math.max(6, sol.cases.length * 4));
          // The track needs two identical halves for seamless infinite CSS scroll
          const marqueeCases = [...baseCases, ...baseCases];

          return (
            <div 
              key={sol.id} 
              id={sol.id} 
              className={`scroll-section ${isEven ? 'solution-bg-gradient' : ''}`} 
              style={{ flexDirection: 'column', justifyContent: 'center', paddingTop: '40px', backgroundColor: isEven ? 'transparent' : '#FFFFFF' }}
            >
              
              {/* Top Half: Content + Image */}
              <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', width: '100%', maxWidth: '1400px', padding: '0 50px', marginBottom: '20px' }}>
                
                {/* Content Side */}
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '36px', marginBottom: '8px', color: 'var(--color-primary)', lineHeight: 1.3 }}>
                    {sol.name}
                  </h2>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '32px', fontWeight: 300 }}>
                    {sol.nameEn}
                  </div>

                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                      <Building2 size={18} color="var(--color-primary-light)"/> 服务对象 / 关键决策部门
                    </div>
                    <div style={{ color: 'var(--color-text-body)', fontSize: '15px', lineHeight: 1.6 }}>
                      <span style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>核心行业：</span>{sol.targets.join('、')}<br/>
                      <span style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>关键部门：</span>{sol.departments.join('、')}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                      <CheckCircle2 size={18} color="var(--color-primary-light)"/> 核心技术能力标签
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {sol.capabilities.slice(0, 8).map(cap => (
                        <span key={cap} className="glass-tag">{cap}</span>
                      ))}
                      {sol.capabilities.length > 8 && (
                        <span className="glass-tag" style={{ borderStyle: 'dashed', background: 'transparent' }}>
                          +{sol.capabilities.length - 8} 更多
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '32px' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ borderRadius: '30px', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(43,101,236,0.2)', transition: 'all 0.3s' }}
                      onClick={() => navigate(`/solution/${sol.id}`)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      查看方案详情 <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Image Side */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '100%', maxWidth: '600px', height: '440px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.6)', padding: '16px' }}>
                    {/* Appending ?v=2 to bust browser cache and force load the generated image */}
                    <img src={`${sol.imgPlaceholder}?v=2`} alt={sol.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                  </div>
                </div>

              </div>

              {/* Bottom Half: Infinite Marquee Cases or Static Flex Cases */}
              <div style={{ width: '100%' }}>
                {sol.cases.length > 4 ? (
                  <div className="marquee-container">
                    <div className="marquee-content">
                      {marqueeCases.map((c, idx) => (
                        <div 
                          key={`${c.name}-${idx}`} 
                          className="case-card-hover glass-panel" 
                          onClick={() => navigate(`/list?keyword=${encodeURIComponent(c.name)}`)}
                          style={{
                            width: '320px',
                            flexShrink: 0,
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '12px'
                          }}
                        >
                          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {c.name}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--color-primary-light)', display: 'inline-block' }}>
                            {c.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px 0' }}>
                    {sol.cases.map(c => (
                      <div 
                        key={c.name} 
                        className="case-card-hover glass-panel" 
                        onClick={() => navigate(`/list?keyword=${encodeURIComponent(c.name)}`)}
                        style={{
                          width: '320px',
                          flexShrink: 0,
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: '12px'
                        }}
                      >
                        <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {c.name}
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--color-primary-light)', display: 'inline-block' }}>
                          {c.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })}

        {/* Minimal Footer */}
        <div className="scroll-section" style={{ height: 'auto', minHeight: '40vh', scrollSnapAlign: 'end', background: 'white', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           <h3 style={{ fontSize: '24px', color: 'var(--color-primary)', marginBottom: '16px' }}>准备好在下一个项目中应用 AI 能力了吗？</h3>
           <p style={{ color: 'var(--color-text-body)', marginBottom: '32px' }}>进入全景知识库快速检索，一键获取用于售前打单与交付落地的标准化资产。</p>
           <div style={{ display: 'flex', gap: '16px' }}>
             <button className="btn btn-primary" onClick={() => navigate('/capabilities')}>前往能力全景库</button>
             <button className="btn btn-ghost" style={{ border: '1px solid var(--color-primary-light)' }} onClick={() => navigate('/list')}>查阅落地案例</button>
           </div>
           <div style={{ marginTop: '60px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
             © 2026 Beyondsoft Corporation. 内部资产，请勿外传。
           </div>
        </div>

      </div>
    </>
  );
}
