export const Login =
`
<div class="fixed top-0 left-0 w-full">
<nav class="bg-blue-500 dark:bg-gray-800 dark:text-gray-100 mx-auto text-white p-6 border-b border-gray-400 flex grid-cols-2 justify-center items-center shadow-md shadow-gray-300 dark:shadow-none">
<div class="w-full">
  <p class="text-white text-xl">Amirgram</p>
</div>
</nav>
</div>

<div class="login hidden w-[330px] mx-auto">
    <form id="login" class="my-[200px] rounded-lg border border-gray-400 p-5">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                email</label>
            <input type="email" id="loginEmail"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com" required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                password</label>
            <input type="password" id="loginPassword"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required>
        </div>

        <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

        <div class="mb-6">
            <label class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Havn't you got any accounts? <p
                    id="toggleSignup" class="text-blue-500 cursor-pointer">Register</p></label>
        </div>
    </form>
</div>
`