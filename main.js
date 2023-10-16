import './src/css/style.css'
import { Header } from './src/components/Header';
import { Body } from './src/components/Body';
import { uri } from './api';

document.querySelector("body").classList.add("overflow-y-hidden");

const app = document.querySelector("#app");

app.insertAdjacentHTML("afterbegin", Header);
app.insertAdjacentHTML("afterbegin", Body);

const initUsersRes = await fetch(uri + "/users");
let usersData = await initUsersRes.json();

let users = usersData;

const client = filestack.init("AWOK4L9h4SROT147VanQQz");

let signupUsernameEl = document.querySelector("#signupUsername");
let signupEmailEl = document.querySelector("#signupEmail");
let signupPasswordEl = document.querySelector("#signupPassword");
let signupRepeatPasswordEl = document.querySelector("#signupRepeatPassword");

let signupUsername = "";
let signupEmail = "";
let signupPassword = "";
let signupRepeatPassword = "";
let signupProfileUrl = "";

signupUsernameEl.addEventListener("change", (event) => {
  signupUsername = event.target.value;
})
signupEmailEl.addEventListener("change", (event) => {
  signupEmail = event.target.value;
})
signupPasswordEl.addEventListener("change", (event) => {
  signupPassword = event.target.value;
})
signupRepeatPasswordEl.addEventListener("change", (event) => {
  signupRepeatPassword = event.target.value;
})

const options = {
  transformations: {
    crop: false,
    circle: true,
    rotate: true
  },
  onUploadDone: async (data) => {
    signupProfileUrl = data.filesUploaded[0].url;
  }
};
document.querySelector("#profileUploader").addEventListener("click", () => {
  client.picker(options).open();
})

document.querySelector("#signup").addEventListener("submit", async (event) => {
  event.preventDefault();
  const newUser = {
    uid: Math.floor(Math.random() * 10000000000000),
    username: signupUsername,
    email: signupEmail,
    password: signupPassword,
    avatar: signupProfileUrl,
    isAdmin: false,
    contacts: [],
    chatList: []
  }

  let foundUser = users.filter((user) => {
    if (user.email == signupEmail) {
      return user;
    } else {
      null;
    }
  })

  if (foundUser[0]?.email != signupEmail) {
    if (signupPassword == signupRepeatPassword && signupPassword.length > 5) {
      await fetch(uri + "/users", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newUser), // body data type must match "Content-Type" header
      })
        .then(() => {
          console.log("Success");
          localStorage.setItem("loggedInUser", newUser.uid);
          setTimeout(() => window.location.href = "/", 1000);
        })
        .catch((err) => console.log(err.message))
    }
  } else {
    console.log(false);
  }

})

