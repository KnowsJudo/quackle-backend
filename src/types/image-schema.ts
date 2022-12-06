import mongoose from 'mongoose';

export type IImage = {
  name: String;
  data: Buffer;
  contentType: String;
};

export interface IImageModel extends mongoose.Model<IImageDoc> {
  build(item: IImage): IImageDoc;
}

export interface IImageDoc extends mongoose.Document {
  name: String;
  data: Buffer;
  contentType: String;
}
