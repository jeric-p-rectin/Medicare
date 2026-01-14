import { RowDataPacket } from 'mysql2';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PATIENT';

export interface User extends RowDataPacket {
  id: string;
  username: string;
  email: string | null;
  password: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreateInput {
  username: string;
  email?: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}
