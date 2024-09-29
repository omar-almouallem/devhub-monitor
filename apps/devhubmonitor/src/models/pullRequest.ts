import { IPullRequest } from '@dev-hub-monitor/types';
import mongoose, { Schema } from 'mongoose';

const PullRequestSchema: Schema = new Schema({
  id: { type: String, required: true },
  unique_key: { type: String, required: true, unique: true },
  repo_unique_key: { type: String, required: true, unique: false },
  number: { type: Number, required: true },
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

const PullRequestModel = mongoose.model<IPullRequest & Document>(
  'PullRequest',
  PullRequestSchema,
);
export default PullRequestModel;
