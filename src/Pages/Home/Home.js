import './Home.css'
import Loading from '../../Components/Loading/Loading'

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {
    let [movies, setMovies] = useState([]);
    
    useEffect(() => {
		axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies")
            .then(response => setMovies(response.data));
	}, []);

	if(movies === null) {
		return <>carregando</>;
	}

    return (
        (movies.length === 0 ? <Loading /> : <RenderScreen movies={movies} />)
    );
}

function RenderScreen(props) {
    return (
        <main className="Home">
            <p>Selecione o filme</p>
            <div className="movies">
                {props.movies.map((e, index) => 
                <RenderMovie
                    image={e.posterURL}
                    alt={e.title}
                    id={e.id}
                    key={index}
                />)}
            </div>
        </main>
    )
}
 
function RenderMovie(props) {
    return (
        <Link to={`/filme/${props.id}`}>
            <img src={props.image} alt={props.alt}/>
        </Link>
    )
}

export default Home