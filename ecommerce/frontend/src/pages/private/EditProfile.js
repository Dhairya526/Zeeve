import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../provider/Store';
import Navbar from '../../components/header/Navbar';
import { useHistory } from 'react-router';
import { userUpdateValidation } from '../../core/validations/authValidation';
import { modifyUserApi } from '../../core/services/api';
import { getUserIdFromToken } from '../../core/utils/tokenHandler';

function EditProfile() {
    const { userData, setUserData } = useContext(Store);
    const initialUser = { userType: '', fName: '', lName: '', email: '', verified: '' };
    const initialErrors = { fName: "", lName: "", email: "" };
    const [errors, setErrors] = useState(initialErrors);
    const [user, setUser] = useState(initialUser);
    const [changed, setChanged] = useState(false);
    const userId = getUserIdFromToken();
    const history = useHistory();

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    useEffect(() => {
        if (JSON.stringify(user) !== JSON.stringify(userData))
            setChanged(true);
        else
            setChanged(false)
        // eslint-disable-next-line    
    }, [user]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const editProfile = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const { fName, lName, email } = user;
            const errors = userUpdateValidation(fName, lName, email);
            if (Object.keys(errors).length !== 0) {
                setErrors({
                    fName: errors.fName,
                    lName: errors.lName,
                    email: errors.email,
                });
            } else {
                const body = JSON.stringify({ fName, lName, email });
                const data = await modifyUserApi(userId, body);
                if (data.errors) {
                    setErrors({
                        fName: data.errors.fName,
                        lName: data.errors.lName,
                        email: data.errors.email,
                    });
                    if (data.errors.user)
                        alert(data.errors.user);
                }
                else if (data.success) {
                    alert('User Details Modified Successfully');
                    setUserData(user);
                    history.replace('/profile');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="profilePage">
            <Navbar />
            <div className="container-sm mt-5">
                <h1 className="text-center">Edit User Details</h1>
                <form className="border border-3 border-dark p-3">
                    <div className="mb-3">
                        <label htmlFor="fName" className="form-label">First Name</label>
                        <input type="text" className="form-control" name="fName" value={user.fName} onChange={handleChange} />
                        <p className="fs-6 alert-danger">{errors.fName}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lName" value={user.lName} onChange={handleChange} />
                        <p className="fs-6 alert-danger">{errors.lName}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
                        <p className="fs-6 alert-danger">{errors.email}</p>
                    </div>
                </form>
                <p className="text-danger">NOTE: You will have to verify your email again if you make changes.</p>
                <div className="mt-5 d-flex justify-content-evenly">
                    <button onClick={() => history.goBack()} className="btn btn-danger">Cancel</button>
                    <button onClick={() => { setUser(userData); setChanged(false); }} className="btn btn-primary">Reset</button>
                    <button disabled={!changed} onClick={editProfile} className="btn btn-success">Save Changes</button>
                </div>
            </div>
        </div>
    )
}


export default EditProfile
