export interface Category {
  id: number;
  name: string;
  rollOver: boolean;
  familyId: number;
  active: boolean;
  total: number;
}

export type NewCategory = Omit<Category, 'id'>;
