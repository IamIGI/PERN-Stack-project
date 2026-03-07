import mongoose, { Document } from 'mongoose';
import { UserRole } from '../utils/constants';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: UserRole;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
});

export default mongoose.model<IUser>('users', UserSchema);
