export interface Category {
  id: number;
  name: string;
  rollOver: boolean;
  familyId: number;
}

export type NewCategory = Omit<Category, 'id'>;
