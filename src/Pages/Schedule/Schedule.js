import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

import './Schedule.css'
import MoovieFooter, { MovieFooter } from '../../Components/MovieFooter/MovieFooter'

function Schedule() {
    let params = useParams();
    const id = params.idFilme;
    const [session, setSession] = useState([]);

    useEffect(() => {
        const requisicao = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${id}/showtimes`
        );

        requisicao.then(response => setSession(response.data.days));
    }, [id]);
    
    return (
        <main className="Schedule">
            <p>Selecione o horário</p>
            
            <div className="schedule-days">
                {session.map((session, index) => 
                <RenderAvaibleDays 
                    day={session.weekday}
                    date={session.date}
                    sessions={session.showtimes}
                    key={index}
                />
                )}
            </div>
            <MovieFooter 
                // image={session.}
            />
        </main>
    );
}

function RenderAvaibleDays(props) {
    return (
        <div className="day">
            <p>{`${props.day} - ${props.date}`}</p>
            <div className="avaible-sessions">
                {props.sessions.map((session,index) => 
                    <button key={index}>
                        {session.name}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Schedule