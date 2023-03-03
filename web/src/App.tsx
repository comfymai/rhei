import { useEffect, useState } from "react";

import { Bookshelf } from "./components/Bookshelf";

import { Api, Item } from "./lib/api";
import { Nullable } from "./helpers/types";
import { Viewer } from "./components/Viewer";

export function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Nullable<Item>>(null);
    const [pages, setPages] = useState<Nullable<string[]>>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        const data = await Api.indexLibrary();
        if (data) setItems(data.items);
    }

    async function handlePick(item: Item) {
        setSelectedItem(item);

        const data = await Api.fetchPages(item.name);
        if (data == null) {
            console.log(`Failed to load pages.`);
            setSelectedItem(null);
        } else setPages(data.pages);
    }

    function handleBack() {
        setSelectedItem(null);
        setPages(null);
    }

    function renderViewer() {
        return pages == null ? (
            <h1>Loading pages...</h1>
        ) : (
            <Viewer
                pages={pages}
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="fullscreen flex-center">
            {selectedItem == null ? (
                <Bookshelf
                    items={items}
                    onPick={handlePick}
                />
            ) : (
                renderViewer()
            )}
        </div>
    );
}
