import { getAllCategoriesInFamly } from "../categories/data-access";
import { createMonthlyCategories, getMonthlyCategoriesInIds, getPrevMonthCategory } from "./data-access";
import { MonthlyCategory } from "./types";


export const createNewMonthCategories = async (familyId: number): Promise<MonthlyCategory[]> => {
  const newIds = await createMonthlyCategories(familyId);

  return getMonthlyCategoriesInIds(newIds.map(x => x.id));
}

export const initiateNewMonthCategories = async (familyId: number): Promise<MonthlyCategory[]> => {
  // get current month, year
  const currentDate = new Date();
  const month = currentDate.getUTCMonth();
  const year = currentDate.getUTCFullYear();
  // get categories for family
  const familyCategories = await getAllCategoriesInFamly(familyId);
  const newMonthlyCategories = familyCategories.map((category) => {
    let total = category.total;
    if (category.rollOver) {
      const prevMonthCategory = await getPrevMonthCategory(category.id)
    }
  });
  // get prev month categories if category.rollOver
  // calculate new total
  // create monthly category
};