import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from '@content/content.service';

@Controller('api/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':key')
  async getContent(@Param('key') key: string) {
    return this.contentService.getContentByKey(key);
  }
}
