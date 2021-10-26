import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { confirmTokenApi, setChangePassword } from '../../core/services/api';
import { passwordValidation } from '../../core/validations/authValidation';

const ChangePassword = () => {
    const [verified, setVerified] = useState(false);
    const [changed, setChanged] = useState(false);
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const initialErrors = { password: '' };
    const [errors, setErrors] = useState(initialErrors);
    const history = useHistory();
    useEffect(() => {
        const confirmToken = async () => {
            try {
                console.log(history.location.pathname);
                const path = history.location.pathname;
                const tok = path.split('/');
                const Token = (tok[tok.length - 1]);
                setToken(Token);
                const data = await confirmTokenApi(Token);
                if (data.success) {
                    setVerified(true);
                    console.log('success');
                }
            }
            catch (err) {
                console.log('Verification Error', err);
            }
        }
        confirmToken();
        // eslint-disable-next-line
    }, [])

    const resetPassword = async () => {
        try {
            setErrors(initialErrors);
            const errors = passwordValidation(password);
            if (Object.keys(errors).length !== 0) {
                setErrors({ password: errors.password });
            } else {
                const body = JSON.stringify({ password });
                const data = await setChangePassword(token, body);
                if (data.errors) {
                    setErrors({ password: data.errors.password });
                }
                else if (data.success) {
                    alert('Password Changed Successfully');
                    setChanged(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!changed) {
        if (!verified)
            return <LoadingPage message="Verifying..." spinner={true} />;
        if (verified)
            return (
                <div className="container my-auto justify-content-center">
                    <div className="border border-2 border-dark p-5">
                        <form>
                            New Password
                            <input type="text" autoComplete="off" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <p className="fs-6 alert-danger">{errors.password}</p>
                        </form>
                        <div className="d-flex justify-content-between">
                            <button onClick={() => history.replace('/')} className="btn btn-danger">Cancel</button>
                            <button onClick={resetPassword} className="btn btn-success">Confirm</button>
                        </div>
                    </div>
                </div>
            );
    }
    if (changed)
        return (
            <div className="container my-auto text-center">
                <p>Password Changed Successfully</p>
                <button className="btn btn-primary" onClick={() => history.replace('/dashboard')}>Go to Home</button>
            </div>
        );
}

export default ChangePassword
