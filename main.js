import './src/css/style.css'
import { Header } from './src/components/Header';
import { Body } from './src/components/Body';

document.querySelector("body").classList.add("overflow-y-hidden");

const app = document.querySelector("#app");

app.insertAdjacentHTML("afterbegin", Header);
app.insertAdjacentHTML("afterbegin", Body);