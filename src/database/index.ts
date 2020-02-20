import mongoose from 'mongoose';

const uri: string = process.env.DB_PATH || '';

let conn: mongoose.Connection;

export const getConnection = async (): Promise<any> => {
  if (!conn) {
    conn = mongoose.createConnection(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
  return conn;
};
