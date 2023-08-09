import React from "react";
import { marked } from 'marked';

export default function Card(props) {

    // Styling for BG color
    const styles = {
        backgroundColor: "#cdc5f0",
        borderWidth: "0px"
    }

    const noStyles = {
        backgroundColor: "whitesmoke"
    }

    // turning markdown to normal
    function convert(markdownText) {
        const html = marked(markdownText);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const plainText = doc.body.textContent || '';
        return plainText;
    }

    // Mapping to create an array of button components
    let answers = props.answers.map(item => {
        return (
            <button className="options" id={item.id} onClick={() => props.changeActive(item.id)} style={item.active ? styles : noStyles}>
                {convert(item.text)}
            </button>
        )
    });

    // When the answers are revealed
    function reveal(oldArr) {
        let newAnswers = [];
        for (let i=0; i<oldArr.length; i++) {
            let item = oldArr[i];
            if ((item.active && item.correct) || item.correct) {
                newAnswers.push(
                    <button className="options" id={item.id} style={{backgroundColor: "#41cc7f", border: "none"}} disabled>
                        {convert(item.text)}
                    </button>
                )
            }
            else if (item.active && !item.correct) {
                newAnswers.push(
                    <button className="options" id={item.id} style={{backgroundColor: "#f5b1a4", border: "none", color: "grey"}} disabled>
                        {convert(item.text)}
                    </button>
                )
            }

            else {
                newAnswers.push(
                    <button className="options" id={item.id}  disabled style={{border: "0.5px solid grey", color: "grey"}}>
                        {convert(item.text)}
                    </button>
                )
            }
        }
        return newAnswers; 
    }

    return (
        <div className="card--question">
            <h3 className="question--header">{convert(props.question.question)}</h3>
            {!props.checkAnswer && 
                <div className="card--answers">
                    {answers}
                </div>
            }
            {props.checkAnswer && 
                <div className="card--answers">
                   {reveal(props.answers)}
                </div>
            }
            
            <hr className="break"></hr>
        </div>
    )
}