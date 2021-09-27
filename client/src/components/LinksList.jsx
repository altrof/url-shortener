import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">No any links..</p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Original link</th>
                    <th>Shorty Link</th>
                    <th>Details</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}><button>More info</button></Link>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}