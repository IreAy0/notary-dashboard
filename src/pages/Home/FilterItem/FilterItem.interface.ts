export interface IFilterItemProps {
  setStatus?: any;
  status?: { name: string; id: number } | {};
  onRangeSelect: (data: { start_date: string | Date; end_date: string | Date }) => void;
  dateRange: { start_date: string | Date; end_date: string | Date };
  refreshDoc: () => void;
}
  
