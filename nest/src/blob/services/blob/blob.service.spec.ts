import { Test, TestingModule } from '@nestjs/testing';
import { BlobService } from './blob.service';

describe('BlobService', () => {
  let service: BlobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlobService],
    }).compile();

    service = module.get<BlobService>(BlobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
