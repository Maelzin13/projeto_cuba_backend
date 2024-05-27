import { Document } from 'mongoose';

export type RoleDocument = Document & {
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
