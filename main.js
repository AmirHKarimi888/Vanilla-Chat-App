import './src/css/style.css'
import { Header } from './src/components/Header';
import { Body } from './src/components/Body';
import { uri } from './api';

if(localStorage.getItem("loggedInUser") != "") {
  document.querySelector("body").classList.add("overflow-y-hidden");
} else {
  document.querySelector("body").classList.remove("overflow-y-hidden");
}

const app = document.querySelector("#app");

app.insertAdjacentHTML("afterbegin", `
<div role="status" class="mx-auto text-center">
    <svg aria-hidden="true" class="inline w-8 h-8 mt-[300px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
`)

app.innerHTML = "";

app.insertAdjacentHTML("afterbegin", Body);
app.insertAdjacentHTML("afterbegin", Header);

//Sidebar backdrop toggle
const toggleBackdrop = () => {
  const backdrop = document.querySelector(".backdrop");
  
  if(backdrop.classList.contains("hidden")) {
    backdrop.classList.remove("hidden");
  } else {
    backdrop.classList.add("hidden");
  }
}


//Log Out Function
document.querySelector("#sidebarToggleBtn").addEventListener("click", toggleBackdrop);
document.querySelector("#sidebar").addEventListener("click", (event) => event.stopPropagation());
document.querySelector(".backdrop").addEventListener("click", toggleBackdrop);

document.querySelector("#logout").addEventListener("click", () => {
  localStorage.setItem("loggedInUser", "");
  console.log("Logout Successfully Done");
  setTimeout(() => window.location.href = "", 1000);
})


//Toggle between Signup page and Login page
const toggleSignupLogin = () => {
  const Signup = document.querySelector(".signup");
  const Login = document.querySelector(".login");

  if(Signup.classList.contains("hidden")) {
    Signup.classList.remove("hidden");
    Login.classList.add("hidden");
  } else if(Login.classList.contains("hidden")) {
    Signup.classList.add("hidden");
    Login.classList.remove("hidden");
  }
}

document.querySelector("#toggleSignup").addEventListener("click", toggleSignupLogin);
document.querySelector("#toggleLogin").addEventListener("click", toggleSignupLogin);



//Fetch users
const initUsersRes = await fetch(uri + "/users");
let usersData = await initUsersRes.json();

let users = usersData;

//File picker initialization
const client = filestack.init("AWOK4L9h4SROT147VanQQz");



//Signup system
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
    } else {
      console.log("Password is too short or password and repeat don't match.")
    }
  } else {
    console.log("User already exists!");
  }

})




//Login system
let loginEmailEl = document.querySelector("#loginEmail");
let loginPasswordEl = document.querySelector("#loginPassword");

let loginEmail = "";
let loginPassword = "";

loginEmailEl.addEventListener("change", (event) => {
  loginEmail = event.target.value;
})
loginPasswordEl.addEventListener("change", (event) => {
  loginPassword = event.target.value;
})

document.querySelector("#login").addEventListener("submit", (event) => {
  event.preventDefault();

  let foundUser = users.filter((user) => {
    if (user.email == loginEmail && user.password == loginPassword) {
      return user;
    } else {
      null;
    }
  })

  localStorage.setItem("loggedInUser", foundUser[0].uid);
  console.log("Login Successfully Done");
  setTimeout(() => window.location.href = "", 1000);
})

