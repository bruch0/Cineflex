import './MovieFooter.css'

function MovieFooter (props) {
    return (
        <footer>
            <img src={props.image} alt="Movie"/>
            <div className="movie-info">
                <p>{props.title}</p>
                {props.day ? <p>{props.day}</p> : ''}
            </div>
        </footer>
    )
}

export {
    MovieFooter
}