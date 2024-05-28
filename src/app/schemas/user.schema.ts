import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../../@types/user';
import { Role } from './role.schema';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    verifiedEmail: { type: Boolean, default: false },
    avatar: { type: String },
    biography: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    role: { type: Schema.Types.ObjectId, ref: Role, required: true },
    birthdate: { type: Date },
    gender: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', UserSchema);
