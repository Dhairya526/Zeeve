import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/config';
import { fetchApi } from '../../core/services/api';

function Signup() {
    const initialErrors = {
        fName: "",
        lName: "",
        email: "",
        password: "",
    }
    const [userType, setUserType] = useState('BUYER');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(initialErrors);
    const registerUser = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const body = JSON.stringify({ userType, fName, lName, email, password });
            const response = await fetchApi(config.authApi + '/signup', "POST", body);
            const data = await response.json();
            if (data.errors) {
                console.log(data.errors);
                setErrors({
                    fName: data.errors.fName,
                    lName: data.errors.lName,
                    email: data.errors.email,
                    password: data.errors.password,
                });
            }
            else if (data.user.userType) {
                // if (data.user.userType == 'BUYER')
                //     location.assign('/buyerDash');
                // else if (data.user.userType == 'SELLER')
                //     location.assign('/sellerDash');
                console.log('registered');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container w-50 border my-auto py-2">
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
                    <label htmlFor="fName" className="form-label">First Name</label>
                    <input type="text" name="fName" className="form-control" value={fName} onChange={(e) => { setFName(e.target.value) }} />
                    <p className="fs-6 alert-danger ">{errors.fName}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="lName" className="form-label">Last Name</label>
                    <input type="text" name="lName" className="form-control" value={lName} onChange={(e) => { setLName(e.target.value) }} />
                    <p className="fs-6 alert-danger ">{errors.lName}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <p className="fs-6 alert-danger">{errors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <p className="fs-6 alert-danger ">{errors.password}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="ps-3">
                        <button type="submit" className="btn btn-primary text-center" onClick={registerUser}>Register</button>
                    </div>
                    <div className="pe-2">
                        Already registered! <Link to='/' className="link-primary">Login Here</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;
