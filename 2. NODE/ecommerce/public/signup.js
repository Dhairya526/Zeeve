const form = document.getElementById('signupForm');

const fNameError = document.querySelector('.fName.error');
const lNameError = document.querySelector('.lName.error');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    fNameError.textContent = '';
    lNameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    const userType = form.type.value;
    const fName = form.fName.value;
    const lName = form.lName.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log("from signup page", userType, fName, lName, email, password);
    try {
        const response = await fetch('signup', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ userType, fName, lName, email, password })
        });
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors);
            fNameError.textContent = data.errors.fname;
            lNameError.textContent = data.errors.lname;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        } else if (data.user.userType) {
            if (data.user.userType == '1')
                location.assign('/buyerDash');
            else if (data.user.userType == '2')
                location.assign('/sellerDash');
        }
    } catch (err) {
        alert(err);
    }
});