import { useState, useMemo, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight, Inbox } from 'lucide-react';
import DataCard from '../components/DataCard';
import { mockData } from '../mock/data';

const PAGE_SIZE = 12;

export default function List() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword') || '';
  const initTech = searchParams.get('tech') || '';
  const initType = searchParams.get('type') || 'all';

  // Filter States
  const [keyword, setKeyword] = useState(initKeyword);
  const [searchKeyword, setSearchKeyword] = useState(initKeyword);
  const [itemType, setItemType] = useState<string>(['solution', 'case'].includes(initType) ? initType : 'all'); // 'all', 'solution', 'case'
  const [industry, setIndustry] = useState<string>('');
  const [tech, setTech] = useState<string>(initTech);
  
  // Sort & Pagination States
  const [sortBy, setSortBy] = useState<'latest' | 'relevance'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync url param if it changes (e.g. going from capabilities page to list page multiple times)
  useEffect(() => {
    if (searchParams.get('tech')) setTech(searchParams.get('tech')!);
  }, [searchParams]);

  // Derive unique options for selects from mockData
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockData.forEach(d => {
      const ts = d.techLabels ? d.techLabels.split(',').map(s => s.trim()) : [];
      ts.forEach(t => tags.add(t));
    });
    return Array.from(tags);
  }, []);

  const allIndustries = useMemo(() => {
    const inds = new Set<string>();
    mockData.forEach(d => {
      if (d.targetIndustry) {
        d.targetIndustry.split('/').forEach(i => inds.add(i.trim()));
      }
    });
    return Array.from(inds);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchKeyword(keyword);
    setCurrentPage(1);
    setSearchParams({ keyword });
  };

  const handleTypeChange = (type: string) => {
    setItemType(type);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const isSolution = item.remarks.includes('方案');
      const computedItemType = isSolution ? 'solution' : 'case'; // Capabilities are treated as cases
      const itemTags = item.techLabels ? item.techLabels.split(',').map(s => s.trim()) : [];

      // 1. Keyword match
      if (searchKeyword && !item.nameZh.includes(searchKeyword) && !item.shortDescription.includes(searchKeyword)) {
        return false;
      }
      // 2. Type match
      if (itemType !== 'all' && computedItemType !== itemType) {
        return false;
      }
      
      // 3. Category/Tag match
      if (industry && !item.targetIndustry?.includes(industry)) return false;
      
      if (tech && !itemTags.some(t => tech.includes(t) || t.includes(tech)) && !item.shortDescription.includes(tech)) {
         return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
      }
      return new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime();
    });
  }, [searchKeyword, itemType, industry, tech, sortBy]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="section" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)' }}>首页</Link>
          <ChevronRight size={14} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle' }} />
          <span>检索结果</span>
        </div>

        {/* Filters Area */}
        <div style={{ 
          background: 'var(--color-bg-card)', 
          padding: '24px', 
          borderRadius: '8px', 
          marginBottom: '32px',
          border: '1px solid var(--color-border-light)'
        }}>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <strong style={{ minWidth: '80px' }}>类型筛选：</strong>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['all', 'solution', 'case'].map(t => (
                <button 
                  key={t}
                  className={`filter-pill ${itemType === t ? 'active' : ''}`}
                  onClick={() => handleTypeChange(t)}
                >
                  {t === 'all' ? '全部' : t === 'solution' ? '解决方案' : '落地案例'}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSearch} style={{ marginLeft: 'auto', position: 'relative' }}>
              <input 
                type="text" 
                placeholder="在结果中搜索..." 
                className="search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search size={16} style={{ position: 'absolute', right: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            </form>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <strong style={{ minWidth: '80px' }}>维度筛选：</strong>
            <select className="filter-select" value={industry} onChange={e => {setIndustry(e.target.value); setCurrentPage(1);}}>
              <option value="">全部行业</option>
              {allIndustries.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            
            <select className="filter-select" value={tech} onChange={e => {setTech(e.target.value); setCurrentPage(1);}}>
              <option value="">全部业务标签</option>
              {allTags.map(cap => (
                <option key={cap} value={cap}>{cap}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '16px', color: 'var(--color-text-body)' }}>
            当前共找到 <span style={{ color: 'var(--color-primary-light)', fontWeight: 'bold' }}>{filteredData.length}</span> 条相关结果
          </div>
          <div>
            <span style={{ fontSize: '14px', marginRight: '12px', color: 'var(--color-text-muted)' }}>排序方式:</span>
            <button 
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '14px', color: sortBy === 'latest' ? 'var(--color-primary-light)' : 'var(--color-text-body)', fontWeight: sortBy === 'latest' ? 'bold' : 'normal', marginRight: '16px' }}
              onClick={() => setSortBy('latest')}
            >最新更新</button>
            <button 
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '14px', color: sortBy === 'relevance' ? 'var(--color-primary-light)' : 'var(--color-text-body)', fontWeight: sortBy === 'relevance' ? 'bold' : 'normal' }}
              onClick={() => setSortBy('relevance')}
            >相关度</button>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredData.length > 0 ? (
          <>
            <div className="grid grid-cols-3">
              {currentData.map(item => (
                <DataCard key={item.caseId} data={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
                <button 
                  className="btn btn-ghost"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  上一页
                </button>
                <span style={{ fontSize: '14px', color: 'var(--color-text-body)' }}>
                  {currentPage} / {totalPages}
                </span>
                <button 
                  className="btn btn-ghost"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  下一页
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
            <Inbox size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p style={{ fontSize: '16px' }}>未找到相关内容，请尝试更换关键词或筛选条件</p>
          </div>
        )}

      </div>
    </div>
  );
}
