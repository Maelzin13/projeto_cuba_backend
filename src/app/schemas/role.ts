import mongoose, { Schema } from 'mongoose';
import { RoleDocument } from '../../@types/roles';

const RoleSchema = new Schema(
  {
    role: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Role = mongoose.model<RoleDocument>('Role', RoleSchema);
