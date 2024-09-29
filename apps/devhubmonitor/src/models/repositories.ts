import { IRepository } from '@dev-hub-monitor/types';
import mongoose, { Schema } from 'mongoose';

const RepoSchema: Schema = new Schema({
  name: { type: String, required: true },
  full_name: { type: String, required: true, unique: true },
  owner: {
    login: { type: String, required: true },
    url: { type: String, required: true },
  },
  userId: { type: String, required: true },
  unique_key: { type: String },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  stars: { type: Number, required: true },
  visibility: { type: String, required: true },
  watchers: { type: Number, required: true },
  language: { type: String, required: true },
});

const RepoModel = mongoose.model<IRepository & Document>('Repo', RepoSchema);
export default RepoModel;
