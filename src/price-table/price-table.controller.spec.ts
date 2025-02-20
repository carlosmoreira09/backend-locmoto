import { Test, TestingModule } from '@nestjs/testing';
import { PriceTableController } from './price-table.controller';
import { PriceTableService } from './price-table.service';

describe('PriceTableController', () => {
  let controller: PriceTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceTableController],
      providers: [PriceTableService],
    }).compile();

    controller = module.get<PriceTableController>(PriceTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
