import React from 'react';
import '../styles/card.css';

const Card = (props) => {
    // console.log(props.image);
    return (
        <div key={props.id} className={"card"} style={{backgroundImage: `url(${props.image})`}}>
            <div className="class-name">{props.name}</div>
        </div>
    )
}

export default Card;