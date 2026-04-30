
export interface CrmReportData {
  name: string;
  count: number;
  revenue: number;
}

export const getLeadStatusData = (): CrmReportData[] => [
  { name: 'New', count: 15, revenue: 12000 },
  { name: 'Contacted', count: 28, revenue: 35000 },
  { name: 'Qualified', count: 12, revenue: 85000 },
  { name: 'Negotiation', count: 8, revenue: 150000 },
  { name: 'Closed', count: 22, revenue: 450000 },
];

export const getMonthlyRevenue = () => [
  { month: 'Jan', revenue: 45000, leads: 40 },
  { month: 'Feb', revenue: 52000, leads: 45 },
  { month: 'Mar', revenue: 48000, leads: 38 },
  { month: 'Apr', revenue: 61000, leads: 55 },
  { month: 'May', revenue: 55000, leads: 50 },
  { month: 'Jun', revenue: 67000, leads: 62 },
];

export const getDealStages = () => [
  { stage: 'Qualification', value: 80, count: 20 },
  { stage: 'Proposal', value: 65, count: 15 },
  { stage: 'Negotiation', value: 45, count: 10 },
  { stage: 'Closed Won', value: 30, count: 5 },
];
