// 行业字典 - 级联筛选基准
export interface IndustryDictItem {
  id: string;
  name: string;
}

const industryDict: IndustryDictItem[] = [
  { id: 'ind-001', name: '通用跨行业' },
  { id: 'ind-002', name: '出海企业' },
  { id: 'ind-003', name: '教育培训/企业内训' },
  { id: 'ind-004', name: '医疗健康/肿瘤专科医院' },
  { id: 'ind-005', name: '医疗健康/中医医疗机构' },
  { id: 'ind-006', name: '产业园区/科创园区运营' },
];

export default industryDict;
