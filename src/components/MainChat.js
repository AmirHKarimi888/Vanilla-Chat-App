import { loggedInUser } from "./Header";

export const MainChat = 
`
<div class="mx-auto w-full mt-[75px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
<div class="chatList h-screen max-sm:w-full overflow-y-scroll max-sm:hidden">
    <ul id="chatList" class="w-full mx-auto grid grid-cols-1">
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
        <li
            class="grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>hello</p>
        </li>
    </ul>
</div>

<div class="h-screen lg:col-span-3 md:col-span-2 sm:col-span-1 max-sm:w-full  lg:block overflow-y-scroll bg-cover bg-scroll bg-bottom bg-no-repeat shadow-lg"
    style="background-image:url('https://wallpapershome.com/images/pages/pic_h/24806.jpg');">
    <div id="chatPreview" class="items-center mt-[270px]">
        <p class="p-2 rounded-full text-center mx-auto w-[300px] bg-cyan-300 text-sm hidden">Select A Chat To
            Start Messageing</p>
    </div>

    <ul id="chat" class="p-3 mx-auto mt-[-270px] lg:w-[80%] md:w-[85%] sm:w-[90%]">
    <nav class="fixed top-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-3 border-b border-gray-400 flex justify-left items-center shadow-md shadow-gray-300">
    <button id="chatProfile" class="w-[50px] aspect-square text-xl">
    <img src="${loggedInUser?.avatar}" alt=""
    class="text-center w-[50px] h-[50px] mr-5 rounded-full">
    </button>
    <div class="flex grid-cols-1">
    
 </button>

 </div>
    <p class='text-xl text-right ml-3'>${loggedInUser?.username}</p>
</nav>

<ul class="mt-[75px] mb-[140px] max-sm:mb-[200px]">
<li class="mr-[40%] flex grid-cols-2 justify-center items-center">
<img src="${loggedInUser?.avatar}" alt=""
class="text-center w-[50px] h-[50px] mr-5 rounded-full">
    <div class="rounded-xl p-5 bg-cyan-500 break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaahjgjbjbjbjbjbjjjjbjbjbjjbjaaaaaaaaaaaaaaaaaa</p>
    </div>
</li>
<li class="ml-[40%] flex grid-cols-2 justify-center items-center">
    <div class="rounded-xl p-5 bg-white break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalativeaaaa</p>
    </div>
    <img src="${loggedInUser?.avatar}" alt=""
    class="text-center w-[50px] h-[50px] ml-5 rounded-full">
</li>
<li class="mr-[40%] flex grid-cols-2 justify-center items-center">
<img src="${loggedInUser?.avatar}" alt=""
class="text-center w-[50px] h-[50px] mr-5 rounded-full">
    <div class="rounded-xl p-5 bg-cyan-500 break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaahjgjbjbjbjbjbjjjjbjbjbjjbjaaaaaaaaaaaaaaaaaa</p>
    </div>
</li>
<li class="ml-[40%] flex grid-cols-2 justify-center items-center">
    <div class="rounded-xl p-5 bg-white break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalativeaaaa</p>
    </div>
    <img src="${loggedInUser?.avatar}" alt=""
    class="text-center w-[50px] h-[50px] ml-5 rounded-full">
</li>
<li class="mr-[40%] flex grid-cols-2 justify-center items-center">
<img src="${loggedInUser?.avatar}" alt=""
class="text-center w-[50px] h-[50px] mr-5 rounded-full">
    <div class="rounded-xl p-5 bg-cyan-500 break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaahjgjbjbjbjbjbjjjjbjbjbjjbjaaaaaaaaaaaaaaaaaa</p>
    </div>
</li>
<li class="ml-[40%] flex grid-cols-2 justify-center items-center">
    <div class="rounded-xl p-5 bg-white break-all my-2 ">
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalativeaaaa</p>
    </div>
    <img src="${loggedInUser?.avatar}" alt=""
    class="text-center w-[50px] h-[50px] ml-5 rounded-full">
</li>
</ul>

        <nav class="fixed bottom-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-1 border-b border-gray-400 flex justify-center items-center shadow-md shadow-gray-300">
        <div class="flex grid-cols-1 w-full justify-center">
     <input type="text" id="messageInput"
         class="shadow-sm break-before-all bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
         placeholder="Type your message">
         <button id="sendBtn" class="w-[50px] aspect-square text-xl">
         <i class="fa fa-send"></i>
     </button>
     </div>
    
     </div>
        <p class='text-xl text-right ml-3'>${loggedInUser?.username}</p>
    </nav>
    </ul>
</div>
</div>
`