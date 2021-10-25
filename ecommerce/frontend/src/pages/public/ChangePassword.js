import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

const ChangePassword = () => {
    const [verified, setVerified] = useState(false);
    const openModal = useRef(null);
    const closeModal = useRef(null);
    const history = useHistory();
    useEffect(() => {
        const confirmToken = async () => {
            try {
                // console.log(history.location.pathname);
                // openModal.current.click();
                // const data = await confirmTokenApi(history.location.pathname);
                // closeModal.current.click();
                // if (data.success) {
                //     setVerified(true);
                // }
            }
            catch (err) {
                console.log('Verification Error', err);
            }
        }
        confirmToken();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {verified &&
                <div className="container my-auto text-center">
                    <p>Verified successfully</p>
                    <button className="btn btn-primary" onClick={() => history.replace('/dashboard')}>Go to Home</button>
                </div>
            }
        </>
    )
}

export default ChangePassword
