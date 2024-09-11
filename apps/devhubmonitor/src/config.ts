export const PORT = process.env.PORT || 3000;
export const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://omar:omar1234@test.jyc6ghz.mongodb.net/node-tuts?retryWrites=true&w=majority';
export const MONGO_DATABASE_NAME: string =
  process.env.MONGO_DATABASE_NAME || 'DB';
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || '25T1E87ZDBYI8';
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'LK2EKJ9NY9C6BZX3';
