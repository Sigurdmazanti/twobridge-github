import { Test, TestingModule } from '@nestjs/testing';
import { EcomController } from './ecom.controller';

describe('EcomController', () => {
	let controller: EcomController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EcomController],
		}).compile();

		controller = module.get<EcomController>(EcomController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
