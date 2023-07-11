import { getAllCategoriesInFamly } from '../categories/data-access';
import db from '../database/knex';
import { MonthlyCategory } from './types';

interface MonthlyCategoryModel {
  month: number;
  year: number;
  total: number;
  current: number;
  category_id: number;
  id: number;
}

const fromDb = (category: MonthlyCategoryModel): MonthlyCategory => ({
  month: category.month,
  year: category.year,
  total: category.total,
  current: category.current,
  categoryId: category.category_id,
  id: category.id,
});

export const createMonthlyCategories = async (familyId: number): Promise<number[]> => {
  // const get active categories in family
  const familyCategories = await getAllCategoriesInFamly(familyId);
  // const get current month and year
  const todaysDate = new Date();
  const month = todaysDate.getMonth();
  const year = todaysDate.getUTCFullYear();
  // use this data to create monthly categories

  const newMonthlyCategories = familyCategories.map((category) => ({
      month,
      year,
      total: category.total,
      category_id: category.id,
      current: 0, // could set a default in the database.
  }));
  return await db('monthly_category').insert(newMonthlyCategories, ['id']);
};

export const getMonthlyCategoriesInIds = async (ids: number[]): Promise<MonthlyCategory[]> => {
  const results =  await db<MonthlyCategoryModel>('monthly_category').select('*').where('id', ids);

  return results.map(fromDb);
}
