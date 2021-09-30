import React from 'react'

export default function Input(props) {
    document.onkeydown = (e) => props.kboardHandler(e);
    return (
        <div className="inputArea">
            <table>
                <tbody>
                    <tr>
                        <td><button onClick={props.clearDisplay} id="allClear">AC</button></td>
                        <td><button onClick={props.sq} id="numberSquare">x<sup>2</sup></button></td>
                        <td><button onClick={props.sqrt} id="numberSquareRoot">&radic;x</button></td>
                        <td><button onClick={props.displayAnswer} id="buttonEnter">=</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => props.display(1)} id="button1">1</button></td>
                        <td><button onClick={() => props.display(2)} id="button2">2</button></td>
                        <td><button onClick={() => props.display(3)} id="button3">3</button></td>
                        <td><button onClick={() => props.display('+')} id="button+">+</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => props.display(4)} id="button4">4</button></td>
                        <td><button onClick={() => props.display(5)} id="button5">5</button></td>
                        <td><button onClick={() => props.display(6)} id="button6">6</button></td>
                        <td><button onClick={() => props.display('-')} id="button-">-</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => props.display(7)} id="button7">7</button></td>
                        <td><button onClick={() => props.display(8)} id="button8">8</button></td>
                        <td><button onClick={() => props.display(9)} id="button9">9</button></td>
                        <td><button onClick={() => props.display('*')} id="button*">*</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => props.display('.')} id="button.">.</button></td>
                        <td><button onClick={() => props.display(0)} id="button0">0</button></td>
                        <td><button onClick={props.backspace} id="buttonBackspace">C</button></td>
                        <td><button onClick={() => props.display('/')} id="button/">/</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
