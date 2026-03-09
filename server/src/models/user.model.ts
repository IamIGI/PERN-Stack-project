import mongoose, { Document } from 'mongoose';
import { UserRole } from '../utils/constants';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  lastName: string;
  location: string;
  role: UserRole;
  avatar: string;
  avatarPublicId: string;
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
  avatar: String,
  avatarPublicId: String,
});

//arrow function won't work, use function with 'this' keyword
UserSchema.methods.toJSON = function () {
  var obj = this.toObject() as IUser;
  delete obj.password;

  return obj;
};

export default mongoose.model<IUser>('users', UserSchema);
