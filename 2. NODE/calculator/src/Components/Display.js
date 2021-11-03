import React from 'react'
import History from './History'

export default function Display(props) {
    return (
        <div className="display">
            <input type="text" id="displayArea" value={props.answer} readOnly={true} />
            <History history={props.history} />
        </div>
    )
}
