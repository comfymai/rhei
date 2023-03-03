import Axios from "axios";

import { Nullable } from "../helpers/types";

export interface Item {
    name: string;
    length: number;
}

interface LibraryIndexData {
    items: Array<Item>;
}

export class Api {
    public static instance = Axios.create({
        baseURL: "http://127.0.0.1:3000",
    });

    public static async indexLibrary(): Promise<Nullable<LibraryIndexData>> {
        try {
            const response = await Api.instance.get<LibraryIndexData>(
                "/library/index"
            );
            return response.data;
        } catch (error) {
            console.error(`Failed to index library\n${error}.`);
            return null;
        }
    }
}
