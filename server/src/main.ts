import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config";

(async () => {
    await (await NestFactory.create(AppModule))
        .useGlobalPipes(new ValidationPipe())
        .listen(config.port);
})();
