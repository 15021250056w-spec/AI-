import type { AssetType } from './solutions';

export interface Case {
  id: string;
  /** 资产类型：clientCase=客户落地项目, capability=通用能力储备 */
  type: AssetType;
  nameZh: string;
  nameEn: string;
  /** 归属方案名称（展示用） */
  belongSolutionName: string;
  shortDesc: string;
  /** 目标行业列表，统一筛选口径 */
  industryList: string[];
  businessLabels: string[];
  techLabels: string[];
  deliveryForm: string[];
  maturity: string;
  clientBg: string;
  updateDate: string;
  owner: string;
  detail: string;
  /** 归属方案ID，用于级联筛选 */
  solutionBelongId: string;
}

export const cases: Case[] = [
  {
    id: 'case-001',
    type: 'capability',
    nameZh: 'AI翻译质量审核',
    nameEn: 'AI Translation Quality Assessment',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '自动评估翻译质量，只筛出需要人工复核的片段',
    industryList: ['通用跨行业'],
    businessLabels: ['机器翻译', '质量评估', '多语言', '翻译质检'],
    techLabels: ['LLM', 'NLP', '文本分类模型', '质量评估算法(QE)', 'Prompt Engineering'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Automatically evaluate translation quality and instantly surface only the segments that meet your standards.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-002',
    type: 'capability',
    nameZh: '图片AI自动化翻译',
    nameEn: 'AI Image Translation',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '一键提取并翻译图片中的文字为目标语言',
    industryList: ['通用跨行业'],
    businessLabels: ['图片翻译', 'OCR文字识别', '多语言'],
    techLabels: ['OCR', '图像分割', '机器翻译(MT)', '图像修复(Inpainting)', '版面分析'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Effortlessly extract and translate text from any image into your target language with a single click.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-003',
    type: 'capability',
    nameZh: 'AI短视频创作',
    nameEn: 'AI Short-Video Drama Production',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '几分钟内把剧本转化为可直接发布的短视频',
    industryList: ['通用跨行业'],
    businessLabels: ['短视频制作', 'AIGC', '剧本转视频', '内容生成'],
    techLabels: ['AIGC', 'T2V(文本生成视频)', 'LLM', '视频剪辑自动化脚本', '数字人驱动'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Turn your scripts into engaging, ready-to-publish short videos in minutes—no editing experience required.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-004',
    type: 'capability',
    nameZh: '视频字幕配音自动化',
    nameEn: 'AI-Powered Video Subtitle Production and Dubbing',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '一站式完成视频转录、翻译、时间轴同步与多语言配音',
    industryList: ['通用跨行业'],
    businessLabels: ['字幕生成', 'AI配音', '视频本地化', '多语言'],
    techLabels: ['ASR(语音识别)', 'NMT(神经机器翻译)', 'TTS(语音合成)', '语音克隆', '强制对齐算法'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Seamlessly transcribe, translate, time-sync, and dub your videos into multiple languages, all in one automated workflow.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-005',
    type: 'capability',
    nameZh: '培训视频课程AI一站式翻译',
    nameEn: 'AI-Enabled automation of E-learning localization',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '自动拆包、提取、翻译并重新合成多媒体培训课程包',
    industryList: ['教育培训', '企业内训'],
    businessLabels: ['电子学习本地化', '多媒体处理', '一站式本地化'],
    techLabels: ['多媒体流解析(SCORM/xAPI)', 'ASR', 'TTS', '音视频流处理', '自动化编排引擎'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Unpack, extract, translate, and reassemble any media package (text, audio, video) into a fully localized version, ready for your next output—without manual busywork.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-006',
    type: 'capability',
    nameZh: '企业定制版AI翻译',
    nameEn: 'Enterprise Custom AI Translation',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案',
    shortDesc: '可配置专属术语与风格，翻译质量优于通用大模型直译',
    industryList: ['通用跨行业'],
    businessLabels: ['定制化翻译', '术语库', '企业级翻译', '风格配置'],
    techLabels: ['RAG(检索增强生成)', '领域微调', '向量数据库', '术语库检索', 'LLM'],
    deliveryForm: ['待补充'],
    maturity: '待补充',
    clientBg: '通用能力储备（暂无特定单一客户）',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: 'Custom terminology & style configurable, delivering better translation than raw LLMs.',
    solutionBelongId: 'sol-001'
  },
  {
    id: 'case-007',
    type: 'clientCase',
    nameZh: '智能分诊及术后随诊',
    nameEn: 'Intelligent Diagnosis & Postoperative Follow-up',
    belongSolutionName: '智慧医疗与专科临床 AI 解决方案',
    shortDesc: '面向肿瘤专科医院的AI智能导诊与全流程术后患者管理',
    industryList: ['医疗健康', '专科医院'],
    businessLabels: ['智能分诊', '术后随诊', '医疗AI', '患者管理', '导诊系统', '康复监测', '临床决策支持'],
    techLabels: ['NLP(症状实体抽取)', '意图识别', '对话Agent', '规则引擎', '预测性分析模型', 'HIS/EMR接口集成'],
    deliveryForm: ['混合模式'],
    maturity: '待补充',
    clientBg: '某肿瘤专科医院',
    updateDate: '2026-07-10',
    owner: '医疗事业部',
    detail: 'An AI-powered healthcare platform specifically designed for hospitals, integrating intelligent pre-consultation triage to guide patients to appropriate departments, and a comprehensive postoperative follow-up management system.',
    solutionBelongId: 'sol-002'
  },
  {
    id: 'case-008',
    type: 'clientCase',
    nameZh: '科学之门AI中台',
    nameEn: 'AI Middle Platform',
    belongSolutionName: '智慧园区 AI 底座与企业赋能解决方案',
    shortDesc: '服务于科创园区的企业级AI能力中台，提供一站式AI开发与应用赋能',
    industryList: ['产业园区', '科创园区运营'],
    businessLabels: ['AI中台', '科创园区', '企业赋能', '模型管理', '低代码开发', '多租户', '人工智能基础设施'],
    techLabels: ['多租户架构(Multi-tenant)', '容器化(K8s)', '微服务', 'API Gateway', '模型仓库(Model Registry)', '低代码引擎'],
    deliveryForm: ['SaaS工具/平台'],
    maturity: '待补充',
    clientBg: 'Digital Park (科创园区)',
    updateDate: '2026-07-10',
    owner: '园区业务线',
    detail: 'An enterprise-grade AI middleware platform developed for Digital Park. The platform provides unified AI capability services including computer vision, natural language processing, knowledge graph, and machine learning model management.',
    solutionBelongId: 'sol-003'
  },
  {
    id: 'case-009',
    type: 'clientCase',
    nameZh: '智脉知识图谱平台',
    nameEn: 'ZhiMai Knowledge Graph',
    belongSolutionName: '智慧医疗与专科临床 AI 解决方案',
    shortDesc: '面向中医药领域的专业知识图谱构建与智能应用平台',
    industryList: ['医疗健康', '中医医疗机构'],
    businessLabels: ['知识图谱', '中医药', '专病专科', '知识库', '文献挖掘', '方剂分析', '中医数字化', '临床决策支持'],
    techLabels: ['知识图谱(KG)', '图数据库(Neo4j/Nebula)', 'NER(命名实体识别)', '关系抽取(RE)', '图检索算法'],
    deliveryForm: ['混合模式'],
    maturity: '已上线（对外可售）',
    clientBg: '某中医医院 (TCM Hospital)',
    updateDate: '2026-07-10',
    owner: '医疗事业部',
    detail: 'A domain-specific knowledge graph platform tailored for traditional Chinese medicine research and clinical applications, systematically integrating TCM knowledge including herbal medicines, prescriptions, acupuncture points, etc.',
    solutionBelongId: 'sol-002'
  }
];
