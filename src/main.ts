import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle('Portals Core Api Documentation')
        .setDescription('The Portals Core Api Documentation')
        .setVersion('1.0')
        .addTag('Portals')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
bootstrap();
