import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../provider/Store';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router';

function EditProfile() {
    const { userData, setUserData } = useContext(Store);
    const initialUser = { userType: '', fName: '', lName: '', email: '', verified: '' };
    const [user, setUser] = useState(initialUser);
    const history = useHistory();

    useEffect(() => {
        setUser(userData);
    }, [userData])

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const editProfile = () => {

    }
    return (
        <div className="profilePage">
            <Navbar />
            <div className="container-sm mt-5">
                <div className="row my-3">
                    <p className="col-4 text-end">First Name :</p>
                    <input type="text" className="col-6" name="fName" value={user.fName} onChange={handleChange} />
                </div>
                <div className="row my-3">
                    <p className="col-4 text-end">Last Name :</p>
                    <input type="text" className="col-6" name="lName" value={user.lName} onChange={handleChange} />
                </div>
                <div className="row my-3">
                    <p className="col-4 text-end">Email :</p>
                    <input type="text" className="col-6" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="mt-5 d-flex justify-content-evenly">
                    <button onClick={() => history.goBack()} className="btn btn-danger">Cancel</button>
                    <button onClick={() => setUser(userData)} className="btn btn-primary">Reset</button>
                    <button onClick={editProfile} className="btn btn-success">Save Changes</button>
                </div>
            </div>
        </div>
    )
}


export default EditProfile
