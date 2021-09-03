import { IoIosArrowBack } from 'react-icons/io';
import './BackButton.css';

function BackButton ({back}) {
    return (
        <button className="back" onClick={back}>
            <IoIosArrowBack />
        </button>
    )
}

export default BackButton