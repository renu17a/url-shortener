import mongoose from 'mongoose';

export interface IUrl extends mongoose.Document {
  url: string;
  hash: string;
  date: Date;
  ipAddress: string
}

const schema: mongoose.SchemaDefinition = {
  url: { type: mongoose.SchemaTypes.String, required: true },
  hash: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  date: { type: mongoose.SchemaTypes.Date, required: true },
  ipAddress: { type: mongoose.SchemaTypes.String, required: true },
};

const collectionName: string = 'url';
const urlSchema: mongoose.Schema = new mongoose.Schema(schema);
urlSchema.index({url: 1, hash: 1});

// const Url: mongoose.Model<IUrl> = mongoose.model<IUrl>(collectionName, urlSchema);
// export default Url;

const Url = (conn: mongoose.Connection): mongoose.Model<IUrl> =>
  conn.model(collectionName, urlSchema);
export default Url;
