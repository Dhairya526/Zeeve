import React from 'react'

export default function Display(props) {
    return (
        <div className="display">
            <input type="text" id="displayArea" value={props.answer} readOnly={true} />
        </div>
    )
}
