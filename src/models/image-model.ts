import mongoose, { Schema } from 'mongoose';
import { IImage, IImageDoc, IImageModel } from '../types/image-schema';

export const imageSchema: Schema<IImageDoc> = new mongoose.Schema({
  name: { type: String },
  data: { type: Buffer },
  contentType: {
    type: String,
    enum: [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/gif',
      'image/webp',
    ],
  },
});

imageSchema.statics.build = (image: IImage) => new Image(image);

export const Image = mongoose.model<any, IImageModel>('Image', imageSchema);
