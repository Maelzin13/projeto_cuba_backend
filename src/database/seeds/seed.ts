import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { Role } from '../../app/schemas/role.schema';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const mongoUrl = process.env.MONGO_URL_SEED || 'mongodb://cuba:OzVPKo@localhost:27017/cuba?authSource=admin';

const seedRoles = async () => {
  const roles = [
    { role: 'Admin' },
    { role: 'User' },
    { role: 'Manager' }
  ];

  try {
    await mongoose.connect(mongoUrl);

    await Role.deleteMany();
    await Role.insertMany(roles);

    console.log('Seed data created!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedRoles();
