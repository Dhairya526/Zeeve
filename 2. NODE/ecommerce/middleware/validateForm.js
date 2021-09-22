const validateForm = (req, res, next) => {
    if (req.url === '/signup') {

        console.log(req.url, 'signup');
        const nameRegex = /^[a-zA-Z]{1,15}$/;

        const { userType, fName, lName, email, password } = req.body;
        console.log('In validate function', userType, fName, lName, email, password);
        let errors = {};

        if (fName == '')
            errors.fname = 'First name cannot be empty';
        else if (!nameRegex.test(fName))
            errors.fname = 'Enter valid name';
        else if (fName.length > 15)
            errors.fname = 'First name can have maximum of 15 characters';

        if (lName == '')
            errors.lname = 'Last name cannot be empty';
        else if (!nameRegex.test(lName))
            errors.lname = 'Enter valid name';
        else if (lName.length > 15)
            errors.lname = 'Last name can have maximum of 15 characters';

        if (email == '')
            errors.email = 'Email cannot be empty';
        else {
            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegexp.test(email))
                errors.email = 'Invalid email';
        }

        if (password == '')
            errors.password = 'Password cannot be empty';
        else if (password.length < 6)
            errors.password = 'Password should have minimum of 6 characters';
        else if (password.length > 15)
            errors.password = 'Password should have maximum of 15 characters';

        if (Object.keys(errors).length !== 0)
            res.json({ errors });
        else
            next();

    } else if (req.url === '/login') {

        console.log(req.url, 'login');

        const { userType, fName, lName, email, password } = req.body;
        console.log('In validate function', userType, fName, lName, email, password);
        let errors = {};

        if (email == '')
            errors.email = 'Email cannot be empty';
        else {
            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegexp.test(email))
                errors.email = 'Invalid email';
        }

        if (password == '')
            errors.password = 'Password cannot be empty';
        else if (password.length < 6)
            errors.password = 'Password should have minimum of 6 characters';
        else if (password.length > 15)
            errors.password = 'Password should have maximum of 15 characters';

        if (Object.keys(errors).length !== 0)
            res.json({ errors });
        else
            next();
    } else if (req.url === '/sellerDash/addProduct') {
        console.log(req.url, 'addProduct');
        next();
    }
}

module.exports = { validateForm };