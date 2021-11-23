import React, { useRef } from 'react'

export default function History({ history }) {
    const bottom = useRef(null)
    const scrollToBottom = () => {
        bottom.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className="history accordion border-top">
            <h2 className="accordion-header" id="flush-headingOne">
                <div onClick={scrollToBottom} className="collapsed" id="historyButton" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <small className="bi bi-caret-down-fill text-white" />
                </div>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body historyBody border-top overflow-auto">
                    {history.length !== 0 ?
                        history.map((expAns => <HistoryItem key={expAns.id} expAns={expAns} />))
                        : <p>...</p>
                    }
                    <div ref={bottom}></div>
                </div>
            </div>
        </div>
    )
}


function HistoryItem({ expAns }) {
    return (
        <div className="expAns">
            <p className="expression">{expAns.expression}</p>
            <p className="answer ">{expAns.answer}</p>
        </div>
    )
}

