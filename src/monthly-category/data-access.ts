import { getAllCategoriesInFamly } from '../categories/data-access';
import db from '../database/knex';

interface MonthlyCategoryModel {
  month: number;
  year: number;
  total: number;
  current: number;
  category_id: number;
  id: number;
}

export const createMonthlyCategories = async (familyId: number) => {
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
      current: 0,
  }));
  const ids = await db('monthly_category').insert(newMonthlyCategories, ['id']);
};
