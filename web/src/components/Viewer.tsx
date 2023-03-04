import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Page } from "./Page";

const PAGES_PER_LOAD = 5;

interface ViewerProps {
    pages: string[];
    onBack: () => void;
}

export function Viewer({ pages, onBack }: ViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [loadedPages, setLoadedPages] = useState<string[]>(
        pages.slice(0, PAGES_PER_LOAD)
    );
    const [currentPage, setCurrentPage] = useState(0);

    if (viewerRef.current) viewerRef.current.focus();

    function loadNext() {
        const newestPage = loadedPages.length;
        const nextPages = pages
            .slice(newestPage, newestPage + PAGES_PER_LOAD)
            .filter(page => page);

        setLoadedPages([...loadedPages, ...nextPages]);
    }

    function scrollContent(direction: "up" | "down", multiplier: number = 1) {
        const content = document.getElementsByClassName(
            "infinite-scroll-component"
        )[0];

        if (direction === "up")
            content.scrollBy({
                top: -200 * multiplier,
            });
        else
            content.scrollBy({
                top: 200 * multiplier,
            });
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const code = event.code;
        const isShift = event.shiftKey;

        if (code === "Backspace") onBack();

        if (code === "KeyJ") {
            if (isShift) scrollContent("down", 2.5);
            else scrollContent("down");
        }
        if (code === "KeyK") {
            if (isShift) scrollContent("up", 2.5);
            else scrollContent("up");
        }
    }

    return (
        <div className="fullscreen overflow-hidden">
            <div className="fixed p-1.5 bg-white text-black">
                {currentPage} / {pages.length}
            </div>
            <div
                className="w-fit flex items-center mx-auto"
                id="viewer"
                ref={viewerRef}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                <InfiniteScroll
                    dataLength={loadedPages.length}
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
