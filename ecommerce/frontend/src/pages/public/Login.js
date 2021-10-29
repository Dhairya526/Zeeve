import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginApi } from '../../core/services/api';
import { setAccessToken } from '../../core/utils/tokenHandler';
import { userLoginValidation } from '../../core/validations/authValidation';
import { connectSocket, Store } from '../../provider/Store';

function Login() {
    const history = useHistory();
    const { setUserData } = useContext(Store);
    const initialErrors = { login: "", email: "", password: "" };
    const [errors, setErrors] = useState(initialErrors);
    const [userType, setUserType] = useState('BUYER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const errors = userLoginValidation(email, password);
            if (Object.keys(errors).length !== 0) {
                setErrors({
                    email: errors.email,
                    password: errors.password,
                });
            } else {
                const body = JSON.stringify({ userType, email, password });
                const data = await loginApi(body);
                if (data.errors) {
                    console.log(data.errors);
                    setErrors({
                        login: data.errors.login,
                        email: data.errors.email,
                        password: data.errors.password,
                    });
                }
                else if (data.token) {
                    setAccessToken(data.token);
                    setUserData(data.user);
                    connectSocket();
                    history.push('/dashboard');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container w-50 border my-auto py-2">
            <div className="my-3 fs-5 alert-danger text-center">
                {errors.login}
            </div>
            <form>
                <div className="my-2 d-flex justify-content-evenly nav-tabs">
                    <div className={`py-2 form-check nav-link ${userType === 'BUYER' ? 'active' : ''}`} onClick={() => setUserType('BUYER')}>
                        <label className="px-5 pe-auto">Buyer</label>
                    </div>
                    <div className={`form-check nav-link ${userType === 'SELLER' ? 'active' : ''}`} onClick={() => setUserType('SELLER')}>
                        <label className="px-5 pe-auto">Seller</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <p className="fs-6 alert-danger">{errors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control border-none" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <p className="fs-6 alert-danger">{errors.password}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="ps-3">
                        <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                    </div>
                    <div className="pe-3">
                        Not Registered? <Link className="link-primary" to="/signup">Register Here</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
