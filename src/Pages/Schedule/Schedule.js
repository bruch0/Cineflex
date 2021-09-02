import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

import './Schedule.css'
import { MovieFooter } from '../../Components/MovieFooter/MovieFooter'
import Loading from '../../Components/Loading/Loading'

function Schedule() {
    let params = useParams();
    const idMovie = params.idMovie;
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const requisicao = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies/${idMovie}/showtimes`
        );

        requisicao.then(response => setSessions(response.data));
    }, [idMovie]);
    
    return (
        (sessions.length === 0 ? <Loading /> : <RenderSchedule sessions={sessions} idMovie={idMovie}/>)
    );
}

function RenderSchedule(props) {
    return (
        <main className="Schedule">
            <p>Selecione o horário</p>

            <div className="schedule-days">
                {props.sessions.days.map((sessions, index) => 
                <RenderAvaibleDays 
                    day={sessions.weekday}
                    date={sessions.date}
                    sessionss={sessions.showtimes}
                    idMovie={props.idMovie}
                    key={index}
                />
                )}
            </div>

            <MovieFooter 
                image={props.sessions.posterURL}
                title={props.sessions.title}
            />
        </main>
    )
}

function RenderAvaibleDays(props) {
    return (
        <div className="day">
            <p>{`${props.day} - ${props.date}`}</p>
            <div className="avaible-sessionss">
                {props.sessionss.map((sessions, index) => 
                    <Button 
                        name={sessions.name}
                        id={sessions.id}
                        idMovie={props.idMovie}
                        key={index}
                    />
                )}
            </div>
        </div>
    )
}

function Button(props) {
    return (
        <Link to={`${props.idMovie}/sessao/${props.id}`}>
            <button>
                {props.name}
            </button>
        </Link>
    )
}



export default Schedule