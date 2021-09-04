import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

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
    let [selectedSeatsId, setSelectedSeatsId] = useState([]);

    useEffect(() => {
        const requisicao = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes/${idSession}/seats`
        );

        requisicao.then(response => setData(response.data));
    }, [idSession]);

    let seats =  [];
    let movieTitle = [];
    let moviePoster = [];
    let day = [];
    let date = []

    data.length === 0 ? movieTitle = [] : movieTitle = data.movie.title;
    data.length === 0 ? moviePoster = [] : moviePoster = data.movie.posterURL;
    data.length === 0 ? day = [] : day = `${data.day.weekday} - ${data.name}`;
    data.length === 0 ? date = [] : date = `${data.day.date} - ${data.name}`;
    data.length === 0 ? seats = [] : seats = data.seats;

    return (
        (data.length === 0 ? <Loading /> : <RenderSeats seats={seats} movieTitle={movieTitle} moviePoster={moviePoster} day={day} date={date} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} selectedSeatsId={selectedSeatsId} setSelectedSeatsId={setSelectedSeatsId} back={back.goBack}/>)
    )
}

function RenderSeats({seats, movieTitle, moviePoster, day, setSelectedSeats, selectedSeats, selectedSeatsId, setSelectedSeatsId, date, back}) {
    let [buyers, setBuyers] = useState([]);
    
    return(
        <>
        <BackButton back={back} />
        
        <main className="Seats">
            <p>Selecione os assentos</p>
            <div className="all-seats-wrapper">
                <div className="all-seats">
                    {seats.map((seat, index) => 
                        <Seat
                            number={seat.name}
                            id={seat.id}
                            isAvailable={seat.isAvailable}
                            selectedSeats={selectedSeats}
                            setSelectedSeats={setSelectedSeats}
                            selectedSeatsId={selectedSeatsId}
                            setSelectedSeatsId={setSelectedSeatsId}
                            buyers={buyers}
                            setBuyers={setBuyers}
                            key={index}
                        />
                    )}
                </div>
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

            {selectedSeats.length !== 0 ? <Reserve movieTitle={movieTitle} date={date} selectedSeatsId={selectedSeatsId} selectedSeats={selectedSeats} buyers={buyers} /> : ''}
            
            <MovieFooter 
                image={moviePoster}
                title={movieTitle}
                day={day}
            />
        </main>
        </>
    )
}

function Seat({number, id, isAvailable, selectedSeats, setSelectedSeats, selectedSeatsId, setSelectedSeatsId, buyers, setBuyers}) {
    let [selected, setSelected] = useState('');

    function selectSeat() {
        if (selected === '') {
            setSelected('selected');
            setSelectedSeats([...selectedSeats, number]);
            setSelectedSeatsId([...selectedSeatsId, id]);
            setBuyers([...buyers,{buyerName: '', buyerCpf: '', seat: number}]);
        }
        else {
            let index = buyers.map(e => e.seat).indexOf(number);
            if (buyers[index].buyerName !== '' || buyers[index].buyerCpf !== '') {
                Swal.fire({
                    title: 'Deseja remover esse assento?',
                    text: 'Os dados inseridos serão perdidos',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, deletar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                      if (result.isConfirmed) {
                        setSelected('');
                        let x = (selectedSeats.indexOf(number));
                        selectedSeats.splice(x, 1);
                        setSelectedSeats([...selectedSeats]);
                        buyers.splice(index, 1);
                        setBuyers(buyers);
                      }
                  })
            }
            else {
                setSelected('');
                let x = (selectedSeats.indexOf(number));
                selectedSeats.splice(x, 1);
                setSelectedSeats([...selectedSeats]);
                selectedSeatsId.splice(x, 1);
                setSelectedSeatsId([...selectedSeatsId]);
                buyers.splice(index, 1);
                setBuyers(buyers);
            }
            
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

function Reserve({movieTitle, date, selectedSeatsId, selectedSeats, buyers}) {
    let click;
    let path;

    function regexCPF(str) {
        if(/^([0-9]){3}([0-9]){3}([0-9]){3}([0-9]){2}$/.test(str)){
            return true;
        }else{
            return false;
        }
    }

    function alertInvalidData() {
        Swal.fire({
            title: "Os dados informados são inválidos",
            text: 'Insira apenas números no CPF',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Ok',
        })
    }

    let check = buyers.map((e) => regexCPF(e.buyerCpf));
    
    check.indexOf(false) !== -1 ? click = alertInvalidData : click = sendReservation;
    check.indexOf(false) !== -1 ? path = '' : path = '/sucesso'

    function sendReservation() {
        let ids = selectedSeatsId.map((seat) => Number(seat))
        let buyers = [];

        buyers.map((buyer, index) => buyers.push({idAssento: ids[index], nome: buyer.buyerName, cpf: buyer.buyerCpf }))
        let obj = 
        {
            ids: ids,
            compradores: buyers
        }
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/seats/book-many', obj)
    }

    return (
        <Link to={{pathname: path, state: { movieTitle: movieTitle, date: date, selectedSeats: selectedSeats, buyers: buyers }}}>
            <button className="reserve" onClick={(click)}>
                Reservar assento(s)
            </button>
        </Link>
    )
}

export default Seats