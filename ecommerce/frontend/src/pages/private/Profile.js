import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from '../../provider/Store';
import { constant } from '../../core/utils/constants';
import { useHistory } from 'react-router';
import Navbar from '../../components/Navbar';
import OtpVerifyModal from '../../components/OtpVerifyModal';
import { verifyEmailApi } from '../../core/services/api';

function Profile() {
    const { userData } = useContext(Store);
    const initialUser = { userType: '', fName: '', lName: '', email: '', verified: '' };
    const [user, setUser] = useState(initialUser);
    const [mailSent, setMailSent] = useState(false);
    const openOtpModal = useRef(null);
    const history = useHistory();

    useEffect(() => {
        setUser(userData);
    }, [userData])

    const verifyEmailLink = async () => {
        console.log('being link verified');
        try {
            const data = await verifyEmailApi('link');
            if (data.success) {
                alert('Link sent to your mail.\nPlease verify.');
                setMailSent(true);
            }
        } catch (err) {

        }

    };

    const verifyEmailOtp = () => {
        console.log('being otp verified');
        openOtpModal.current.click();
    };
    return (
        <div className="profilePage">
            <Navbar />
            <OtpVerifyModal openModal={openOtpModal} />
            <div className="container-sm mt-5 align-middle">
                <div className="row my-3">
                    <p className="col-6 text-end">User Profile :</p>
                    <p className="col-6">{user.userType}</p>
                </div>
                <div className="row my-3">
                    <p className="col-6 text-end">First Name :</p>
                    <p className="col-6">{user.fName}</p>
                </div>
                <div className="row my-3">
                    <p className="col-6 text-end">Last Name :</p>
                    <p className="col-6">{user.lName}</p>
                </div>
                <div className="row my-3">
                    <p className="col-6 text-end">Email :</p>
                    <p className="col-6">{user.email}</p>
                </div>
                {
                    user.verified === constant.verification.NONE &&
                    <div className="row my-5 justify-content-evenly">
                        {mailSent
                            ? <button disabled className="col-4 btn btn-success"> <i class="bi bi-check-circle"></i>  Link Sent</button>
                            : <>
                                <button onClick={verifyEmailLink} className="col-3 btn btn-secondary">Verify email via link</button>
                                <button onClick={verifyEmailOtp} className="col-3 btn btn-secondary">Verify email via OTP</button>
                            </>}
                    </div>

                }
                <div className="row my-5 justify-content-center">
                    <button className="col-4 btn btn-success">Change Password</button>
                </div>
                <div className="row mt-5 justify-content-center">
                    <button onClick={() => history.push('/editProfile')} className="col-4 btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
