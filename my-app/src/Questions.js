import React from "react";
import Card from "./Card";
import { nanoid } from "nanoid";

export default function Questions(props) {

    // Array of possible answers 
    const [answers, setAnswers] = React.useState([])

    React.useEffect(() => {
        if (props.question.type==="boolean") {
            if (props.question.correct_answer==="True") {
                setAnswers([{text: "True", correct: true, id:nanoid(), active: false}, {text:"False", correct: false, id:nanoid(), active: false} ])
            }
            else {
                setAnswers([{text:"True", correct: false, id:nanoid(), active: false}, {text: "False", correct: true, id:nanoid(), active: false}])
            }
        }
        else {
            let tempArr = [];
            tempArr.push({text: props.question.correct_answer, correct: true, id:nanoid(), active: false});
            for (let i=0; i<3; i++) {
                tempArr.push({
                    text: props.question.incorrect_answers[i],
                    correct: false,
                    id: nanoid(),
                    active: false
                })
            }
            let newArr = shuffle(tempArr);
            setAnswers(newArr)
        }
        return () => {
            setAnswers([]);
        };
    }, [props.restart, props.question]) // Props.question will also change the thing! 

    React.useEffect(() => {
        if (props.checkAnswer) {
            for (let i=0; i<answers.length; i++) {
                if (answers[i].correct) {
                    if (answers[i].active) {
                        props.updateNumCorrect()
                    }
                }
            }
        }
    }, [props.checkAnswer])

    // to Shuffle the Array 
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    function changeActive(id) {
        let temp = answers.map(item => {
            return {
                ...item,
                active: false,
                active: id===item.id ? true : false,
            }
        })
        setAnswers(temp)
    }

    return (
        <div className="card-container">
            {answers.length>0 && (
            <>
                <Card question={props.question} answers={answers} changeActive={changeActive} checkAnswer={props.checkAnswer}/>
            </>
            )}
        </div>
    )
}