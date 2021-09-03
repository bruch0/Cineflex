import './Success.css';

function Success(props) {
    return (
        <main className="Success">
            <p>Pedido feito <br /> com sucesso!</p>
            <div className="info-holder">
                <div className="movie-info">
                    <span>Filme e sessão</span>
                    <p>Enola Holmes</p>
                    <p>24/06/2021 - 10h</p>
                </div>

                <div className="tickets">
                    <span>Ingresso(s)</span>
                    <p>Assento 1</p>
                    <p>assento 2</p>
                </div>

                <div className="buyers">
                    <span>Compradore(s)</span>
                    <p>Nome: joao</p>
                    <p>cpf: 123</p>
                </div>
            </div>
        </main>
    )
}

export default Success