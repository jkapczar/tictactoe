import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return(
        <>
            <p>HOME</p>
            <button onClick={() => navigate("/game")}>GO to game</button>
        </>
    )
}

export default Home;