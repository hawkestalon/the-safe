import {
  insertCategory,
  getAllCategoriesInFamly,
  getCategoryById,
} from './data-access';
import { Category, NewCategory } from './types';

export const createCategory = async (
  category: NewCategory,
): Promise<Category> => {
  const newCategoryId = await insertCategory(category);

  return getCategoryById(newCategoryId);
};

export const getCategory = async (id: number): Promise<Category> =>
  getCategoryById(id);

export const listFamilyCategories = async (
  familyId: number,
): Promise<Category[]> => getAllCategoriesInFamly(familyId);
