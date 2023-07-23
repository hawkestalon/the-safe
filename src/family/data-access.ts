import db from '../database/knex';
import { ResourceNotFoundError } from '../errors';

export interface Family {
  id: number;
  name: string;
}

export const insertFamily = async (familyName: string): Promise<number> => {
  const [result] = await db('family').insert({ name: familyName }, ['id']);
  return result.id;
};

export const getFamilyById = async (id: number): Promise<Family> => {
  const family = await db('family')
    .select('id', 'name')
    .where('id', id)
    .first();
  if (!family) throw new ResourceNotFoundError('family not found!');
  return family;
};

export const getAllFamilies = async (): Promise<Family[]> => {
  return db('family').select('*');
};
