import React from 'react'

export default function LoadingPage({ message, spinner }) {
    return (
        <div className=" row align-items-center h-100 g-0" style={{ backgroundColor: 'gray' }}>
            <div className="col text-center">
                {spinner && <div className="spinner-border text-light fs-4" style={{ width: '5rem', height: '5rem' }} role="status"></div>}
                <p className="text-white fs-2">{message}</p>
            </div>
        </div>
    )
}
