import React from 'react'

export default function LoadingSpinnerModal({ openModal, message, closeModal }) {
    return (
        <div>
            <button ref={openModal} onClick={() => console.log('clicked open')} type="button" className="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent border-0">
                        <div className="text-center fs-2">
                            <div className="spinner-border text-light fs-4" style={{ width: '5rem', height: '5rem' }} role="status"></div>
                            <p className="text-white">{message}</p>
                            <button ref={closeModal} onClick={() => console.log('clicked close')} type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
