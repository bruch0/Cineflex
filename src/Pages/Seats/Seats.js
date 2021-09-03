import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Seats.css';
import { MovieFooter } from '../../Components/MovieFooter/MovieFooter';
import BackButton from '../../Components/BackButton/BackButton'
import Loading from '../../Components/Loading/Loading';

function Seats() {
    let params = useParams();
    let back = useHistory();
    const idSession = params.idSession;
    const [data, setData] = useState([]);
    let [selectedSeats, setSelectedSeats] = useState([]);

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
        (data.length === 0 ? <Loading /> : <RenderSeats seats={seats} idMovie={idMovie} idSession={idSession} movieTitle={movieTitle} moviePoster={moviePoster} day={day} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} back={back.goBack}/>)
    )
}

function RenderSeats({seats, idMovie, idSession, movieTitle, moviePoster, day, setSelectedSeats, selectedSeats, back}) {
    let [buyers, setBuyers] = useState([]);
    
    return(
        <>
        <BackButton back={back} />
        <main className="Seats">
            <p>Selecione os assentos</p>

            <div className="all-seats">
                {seats.map((seat, index) => 
                    <Seat
                        number={seat.name}
                        isAvailable={seat.isAvailable}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        buyers={buyers}
                        setBuyers={setBuyers}
                        key={index}
                    />
                )}
            </div>

            <Description />
            
            <div className="buyer-info-container">
                {selectedSeats.map((seat, index) => 
                {
                    return (
                    <BuyerInfo
                        seat={seat}
                        buyers={buyers}
                        setBuyers={setBuyers}
                        access={index}
                        key={index}
                    />
                    )
                })}
            </div>

            {selectedSeats.length !== 0 ? <Reserve idMovie={idMovie} idSession={idSession}/> : ''}
            
            <MovieFooter 
                image={moviePoster}
                title={movieTitle}
                day={day}
            />
        </main>
        </>
    )
}

function Seat({number, isAvailable, selectedSeats, setSelectedSeats, buyers, setBuyers}) {
    let [selected, setSelected] = useState('');
    function selectSeat() {
        if (selected === '') {
            setSelected('selected');
            setSelectedSeats([...selectedSeats, number]);
            setBuyers([...buyers,{buyerName: '', buyerCpf: '', seat: number}]);
        }
        else {
            setSelected('');
            let x = (selectedSeats.indexOf(number));
            selectedSeats.splice(x, 1);
            setSelectedSeats([...selectedSeats]);
            let index = buyers.map(e => e.seat).indexOf(number);
            buyers.splice(index, 1);
            setBuyers(buyers);
        }
    }

    return (
        <button className={(isAvailable ? selected : 'unavailable')} onClick={selectSeat}>
            {(number.length === 1 ? `0${number}` : number)}
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

function BuyerInfo({seat, buyers, setBuyers, access}) {
    function getBuyerName(e) {
        let newBuyersArray = [...buyers];
        let newBuyerName = {...newBuyersArray[access]};
        newBuyerName.buyerName = e.target.value;
        newBuyersArray[access] = newBuyerName
        setBuyers(newBuyersArray)
    }

    function getBuyerCpf(e) {
        let newBuyersArray = [...buyers];
        let newBuyerCpf = {...newBuyersArray[access]};
        newBuyerCpf.buyerCpf = e.target.value;
        newBuyersArray[access] = newBuyerCpf
        setBuyers(newBuyersArray)
    }

    return (
        <div className="buyer-info">
            <p>Nome do comprador: (assento {seat})</p>
            <input type="text" placeholder="Digite seu nome..." onChange={(e) => getBuyerName(e)} value={buyers[access].buyerName} />
            <p>CPF do comprador:</p>
            <input type="text" placeholder="Digite seu CPF..." onChange={(e) => getBuyerCpf(e)} value={buyers[access].buyerCpf}/>
        </div>
    )
}

function Reserve({idMovie, idSession}) {
    return (
        <Link to={`${idMovie}/sessao/${idSession}/sucesso`}>
            <button className="reserve">
                Reservar assento(s)
            </button>
        </Link>
    )
}

export default Seats