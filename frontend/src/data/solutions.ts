/**
 * 资产类型枚举
 * - solution:   宏观解决方案（顶层方案资产）
 * - clientCase: 客户落地项目（已交付/进行中的客户项目）
 * - capability: 通用能力储备（可复用的标准化能力单元）
 */
export type AssetType = 'solution' | 'clientCase' | 'capability';

export interface Solution {
  id: string;
  /** 资产类型 */
  type: AssetType;
  nameZh: string;
  nameEn: string;
  shortDesc: string;
  /** 目标行业列表，统一筛选口径 */
  industryList: string[];
  businessLabels: string[];
  techLabels: string[];
  deliveryForm: string[];
  maturity: string;
  updateDate: string;
  owner: string;
  detail: string;
  /** 归属方案ID，方案自身指向自己 */
  solutionBelongId: string;
  /** 归属方案名称（展示用），方案自身 = nameZh */
  belongSolutionName: string;
}

export const solutions: Solution[] = [
  {
    id: 'sol-001',
    type: 'solution',
    nameZh: 'G11N AI 多模态内容出海与本地化解决方案',
    nameEn: 'G11N AI Multimodal Content Globalization & Localization Solution',
    shortDesc: '全链路AI驱动的多模态内容本地化体系，覆盖文档、营销、培训全场景',
    industryList: ['通用跨行业', '出海企业', '教育培训'],
    businessLabels: ['机器翻译', '质量评估', '多语言', '翻译质检', '图片翻译', 'OCR文字识别', '短视频制作', 'AIGC', '字幕生成', 'AI配音', '电子学习本地化', '定制化翻译', '术语库'],
    techLabels: ['LLM', 'NLP', 'RAG', 'OCR', 'ASR', 'TTS', '语音克隆', '多媒体流解析'],
    deliveryForm: ['SaaS订阅', 'API接口', '私有化部署', '项目制交付'],
    maturity: '可交付',
    updateDate: '2026-07-02',
    owner: 'G11N Services',
    detail: '本方案依托全栈AI技术能力，为出海企业提供覆盖文本、图片、音视频、交互式课件的全场景多语言本地化服务，拆解为文档管控、营销内容生产、培训课件本地化三大子场景。',
    solutionBelongId: 'sol-001',
    belongSolutionName: 'G11N AI 多模态内容出海与本地化解决方案'
  },
  {
    id: 'sol-002',
    type: 'solution',
    nameZh: '智慧医疗与专科临床 AI 解决方案',
    nameEn: 'Smart Healthcare & Specialist Clinical AI Solution',
    shortDesc: '聚焦西医患者管理与中医药传承两大垂直场景，赋能医疗机构提质增效',
    industryList: ['医疗健康', '肿瘤专科医院', '中医医疗机构', '科研院所'],
    businessLabels: ['智能分诊', '术后随诊', '医疗AI', '患者管理', '导诊系统', '康复监测', '临床决策支持', '知识图谱', '中医药', '专病专科', '文献挖掘', '方剂分析'],
    techLabels: ['NLP实体抽取', '意图识别', '对话Agent', '规则引擎', '预测性分析模型', '知识图谱(KG)', '图数据库', 'NER', '关系抽取'],
    deliveryForm: ['混合模式', '私有化部署', '项目制交付'],
    maturity: '部分已上线',
    updateDate: '2026-07-10',
    owner: '医疗事业部',
    detail: '面向各级医疗机构，打造覆盖诊前导诊、诊后管理、临床辅助、科研赋能的全场景AI能力体系，包含肿瘤全病程管理、中医药知识图谱两大垂直子方案。',
    solutionBelongId: 'sol-002',
    belongSolutionName: '智慧医疗与专科临床 AI 解决方案'
  },
  {
    id: 'sol-003',
    type: 'solution',
    nameZh: '智慧园区 AI 底座与企业赋能解决方案',
    nameEn: 'Smart Park AI Infrastructure & Enterprise Empowerment Solution',
    shortDesc: '园区级统一AI能力底座，兼顾运营方管控与入驻企业AI赋能需求',
    industryList: ['产业园区', '科创园区运营', '科技孵化器'],
    businessLabels: ['AI中台', '科创园区', '企业赋能', '模型管理', '低代码开发', '多租户', '人工智能基础设施'],
    techLabels: ['多租户架构', '容器化(K8s)', '微服务', 'API Gateway', '模型仓库', '低代码引擎'],
    deliveryForm: ['SaaS平台', 'PaaS私有化部署', '项目制交付'],
    maturity: '可交付',
    updateDate: '2026-07-10',
    owner: '园区业务线',
    detail: '面向科创园区运营方打造企业级AI中台底座，构建「运营侧统一管控+企业侧按需赋能」的双边服务体系，降低入驻企业AI落地门槛。',
    solutionBelongId: 'sol-003',
    belongSolutionName: '智慧园区 AI 底座与企业赋能解决方案'
  }
];
