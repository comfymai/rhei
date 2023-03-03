import { Item } from "../lib/api";

interface BookshelfProps {
    items: Array<Item>;
    onPick: (item: Item) => void;
}

export function Bookshelf({ items, onPick }: BookshelfProps) {
    return (
        <div className="border border-white w-[40dvw] h-[80dvh]">
            <ul className="p-2">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 hover:bg-white hover:text-black hover:cursor-pointer"
                        onClick={() => onPick(item)}
                    >
                        {item.name} ({item.length} pages)
                    </li>
                ))}
            </ul>
        </div>
    );
}
