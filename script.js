const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const emailInput = document.querySelector("#email");
const emailInputLogin = document.querySelector("#emailLogin");
const passwordInput = document.querySelector("#password");
const passwordInputLogin = document.querySelector("#passwordLogin");
const msg = document.querySelector("#msg");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    name: nameInput.value,
    number: numberInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    msg: "",
  };

  if (
    user.name === "" ||
    user.number === "" ||
    user.email === "" ||
    user.password === ""
  ) {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields.";
    user.msg = "Please enter all fields.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else if (!validateEmail(user.email)) {
    msg.classList.add("error");
    msg.innerHTML = "Email is invalid.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else {
    msg.classList.add("success");
    msg.innerHTML = "Successfully created an account!";
    user.msg = "Successfully created an account!";

    const userJSON = JSON.stringify(user);

    localStorage.setItem("user", userJSON);

    const token = Math.random() * 100000000000000000;

    localStorage.setItem("token", token);

    console.log(userJSON);

    setTimeout(() => {
      msg.classList.remove("success");
      msg.innerHTML = "";
      window.location.href = "/login.html";
    }, 3000);

    myForm.removeEventListener("submit", () => {
      console.log("Submit event listener removed");
    });
  }
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const getUserItem = localStorage.getItem("user");

  const getUser = JSON.parse(getUserItem);

  const user = {
    email: emailInputLogin.value,
    password: passwordInputLogin.value,
    msg: "",
  };

  if (user.email === "" || user.password === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please fill up all fields.";
    user.msg = "Please fill up all fields.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else if (!getUser) {
    msg.classList.add("error");
    msg.innerHTML = "This user does not exist.";
    user.msg = "This user does not exist.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else if (user.email !== getUser.email) {
    msg.classList.add("error");
    msg.innerHTML = "This email does not exist.";
    user.msg = "This email does not exist.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else if (user.password !== getUser.password) {
    msg.classList.add("error");
    msg.innerHTML = "Password is incorrect.";
    user.msg = "Password is incorrect.";

    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else {
    msg.classList.add("success");
    msg.innerHTML = "You are logged in!";
    user.msg = "You are logged in!";

    setTimeout(() => {
      msg.classList.remove("success");
      msg.innerHTML = "";
      const getUserToken = localStorage.getItem("token");
      sessionStorage.setItem("firstLogin", getUserToken);
      window.location.href = "/dashboard.html";
    }, 3000);
  }
});
