import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { confirmEmailApi } from '../../core/services/api';

const VerifyEmailLink = () => {
    const [verified, setVerified] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const confirmMail = async () => {
            try {
                console.log(history.location.pathname);
                const data = await confirmEmailApi(history.location.pathname);
                if (data.success) {
                    setVerified(true);
                }
                else if (data.errors)
                    return <LoadingPage message={data.errors.verification} />
            }
            catch (err) {
                console.log('Verification Error', err);
            }
        }
        confirmMail();
        // eslint-disable-next-line
    }, [])
    if (!verified)
        return <LoadingPage message="Verifying..." spinner={true} />;
    if (verified)
        return (
            <div className="container my-auto text-center">
                <p>Verified successfully</p>
                <button className="btn btn-primary" onClick={() => history.replace('/dashboard')}>Go to Home</button>
            </div>
        );
}

export default VerifyEmailLink
