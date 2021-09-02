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

function RenderSchedule({sessions, idMovie}) {
    return (
        <main className="Schedule">
            <p>Selecione o horário</p>

            <div className="schedule-days">
                {sessions.days.map((sessions, index) => 
                <RenderAvaibleDays 
                    day={sessions.weekday}
                    date={sessions.date}
                    sessionss={sessions.showtimes}
                    idMovie={idMovie}
                    key={index}
                />
                )}
            </div>

            <MovieFooter 
                image={sessions.posterURL}
                title={sessions.title}
            />
        </main>
    )
}

function RenderAvaibleDays({day, date, sessionss, idMovie}) {
    return (
        <div className="day">
            <p>{`${day} - ${date}`}</p>
            <div className="avaible-sessionss">
                {sessionss.map((sessions, index) => 
                    <Button 
                        name={sessions.name}
                        id={sessions.id}
                        idMovie={idMovie}
                        key={index}
                    />
                )}
            </div>
        </div>
    )
}

function Button({name, id, idMovie}) {
    return (
        <Link to={`${idMovie}/sessao/${id}`}>
            <button>
                {name}
            </button>
        </Link>
    )
}



export default Schedule