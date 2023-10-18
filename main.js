import './src/css/style.css'
import { Header } from './src/components/Header';
import { Body } from './src/components/Body';
import { uri } from './api';

if (localStorage.getItem("loggedInUser") != "") {
  document.querySelector("body").classList.add("overflow-y-hidden");
} else {
  document.querySelector("body").classList.remove("overflow-y-hidden");
}

let secondPerson = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const app = document.querySelector("#app");

app.insertAdjacentHTML("afterbegin", Body);
app.insertAdjacentHTML("afterbegin", Header);

//Sidebar backdrop toggle
const toggleBackdrop = () => {
  const backdrop = document.querySelector(".backdrop");

  if (backdrop.classList.contains("hidden")) {
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



//Fetch users
const initUsersRes = await fetch(uri + "/users");
let usersData = await initUsersRes.json();

let users = usersData;

let loggedInUser = users.filter((user) => {
  if (user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
    return user;
  }
})

loggedInUser = loggedInUser[0];

//Fetch chats
const initChatsRes = await fetch(uri + "/chats");
let chatsData = await initChatsRes.json();

let chats = chatsData;





//Default user list rendering
const contactListItems = `
${loggedInUser?.contacts.map((user) => {
  return (
    `
        <li id="${user?.email}"
          class="userItem grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
          <img src="${user?.avatar}"
          alt="" class="ml-4 w-[50px] aspect-square rounded-full">
          <p class='text-xl max-sm:ml-[-30%]'>${user?.username}</p>
        </li>
      `
  )
}).join("")
  }
`

if (document.querySelector("#chatList")) {
  document.querySelector("#chatList").innerHTML = "";
  document.querySelector("#chatList").insertAdjacentHTML("afterbegin", contactListItems);
}



document.querySelectorAll(".userItem").forEach((el) => {
  el.addEventListener("click", async (event) => {


    secondPerson = users.filter((user) => {
      if (user.email == event.currentTarget.id) {
        return user;
      }
    })

    secondPerson = secondPerson[0];

    let newChat = {
      uid: loggedInUser.uid + secondPerson.uid,
      email: loggedInUser.email + "-" + secondPerson.email,
      name: loggedInUser.username + "-" + secondPerson.username,
      chats: []
    }

    let res = await fetch(uri + "/chats");
    chatsData = await res.json();

    chats = chatsData;

    let foundChat = chats.filter((chat) => {
      if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
        return chat;
      }
    })



    if (foundChat[0]?.uid != loggedInUser.uid + secondPerson.uid) {
      //Creating Chat 
      await fetch(uri + "/chats", {
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
        body: JSON.stringify(newChat), // body data type must match "Content-Type" header
      })
        .then(() => {
          console.log("Success");
        })
        .catch((err) => console.log(err.message))
    } else {


      let chatMessages = `
      <nav
      class="fixed top-0 right-0 max-sm:mt-[0px] z-40 lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-blue-500 text-white p-3 border-b border-gray-400 flex justify-left items-center shadow-md shadow-gray-300 max-sm:shadow-none">
      <button id="backToContactsListBtn"
          class="w-[50px] aspect-square text-xl rounded-full focus:border sm:hidden md:hidden lg:hidden">
          <i class="fa fa-arrow-left"></i>
      </button>
      <button id="chatProfile" class="w-[50px] aspect-square text-xl ml-2">
          <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
      </button>
      <p class="text-xl text-right ml-3">${secondPerson?.username}</p>
  </nav>

  <ul id="innerChat" class="mt-[350px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
      ${
        foundChat[0].chats?.map((chat) => {
          return(
            `
             ${
                chat?.author == loggedInUser?.email ? 
                `
                <li class="mr-[40%] flex grid-cols-2 justify-center items-center">
                <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                <div class="rounded-xl p-5 bg-cyan-500 break-all my-2">
                    <p>
                        ${chat?.content}
                    </p>
                </div>
               </li>
                ` :
                `
                <li class="ml-[40%] flex grid-cols-2 justify-center items-center">
                <div class="rounded-xl p-5 bg-white break-all my-2">
                    <p>${chat?.content}</p>
                </div>
                <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] ml-5 rounded-full" />
            </li>
                `
             }
            `
          )
        }).join("")
      }
    </ul>

      <nav
          class="fixed bottom-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-1 border-b border-gray-400 flex justify-center items-center shadow-md shadow-gray-300">
          <div class="flex grid-cols-1 w-full justify-center">
              <input type="text" id="messageInput"
                  class="shadow-sm break-before-all bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Type your message" />
              <button id="sendBtn" class="w-[50px] aspect-square text-xl">
                  <i class="fa fa-send"></i>
              </button>
          </div>
      </nav>
      `

      document.querySelector("#chat").innerHTML = "";
      document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);
    }

    if (document.querySelector(".chat").classList.contains("max-sm:hidden")) {
      document.querySelector(".chat").classList.remove("max-sm:hidden");
      document.querySelector(".chatList").classList.add("max-sm:hidden");
    } else {
      document.querySelector(".chat").classList.add("max-sm:hidden");
      document.querySelector(".chatList").classList.remove("max-sm:hidden");
    }

    if (document.querySelector("#chat").classList.contains("hidden")) {
      document.querySelector("#chat").classList.remove("hidden");
      document.querySelector("#chatPreview").classList.add("hidden");
    }

    document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
      document.querySelector("#chat").classList.add("hidden");
      document.querySelector("#chatPreview").classList.remove("hidden");

      document.querySelector(".chat").classList.add("max-sm:hidden");
      document.querySelector(".chatList").classList.remove("max-sm:hidden");
    })


    






    let messageInputEl = document.querySelector("#messageInput");
    let sendBtnEl = document.querySelector("#sendBtn");

    let messageInput = "";

    messageInputEl.addEventListener("change", (event) => {
      messageInput = event.target.value;
    })


    const postMessage = async () => {


      if (messageInput != "") {

        await fetch(uri + "/chats/" + foundChat[0]?.id, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            ...foundChat[0],
            chats: [
              ...foundChat[0]?.chats,
              {
                uid: foundChat[0]?.uid + Math.floor(Math.random() * 1000000000),
                created: today + " at " + formatAMPM(new Date()),
                edited: "",
                author: loggedInUser?.email,
                content: messageInput
              }
            ]
          }), // body data type must match "Content-Type" header
        })
          .then(async () => {
            let res = await fetch(uri + "/chats");
            chats = await res.json();

            foundChat = chats.filter((chat) => {
              if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
                return chat;
              }
            })
          })
          .then(() => {
            messageInputEl.value = "";
            messageInput = "";
          })
          .then(() => {
            let chatMessages = `
            <nav
            class="fixed top-0 right-0 max-sm:mt-[0px] z-40 lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-blue-500 text-white p-3 border-b border-gray-400 flex justify-left items-center shadow-md shadow-gray-300 max-sm:shadow-none">
            <button id="backToContactsListBtn"
                class="w-[50px] aspect-square text-xl rounded-full focus:border sm:hidden md:hidden lg:hidden">
                <i class="fa fa-arrow-left"></i>
            </button>
            <button id="chatProfile" class="w-[50px] aspect-square text-xl ml-2">
                <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
            </button>
            <p class="text-xl text-right ml-3">${secondPerson?.username}</p>
        </nav>
      
        <ul id="innerChat" class="mt-[350px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
            ${
              foundChat[0].chats?.map((chat) => {
                return(
                  `
                   ${
                      chat?.author == loggedInUser?.email ? 
                      `
                      <li class="mr-[40%] flex grid-cols-2 justify-center items-center">
                      <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                      <div class="rounded-xl p-5 bg-cyan-500 break-all my-2">
                          <p>
                              ${chat?.content}
                          </p>
                      </div>
                     </li>
                      ` :
                      `
                      <li class="ml-[40%] flex grid-cols-2 justify-center items-center">
                      <div class="rounded-xl p-5 bg-white break-all my-2">
                          <p>${chat?.content}</p>
                      </div>
                      <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] ml-5 rounded-full" />
                  </li>
                      `
                   }
                  `
                )
              }).join("")
            }
          </ul>
      
            <nav
                class="fixed bottom-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-1 border-b border-gray-400 flex justify-center items-center shadow-md shadow-gray-300">
                <div class="flex grid-cols-1 w-full justify-center">
                    <input type="text" id="messageInput"
                        class="shadow-sm break-before-all bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Type your message" />
                    <button id="sendBtn" class="w-[50px] aspect-square text-xl">
                        <i class="fa fa-send"></i>
                    </button>
                </div>
            </nav>
            `
      
            document.querySelector("#chat").innerHTML = "";
            document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);

            document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
              document.querySelector("#chat").classList.add("hidden");
              document.querySelector("#chatPreview").classList.remove("hidden");
        
              document.querySelector(".chat").classList.add("max-sm:hidden");
              document.querySelector(".chatList").classList.remove("max-sm:hidden");
            })
          })
      }
    }


  //   document.querySelector("#innerChat").addEventListener("click", async() => {
  //     let res = await fetch(uri + "/chats");
  //     chats = await res.json();

  //     foundChat = chats.filter((chat) => {
  //       if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
  //         return chat;
  //       }
  //     })

  //     let chatMessages = `
  //     <nav
  //     class="fixed top-0 right-0 max-sm:mt-[0px] z-40 lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-blue-500 text-white p-3 border-b border-gray-400 flex justify-left items-center shadow-md shadow-gray-300 max-sm:shadow-none">
  //     <button id="backToContactsListBtn"
  //         class="w-[50px] aspect-square text-xl rounded-full focus:border sm:hidden md:hidden lg:hidden">
  //         <i class="fa fa-arrow-left"></i>
  //     </button>
  //     <button id="chatProfile" class="w-[50px] aspect-square text-xl ml-2">
  //         <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
  //     </button>
  //     <p class="text-xl text-right ml-3">${secondPerson?.username}</p>
  // </nav>

  // <ul id="innerChat" class="mt-[350px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
  //     ${
  //       foundChat[0].chats?.map((chat) => {
  //         return(
  //           `
  //            ${
  //               chat?.author == loggedInUser?.email ? 
  //               `
  //               <li class="mr-[40%] flex grid-cols-2 justify-center items-center">
  //               <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
  //               <div class="rounded-xl p-5 bg-cyan-500 break-all my-2">
  //                   <p>
  //                       ${chat?.content}
  //                   </p>
  //               </div>
  //              </li>
  //               ` :
  //               `
  //               <li class="ml-[40%] flex grid-cols-2 justify-center items-center">
  //               <div class="rounded-xl p-5 bg-white break-all my-2">
  //                   <p>${chat?.content}</p>
  //               </div>
  //               <img src="${secondPerson?.avatar}" alt="" class="text-center w-[50px] h-[50px] ml-5 rounded-full" />
  //           </li>
  //               `
  //            }
  //           `
  //         )
  //       }).join("")
  //     }
  //   </ul>

  //     <nav
  //         class="fixed bottom-0 right-0 mt-[75px] lg:w-[75%] md:w-[66.67%] sm:w-[50%] max-sm:w-[100%] bg-gray-100 p-1 border-b border-gray-400 flex justify-center items-center shadow-md shadow-gray-300">
  //         <div class="flex grid-cols-1 w-full justify-center">
  //             <input type="text" id="messageInput"
  //                 class="shadow-sm break-before-all bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  //                 placeholder="Type your message" />
  //             <button id="sendBtn" class="w-[50px] aspect-square text-xl">
  //                 <i class="fa fa-send"></i>
  //             </button>
  //         </div>
  //     </nav>
  //     `

  //     document.querySelector("#chat").innerHTML = "";
  //     document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);

  //     document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
  //       document.querySelector("#chat").classList.add("hidden");
  //       document.querySelector("#chatPreview").classList.remove("hidden");
  
  //       document.querySelector(".chat").classList.add("max-sm:hidden");
  //       document.querySelector(".chatList").classList.remove("max-sm:hidden");
  //     })
  //   })


    sendBtnEl.addEventListener("click", postMessage);

    messageInputEl.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        postMessage();
      }
    })

  })
});










//Search system
let searchInputEl = document.querySelector("#searchInput");

let searchInput = "";

searchInputEl.addEventListener("change", async (event) => {
  searchInput = event.target.value;
  if (event.target.value == "") {

    let res = await fetch(uri + "/users");
    users = await res.json();

    loggedInUser = users.filter((user) => {
      if (user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
        return user;
      }
    })

    loggedInUser = loggedInUser[0];

    document.querySelector("#chatList").innerHTML = "";
    document.querySelector("#chatList").insertAdjacentHTML("afterbegin", contactListItems);
  }

  document.querySelectorAll(".userItem").forEach((el) => {
    el.addEventListener("click", async (event) => {
  
      secondPerson = users.filter((user) => {
        if (user.email == event.currentTarget.id) {
          return user;
        }
      })
  
      secondPerson = secondPerson[0];
  
      let newChat = {
        uid: loggedInUser.uid + secondPerson.uid,
        email: loggedInUser.email + "-" + secondPerson.email,
        name: loggedInUser.username + "-" + secondPerson.username,
        chats: []
      }
  
      let foundChat = chats.filter((chat) => {
        if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
          return chat;
        }
      })
  
      if (document.querySelector(".chat").classList.contains("max-sm:hidden")) {
        document.querySelector(".chat").classList.remove("max-sm:hidden");
        document.querySelector(".chatList").classList.add("max-sm:hidden");
      } else {
        document.querySelector(".chat").classList.add("max-sm:hidden");
        document.querySelector(".chatList").classList.remove("max-sm:hidden");
      }
  
      if (document.querySelector("#chat").classList.contains("hidden")) {
        document.querySelector("#chat").classList.remove("hidden");
        document.querySelector("#chatPreview").classList.add("hidden");
      }
  
      document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
        document.querySelector("#chat").classList.add("hidden");
        document.querySelector("#chatPreview").classList.remove("hidden");
  
        document.querySelector(".chat").classList.add("max-sm:hidden");
        document.querySelector(".chatList").classList.remove("max-sm:hidden");
      })
  
      if (foundChat[0]?.uid != loggedInUser.uid + secondPerson.uid) {
        //Creating Chat 
        await fetch(uri + "/chats", {
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
          body: JSON.stringify(newChat), // body data type must match "Content-Type" header
        })
          .then(() => {
            console.log("Success");
          })
          .catch((err) => console.log(err.message))
      }
  
  
  
      let messageInputEl = document.querySelector("#messageInput");
      let sendBtnEl = document.querySelector("#sendBtn");
  
      let messageInput = "";
  
      messageInputEl.addEventListener("change", (event) => {
        messageInput = event.target.value;
      })
  
      let postMessage = async () => {
  
  
        if (messageInput != "") {
  
          await fetch(uri + "/chats/" + foundChat[0]?.id, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
              ...foundChat[0],
              chats: [
                ...foundChat[0]?.chats,
                {
                  uid: foundChat[0]?.uid + Math.floor(Math.random() * 1000000000),
                  created: today + " at " + formatAMPM(new Date()),
                  edited: "",
                  author: loggedInUser?.email,
                  content: messageInput
                }
              ]
            }), // body data type must match "Content-Type" header
          })
            .then(async () => {
              let res = await fetch(uri + "/chats");
              chats = await res.json();
  
              foundChat = chats.filter((chat) => {
                if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
                  return chat;
                }
              })
            })
            .then(() => {
              messageInputEl.value = "";
              messageInput = "";
            })
        }
      }
  
      sendBtnEl.addEventListener("click", postMessage);
  
      messageInputEl.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
          postMessage();
        }
      })
  
    })
  });
})


const searchUser = async () => {
  if (searchInput == "") {
    let res = await fetch(uri + "/users");
    users = await res.json();

    loggedInUser = users.filter((user) => {
      if (user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
        return user;
      }
    })[0]

    document.querySelector("#chatList").innerHTML = "";
    document.querySelector("#chatList").insertAdjacentHTML("afterbegin", contactListItems);

    document.querySelectorAll(".userItem").forEach((el) => {
      el.addEventListener("click", async (event) => {
    
        secondPerson = users.filter((user) => {
          if (user.email == event.currentTarget.id) {
            return user;
          }
        })
    
        secondPerson = secondPerson[0];
    
        let newChat = {
          uid: loggedInUser.uid + secondPerson.uid,
          email: loggedInUser.email + "-" + secondPerson.email,
          name: loggedInUser.username + "-" + secondPerson.username,
          chats: []
        }
    
        let foundChat = chats.filter((chat) => {
          if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
            return chat;
          }
        })
    
        if (document.querySelector(".chat").classList.contains("max-sm:hidden")) {
          document.querySelector(".chat").classList.remove("max-sm:hidden");
          document.querySelector(".chatList").classList.add("max-sm:hidden");
        } else {
          document.querySelector(".chat").classList.add("max-sm:hidden");
          document.querySelector(".chatList").classList.remove("max-sm:hidden");
        }
    
        if (document.querySelector("#chat").classList.contains("hidden")) {
          document.querySelector("#chat").classList.remove("hidden");
          document.querySelector("#chatPreview").classList.add("hidden");
        }
    
        document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
          document.querySelector("#chat").classList.add("hidden");
          document.querySelector("#chatPreview").classList.remove("hidden");
    
          document.querySelector(".chat").classList.add("max-sm:hidden");
          document.querySelector(".chatList").classList.remove("max-sm:hidden");
        })
    
        if (foundChat[0]?.uid != loggedInUser.uid + secondPerson.uid) {
          //Creating Chat 
          await fetch(uri + "/chats", {
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
            body: JSON.stringify(newChat), // body data type must match "Content-Type" header
          })
            .then(() => {
              console.log("Success");
            })
            .catch((err) => console.log(err.message))
        }
    
    
    
        let messageInputEl = document.querySelector("#messageInput");
        let sendBtnEl = document.querySelector("#sendBtn");
    
        let messageInput = "";
    
        messageInputEl.addEventListener("change", (event) => {
          messageInput = event.target.value;
        })
    
        let postMessage = async () => {
    
    
          if (messageInput != "") {
    
            await fetch(uri + "/chats/" + foundChat[0]?.id, {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify({
                ...foundChat[0],
                chats: [
                  ...foundChat[0]?.chats,
                  {
                    uid: foundChat[0]?.uid + Math.floor(Math.random() * 1000000000),
                    created: today + " at " + formatAMPM(new Date()),
                    edited: "",
                    author: loggedInUser?.email,
                    content: messageInput
                  }
                ]
              }), // body data type must match "Content-Type" header
            })
              .then(async () => {
                let res = await fetch(uri + "/chats");
                chats = await res.json();
    
                foundChat = chats.filter((chat) => {
                  if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
                    return chat;
                  }
                })
              })
              .then(() => {
                messageInputEl.value = "";
                messageInput = "";
              })
          }
        }
    
        sendBtnEl.addEventListener("click", postMessage);
    
        messageInputEl.addEventListener("keyup", (event) => {
          if (event.key == "Enter") {
            postMessage();
          }
        })
    
      })
    });
    
  } else if (searchInput != "") {
    
    let foundUsers = users.filter((user) => {
      if (searchInput === "") {
        return null;
      } else if (user.username.includes(searchInput) || user.username.includes(searchInput.toUpperCase()) || user.username.includes(searchInput.toLowerCase()) || user.email.includes(searchInput) || user.email.includes(searchInput.toUpperCase()) || user.email.includes(searchInput.toLowerCase())) {
        return user;
      }
    })


    let searchListItems = `
    ${foundUsers.map((user) => {
      return (
        `
          <li id="${user?.email}"
            class="userItem grid grid-cols-2 cursor-pointer justify-center items-center p-3 border-b border-gray-200 hover:bg-gray-100 duration-300">
            <img src="${user?.avatar}"
            alt="" class="ml-4 w-[50px] aspect-square rounded-full">
            <p class='text-xl max-sm:ml-[-30%]'>${user?.username}</p>
          </li>
          `
      )
    }).join("")
      }
    `

    document.querySelector("#chatList").innerHTML = "";
    document.querySelector("#chatList").insertAdjacentHTML("afterbegin", searchListItems);


    
    //Create a chat and add that user to your and yourself to his/her contacts
    let res = await fetch(uri + "/chats");
    chats = await res.json();

    document.querySelectorAll(".userItem").forEach((el) => {
      el.addEventListener("click", async (event) => {

        secondPerson = users.filter((user) => {
          if (user.email == event.currentTarget.id) {
            return user;
          }
        })

        secondPerson = secondPerson[0];

        let newChat = {
          uid: loggedInUser.uid + secondPerson.uid,
          email: loggedInUser.email + "-" + secondPerson.email,
          name: loggedInUser.username + "-" + secondPerson.username,
          chats: []
        }

        let foundChat = chats.filter((chat) => {
          if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
            return chat;
          }
        })

        if (document.querySelector(".chat").classList.contains("max-sm:hidden")) {
          document.querySelector(".chat").classList.remove("max-sm:hidden");
          document.querySelector(".chatList").classList.add("max-sm:hidden");
        } else {
          document.querySelector(".chat").classList.add("max-sm:hidden");
          document.querySelector(".chatList").classList.remove("max-sm:hidden");
        }

        if (document.querySelector("#chat").classList.contains("hidden")) {
          document.querySelector("#chat").classList.remove("hidden");
          document.querySelector("#chatPreview").classList.add("hidden");
        }

        document.querySelector("#backToContactsListBtn").addEventListener("click", () => {
          document.querySelector("#chat").classList.add("hidden");
          document.querySelector("#chatPreview").classList.remove("hidden");

          document.querySelector(".chat").classList.add("max-sm:hidden");
          document.querySelector(".chatList").classList.remove("max-sm:hidden");
        })

        if (foundChat[0]?.uid != loggedInUser.uid + secondPerson.uid) {
          //Creating Chat 
          await fetch(uri + "/chats", {
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
            body: JSON.stringify(newChat), // body data type must match "Content-Type" header
          })
            .then(() => {
              console.log("Success");
            })
            .catch((err) => console.log(err.message))
        }



        let messageInputEl = document.querySelector("#messageInput");
        let sendBtnEl = document.querySelector("#sendBtn");

        let messageInput = "";

        messageInputEl.addEventListener("change", (event) => {
          messageInput = event.target.value;
        })

        let postMessage = async () => {

          //Add To Contacts
          let foundContact = loggedInUser?.contacts.filter((contact) => {
            if (contact.email == secondPerson?.email) {
              return contact;
            }
          })

          if (messageInput != "") {

            if (foundContact[0]?.email != secondPerson?.email) {
              await fetch(uri + "/users/" + loggedInUser?.id, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                  ...loggedInUser,
                  contacts: [
                    ...loggedInUser?.contacts,
                    {
                      date: today + " at " + formatAMPM(new Date()),
                      username: secondPerson?.username,
                      email: secondPerson?.email,
                      avatar: secondPerson?.avatar
                    }
                  ]
                }), // body data type must match "Content-Type" header
              })
                .then(async () => {
                  let res = await fetch(uri + "/users");
                  users = await res.json();

                  loggedInUser = users.filter((user) => {
                    if (user.uid == parseInt(localStorage.getItem("loggedInUser"))) {
                      return user;
                    }
                  })[0]

                })
            }


            await fetch(uri + "/chats/" + foundChat[0]?.id, {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify({
                ...foundChat[0],
                chats: [
                  ...foundChat[0]?.chats,
                  {
                    uid: foundChat[0]?.uid + Math.floor(Math.random() * 1000000000),
                    created: today + " at " + formatAMPM(new Date()),
                    edited: "",
                    author: loggedInUser?.email,
                    content: messageInput
                  }
                ]
              }), // body data type must match "Content-Type" header
            })
              .then(async () => {
                let res = await fetch(uri + "/chats");
                chats = await res.json();

                foundChat = chats.filter((chat) => {
                  if (chat?.uid == loggedInUser.uid + secondPerson.uid) {
                    return chat;
                  }
                })
              })
              .then(() => {
                messageInputEl.value = "";
                messageInput = "";
              })
          }
        }

        sendBtnEl.addEventListener("click", postMessage);

        messageInputEl.addEventListener("keyup", (event) => {
          if (event.key == "Enter") {
            postMessage();
          }
        })

      })
    });
  }
}

document.querySelector("#searchBtn").addEventListener("click", searchUser);
searchInputEl.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchUser();
  }
})






//Toggle between Signup page and Login page
const toggleSignupLogin = () => {
  const Signup = document.querySelector(".signup");
  const Login = document.querySelector(".login");

  if (Signup.classList.contains("hidden")) {
    Signup.classList.remove("hidden");
    Login.classList.add("hidden");
  } else if (Login.classList.contains("hidden")) {
    Signup.classList.add("hidden");
    Login.classList.remove("hidden");
  }
}

document.querySelector("#toggleSignup").addEventListener("click", toggleSignupLogin);
document.querySelector("#toggleLogin").addEventListener("click", toggleSignupLogin);




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


export { secondPerson }