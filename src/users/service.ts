import { getUserByEmail, getUserById, getUsers, insertUser } from "./data-access";
import { NewUser, User } from "./types";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../errors";

export const listUsers = async (): Promise<User[]> => getUsers();

export const createUser = async (user: NewUser): Promise<User> => {
  const userId = await insertUser(user);

  return getUserById(userId);
};

export const getUser = async (id: number): Promise<User> => getUserById(id);

// TODO - implement expiration for jwt
export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await getUserByEmail(email);
  if (user.password === password) {
    return jwt.sign({ id: user.id, roleId: user.roleId }, 'secretkey')
  }
  throw new UnauthorizedError('User not authenticated!')
};
