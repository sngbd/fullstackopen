import {useState} from 'react'
import Data from "./Data"

const Show = ({country}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(!show)

    if(show === false) {
        return (
            <button onClick={handleShow}>show</button>
        )
    }
    return (
        <div>
            <button onClick={handleShow}>hide</button>
            <Data country={country} />
        </div>
    )
}

export default Show