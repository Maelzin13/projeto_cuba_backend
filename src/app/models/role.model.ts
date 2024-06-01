import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
  role: string;
}

const roleSchema = new Schema<IRole>({
  role: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
