import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { LibraryModule } from "./library/library.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "..", "library"),
        }),
        LibraryModule
    ],
})
export class AppModule {}
