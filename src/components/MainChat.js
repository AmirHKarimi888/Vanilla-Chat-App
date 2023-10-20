import { loggedInUser } from "./Header";

export const MainChat = 
`
<div class="mx-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
    <div class="chatList mt-[75px] h-screen max-sm:w-full overflow-y-scroll">
        <ul id="chatList" class="w-full mx-auto grid grid-cols-1">

        <div role="status" class="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div class="flex items-center justify-between">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
    <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
</div>
<div class="flex items-center justify-between pt-4">
<div>
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
</div>
<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
</div>
<div class="flex items-center justify-between pt-4">
<div>
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
</div>
<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
</div>
<div class="flex items-center justify-between pt-4">
<div>
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
</div>
<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
</div>
<div class="flex items-center justify-between pt-4">
<div>
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
</div>
<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
</div>
        <span class="sr-only">Loading...</span>
    </div>
    
        </ul>
    </div>

    <div class="chat h-screen lg:col-span-3 md:col-span-2 sm:col-span-1 max-sm:w-full lg:block overflow-y-scroll bg-cover bg-scroll bg-bottom bg-no-repeat shadow-lg max-sm:hidden"
    style="
    background-image: url('https://wallpapershome.com/images/pages/pic_h/24806.jpg');
  ">
    <div id="chatPreview" class="items-center mt-[270px]">
        <p class="p-2 rounded-full text-center mx-auto w-[300px] bg-cyan-300 text-sm">
            Select A Chat To Start Messageing
        </p>
    </div>

    <ul id="chat" class="p-3 mx-auto lg:w-[80%] md:w-[85%] sm:w-[90%] hidden">
        <nav
            class="fixed top-0 right-0 max-sm:mt-[0px] z-40 lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-blue-500 text-white p-3 border-b border-gray-400 flex justify-left items-center shadow-md shadow-gray-300 max-sm:shadow-none">
            <button id="backToContactsListBtn"
                class="w-[50px] aspect-square text-xl rounded-full focus:border sm:hidden md:hidden lg:hidden">
                <i class="fa fa-arrow-left"></i>
            </button>
            <button id="chatProfile" class="w-[50px] aspect-square text-xl ml-2">
                <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
            </button>
            <p class="text-xl text-right ml-3">${loggedInUser?.username}</p>
        </nav>

        <ul class="innerChat mt-[350px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
        
        </ul>

        <nav
            class="sending fixed bottom-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-1 border-b border-gray-400 flex justify-center items-center shadow-md shadow-gray-300">
            <div class="flex grid-cols-1 w-full justify-center">
                <input type="text" id="messageInput"
                    class="shadow-sm break-before-all bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Type your message" />
                <button id="sendBtn" class="w-[50px] aspect-square text-xl">
                    <i class="fa fa-send"></i>
                </button>
            </div>
        </nav>
    </ul>
</div>
</div>
`