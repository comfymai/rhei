import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
} from "@nestjs/common";

import { Item, LibraryService } from "./library.service";

@Controller("library")
export class LibraryController {
    constructor(private librarian: LibraryService) {}

    @Get("/index")
    public async index(): Promise<{ items: Item[] }> {
        const items = await this.librarian.fetchIndex();

        if (items == null)
            throw new InternalServerErrorException(
                "Failed to fetch library index."
            );
        else return { items };
    }

    @Get("/pages/:name")
    public async fetchPages(
        @Param("name") name: string
    ): Promise<{ pages: string[] }> {
        const pages = await this.librarian.fetchPages(name);

        if (pages == null) throw new NotFoundException("Failed to find item.");
        else return { pages };
    }
}
