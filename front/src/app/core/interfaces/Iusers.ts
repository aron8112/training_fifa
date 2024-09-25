export enum Role {
  'admin',
  'editor',
  'user',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface logUser extends Partial<IUser> {
  email: string;
  password: string;
}
