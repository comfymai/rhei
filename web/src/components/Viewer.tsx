import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Page } from "./Page";

interface ViewerProps {
    pages: string[];
}

export function Viewer({ pages }: ViewerProps) {
    const [loadedPages, setLoadedPages] = useState<string[]>(pages.slice(0, 5));

    function loadNext() {
        const currentPage = loadedPages.length - 1;
        const nextPages = pages.splice(currentPage, 5);

        setLoadedPages([...loadedPages, ...nextPages]);
    }

    return (
        <div className="w-[80dvw] h-[100dvh] flex justify-center border-x border-x-white">
            <InfiniteScroll
                dataLength={pages.length}
                next={loadNext}
                hasMore={loadedPages.length < pages.length}
                loader={<p>Loading...</p>}
                endMessage={<p>That's all!</p>}
            >
                {loadedPages.map(page => (
                    <Page url={page} />
                ))}
            </InfiniteScroll>
        </div>
    );
}
