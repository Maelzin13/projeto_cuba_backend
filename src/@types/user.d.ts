import { Document } from 'mongoose';
import { RoleDocument } from './roles';

export type UserDocument = Document & {
  name: string;
  username: string;
  email: string;
  verifiedEmail: boolean;
  avatar: string;
  biography: string;
  googleId: string;
  githubId: string;
  role: RoleDocument['_id'];
  birthdate: Date;
  gender: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
