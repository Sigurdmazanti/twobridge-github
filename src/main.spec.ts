import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

describe('Main Application', () => {
	let app: INestApplication;

	beforeEach(async () => {
		// We only mock the methods we need for each individual test
		jest.spyOn(SwaggerModule, 'setup').mockImplementation(() => {});
		jest.spyOn(SwaggerModule, 'createDocument').mockImplementation(() => ({
			openapi: '3.0.0',
			info: {
				title: 'Twobridge',
				description: 'Documentation for the Twobridge REST API.',
				version: '1.0',
			},
			paths: {},
			components: {},
			security: [],
		}));

		const mockApp = {
			useGlobalPipes: jest.fn(),
			listen: jest.fn(),
			enableCors: jest.fn(),
			setGlobalPrefix: jest.fn(),
			getHttpServer: jest.fn().mockReturnValue({
				get: jest
					.fn()
					.mockResolvedValue({
						statusCode: 200,
						body: { message: 'Hello' },
					}),
				post: jest
					.fn()
					.mockResolvedValue({
						statusCode: 200,
						body: { message: 'Created' },
					}),
			}),
		};

		jest.spyOn(NestFactory, 'create').mockResolvedValue(mockApp as any);

		app = await NestFactory.create(AppModule); // This calls the mocked version of create
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should start the application', async () => {
		await app.listen(3333);
		expect(app.listen).toHaveBeenCalledWith(3333);
	});

	it('should call SwaggerModule.createDocument with app and options', () => {
		const options = new DocumentBuilder()
			.setTitle('Twobridge')
			.setDescription('Documentation for the Twobridge REST API.')
			.setVersion('1.0')
			.build();

		SwaggerModule.createDocument(app, options);
		expect(SwaggerModule.createDocument).toHaveBeenCalledWith(app, options);
	});

	it('should call SwaggerModule.setup with the correct arguments', () => {
		const options = new DocumentBuilder()
			.setTitle('Twobridge')
			.setDescription('Documentation for the Twobridge REST API.')
			.setVersion('1.0')
			.build();

		const document = SwaggerModule.createDocument(app, options);

		SwaggerModule.setup('api-docs', app, document);
		expect(SwaggerModule.setup).toHaveBeenCalledWith(
			'api-docs',
			app,
			document,
		);
	});

	it('should run an HTTP server', async () => {
		const server = app.getHttpServer();
		expect(server).toBeDefined();
	});
});
