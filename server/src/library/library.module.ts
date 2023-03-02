import { Module } from "@nestjs/common";
import { LibraryController } from "./library.controller";
import { LibraryService } from "./library.service";

@Module({
    providers: [LibraryService],
    controllers: [LibraryController]
})
export class LibraryModule {}
