import db from '../database/knex';
import { MonthlyCategory, NewMonthlyCategory } from './types';

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

export async function createMonthlyCategories(
  monthlyCategories: NewMonthlyCategory[],
): Promise<number[]> {
  const currentDate = new Date();
  const ids = await db('monthly_category').insert(
    {
      ...monthlyCategories,
      month: currentDate.getUTCMonth(),
      year: currentDate.getUTCFullYear,
    },
    ['id'],
  );

  return ids.map((x) => x.id);
}

export const getMonthlyCategoriesInIds = async (
  ids: number[],
): Promise<MonthlyCategory[]> => {
  const results = await db<MonthlyCategoryModel>('monthly_category')
    .select('*')
    .whereIn('id', ids);

  return results.map(fromDb);
};

function getPrevMonth(): number {
  const date = new Date();
  const currentMonth = date.getUTCMonth();
  return currentMonth - 1 < 0 ? 12 : currentMonth - 1;
}

export const getPrevMonthCategoryForFamily = async (
  familyId: number,
): Promise<MonthlyCategory[]> => {
  const monthlyCategories = await db('monthly_category as mc')
    .select('mc.*')
    .join('category as c', 'c.category_id', 'mc.category_id')
    .where('c.family_id', familyId)
    .andWhere('mc.month', getPrevMonth());

  return monthlyCategories.map(fromDb);
};
