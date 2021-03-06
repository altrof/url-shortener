import { useState, useCallback, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { Loader } from './Loader';
import { LinkCard } from './LinkCard';

const DetailLink = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fethced = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fethced)
        } catch (e) {
            
        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && link && <LinkCard link={link} />}
        </div>
    )
}

export default DetailLink;