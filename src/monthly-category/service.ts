import { createMonthlyCategories, getMonthlyCategoriesInIds } from "./data-access";
import { MonthlyCategory } from "./types";


export const createNewMonthCategories = async (familyId: number): Promise<MonthlyCategory[]> => {
  const newIds = await createMonthlyCategories(familyId);

  return getMonthlyCategoriesInIds(newIds);
}