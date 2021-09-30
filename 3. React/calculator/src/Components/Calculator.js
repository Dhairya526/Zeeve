import React from 'react'
import Display from './Display'
import Input from './Input'
import { useState } from 'react'

const kboardHandler = (e) => {
    e = e || window.event;
    switch (e.key) {
        case "1": pressButton(e.key);
            break;
        case "2": pressButton(e.key);
            break;
        case "3": pressButton(e.key);
            break;
        case "4": pressButton(e.key);
            break;
        case "5": pressButton(e.key);
            break;
        case "5": pressButton(e.key);
            break;
        case "6": pressButton(e.key);
            break;
        case "7": pressButton(e.key);
            break;
        case "8": pressButton(e.key);
            break;
        case "9": pressButton(e.key);
            break;
        case "0": pressButton(e.key);
            break;
        case ".": pressButton(e.key);
            break;
        case "+": pressButton(e.key);
            break;
        case "-": pressButton(e.key);
            break;
        case "*": pressButton(e.key);
            break;
        case "/": pressButton(e.key);
            break;
        case "Enter": pressButton(e.key);
            break;
        case "Backspace": pressButton(e.key);
            break;
        default: break;
    }
}

const pressButton = (key) => {
    let buttonId = "button" + key;
    let button = document.getElementById(buttonId);
    button.click();
}

export default function Calculator() {
    const [answer, setdisplay] = useState('');

    const display = (str) => {
        let newAnswer = answer + str;
        setdisplay(newAnswer);
    }

    const clearDisplay = () => {
        setdisplay('');
    }

    const sq = () => {
        let newAnswer = String(answer ** 2);
        setdisplay(newAnswer);
    }

    const sqrt = () => {
        let newAnswer = String(Math.sqrt(answer));
        setdisplay(newAnswer);
    }

    const backspace = () => {
        if (answer !== '') {
            let newAnswer = answer.substr(0, answer.length - 1);
            setdisplay(newAnswer);
        }
    }

    const displayAnswer = () => {
        if (answer !== '') {
            let newAnswer = String(eval(answer));
            setdisplay(newAnswer);
        }
    }


    return (
        <div className="calculator">
            <Display answer={answer} />
            <Input display={display} clearDisplay={clearDisplay} backspace={backspace} sq={sq} sqrt={sqrt} displayAnswer={displayAnswer} kboardHandler={kboardHandler} />
        </div>
    )
}
