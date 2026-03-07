import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from './constants';
import mongoose from 'mongoose';

export interface JWTPayload {
  userId: mongoose.Types.ObjectId;
  role: UserRole;
}

const createJWT = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not defined',
    );
  }

  if (!expiresIn) {
    throw new Error(
      'JWT_EXPIRES_IN environment variable is not defined',
    );
  }

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};

const verifyJWT = (token: string): JWTPayload => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as JWTPayload;

  return decoded;
};

export default { createJWT, verifyJWT };
