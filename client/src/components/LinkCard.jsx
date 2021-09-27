export const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Link</h2>
            <p>Your shorty-link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks in your shorty-link: <strong>{link.clicks}</strong></p>
            <p>Create Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}