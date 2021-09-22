const form = document.getElementById("addProduct");

const categoryError = document.querySelector(".select.error");
const nameError = document.querySelector(".name.error");
const priceError = document.querySelector(".price.error");
const quantityError = document.querySelector(".quantity.error");
const descriptionError = document.querySelector(".description.error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    categoryError.textContent = "";
    nameError.textContent = "";
    priceError.textContent = "";
    quantityError.textContent = "";
    descriptionError.textContent = "";

    const category= form.category.value;
    const name= form.name.value;
    const price= form.price.value;
    const quantity= form.quantity.value;
    const description= form.description.value;
    console.log("From add product", category, name, price, quantity, description);
    try {
        const response = await fetch("/sellerDash/addProduct", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ category, name, price, quantity, description }),
        });

        // const data = await response.json();
        // if (data.errors) {
        //     console.log(data.errors);
        //     emailError.textContent = data.errors.email;
        //     passwordError.textContent = data.errors.password;
        // } else if (data.user.userType) {
        //     if (data.user.userType == '1')
        //         location.assign('/buyerDash');
        //     else if (data.user.userType == '2')
        //         location.assign('/sellerDash');
        // }
    } catch (err) {
        alert(err);
    }
});
