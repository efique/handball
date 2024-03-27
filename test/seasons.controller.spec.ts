import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsController } from '../src/controllers/seasons.controller';
import { SeasonsService } from '../src/services/seasons.service';

describe('SeasonsController', () => {
  let controller: SeasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonsController],
      providers: [SeasonsService],
    }).compile();

    controller = module.get<SeasonsController>(SeasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
