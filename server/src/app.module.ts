import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { config } from "./config";
import { LibraryModule } from "./library/library.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "..", "public"),
            serveRoot: config.staticPath,
            renderPath: config.staticPath
        }),
        LibraryModule
    ],
})
export class AppModule {}
