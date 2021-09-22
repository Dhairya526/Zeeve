const form = document.getElementById("loginForm");

const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";

    const userType = form.type.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log("from login page", userType, email, password);
    try {
        const response = await fetch("login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userType, email, password }),
        });

        const data = await response.json();
        if (data.errors) {
            console.log(data.errors);
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
