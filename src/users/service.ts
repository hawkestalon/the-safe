import { getUserById, getUsers, insertUser } from "./data-access";
import { NewUser, User } from "./types";

export const listUsers = async (): Promise<User[]> => getUsers();

export const createUser = async (user: NewUser): Promise<User> => {
  const userId = await insertUser(user);

  return getUserById(userId);
};

export const getUser = async (id: number): Promise<User> => getUserById(id);