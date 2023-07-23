export interface MonthlyCategory {
  month: number;
  year: number;
  total: number;
  current: number;
  categoryId: number;
  id: number;
}

export type NewMonthlyCategory = Pick<
  MonthlyCategory,
  "categoryId" | "total" | "current"
>;
