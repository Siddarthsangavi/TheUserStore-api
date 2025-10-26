import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true }) key!: string;
  @Prop({ type: Object }) data!: any;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
