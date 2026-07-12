import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Layers, Tag, ArrowUpRight } from 'lucide-react';
import { coreSolutions } from '../mock/data';

const CATEGORIES = [
  {
    name: '自然语言处理 (NLP)',
    tags: ['机器翻译 (MT)', '文本分类模型', '意图识别', 'NER (命名实体识别)', '关系抽取 (RE)', 'Prompt Engineering', 'RAG (检索增强生成)']
  },
  {
    name: '计算机视觉 (CV)',
    tags: ['OCR', '图像分割', '图像修复 (Inpainting)', '版面分析', '数字人驱动']
  },
  {
    name: '语音与音视频 (Audio & Video)',
    tags: ['ASR (语音识别)', 'TTS (语音合成)', '语音克隆 (Voice Cloning)', 'T2V (文本生成视频)', '多媒体流解析', '音视频流处理']
  },
  {
    name: '知识工程与数据 (Knowledge & Data)',
    tags: ['知识图谱 (KG)', '图数据库 (Neo4j/Nebula)', '图检索算法', '向量数据库', '术语库检索']
  },
  {
    name: 'AI架构与工程化 (AI Engineering)',
    tags: ['AI中台', '模型仓库 (Model Registry)', '低代码引擎', '对话 Agent', '自动化编排引擎', '多租户架构 (Multi-tenant)']
  }
];

export default function Capabilities() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter Solutions based on selected tags (OR logic)
  const matchedSolutions = useMemo(() => {
    if (selectedTags.length === 0) return coreSolutions;
    return coreSolutions.filter(sol => 
      selectedTags.some(tag => sol.capabilities.includes(tag) || sol.underlyingTech.some(t => t.includes(tag)))
    );
  }, [selectedTags]);

  // Flatten matched solutions into a list of cases
  const flatCases = useMemo(() => {
    const casesList: any[] = [];
    matchedSolutions.forEach(sol => {
      sol.cases.forEach(c => {
        casesList.push({
          ...c,
          parentSolutionId: sol.id,
          parentSolutionName: sol.name,
          parentCapabilities: sol.capabilities
        });
      });
    });
    return casesList;
  }, [matchedSolutions]);

  return (
    <div className="section" style={{ paddingTop: '40px', minHeight: '80vh', backgroundColor: 'var(--color-bg-page)' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>首页</Link>
          <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle' }} />
          <span style={{ color: 'var(--color-text-main)' }}>AI技术能力库</span>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'var(--font-size-hero)', marginBottom: '16px', background: 'linear-gradient(90deg, var(--color-primary), #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            AI 技术能力库
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: 'var(--font-size-body)', maxWidth: '800px', lineHeight: '1.6' }}>
            在此探索我们跨越多个技术栈的底层 AI 能力。选中相应的能力标签，即可快速查看该能力支撑的所有落地案例。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Left Sidebar (Filters) */}
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            position: 'sticky',
            top: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={18} /> 能力筛选
              </h3>
              {selectedTags.length > 0 && (
                <button 
                  onClick={() => setSelectedTags([])}
                  style={{ 
                    background: 'none', border: 'none', color: 'var(--color-primary)', 
                    fontSize: '14px', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-light)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  清除
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {CATEGORIES.map((cat, idx) => (
                <div key={idx}>
                  <div style={{ 
                    fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-muted)', 
                    marginBottom: '12px', borderBottom: '1px solid var(--color-border-light)', 
                    paddingBottom: '8px'
                  }}>
                    {cat.name}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.tags.map(tag => {
                      const isActive = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => {
                            if (isActive) {
                              setSelectedTags(prev => prev.filter(t => t !== tag));
                            } else {
                              setSelectedTags(prev => [...prev, tag]);
                            }
                          }}
                          style={{
                            background: isActive ? 'var(--color-primary)' : 'var(--color-bg-light)',
                            color: isActive ? 'white' : 'var(--color-text-main)',
                            border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseOver={(e) => {
                            if (!isActive) e.currentTarget.style.background = '#e5e7eb';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseOut={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'var(--color-bg-light)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Content (Flat Cases Grid) */}
          <div>
            {/* Status Bar */}
            <div style={{ 
              background: 'white', borderRadius: '12px', padding: '16px 24px', 
              marginBottom: '24px', display: 'flex', alignItems: 'center', 
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              border: '1px solid var(--color-border-light)'
            }}>
              <span style={{ fontSize: '15px', color: 'var(--color-text-main)' }}>
                {selectedTags.length > 0 ? (
                  <>已选中 {selectedTags.length} 项能力，筛选出 <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '18px' }}>{flatCases.length}</span> 个相关案例（归属于 {matchedSolutions.length} 个方案）</>
                ) : (
                  <>为您展示全库 <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '18px' }}>{flatCases.length}</span> 个商业落地案例</>
                )}
              </span>
            </div>

            {/* Cases Grid */}
            {flatCases.length === 0 ? (
              <div style={{ 
                background: 'white', borderRadius: '16px', padding: '80px 24px', 
                textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                border: '1px dashed var(--color-border-light)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>没有找到符合当前标签组合的案例，请尝试减少筛选条件。</div>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '24px' 
              }}>
                {flatCases.map((c) => (
                  <div 
                    key={c.caseId}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '24px',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-light)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                      if (icon) icon.style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.02)';
                      e.currentTarget.style.borderColor = 'var(--color-border-light)';
                      const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                      if (icon) icon.style.opacity = '0';
                    }}
                    onClick={() => navigate(`/detail/${c.caseId}`)}
                  >
                    {/* Solution Badge */}
                    <div 
                      style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '4px', 
                        fontSize: '11px', padding: '4px 10px', 
                        background: 'var(--color-bg-light)', color: 'var(--color-text-muted)', 
                        borderRadius: '12px', marginBottom: '16px', alignSelf: 'flex-start',
                        border: '1px solid #e5e7eb'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/solution/${c.parentSolutionId}`);
                      }}
                      title="点击查看所属解决方案"
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--color-primary)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'var(--color-bg-light)';
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                      }}
                    >
                      <Layers size={10} /> {c.parentSolutionName}
                    </div>

                    {/* Case Title */}
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text-main)', marginBottom: '8px', lineHeight: '1.4', paddingRight: '20px' }}>
                      {c.name}
                    </h3>
                    
                    {/* Case Tag/Desc */}
                    <div style={{ fontSize: '14px', color: 'var(--color-text-body)', marginBottom: '20px', flex: 1 }}>
                      {c.tag || c.detail}
                    </div>

                    <ArrowUpRight 
                      className="card-icon"
                      size={20} 
                      color="var(--color-primary)" 
                      style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0, transition: 'opacity 0.2s' }} 
                    />

                    {/* Matched Capabilities */}
                    <div style={{ borderTop: '1px dashed var(--color-border-light)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {c.parentCapabilities.concat(c.parentSolutionId === 'sol-g11n' ? ['OCR', 'NLP', 'TTS (语音合成)'] : []).slice(0, 5).map((cap: string) => {
                        const isMatched = selectedTags.some(t => cap.includes(t) || t.includes(cap));
                        return (
                          <span key={cap} style={{ 
                            fontSize: '11px', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            background: isMatched ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-page)',
                            color: isMatched ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            fontWeight: isMatched ? '600' : 'normal',
                            border: `1px solid ${isMatched ? 'rgba(59, 130, 246, 0.2)' : 'var(--color-border-light)'}`
                          }}>
                            {cap}
                          </span>
                        );
                      })}
                      {c.parentCapabilities.length > 5 && (
                        <span style={{ fontSize: '11px', color: '#9ca3af', padding: '2px 4px' }}>+{c.parentCapabilities.length - 5}</span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
