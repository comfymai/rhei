import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config";

(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.listen(config.port);
})();
