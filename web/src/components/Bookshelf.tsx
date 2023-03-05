import { useRef, useState } from "react";
import { Item } from "../lib/api";

interface BookshelfProps {
    items: Array<Item>;
    onPick: (item: Item) => void;
}

export function Bookshelf({ items, onPick }: BookshelfProps) {
    const selectorRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<number>(0);

    setInterval(() => {
        // BUG: Adding the keyDown event to document just breaks things for some reason
        // so this should make do.
        if (selectorRef.current != null) selectorRef.current.focus();
    }, 500);

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

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const code = event.code;
        const isShift = event.shiftKey;

        if (code === "KeyJ") updateSelected(selected + (isShift ? 6 : 1));
        else if (code === "KeyK") updateSelected(selected - (isShift ? 6 : 1));
        else if (["Enter", "KeyM"].includes(code)) onPick(items[selected]);
    }

    function isSelected(itemIndex: number) {
        return selected === itemIndex;
    }

    return (
        <div>
            <div
                className="w-full flex flex-row place-content-between focus:outline-none"
                onKeyDown={handleKeyDown}
                tabIndex={-1}
                ref={selectorRef}
            >
                <strong className="uppercase font-bold">Library</strong>
                <p className="italic">
                    k/j: up/down, K/J: up/down by 6, enter/m: open
                </p>
            </div>
            <ul className="p-2 border border-white w-[90dvw] h-[90dvh]">
                {items.map((item, index) => (
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
