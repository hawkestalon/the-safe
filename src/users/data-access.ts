import db from '../database/knex';
import { ResourceNotFoundError } from '../errors';
import { NewUser, User } from './types';

interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  family_id: number;
  role_id: number;
}

const fromDb = (dbUser: UserModel): User => ({
  id: dbUser.id,
  firstName: dbUser.first_name,
  lastName: dbUser.last_name,
  email: dbUser.email,
  password: dbUser.password,
  familyId: dbUser.family_id,
  roleId: dbUser.role_id,
});

const newForDb = (user: NewUser): Omit<UserModel, 'id'> => ({
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  password: user.password,
  family_id: user.familyId,
  role_id: user.roleId,
});

export const getUsers = async (): Promise<User[]> => {
  const users = await db<UserModel>('users').select('*');
  console.log(users);
  return users.map(fromDb);
};

export const getUserById = async (id: number): Promise<User> => {
  const user = await db<UserModel>('users').select('*').where('id', id).first();
  if (!user) throw new ResourceNotFoundError('User not found!');
  return fromDb(user);
};

export const insertUser = async (user: NewUser): Promise<number> => {
  const [result] = await db('users').insert(newForDb(user), ['id']);
  return result.id;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await db('users').select('*').where('email', email).first();

  if (!user) throw new ResourceNotFoundError('User not found!');

  return user;
};
