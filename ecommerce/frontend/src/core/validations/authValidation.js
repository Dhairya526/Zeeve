// eslint-disable-next-line 
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userNameRegex = /^[a-zA-Z]{1,15}$/;
const otpRegex = /^[1-9]\d{0,5}$/;

export const userLoginValidation = (email, password) => {
    const errors = {};

    if (email === '')
        errors.email = 'Email cannot be empty';
    else {
        if (!emailRegex.test(email))
            errors.email = 'Invalid email';
    }
    /**
     * Checking errors in password
     */
    if (password === '')
        errors.password = 'Password cannot be empty';
    else if (password.length < 6)
        errors.password = 'Password should have minimum of 6 characters';
    else if (password.length > 15)
        errors.password = 'Password should have maximum of 15 characters';

    return errors;
}

export const userRegisterValidation = (fName, lName, email, password) => {
    const errors = {};
    /**
     * Checking errors in first name
     */
    if (fName === '')
        errors.fName = 'First name cannot be empty';
    else if (!userNameRegex.test(fName))
        errors.fName = 'Enter valid name';
    else if (fName.length > 15)
        errors.fName = 'First name can have maximum of 15 characters';
    /**
     * Checking errors in last name
     */
    if (lName === '')
        errors.lName = 'Last name cannot be empty';
    else if (!userNameRegex.test(lName))
        errors.lName = 'Enter valid name';
    else if (lName.length > 15)
        errors.lName = 'Last name can have maximum of 15 characters';
    /**
     * Checking errors in email
     */
    if (email === '')
        errors.email = 'Email cannot be empty';
    else {
        if (!emailRegex.test(email))
            errors.email = 'Invalid email';
    }
    /**
     * Checking errors in password
     */
    if (password === '')
        errors.password = 'Password cannot be empty';
    else if (password.length < 6)
        errors.password = 'Password should have minimum of 6 characters';
    else if (password.length > 15)
        errors.password = 'Password should have maximum of 15 characters';

    return errors;
}

export const userUpdateValidation = (fName, lName, email) => {
    const errors = {};
    /**
     * Checking errors in first name
     */
    if (fName === '')
        errors.fName = 'First name cannot be empty';
    else if (!userNameRegex.test(fName))
        errors.fName = 'Enter valid name';
    else if (fName.length > 15)
        errors.fName = 'First name can have maximum of 15 characters';
    /**
     * Checking errors in last name
     */
    if (lName === '')
        errors.lName = 'Last name cannot be empty';
    else if (!userNameRegex.test(lName))
        errors.lName = 'Enter valid name';
    else if (lName.length > 15)
        errors.lName = 'Last name can have maximum of 15 characters';
    /**
     * Checking errors in email
     */
    if (email === '')
        errors.email = 'Email cannot be empty';
    else {
        if (!emailRegex.test(email))
            errors.email = 'Invalid email';
    }

    return errors;
}

export const otpValidation = (otp) => {
    const errors = {};
    /**
     * Checking errors in OTP
     */
    if (otp === '')
        errors.otp = 'OTP cannot be empty';
    else if (!otpRegex.test(otp))
        errors.otp = 'Invalid OTP';

    return errors;
}

export const passwordValidation = (password) => {
    const errors = {};
    /**
     * Checking errors in password
     */
    if (password === '')
        errors.password = 'Password cannot be empty';
    else if (password.length < 6)
        errors.password = 'Password should have minimum of 6 characters';
    else if (password.length > 15)
        errors.password = 'Password should have maximum of 15 characters';

    return errors;
}