import { getAllCategoriesInFamly } from '../categories/data-access';
import {
  createMonthlyCategories,
  getMonthlyCategoriesInIds,
  getPrevMonthCategoryForFamily,
} from './data-access';
import { MonthlyCategory } from './types';

export const initiateNewMonthCategories = async (
  familyId: number,
): Promise<MonthlyCategory[]> => {
  const familyCategories = await getAllCategoriesInFamly(familyId);
  const prevMonthCategories = await getPrevMonthCategoryForFamily(familyId);
  const newMonthlyCategories = familyCategories.map((category) => {
    let { total } = category;
    const prevCategory = prevMonthCategories.find(
      (cat) => cat.categoryId === category.id,
    );
    if (category.rollOver && prevCategory) {
      total = category.id + (prevCategory.total - prevCategory.current);
    }
    return {
      total,
      current: 0,
      categoryId: category.id,
    };
  });

  const newIds = await createMonthlyCategories(newMonthlyCategories);

  return getMonthlyCategoriesInIds(newIds);
};
