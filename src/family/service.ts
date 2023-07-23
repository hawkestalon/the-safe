import {
  Family,
  getAllFamilies,
  getFamilyById,
  insertFamily,
} from './data-access';

export const getFamily = async (id: number): Promise<Family> =>
  getFamilyById(id);

export const createFamily = async (familyName: string): Promise<Family> => {
  const id = await insertFamily(familyName);

  return getFamily(id);
};

export const listFamilies = async (): Promise<Family[]> => {
  return getAllFamilies();
};
