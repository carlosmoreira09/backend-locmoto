import { Test, TestingModule } from '@nestjs/testing';
import { TrafficFinesService } from './traffic-fines.service';

describe('TrafficFinesService', () => {
  let service: TrafficFinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficFinesService],
    }).compile();

    service = module.get<TrafficFinesService>(TrafficFinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
