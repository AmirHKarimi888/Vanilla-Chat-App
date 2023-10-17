import { uri } from "../../api"

let initUsersRes = await fetch(uri + "/users");
let users = await initUsersRes.json();

let loggedInUser = users.filter((user) => {
    if(user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
        return user;
    }
})

loggedInUser = loggedInUser[0];

export const Header = `
<header>
    <div class="fixed top-0 left-0 w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 ">
        <nav
        class="bg-blue-500 text-white p-3 border-b border-gray-400 flex grid-cols-2 justify-center items-center shadow-md shadow-gray-300 lg:col-span-1 md:col-span-1 sm:col-span-1 max-sm:w-full">
        <button id="sidebarToggleBtn" class="w-[50px] aspect-square text-xl">
            <i class="fa fa-bars"></i>
        </button>
        <div class="flex grid-cols-1 w-full justify-center items-center">
            <input type="text" id="searchInput"
                class="h-2/3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Search For Users">
            <button id="searchBtn" class="w-[50px] aspect-square text-xl">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </nav>
    </div>


    <div class="backdrop hidden fixed top-0 left-0 z-50 w-full h-screen backdrop-blur-md">
        <div id="sidebar" class="fixed top-0 left-0 w-[300px] h-screen bg-gray-200 border-r border-gray-400">
            <div class="border-b border-gray-400">
                <img src="${loggedInUser?.avatar}" alt=""
                    class="mx-auto text-center w-[50px] aspect-square rounded-full mt-5">
                <p class="text-center my-2">${loggedInUser?.username}</p>
                <p class="text-center my-2 text-sm">${loggedInUser?.email}</p>
            </div>
            <ul class="w-full">
                <li id="logout" class="p-3 text-center border-b border-t border-gray-400 cursor-pointer">
                    Log Out <i class="fa fa-logout-o"></i>
                </li>
            </ul>
        </div>
    </div>
</header>
`

export { loggedInUser };