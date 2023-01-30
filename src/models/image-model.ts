import mongoose, { Schema } from 'mongoose';
import {
  allowedImageTypes,
  IImage,
  IImageDoc,
  IImageModel,
} from '../types/image-schema';

export const imageSchema: Schema<IImageDoc> = new mongoose.Schema({
  name: { type: String },
  userId: { type: String },
  imageType: { type: String },
  data: { type: Buffer },
  contentType: {
    type: String,
    enum: allowedImageTypes,
  },
});

imageSchema.statics.build = (image: IImage) => new Image(image);

export const Image = mongoose.model<any, IImageModel>('Image', imageSchema);
