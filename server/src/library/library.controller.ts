import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { FetchData } from "./dtos/fetch.data";

import { Item, LibraryService } from "./library.service";

@Controller("library")
export class LibraryController {
    constructor(private librarian: LibraryService) {}

    @Get("/index")
    public async index(): Promise<Item[]> {
        const items = await this.librarian.fetchIndex();

        if (items == null)
            throw new InternalServerErrorException(
                "Failed to fetch library index."
            );
        else return items;
    }

    @Get("/pages")
    public async fetchPages(@Body() data: FetchData): Promise<string[]> {
        const pages = await this.librarian.fetchPages(data)  

        if (pages == null) throw new NotFoundException("Failed to find item.")
        else return pages
    }
}
