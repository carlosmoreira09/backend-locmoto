import { Test, TestingModule } from '@nestjs/testing';
import { TrafficFinesController } from './traffic-fines.controller';
import { TrafficFinesService } from './traffic-fines.service';

describe('TrafficFinesController', () => {
  let controller: TrafficFinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrafficFinesController],
      providers: [TrafficFinesService],
    }).compile();

    controller = module.get<TrafficFinesController>(TrafficFinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
