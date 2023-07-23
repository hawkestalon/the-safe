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

export const createMonthlyCategories = async (familyId: number): Promise<{ id: number }[]> => {
  // const get active categories in family
  const familyCategories = await getAllCategoriesInFamly(familyId);
  // const get current month and year
  const todaysDate = new Date();
  const month = todaysDate.getMonth();
  const year = todaysDate.getUTCFullYear();
  // use this data to create monthly categories
  // get prev month results to compile new categories //
  // const newMonthlyCategories = familyCategories.map((category) => ({
  //     month,
  //     year,
  //     total: category.total, // if rollover + surplus/defecit of prev month
  //     category_id: category.id,
  //     current: 0, // could set a default in the database.
  // }));

  const newMonthlyCategories = familyCategories.map((category) => {
    let categoryTotal = category.total
    if (category.rollOver) {
      // get prev monthly category 
    } 
  });

  return await db('monthly_category').insert(newMonthlyCategories, ['id']);
};

export const getMonthlyCategoriesInIds = async (ids: number[]): Promise<MonthlyCategory[]> => {
  const results =  await db<MonthlyCategoryModel>('monthly_category').select('*').whereIn('id', ids);

  return results.map(fromDb);
}

export const getPrevMonthCategory = async (categoryId: number): Promise<MonthlyCategory> => {};

export const getPrevMonthCategoryForFamily = async (familyId: number): Promise<MonthlyCategory[]> => {
  // empty
  // join with category table on category id where category family Id = family id;
  const date = new Date();
  const month = date.getUTCMonth();
  const monthlyCategories = await db('monthly_category as mc').select('mc.*').join('category as c', 'c.category_id', 'mc.category_id').where('c.family_id', familyId).andWhere('mc.month', month);
}
