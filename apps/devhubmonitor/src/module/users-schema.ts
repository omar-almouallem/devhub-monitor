import mongoose, { Schema } from 'mongoose';
import { IUserSchema } from '@dev-hub-monitor/types';
import { MONGO_DATABASE_NAME } from '../config';

const PullRequestSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  user: {
    login: { type: String, required: true },
  },
  state: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  closed_at: { type: Date },
  merged_at: { type: Date },
  duration: {
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true },
  },
});

const RepoDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  full_name: { type: String, required: true },
  owner: {
    login: { type: String, required: true },
    url: { type: String, required: true },
  },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  stars: { type: Number, required: true },
  visibility: { type: String, required: true },
  watchers: { type: Number, required: true },
  language: { type: String, required: true },
  pull_requests: { type: [PullRequestSchema], default: [] },
});

const userSchema: Schema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  githubToken: { type: String },
  verificationToken: { type: String },
  verificationTokenExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String },
  gitHubRepoData: { type: [RepoDataSchema], default: [] },
});

const UserModel = mongoose.model<IUserSchema & Document>(
  MONGO_DATABASE_NAME,
  userSchema,
);

export default UserModel;
