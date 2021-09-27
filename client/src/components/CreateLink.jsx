import {useContext, useEffect, useState} from 'react'
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { useHistory } from 'react-router-dom';

const CreateLink = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState("")

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                
               const data = await request('/api/link/generate', 'POST', {from: link}, {
                   Authorization: `Bearer ${auth.token}` 
               })
               history.push(`/detail/${data.link._id}`)

            } catch (e) {
                
            }
        }
    }

    return (
        <div className="row" style={{paddingTop: '5rem'}}>
            <div className="col s8 offset-s2" ></div>
            <div className="input-field white-text">
                                <input 
                                    placeholder="Write your link for shorty" 
                                    id="link" 
                                    type="text"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                    onKeyPress={pressHandler}
                                />
                                <label htmlFor="llnk">Your link</label>
                            </div>
        </div>
    )
}

export default CreateLink;