import { Test, TestingModule } from '@nestjs/testing';
import { BlobController } from './blob.controller';

describe('BlobController', () => {
  let controller: BlobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlobController],
    }).compile();

    controller = module.get<BlobController>(BlobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
