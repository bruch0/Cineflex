import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Seats.css';
import { MovieFooter } from '../../Components/MovieFooter/MovieFooter';
import Loading from '../../Components/Loading/Loading';

function Seats() {
    let params = useParams();
    const idSession = params.idSession;
    const [data, setData] = useState([]);

    useEffect(() => {
        const requisicao = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${idSession}/seats`
        );

        requisicao.then(response => setData(response.data));
    }, [idSession]);

    let idMovie = [];
    let seats =  [];
    let movieTitle = [];
    let moviePoster = [];
    let day = [];

    data.length === 0 ? idMovie = [] : idMovie = data.movie.id;
    data.length === 0 ? movieTitle = [] : movieTitle = data.movie.title;
    data.length === 0 ? moviePoster = [] : moviePoster = data.movie.posterURL;
    data.length === 0 ? day = [] : day = `${data.day.weekday} - ${data.day.date}`;
    data.length === 0 ? seats = [] : seats = data.seats;

    return (
        (data.length === 0 ? <Loading /> : <RenderSeats seats={seats} idMovie={idMovie} idSession={idSession} movieTitle={movieTitle} moviePoster={moviePoster} day={day}/>)
    )
}

function RenderSeats(props) {
    let [selected, setSelected] = useState('');
    
    function selectSeat() {
        selected === '' ? setSelected('selected') : setSelected('');
    }

    return(
        <main className="Seats">
            <p>Selecione os assentos</p>

            <div className="all-seats">
                {props.seats.map((seat, index) => 
                    <Seat
                        number={seat.name}
                        isAvailable={seat.isAvailable}
                        selected={selected}
                        selectSeat={selectSeat}
                        key={index}
                    />
                )}
            </div>
            <Description />
            <MovieFooter 
                image={props.moviePoster}
                title={props.movieTitle}
                day={props.day}
            />
        </main>
    )
}

function Seat(props) {
    return (
        <button className={(props.isAvailable ? props.selected : 'unavailable')} onClick={props.selectSeat}>
            {(props.number.length === 1 ? `0${props.number}` : props.number)}
        </button>
    )
}

function Description () {
    return (
        <div className="description">
            <div className="preview-selected">
                <div className="preview"></div>
                <p>Selecionado</p>
            </div>
            <div className="preview-available">
                <div className="preview"></div>
                <p>Disponível</p>
            </div>
            <div className="preview-unavailable">
                <div className="preview"></div>
                <p>Indisponível</p>
            </div>
        </div>
    )
}

export default Seats