import { Login } from "./Login";
import { MainChat } from "./MainChat";
import { Signup } from "./Signup";

if("loggedInUser" in localStorage) {

} else {
    localStorage.setItem("loggedInUser", "");
}

export const Body = `
<main>
    ${
        localStorage.getItem("loggedInUser") == "" ? Signup + Login : MainChat
    }
</main>
`