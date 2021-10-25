import React, { useState, useEffect, useRef, useContext } from 'react'
import { confirmOtpApi } from '../core/services/api';
import { constant } from '../core/utils/constants';
import { otpValidation } from '../core/validations/authValidation';
import { Store } from '../provider/Store';

export default function OtpVerifyModal(props) {
    const { userData, setUserData } = useContext(Store);
    const [otp, setOtp] = useState('');
    const [buttonDiasabled, setButtonDiasabled] = useState(true);
    const initialErrors = { otp: '' };
    const [errors, setErrors] = useState(initialErrors);
    const closeModal = useRef(null);

    useEffect(() => {
        if (otp.length === 6)
            setButtonDiasabled(false);
        else
            setButtonDiasabled(true);
    }, [otp]);

    const confirmOtp = async () => {
        try {
            setErrors(initialErrors);
            const errors = otpValidation(otp);
            if (Object.keys(errors).length !== 0) {
                setErrors({ otp: errors.otp });
            } else {
                const body = JSON.stringify({ otp });
                const data = await confirmOtpApi(body);
                console.log(data);
                if (data.errors) {
                    setErrors({ otp: data.errors.otp });
                }
                else if (data.success) {
                    alert('User Details Modified Successfully');
                    closeModal.current.click();
                    setUserData({ ...userData, verified: constant.verification.EMAIL });
                }
                else if (data.success === false) {
                    setErrors({ otp: "Invalid OTP" })
                }
            }
        }
        catch (err) {
            console.log('Verification Error', err);
        }
    }

    return (
        <div>
            <button ref={props.openModal} type="button" className="visually-hidden" data-bs-toggle="modal" data-bs-target="#otpVerifyModal">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="otpVerifyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Enter OTP</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input type="number" className="form-control text-center" name="otp" value={otp} onChange={e => { setOtp(e.target.value) }} min="100000" max="999999" />
                                <p className="fs-6 alert-danger">{errors.otp}</p>
                            </form>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button ref={closeModal} className="btn btn-danger" onClick={() => setOtp('')} data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-success" onClick={confirmOtp} disabled={buttonDiasabled}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
