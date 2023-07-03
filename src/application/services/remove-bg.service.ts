import { Inject, Injectable } from '@nestjs/common';
import { appConfig } from 'src/configs/app.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RemoveBgService {
  constructor(
    @Inject(appConfig.KEY) private configs: ConfigType<typeof appConfig>,
  ) {}

  async removeBg(media: Buffer): Promise<Buffer> {
    const formData = new FormData();
    formData.append('size', 'auto');

    const blob = new Blob([media], { type: 'image/png' });
    formData.append('image_file', blob, 'image.png');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': this.configs.removeBgApiKey,
      },
      body: formData,
    });
    const blobResponse = await response.blob();
    const buffer = await new Response(blobResponse).arrayBuffer();
    return Buffer.from(buffer);
  }
}
