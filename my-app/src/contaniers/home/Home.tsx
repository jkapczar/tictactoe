import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    const connectRemote = () => {
        console.log("connectRemote");
    }

    return(
        <>
            <p>HOME</p>
            <button onClick={() => navigate("/game")}>GO to game</button>
            <button onClick={connectRemote}>connect</button>
        </>
    )
}

export default Home;