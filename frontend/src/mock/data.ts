import db from './db.json';

export interface AITableRow {
  caseId: string; // 案例ID
  nameZh: string; // 案例名称(中文)
  nameEn: string; // 案例名称(英文)
  customerBackground: string; // 客户/项目背景
  belongingSolution: string; // 归属方案
  techLabels: string; // 技术能力标签
  shortDescription: string; // 一句话简介
  detailedDescription: string; // 详细说明
  keywords: string; // 检索关键词
  underlyingTech: string; // 底层技术栈/算法标签 (技术向)
  targetIndustry: string; // 目标行业
  regionLanguage: string; // 适用地区/语种
  deliveryMaturity: string; // 交付成熟度
  deliveryFormat: string; // 交付形式
  department: string; // 归属部门/BU
  contactName: string; // 对接人姓名
  contactEmail: string; // 对接人邮箱
  confidentialityLevel: string; // 保密级别
  documentLink: string; // 资料链接
  updateDate: string; // 更新日期
  remarks: string; // 备注
}

export const mockData: AITableRow[] = db as AITableRow[];

export const mockSolutions = mockData.filter(d => d.remarks.includes('方案'));
export const mockCases = mockData.filter(d => d.remarks.includes('案例'));
export const mockCapabilities = mockData.filter(d => d.remarks.includes('能力'));

export const coreSolutions = [
  {
    id: 'sol-g11n',
    name: 'G11N AI 多模态内容出海与本地化解决方案',
    nameEn: 'G11N AI Multimodal Content Globalization & Localization Solution',
    targets: ['出海企业', '跨国组织', '本地化服务商'],
    departments: ['G11N Services'],
    oneLiner: '全链路 AI 驱动的多模态内容本地化体系，覆盖文档、营销、培训全场景，助力企业高效低成本实现全球化内容布局。',
    painPoints: [
      '专业文档翻译术语不统一，法务、技术类内容存在合规风险，人工复核成本居高不下',
      '多语言营销物料制作流程割裂，翻译、设计、配音多环节协同周期长，外包成本高',
      '跨国培训课件本地化拆包、重制流程繁琐，格式易出错，无法快速同步至全球分部',
      '多场景能力分散，需对接多家服务商，内容标准不统一，管理与沟通成本高'
    ],
    overview: '本方案依托全栈 AI 技术能力，为出海企业提供覆盖文本、图片、音视频、交互式课件的全场景多语言本地化服务。方案基于业务部门场景拆解为三大标准化子方案，既支持单一能力按需调用，也支持全链路一体化交付，帮助企业大幅降低本地化成本、缩短内容上线周期，同时保障专业内容的质量与合规性。',
    capabilities: [
      '机器翻译', '质量评估', '多语言', '翻译质检', '图片翻译', 'OCR文字识别', '短视频制作', 'AIGC', '剧本转视频', '内容生成', '字幕生成', 'AI配音', '视频本地化', '电子学习本地化', '多媒体处理', '一站式本地化', '定制化翻译', '术语库', '企业级翻译', '风格配置'
    ],
    underlyingTech: [
      'LLM', 'NLP', '文本分类模型', '质量评估算法 (QE)', 'Prompt Engineering',
      'RAG (检索增强生成)', '领域微调 (Fine-tuning)', '向量数据库', '术语库检索', '机器翻译 (MT)',
      'OCR', '图像分割', '图像修复 (Inpainting)', '版面分析',
      'AIGC', 'T2V (文本生成视频)', '视频剪辑自动化脚本', '数字人驱动',
      'ASR (语音识别)', 'NMT (神经机器翻译)', 'TTS (语音合成)', '语音克隆 (Voice Cloning)', '强制对齐算法 (Forced Alignment)',
      '多媒体流解析 (SCORM/xAPI)', '音视频流处理', '自动化编排引擎'
    ],
    cases: [
      { caseId: 'case-006', name: '企业定制版AI翻译', tag: '企业级术语管控' },
      { caseId: 'case-001', name: 'AI翻译质量审核', tag: '人工复核降本' },
      { caseId: 'case-002', name: '图片AI自动化翻译', tag: '营销物料出海' },
      { caseId: 'case-004', name: '视频字幕配音自动化', tag: '短视频/流媒体出海' },
      { caseId: 'case-003', name: 'AI短视频创作', tag: 'AIGC剧本转视频' },
      { caseId: 'case-005', name: '培训视频课程AI一站式翻译', tag: '跨国E-learning课件重组' }
    ],
    imgPlaceholder: '/sol_g11n.png'
  },
  {
    id: 'sol-medical',
    name: '智慧医疗与专科临床 AI 解决方案',
    nameEn: 'Smart Healthcare & Specialist Clinical AI Solution',
    targets: ['肿瘤专科医院', '中医医院', '中医药科研院所'],
    departments: ['医疗事业部'],
    oneLiner: '聚焦西医专科患者管理与中医药传承两大垂直场景，用 AI 赋能医疗机构提升服务质量、沉淀临床经验、加速科研转化。',
    painPoints: [
      '肿瘤等慢性病患者院后失访率高，医护精力有限，无法实现全周期康复监测与高危早期干预',
      '中医药古籍文献分散，名老中医经验难以结构化沉淀，临床缺乏智能辅助手段',
      '医疗数据非结构化程度高，人工整理分析成本高，科研产出效率低',
      'AI 应用与医院现有 HIS/EMR 系统对接复杂，落地周期长，适配成本高'
    ],
    overview: '本方案面向各级医疗机构，打造覆盖诊前导诊、诊后管理、临床辅助、科研赋能的全场景 AI 能力体系。方案针对西医肿瘤专科与中医药领域分别打造垂直子方案，深度适配医疗行业合规要求与业务流程，帮助医疗机构提升服务效率与质量，推动医疗知识的数字化传承与科研转化。',
    capabilities: [
      '智能分诊', '术后随诊', '医疗AI', '患者管理', '导诊系统', '康复监测', '临床决策支持', '知识图谱', '中医药', '专病专科', '知识库', '文献挖掘', '方剂分析', '中医数字化'
    ],
    underlyingTech: [
      'NLP (症状实体抽取)', '意图识别', '对话 Agent', '规则引擎', '预测性分析模型', 'HIS/EMR 接口集成',
      '知识图谱 (KG)', '图数据库 (Neo4j/Nebula)', 'NER (命名实体识别)', '关系抽取 (RE)', '图检索算法'
    ],
    cases: [
      { caseId: 'case-007', name: '智能分诊及术后随诊系统', tag: '某肿瘤专科医院', detail: '基于医疗图谱构建，实现患者精准分诊。' },
      { caseId: 'case-009', name: '智脉知识图谱平台', tag: '某中医医院', detail: '整理上万古籍，打造名老中医院内知识库。' }
    ],
    imgPlaceholder: '/sol_medical.png'
  },
  {
    id: 'sol-park',
    name: '智慧园区 AI 底座与企业赋能解决方案',
    nameEn: 'Smart Park AI Infrastructure & Enterprise Empowerment Solution',
    targets: ['科创园区管委会', '园区运营公司', '科技孵化器'],
    departments: ['园区业务线'],
    oneLiner: '打造园区级统一 AI 能力底座，兼顾运营方管控需求与入驻企业 AI 赋能需求，助力科创园区数字化升级与产业孵化。',
    painPoints: [
      '入驻企业各自搭建 AI 能力，算力与模型资源重复建设，整体成本高',
      '运营方缺乏统一管控手段，无法对 AI 资源进行调度、计费与运营管理',
      '中小科创企业缺乏算法人才与算力资源，AI 应用开发周期长、落地门槛高',
      '园区产业赋能手段单一，缺乏体系化 AI 技术支持，招商吸引力不足'
    ],
    overview: '本方案面向科创园区、产业孵化器运营方，打造企业级 AI 中台底座，构建「运营侧统一管控 + 企业侧按需赋能」的双边服务体系。平台整合计算机视觉、自然语言处理、知识图谱等全栈 AI 能力，提供低代码开发环境与多租户资源调度能力，既帮助运营方实现 AI 资源统一管理与商业化运营，也大幅降低入驻企业的 AI 应用落地门槛。',
    capabilities: [
      'AI中台', '科创园区', '企业赋能', '模型管理', '低代码开发', '多租户', '人工智能基础设施'
    ],
    underlyingTech: [
      '多租户架构 (Multi-tenant)', '容器化 (K8s)', '微服务', 'API Gateway', '模型仓库 (Model Registry)', '低代码引擎'
    ],
    cases: [
      { caseId: 'case-008', name: '科学之门 AI 中台', tag: 'Digital Park 科创园区', detail: '提供园区企业级 AI 基础设施，赋能中小企业低成本调用大模型。' }
    ],
    imgPlaceholder: '/sol_park.png'
  }
];
