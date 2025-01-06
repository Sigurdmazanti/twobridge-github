import { Test, TestingModule } from '@nestjs/testing';
import { EcomService } from './ecom.service';

describe('EcomService', () => {
	let service: EcomService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EcomService],
		}).compile();

		service = module.get<EcomService>(EcomService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
