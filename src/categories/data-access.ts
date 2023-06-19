import db from '../database/knex';
import { ResourceNotFoundError } from '../errors';
import { Category, NewCategory } from './types';

interface CategoryModel {
  id: number;
  family_id: number;
  name: string;
  roll_over: boolean;
};

type NewCategoryModel = Omit<CategoryModel, 'id'>

const newForDb = (category: NewCategory): NewCategoryModel => ({
  name: category.name,
  roll_over: category.rollOver,
  family_id: category.familyId
});

const fromDb = (category: CategoryModel): Category => ({
  id: category.id,
  familyId: category.family_id,
  name: category.name,
  rollOver: category.roll_over,
});

export const insertCategory = async (category: NewCategory): Promise<number> => {
  const [result] = await db('category').insert(newForDb(category), ['id']);

  return result.id;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const category = await db<CategoryModel>('category').select('*').where('id', id).first();

  if (!category) throw new ResourceNotFoundError('category not found!');

  return fromDb(category);
}

export const getAllCategoriesInFamly = async (familyId: number): Promise<Category[]> => {
  const categories = await db<CategoryModel>('category').select('*').where('family_id', familyId);

  return categories.map(fromDb);
}
