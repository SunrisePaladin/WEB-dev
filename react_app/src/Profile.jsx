import React from "react";

function Profile(props){
    return(
        <div className="profile">
        <h2>{props.name}</h2>
        <img src="https://media.pn.am/media/issue/197/297/photo/197297.jpg" alt=""></img>
        {/* <img src="https://i.imgur.com/OiUlyFF.png" alt="bububu" width="400px" height="450px"></img> */}
        <p>Описание: изучаю реактжысы</p>
        </div>
    )
}

export default Profile