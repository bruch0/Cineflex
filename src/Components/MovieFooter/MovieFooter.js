import './MovieFooter.css'

function MovieFooter (props) {
    return (
        <footer>
            <img src="https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg"/>
            <div className="movie-info">
                <p>enola holmes</p>
                <p>quinta meio dia</p>
            </div>
        </footer>
    )
}

export {
    MovieFooter
}