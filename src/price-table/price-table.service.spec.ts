import { Test, TestingModule } from '@nestjs/testing';
import { PriceTableService } from './price-table.service';

describe('PriceTableService', () => {
  let service: PriceTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceTableService],
    }).compile();

    service = module.get<PriceTableService>(PriceTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
