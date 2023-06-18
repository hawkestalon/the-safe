export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  familyId: number;
  roleId: number;
}

export type NewUser = Omit<User, 'id'>;
