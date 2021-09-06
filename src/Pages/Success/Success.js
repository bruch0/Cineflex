import { Link } from 'react-router-dom'
import './Success.css';

function Success(props) {
    const {movieTitle, date, selectedSeats, buyers} = props.location.state;
    return (
        <main className="success">
            <p>Pedido feito <br /> com sucesso!</p>
            <div className="info-holder">
                <div className="movie-info">
                    <span>Filme e sessão</span>
                    <p>{movieTitle}</p>
                    <p>{date}</p>
                </div>

                <div className="tickets">
                    <span>Ingresso(s)</span>
                    {selectedSeats.map((seat, index) => <p key={index}>{`Assento ${seat}`}</p>)}
                </div>

                <div className="buyers">
                    <span>Compradore(s)</span>
                    {buyers.map((buyer,index) => {
                        return (
                            <div className='buyer' key={index}>
                                <p>Nome: {buyer.buyerName}</p>
                                <p>CPF: {`${buyer.buyerCpf.slice(0,3)}.${buyer.buyerCpf.slice(3, 6)}.${buyer.buyerCpf.slice(6, 9)}-${buyer.buyerCpf.slice(9, 11)}`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Link to='/'>
                <button className="home">
                    Voltar para Home
                </button>
            </Link>
        </main>
    )
}

export default Success