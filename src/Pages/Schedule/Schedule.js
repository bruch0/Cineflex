import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

import './Schedule.css'

function Schedule() {
    let params = useParams();
    const id = params.idFilme;
    const [filme, setFilme] = useState({});

    useEffect(() => {
        const requisicao = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${id}/showtimes`
        );

        requisicao.then(response => setFilme(response.data.days));
    }, []);
    console.log(filme)
    
    return (
        <main className="Schedule">
            <p>Selecione o horário</p>
            <div className="schedule-day">
                <RenderAvaibleDay />
            </div>
        </main>
    );
}

function RenderAvaibleDay(props) {
    return (
        <>
        Quinta feira
        </>
    )
}

export default Schedule