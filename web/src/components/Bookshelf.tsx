import { useEffect, useRef, useState } from "react";
import Fuzzy from "fuse.js";

import { Item } from "../lib/api";

interface BookshelfProps {
    items: Item[];
    onPick: (item: Item) => void;
}

export function Bookshelf({ items, onPick }: BookshelfProps) {
    const selectorRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<number>(0);

    const fuzzy = new Fuzzy(items, {
        keys: ["name"],
    });
    const [search, setSearch] = useState<string>("");
    const [searching, setSearching] = useState<boolean>(false);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);

    useEffect(() => {
        focusSelector();
    }, []);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    useEffect(() => {
        applySearch();
    }, [search]);

    function updateSelected(to: number) {
        if (to == selected - 6 && to > -6 && to < 0) to = 0;
        if (
            to == selected + 6 &&
            to > items.length - 1 &&
            to < items.length + 5
        )
            to = items.length - 1;
        if (to >= 0 && to < items.length) setSelected(to);
    }

    function applySearch() {
        if (search.length == 0) setFilteredItems(items);
        else setFilteredItems(fuzzy.search(search).map(result => result.item));

        setSelected(0);
    }

    function handleSearch(query: string) {
        setSearch(query);
    }

    function handleSelectorKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (searching) return;

        const code = event.code;
        const isShift = event.shiftKey;

        if (code === "KeyJ") updateSelected(selected + (isShift ? 6 : 1));
        else if (code === "KeyK") updateSelected(selected - (isShift ? 6 : 1));
        else if (["Enter", "KeyM"].includes(code))
            onPick(filteredItems[selected]);
    }

    function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (["Escape", "Enter"].includes(event.code)) {
            focusSelector();
            setSearching(false);
        }
    }

    function focusSelector() {
        if (selectorRef.current != null) selectorRef.current.focus();
    }

    function isSelected(itemIndex: number) {
        return selected === itemIndex;
    }

    return (
        <div
            className="fullscreen flex-center flex-col gap-4"
            onKeyDown={handleSelectorKeyDown}
            tabIndex={-1}
            ref={selectorRef}
        >
            <div className="w-full flex flex-col px-4 focus:outline-none">
                <div className="flex flex-row place-content-between">
                    <strong className="uppercase font-bold">Library</strong>
                    <p className="italic">
                        k/j: up/down, K/J: up/down by 6, enter/m: open
                    </p>
                </div>
                <input
                    className="w-full text-center text-lg text-black"
                    value={search}
                    placeholder="Search..."
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={() => setSearching(true)}
                    onKeyDown={handleSearchKeyDown}
                />
            </div>
            <ul className="p-2 border border-white w-[90dvw] h-[90dvh]">
                {items
                    .filter(item => filteredItems.includes(item))
                    .map((item, index) => (
                        <li
                            key={index}
                            className={`p-2 hover:bg-white hover:text-black hover:cursor-pointer ${
                                isSelected(index) && "bg-white text-black"
                            }`}
                            onClick={() => onPick(item)}
                        >
                            {item.name} ({item.length} pages)
                        </li>
                    ))}
            </ul>
        </div>
    );
}
