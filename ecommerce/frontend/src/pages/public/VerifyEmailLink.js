import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom';
import LoadingSpinnerModal from '../../components/LoadingSpinnerModal';
import { confirmEmailApi } from '../../core/services/api';

const VerifyEmailLink = () => {
    const [verified, setVerified] = useState(false);
    const openModal = useRef(null);
    const closeModal = useRef(null);
    const location = useLocation();
    useEffect(() => {
        const confirmMail = async () => {
            try {
                console.log(location.pathname);
                openModal.current.click();
                const data = await confirmEmailApi(location.pathname);
                if (data.success) {
                    // setVerified(true);
                    closeModal.current.click();
                }
            }
            catch (err) {
                console.log('Verification Error', err);
            }
        }
        confirmMail();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <LoadingSpinnerModal openModal={openModal} message="Verifying Email..." closeModal={closeModal} />
            {verified &&
                <div>
                    Verified successfully
                    <button className="btn btn-primary" onClick={() => <Redirect to='/' />}>Go to Login</button>
                </div>
            }
        </>
    )
}

export default VerifyEmailLink
