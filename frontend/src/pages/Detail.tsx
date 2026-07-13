import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockData, coreSolutions } from '../mock/data';
import { 
  ChevronRight, ArrowLeft, Globe, CheckCircle, ShieldAlert, Tag, 
  Calendar, Link as LinkIcon, Database, Cpu, Layers, Mail,
  Briefcase, Zap, Lock, CheckCircle2, UserCheck, ArrowRight
} from 'lucide-react';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const data = mockData.find(d => d.caseId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#4E5969' }}>案例未找到</div>;
  }

  // Find parent solution
  const parentSolution = coreSolutions.find(s => data.belongingSolution && s.name.includes(data.belongingSolution));

  const handleContactExpert = () => {
    const subject = encodeURIComponent(`关于 [${data.nameZh}] 的详细咨询`);
    window.location.href = `mailto:${data.contactEmail || 'chenqi@beyondsoft.com'}?subject=${subject}`;
  };

  const fullWidthStyle = { width: '100%', boxSizing: 'border-box' as const, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' };

  return (
    <div style={{ background: '#F5F7FA', minHeight: '100vh', fontFamily: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif', paddingBottom: '100px', overflowX: 'hidden' }}>
      
      <style>
        {`
          .tech-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: #E8F0FE;
            border: 1px solid #E8F0FE;
            border-radius: 6px;
            font-size: 13px;
            color: #2B65EC;
            font-weight: 500;
            transition: all 0.3s;
          }
          .tech-tag:hover {
            background: #2B65EC;
            color: white;
            border-color: #2B65EC;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(43,101,236,0.2);
          }
          .article-text {
            font-size: 15px;
            color: #4E5969;
            line-height: 1.8;
            white-space: pre-wrap;
          }
          .internal-stripes {
            background: repeating-linear-gradient(
              45deg,
              #F5F7FA,
              #F5F7FA 10px,
              #F0F2F5 10px,
              #F0F2F5 20px
            );
          }
        `}
      </style>

      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E6EB' }}>
        <div style={{ ...fullWidthStyle, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#86909C' }}>
            <Link to="/" style={{ color: '#86909C', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1D2129'} onMouseLeave={e => e.currentTarget.style.color = '#86909C'}>首页</Link>
            <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle', color: '#C9CDD4' }} />
            <Link to="/list?type=case" style={{ color: '#86909C', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1D2129'} onMouseLeave={e => e.currentTarget.style.color = '#86909C'}>能力与案例</Link>
            <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle', color: '#C9CDD4' }} />
            <span style={{ color: '#1D2129', fontWeight: '500' }}>{data.nameZh}</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: 'transparent', border: 'none', color: '#4E5969', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F0F2F5'; e.currentTarget.style.color = '#1D2129'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4E5969'; }}
          >
            <ArrowLeft size={16} /> 返回
          </button>
        </div>
      </div>

      {/* 1. 头部概览区 (Hero Section) */}
      <div style={{ background: 'linear-gradient(135deg, #2B65EC 0%, #1E4696 100%)', color: 'white', padding: '60px 0', borderBottom: '1px solid #1E4696', position: 'relative', overflow: 'hidden' }}>
        {/* 背景装饰图形 */}
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
        
        <div style={{ ...fullWidthStyle, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {data.belongingSolution && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', backdropFilter: 'blur(4px)' }}>
                <Layers size={14} /> 所属方案: {data.belongingSolution}
              </span>
            )}
            {data.targetIndustry && data.targetIndustry.split(',').map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px' }}>
                <Briefcase size={14} /> {tag.trim()}
              </span>
            ))}
            {data.deliveryMaturity && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px' }}>
                <CheckCircle size={14} /> 阶段: {data.deliveryMaturity}
              </span>
            )}
          </div>

          <h1 style={{ fontSize: '40px', fontWeight: 'bold', lineHeight: 1.3, margin: '0 0 8px 0' }}>{data.nameZh}</h1>
          {data.nameEn && (
            <div style={{ fontSize: '16px', color: '#ADC6FF', fontFamily: 'monospace', marginBottom: '24px' }}>{data.nameEn}</div>
          )}

          {data.shortDescription && (
            <div style={{ background: 'rgba(255,255,255,0.1)', borderLeft: '4px solid #E8F0FE', padding: '20px 24px', fontSize: '16px', lineHeight: 1.6, color: 'white', borderRadius: '0 8px 8px 0', maxWidth: '800px', backdropFilter: 'blur(8px)' }}>
              {data.shortDescription}
            </div>
          )}
        </div>
      </div>

      <div style={{ ...fullWidthStyle, marginTop: '-40px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* 5. 应用与交付说明 (Application & Delivery) */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '24px', border: '1px solid #E5E6EB' }}>
          <div style={{ padding: '0 24px', borderRight: '1px solid #F0F2F5', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: '#E8F0FE', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B65EC' }}><Globe size={24} /></div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '4px' }}>适用地区 / 语种</div>
              <div style={{ fontSize: '15px', color: '#1D2129', fontWeight: 'bold' }}>{data.regionLanguage || '全球业务'}</div>
            </div>
          </div>
          <div style={{ padding: '0 24px', borderRight: '1px solid #F0F2F5', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: '#E8F0FE', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B65EC' }}><CheckCircle size={24} /></div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '4px' }}>交付形式与接入方式</div>
              <div style={{ fontSize: '15px', color: '#1D2129', fontWeight: 'bold' }}>{data.deliveryFormat || 'API 集成 / 混合部署'}</div>
            </div>
          </div>
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: '#E8F0FE', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B65EC' }}><Tag size={24} /></div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '4px' }}>能力关键词</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {data.keywords ? data.keywords.split(',').slice(0, 3).map(k => (
                  <span key={k} style={{ fontSize: '12px', color: '#4E5969', background: '#F0F2F5', padding: '2px 6px', borderRadius: '4px' }}>{k.trim()}</span>
                )) : <span style={{ fontSize: '12px', color: '#86909C' }}>通用能力</span>}
              </div>
            </div>
          </div>
        </div>

        {/* 2. 核心价值与适用场景 & 3. 核心功能拆解 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* 2. 核心价值与适用场景 */}
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #E5E6EB', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '32px', background: '#E8F0FE', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B65EC' }}>
                <Zap size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1D2129', margin: 0 }}>核心价值与适用场景</h2>
            </div>
            <div className="article-text" style={{ background: '#F0F2F5', padding: '20px', borderRadius: '8px' }}>
              {data.customerBackground || '直击业务痛点，提供场景化的赋能。适用于各类寻求数字化转型的企业级客户。'}
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#2B65EC" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#4E5969' }}>精准解决业务场景中的高耗时环节，降低人工成本。</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#2B65EC" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#4E5969' }}>适配多种企业规模与 IT 环境，提供灵活的部署方案。</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#2B65EC" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#4E5969' }}>相比于市面通用工具，具备更深度的垂直行业 know-how。</span>
              </div>
            </div>
          </div>

          {/* 3. 核心功能拆解 */}
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #E5E6EB', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '32px', background: '#E8F0FE', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B65EC' }}>
                <Layers size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1D2129', margin: 0 }}>核心功能拆解</h2>
            </div>
            <div className="article-text">
              {data.detailedDescription ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {data.detailedDescription.split('。').filter(Boolean).map((pt, idx) => (
                    <div key={idx} style={{ padding: '16px', background: '#F0F2F5', borderRadius: '8px', borderLeft: '3px solid #2B65EC' }}>
                      {pt}。
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '16px', background: '#F0F2F5', borderRadius: '8px' }}>该能力提供端到端的全链路自动化服务。</div>
              )}
            </div>
          </div>

        </div>

        {/* 4. 底层技术支撑 (Tech Specs) */}
        {(data.techLabels || data.underlyingTech) && (
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #E5E6EB', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <Cpu size={24} color="#2B65EC" />
              <h2 style={{ fontSize: '22px', color: '#1D2129', margin: 0, fontWeight: 'bold' }}>底层技术支撑</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {data.techLabels && (
                <div>
                  <div style={{ fontSize: '15px', color: '#1D2129', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <Database size={16} color="#86909C" /> 业务能力层 (Business Capabilities)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {data.techLabels.split(',').map(tech => (
                      <span key={tech} className="tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.underlyingTech && (
                <div>
                  <div style={{ fontSize: '15px', color: '#1D2129', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <Cpu size={16} color="#86909C" /> 核心算法与框架 (Core Stack)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {data.underlyingTech.split(',').map(tech => (
                      <span key={tech} style={{ 
                        display: 'inline-flex', padding: '8px 16px', background: '#F0F2F5', 
                        border: '1px solid #E5E6EB', borderRadius: '6px', fontSize: '13px', color: '#4E5969' 
                      }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. 关联方案入口 & 补充资料 */}
        <div style={{ display: 'grid', gridTemplateColumns: parentSolution ? '2fr 1fr' : '1fr', gap: '24px' }}>
          
          {parentSolution && (
            <Link to={`/solution/${parentSolution.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 40px', background: 'linear-gradient(135deg, #2B65EC 0%, #1E4696 100%)', borderRadius: '12px', textDecoration: 'none', color: 'white', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(43,101,236,0.05)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,101,236,0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(43,101,236,0.05)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={28} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: '6px' }}>归属宏观产品 / 解决方案</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{parentSolution.name}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600' }}>
                查看完整方案 <ArrowRight size={18} />
              </div>
            </Link>
          )}

          {data.documentLink && (
            <a href={data.documentLink} target="_blank" rel="noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '32px', background: 'white', borderRadius: '12px', border: '1px solid #E5E6EB', textDecoration: 'none', color: '#1D2129', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#2B65EC'; e.currentTarget.style.color = '#2B65EC'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.color = '#1D2129'; }}>
              <div style={{ width: '48px', height: '48px', background: '#F0F2F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4E5969' }}>
                <LinkIcon size={20} />
              </div>
              <span style={{ fontWeight: '500' }}>访问外部补充资料库</span>
            </a>
          )}

        </div>

        {/* Contact CTA */}
        <div style={{ padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #E5E6EB', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1D2129', marginBottom: '12px' }}>获取该案例脱敏架构图与评估表</h2>
          <p style={{ fontSize: '14px', color: '#86909C', marginBottom: '32px' }}>对接专家将结合您的实际业务场景，提供专属的落地建议与技术评估。</p>
          <button 
            style={{ padding: '16px 40px', fontSize: '16px', borderRadius: '8px', background: '#2B65EC', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600', boxShadow: '0 8px 24px rgba(43,101,236,0.2)', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }}
            onClick={handleContactExpert}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#1E4696'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(43,101,236,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#2B65EC'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,101,236,0.2)'; }}
          >
            <Mail size={20} /> 邮件联系专家咨询
          </button>
        </div>

        {/* 7. 内部元信息 (Internal Meta Info) - 仅内部可见 */}
        <div className="internal-stripes" style={{ marginTop: '20px', padding: '32px', borderRadius: '12px', border: '1px solid #E5E6EB', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4E5969', marginBottom: '24px', fontWeight: 'bold', fontSize: '16px' }}>
            <Lock size={18} /> 内部元信息 (Internal Use Only)
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '6px' }}>归属部门 / BU</div>
              <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500' }}>{data.department || '未指定'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '6px' }}>对接人</div>
              <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserCheck size={14} color="#86909C" /> {data.contactName || '未指定'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '6px' }}>保密级别</div>
              <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={14} color="#86909C" /> 
                {data.confidentialityLevel || '公开'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#86909C', marginBottom: '6px' }}>最后更新日期</div>
              <div style={{ fontSize: '14px', color: '#1D2129', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="#86909C" /> {data.updateDate || '未知'}
              </div>
            </div>
          </div>

          {data.remarks && (
            <div style={{ background: 'white', padding: '16px', borderRadius: '6px', fontSize: '13px', color: '#4E5969', borderLeft: '3px solid #86909C' }}>
              <strong>备注信息：</strong>{data.remarks}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
