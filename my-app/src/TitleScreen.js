import React from "react";
import './styles.css';

export default function TitleScreen(props) {
    function handleClick() {
        props.changeState();
    }
    return (
        <div className="title-container">
            <h1 className="title">Quiz Time!</h1>
            <p>Are you ready to test your knowledge on 5 random questions? If so, click the button to start!</p>
            <button onClick={handleClick}>Start!</button>
        </div>
    )
    
}