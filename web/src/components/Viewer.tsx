import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Page } from "./Page";

interface ViewerProps {
    pages: string[];
    onBack: () => void;
}

export function Viewer({ pages, onBack }: ViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [loadedPages, setLoadedPages] = useState<string[]>(pages.slice(0, 6));
    const [currentPage, setCurrentPage] = useState(0);

    if (viewerRef.current) viewerRef.current.focus();

    // TODO: Unload some pages to avoid beeg memory gluttony
    function loadNext() {
        const newestPage = loadedPages.length;
        const nextPages = pages.splice(newestPage, 6);

        setLoadedPages([...loadedPages, ...nextPages]);
    }

    function handleKeydown(event: React.KeyboardEvent<HTMLDivElement>) {
        const code = event.code;
        const isShift = event.shiftKey;
        console.log(code, isShift);

        if (code === "Backspace") onBack();
    }

    return (
        <div className="fullscreen overflow-hidden">
            <div className="fixed p-2 bg-white text-black">
                {currentPage} / {pages.length}
            </div>
            <div
                className="w-fit flex items-center mx-auto"
                id="viewer"
                ref={viewerRef}
                onKeyDown={handleKeydown}
                tabIndex={-1}
            >
                <InfiniteScroll
                    dataLength={pages.length}
                    next={loadNext}
                    hasMore={loadedPages.length < pages.length}
                    loader={<p>Loading...</p>}
                    endMessage={<p>That's all!</p>}
                    style={{ overflowX: "hidden" }}
                    height={window.innerHeight}
                    scrollableTarget="viewer"
                >
                    {loadedPages.map((page, index) => (
                        <Page
                            key={index}
                            url={page}
                            onScrollTo={() => setCurrentPage(index + 1)}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}
