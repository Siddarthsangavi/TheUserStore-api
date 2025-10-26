import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from '../database/schemas/content.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
  ) {}

  /**
   * Fetch content by key.
   * If not found, return default empty widgets array.
   */
  async getContentByKey(key: string): Promise<{ widgets: any[] }> {
    const content = await this.contentModel.findOne({ key }).lean();

    // Cast to any to satisfy TypeScript
    const value = (content as any)?.value;

    return { widgets: value?.widgets ?? [] };
  }

  /**
   * Create or update content by key
   * Used for syncing logged-in user widgets later
   */
  async upsertContent(
    key: string,
    value: { widgets: any[] },
  ): Promise<Content> {
    return this.contentModel.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true },
    );
  }
}
