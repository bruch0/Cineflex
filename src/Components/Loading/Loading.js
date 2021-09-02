import './Loading.css'
import loading from './loading.gif'

function Loading() {
    return (
        <div className="loading">
            <img src={loading} alt="Loading"/>
        </div>
    )
}

export default Loading