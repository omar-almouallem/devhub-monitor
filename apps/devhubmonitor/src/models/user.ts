import mongoose, { Schema } from 'mongoose';
import { IUserSchema } from '@dev-hub-monitor/types';

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  githubToken: { type: String },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String },
});

const UserModel = mongoose.model<IUserSchema & Document>('User', UserSchema);

export default UserModel;
