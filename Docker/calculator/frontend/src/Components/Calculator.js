import React, { useEffect } from 'react'
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
    const [history, setHistory] = useState('');

    const fetchHistoryApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/fetchHistory', {
                method: "GET",
            });
            const data = await response.json();
            if (data)
                setHistory(data);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const addToHistoryApi = async (answer, newAnswer) => {
        const payload = JSON.stringify({ expression: answer, answer: newAnswer });
        const response = await fetch('http://localhost:5000/addToHistory', {
            method: "POST",
            headers: { "Content-type": "application/json", },
            body: payload
        });
        const success = response.json();
        return success;
    }
    useEffect(() => {
        fetchHistoryApi();
    }, [])

    const display = (str) => {
        let newAnswer = answer + str;
        setdisplay(newAnswer);
    }

    const clearDisplay = () => {
        setdisplay('');
    }

    const sq = () => {
        let newAnswer = String(answer ** 2);
        // console.log('answer', newAnswer);
        if (!isNaN(newAnswer))
            setdisplay(newAnswer);
        else
            setdisplay('');
    }

    const sqrt = () => {
        let newAnswer = String(Math.sqrt(answer));
        // console.log('answer', newAnswer);
        if (!isNaN(newAnswer))
            setdisplay(newAnswer);
        else
            setdisplay('');
    }

    const backspace = () => {
        if (answer !== '') {
            let newAnswer = answer.substr(0, answer.length - 1);
            setdisplay(newAnswer);
        }
    }

    const displayAnswer = async () => {
        // console.log('answer', answer);
        if (answer !== '') {
            try {
                // eslint-disable-next-line
                let newAnswer = String(eval(answer));
                // console.log('answer', newAnswer);
                if (!isNaN(newAnswer)) {
                    if (JSON.stringify(answer) !== JSON.stringify(newAnswer)) {
                        const success = await addToHistoryApi(answer, newAnswer);
                        if (success)
                            fetchHistoryApi();
                    }
                    setdisplay(newAnswer);
                }
                else throw Error;
            } catch (err) {
                console.log('err', err);
                setdisplay('');
            }
        }
    }


    return (
        <div className="calculator">
            <Display answer={answer} history={history} />
            <Input display={display} clearDisplay={clearDisplay} backspace={backspace} sq={sq} sqrt={sqrt} displayAnswer={displayAnswer} kboardHandler={kboardHandler} />
        </div>
    )
}
