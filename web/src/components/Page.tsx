interface PageProps {
    url: string
}

export function Page({ url }: PageProps) {
    return <picture>
        <img src={url}/>
    </picture>
}
