const linkStringToLink = (link: string) => {
    return (
        <a href={link} target="_blank" className="text-blue-500 underline">
            {link}
        </a>
    )
}

const stringToText = (text: string) => {
    return (
        <p>
            {text}
        </p>
    )
}

export { linkStringToLink, stringToText }