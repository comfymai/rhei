import { Injectable, Logger } from "@nestjs/common";
import * as path from "path";
import { promises as fs } from "fs";

import { Nullable } from "@app/helpers/types";
import { config } from "@app/config";
import { FetchData } from "./dtos/fetch.data";

export interface Item {
    name: string;
    length: number;
}

@Injectable()
export class LibraryService {
    private logger = new Logger(LibraryService.name);

    public async fetchIndex(): Promise<Nullable<Item[]>> {
        try {
            const foundItems = await fs.readdir(config.libraryDir);
            const items: Item[] = [];

            for await (const item of foundItems) {
                const itemDir = path.join(config.libraryDir, item);
                const info = await fs.stat(itemDir);

                if (!info.isDirectory()) continue;

                const pages = await fs.readdir(itemDir);
                items.push({
                    name: item,
                    length: pages.length,
                });
            }

            this.logger.debug(`Fetched ${items.length} library items.`);
            return items;
        } catch (error) {
            this.logger.error(`Failed to fetch library index:\n${error}.`);
            return null;
        }
    }
    
    public async fetchPages(data: FetchData): Promise<Nullable<string[]>> {
        try {
            const itemDir = path.join(config.libraryDir, data.name)
            const filenames = await fs.readdir(itemDir)

            const basePath = `http://127.0.0.1:${config.port}${config.staticPath}/${data.name}` 
            const files = filenames.map(filename => encodeURI(`${basePath}/${filename}`))

            return files
        } catch (error) {
            this.logger.error("Failed to fetch pages:\n${error}")
            return null
        }

    }
}
