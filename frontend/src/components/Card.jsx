import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';

const Card = (props) => {
    // console.log(props.image);
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate(`/city/${props.name}`)
    }
    return (
        <div key={props.id} className={"card"} style={{backgroundImage: `url(${props.image})`}} onClick={handleClick}>
            <div className="class-name">{props.name}</div>
        </div>
    )
}

export default Card;