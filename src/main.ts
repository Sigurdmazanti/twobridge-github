import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BadRequestException(validationErrors);
			},
		}),
	);

	const options = new DocumentBuilder()
		.setTitle('Twobridge')
		.setDescription(
			'Documentation for the Twobridge REST API.<br/><br/><h3>Important Note:</h3> <p>All HTTP status codes are handled by the external API.<br> Be cautious when relying on the status codes listed below for error handling or success confirmation, as they might not conform what the external API is returning.</p>',
		)
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api-docs', app, document);

	await app.listen(3333);
}
bootstrap();
