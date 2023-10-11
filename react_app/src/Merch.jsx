import React from "react";

function Merch(props){
    return(
        <div className="merch">
        <h2>{props.name}</h2>
        <h3>{props.price} рублей</h3>
        {/* <img src="https://media.pn.am/media/issue/197/297/photo/197297.jpg" alt=""></img> */}
        <img src={props.photo} alt="bububu" width="100px" height="110px"></img>
        <p>Рейтинг: {props.info}</p>
        </div>
    )
}

export default Merch