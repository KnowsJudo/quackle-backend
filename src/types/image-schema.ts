import mongoose from 'mongoose';

export type IImage = {
  name: String;
  userId: String;
  imageType: 'avatar' | 'banner';
  data: Buffer;
  contentType: String;
};

export interface IImageModel extends mongoose.Model<IImageDoc> {
  build(item: IImage): IImageDoc;
}

export interface IImageDoc extends mongoose.Document {
  name: String;
  userId: String;
  imageType: 'avatar' | 'banner';
  data: Buffer;
  contentType: String;
}

export const allowedImageTypes = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/gif',
  'image/webp',
];
