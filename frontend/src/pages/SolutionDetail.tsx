import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coreSolutions, mockCases } from '../mock/data';
import { ChevronRight, ArrowLeft, Terminal, LayoutGrid, Crown, Layers, ExternalLink, AlertCircle, Tag, CheckCircle2, Clock, Map, Briefcase, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function SolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const solution = coreSolutions.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#4E5969' }}>方案未找到</div>;
  }

  // Extract meta data based on related cases to fulfill the requirement
  const relatedCases = mockCases.filter(c => c.belongingSolution === solution.name);
  const deliveryFormat = relatedCases.length > 0 && relatedCases[0].deliveryFormat && relatedCases[0].deliveryFormat !== '待补充' 
    ? relatedCases[0].deliveryFormat 
    : 'SaaS / API 接口集成 / 混合部署';
  const updateDate = relatedCases.length > 0 && relatedCases[0].updateDate 
    ? relatedCases[0].updateDate 
    : '2026-07-12';

  const fullWidthStyle = { width: '100%', boxSizing: 'border-box' as const, maxWidth: '1440px', margin: '0 auto' };

  // Helper to render a marquee track for underlying tech
  const renderMarquee = (items: string[], isReverse: boolean = false) => {
    const displayItems = [...items, ...items, ...items, ...items, ...items, ...items].slice(0, 30);
    return (
      <div className={`marquee-track ${isReverse ? 'reverse' : ''}`}>
        {displayItems.map((item, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(229,230,235,0.8)',
            borderRadius: '30px',
            padding: '12px 28px',
            margin: '0 12px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4E5969',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            cursor: 'default',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#2B65EC';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = '#2B65EC';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(43,101,236,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
            e.currentTarget.style.color = '#4E5969';
            e.currentTarget.style.borderColor = 'rgba(229,230,235,0.8)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
          }}
          >
            <Terminal size={14} color="#86909C" style={{ transition: 'color 0.3s' }} />
            {item}
          </div>
        ))}
      </div>
    );
  };

  const handleContactExpert = () => {
    const subject = encodeURIComponent(`关于 [${solution.name}] 的咨询`);
    window.location.href = `mailto:chenqi@beyondsoft.com?subject=${subject}`;
  };

  return (
    <div style={{ background: '#F5F7FA', minHeight: '100vh', fontFamily: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif' }}>
      
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px 0;
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: scroll 60s linear infinite;
          }
          .marquee-track.reverse {
            animation-direction: reverse;
            animation-duration: 70s;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .mask {
            position: absolute;
            top: 0; bottom: 0;
            width: 80px;
            z-index: 2;
            pointer-events: none;
          }
          /* Dark mode masks for Danmu */
          .mask.left { left: 0; background: linear-gradient(to right, #1D2129, transparent); }
          .mask.right { right: 0; background: linear-gradient(to left, #12151B, transparent); }

          /* Sidebar Scrollbar hidden for clean look */
          .sidebar-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .sidebar-scroll::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.05);
            border-radius: 4px;
          }
          .sidebar-scroll:hover::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.15);
          }

          /* Case Card Hover Effect */
          .case-card .case-arrow {
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }
          .case-card:hover .case-arrow {
            opacity: 1;
            transform: translateX(0);
          }
          .case-card:hover .case-arrow-top {
            color: #2B65EC !important;
            transform: translate(2px, -2px);
          }
        `}
      </style>

      {/* Breadcrumb - Sticky top */}
      <div style={{ background: 'rgba(245,247,250,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E5E6EB', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ ...fullWidthStyle, padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#86909C' }}>
            <Link to="/" style={{ color: '#86909C', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1D2129'} onMouseLeave={e => e.currentTarget.style.color = '#86909C'}>首页</Link>
            <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle', color: '#C9CDD4' }} />
            <span>解决方案</span>
            <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle', color: '#C9CDD4' }} />
            <span style={{ color: '#1D2129', fontWeight: '500' }}>{solution.name}</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: 'transparent', border: 'none', color: '#4E5969', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E5E6EB'; e.currentTarget.style.color = '#1D2129'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4E5969'; }}
          >
            <ArrowLeft size={16} /> 返回
          </button>
        </div>
      </div>

      {/* 核心文档布局：左右结构 (Grid布局防溢出) */}
      <div style={{ ...fullWidthStyle, display: 'grid', gridTemplateColumns: '340px minmax(0, 1fr)', gap: '60px', alignItems: 'flex-start', padding: '40px 60px 100px 60px' }}>
        
        {/* ================= LEFT: 方案档案卡 (Sticky Meta Profile with Overflow Safety) ================= */}
        <div className="sidebar-scroll" style={{ 
            position: 'sticky', 
            top: '90px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '32px',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            paddingRight: '12px'
        }}>
            
            {/* Title & Overview */}
            <div>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #2B65EC 0%, #1E4696 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 16px rgba(43,101,236,0.2)' }}>
                <Layers size={28} color="white" />
              </div>
              <h1 style={{ fontSize: '28px', color: '#1D2129', marginBottom: '16px', fontWeight: 'bold', lineHeight: 1.3 }}>{solution.name}</h1>
              <p style={{ fontSize: '15px', color: '#2B65EC', lineHeight: 1.6, marginBottom: '20px', fontWeight: '500' }}>
                {solution.oneLiner}
              </p>
              <p style={{ fontSize: '14px', color: '#4E5969', lineHeight: 1.8, margin: 0 }}>
                {solution.overview}
              </p>
            </div>

            <div style={{ height: '1px', background: '#E5E6EB', margin: '0' }}></div>

            {/* Meta Data Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#86909C', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>方案元数据 (Meta Profile)</h3>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Tag size={16} color="#86909C" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', color: '#86909C', marginBottom: '8px' }}>业务场景标签</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {solution.targets.map(tag => (
                      <span key={tag} style={{ background: '#F0F5FF', border: '1px solid #ADC6FF', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', color: '#2B65EC', fontWeight: '500' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Briefcase size={16} color="#86909C" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#86909C' }}>归属部门</div>
                  <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', marginTop: '4px' }}>{solution.departments?.[0] || '综合业务部'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LayoutGrid size={16} color="#86909C" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#86909C' }}>交付形式</div>
                  <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', marginTop: '4px' }}>{deliveryFormat}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={16} color="#86909C" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#86909C' }}>更新时间</div>
                  <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', marginTop: '4px' }}>{updateDate}</div>
                </div>
              </div>
            </div>

            <div style={{ height: '1px', background: '#E5E6EB', margin: '0' }}></div>

            {/* UPGRADED PRIMARY CTA BUTTON */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  fontSize: '15px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  background: '#2B65EC', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer', 
                  fontWeight: '600', 
                  boxShadow: '0 6px 16px rgba(43,101,236,0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={handleContactExpert}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,101,236,0.4)'; 
                  e.currentTarget.style.background = '#1E4696';
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(43,101,236,0.25)'; 
                  e.currentTarget.style.background = '#2B65EC';
                }}
              >
                <Mail size={18} /> 获取专属解决方案与报价
              </button>
              <div style={{ fontSize: '12px', color: '#86909C', textAlign: 'center', marginTop: '12px' }}>
                * 专家团队将在 2 小时内响应您的需求
              </div>
            </div>
            
        </div>

        {/* ================= RIGHT: 核心内容流 (Scrollable Document Style) ================= */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '60px' }}>
          
          {/* 模块一: 业务挑战与应对策略 (Pain points vs Capabilities) */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E6EB', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '32px', borderBottom: '1px solid #F0F2F5', background: '#FAFBFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '4px', height: '24px', background: '#2B65EC', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1D2129', margin: 0 }}>业务挑战与应对策略</h2>
              </div>
              <p style={{ margin: '12px 0 0 16px', color: '#4E5969', fontSize: '14px' }}>直击业务痛点，提供场景化的破局能力</p>
            </div>
            
            <div style={{ padding: '40px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
                
                {/* 痛点列 */}
                <div>
                  <h3 style={{ fontSize: '16px', color: '#1D2129', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <AlertCircle size={18} color="#4E5969" /> 行业核心痛点 (Challenges)
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {solution.painPoints && solution.painPoints.map((point, idx) => (
                      <div key={idx} style={{ background: '#F2F3F5', border: '1px solid #E5E6EB', padding: '16px 20px', borderRadius: '8px', fontSize: '14px', color: '#4E5969', lineHeight: 1.6, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-1px', top: '24px', width: '3px', height: '16px', background: '#86909C', borderRadius: '0 2px 2px 0' }}></div>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 应对能力列 - 升级为微型卡片网格 */}
                <div>
                  <h3 style={{ fontSize: '16px', color: '#2B65EC', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <CheckCircle size={18} /> 核心解决能力 (Solutions)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                    {solution.capabilities && solution.capabilities.map((cap, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F0F5FF', border: '1px solid #ADC6FF', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', color: '#2B65EC', fontWeight: '600' }}>
                        <CheckCircle2 size={16} color="#2B65EC" style={{ flexShrink: 0 }} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 模块二: 底层技术生态 (Light Mode, Borderless Danmu) */}
          <div style={{ position: 'relative' }}>
            <div style={{ padding: '0 0 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '4px', height: '24px', background: '#2B65EC', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1D2129', margin: 0 }}>底层技术生态</h2>
              </div>
              <p style={{ margin: '12px 0 0 16px', color: '#4E5969', fontSize: '14px' }}>沉淀十年的底座架构，确保业务高可用与极致扩展。</p>
            </div>
            
            <div style={{ position: 'relative', padding: '24px 0' }}>
              <div className="marquee-wrapper">
                <div className="mask left" style={{ background: 'linear-gradient(to right, #F5F7FA, transparent)' }}></div>
                <div className="mask right" style={{ background: 'linear-gradient(to left, #F5F7FA, transparent)' }}></div>
                
                {/* Tech Stack Danmu Rows */}
                {solution.underlyingTech && solution.underlyingTech.length > 0 && (
                  renderMarquee(solution.underlyingTech, false)
                )}
                {solution.underlyingTech && solution.underlyingTech.length > 5 && (
                  renderMarquee(solution.underlyingTech.slice().reverse(), true)
                )}
                {solution.underlyingTech && solution.underlyingTech.length > 10 && (
                  renderMarquee(solution.underlyingTech.sort(() => 0.5 - Math.random()), false)
                )}
              </div>
            </div>
          </div>

          {/* 模块三: 落地标杆案例 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '4px', height: '24px', background: '#2B65EC', borderRadius: '2px' }}></div>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1D2129', margin: 0 }}>落地标杆案例</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {solution.cases.map((c, idx) => (
                <div key={idx} className="case-card" style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #E5E6EB',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: c.caseId ? 'pointer' : 'default',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(43,101,236,0.08)';
                  e.currentTarget.style.borderColor = '#93C5FD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = '#E5E6EB';
                }}
                onClick={() => c.caseId && navigate(`/detail/${c.caseId}`)}
                >
                  <div style={{ fontSize: '13px', color: '#2B65EC', marginBottom: '16px', background: '#F0F5FF', padding: '6px 12px', borderRadius: '4px', width: 'fit-content', fontWeight: '500' }}>
                    {c.tag || '适用场景'}
                  </div>
                  <ExternalLink size={20} color="#C9CDD4" className="case-arrow-top" style={{ position: 'absolute', top: '24px', right: '24px', transition: 'all 0.3s' }} />
                  <h3 style={{ fontSize: '18px', color: '#1D2129', marginBottom: '12px', lineHeight: 1.4, fontWeight: 'bold' }}>
                    {c.name}
                  </h3>
                  <p style={{ color: '#4E5969', fontSize: '14px', lineHeight: 1.6, flex: 1, margin: 0 }}>
                    {(c as any).detail || '通过定制化 AI 引擎部署，大幅降低人工成本，实现业务端到端自动化流转。'}
                  </p>
                  
                  {c.caseId && (
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#2B65EC', fontSize: '14px', fontWeight: '600' }}>
                      查看案例详情 <ArrowRight size={16} className="case-arrow" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
