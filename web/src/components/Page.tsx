import { useInView } from "react-intersection-observer";

interface PageProps {
    url: string;
    onScrollTo: () => void;
}

export function Page({ url, onScrollTo }: PageProps) {
    const { ref } = useInView({
        rootMargin: "-50% 0px",
        onChange: inView => {
            if (inView) onScrollTo();
        },
    });

    return (
        <picture ref={ref}>
            <img src={url} />
        </picture>
    );
}
