import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from '../../provider/Store';
import { constant } from '../../core/utils/constants';
import { useHistory } from 'react-router';
import Navbar from '../../components/Navbar';
import OtpVerifyModal from '../../components/OtpVerifyModal';
import { requestChangePasswordApi, verifyEmailApi } from '../../core/services/api';

function Profile() {
    const { userData } = useContext(Store);
    const initialUser = { userType: '', fName: '', lName: '', email: '', verified: '' };
    const [user, setUser] = useState(initialUser);
    const [mailSent, setMailSent] = useState(false);
    const [mailRequested, setMailRequested] = useState(false);
    const [passwordMailSent, setPasswordMailSent] = useState(false);
    const [passwordMailRequested, setPasswordMailRequested] = useState(false);
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
                setMailSent(true);
                alert(`Link sent to "${user.email}".\nPlease verify.`);
            }
        } catch (err) {
            console.log('Error', err);
        }
    };

    const verifyEmailOtp = async () => {
        console.log('being otp verified');
        try {
            const data = await verifyEmailApi('otp');
            if (data.success) {
                setMailSent(true);
                alert(`OTP sent to "${user.email}".`);
                openOtpModal.current.click();
            }
        } catch (err) {
            console.log('Error', err);
        }
    };

    const changePassword = async () => {
        console.log('Password change initiated');
        try {
            const data = await requestChangePasswordApi();
            if (data.success) {
                setPasswordMailSent(true);
                alert(`Reset link sent to "${user.email}".`);
            }
        } catch (err) {
            console.log('Error', err);
        }
    };

    return (
        <div className="profilePage">
            <Navbar />
            <OtpVerifyModal openModal={openOtpModal} />
            {/* {JSON.stringify(user)} */}
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
                    <p className="col-6">{user.email} {user.verified === constant.verification.EMAIL && <span><i className="text-success bi bi-patch-check-fill" /></span>}</p>
                </div>
                {
                    user.verified === constant.verification.NONE &&
                    <div className="row my-5 justify-content-evenly">
                        {mailSent
                            ? <button disabled className="col-4 btn btn-success"> <i className="bi bi-check-circle"></i>  Mail Sent</button>
                            : <>
                                <button disabled={mailRequested} onClick={() => { setMailRequested(true); verifyEmailLink(); }} className="col-3 btn btn-secondary">
                                    {mailRequested && <div className="spinner-border spinner-border-sm" role="status" />}
                                    Verify email via link
                                </button>
                                <button disabled={mailRequested} onClick={() => { setMailRequested(true); verifyEmailOtp(); }} className="col-3 btn btn-secondary">
                                    {mailRequested && <div className="spinner-border spinner-border-sm" role="status" />}
                                    Verify email via OTP
                                </button>
                            </>}
                    </div>

                }
                <div className="row my-5 justify-content-center">
                    {passwordMailSent
                        ? <button disabled className="col-4 btn btn-success"> <i className="bi bi-check-circle"></i>  Mail Sent</button>
                        :
                        <button disabled={passwordMailRequested} onClick={() => { setPasswordMailRequested(true); changePassword(); }} className="col-3 btn btn-primary">
                            {mailRequested && <div className="spinner-border spinner-border-sm" role="status" />}
                            Change Password
                        </button>
                    }
                </div>
                <div className="row mt-5 justify-content-center">
                    <button onClick={() => history.push('/editProfile')} className="col-4 btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
