import { useEffect, useState } from "react";

import { Bookshelf } from "./components/Bookshelf";

import { Api, Item } from "./lib/api";
import { Nullable } from "./helpers/types";

export function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Nullable<Item>>(null);

    useEffect(() => {
        (async () => {
            const data = await Api.indexLibrary();
            if (data) setItems(data.items);
        })();
    }, []);

    const handlePick = (item: Item) => {
        setSelectedItem(item);
    };

    return (
        <div className="fullscreen flex-center">
            <Bookshelf
                items={items}
                onPick={handlePick}
            />
        </div>
    );
}
