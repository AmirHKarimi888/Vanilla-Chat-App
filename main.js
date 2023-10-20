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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

let contactListItems = `
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

const listItemClicked = async (event) => {
  
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
  })[0]


  let selectedMessage = {};

  const preUpdating = async () => {
    let wholeChatSection = document.querySelector(".chat");

    const updateMessages = async () => {
      await fetch(uri + "/chats/" + foundChat?.id)
      .then(res => res.json())
      .then(data => foundChat = data)
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
  
    <ul id="innerChat" class="mt-[100px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
        ${foundChat.chats?.map((chat) => {
          return (
            `
               ${chat?.author == loggedInUser?.email ?
              `
                  <li id="${chat?.uid}" class="messageItem mr-[30%] flex grid-cols-2 justify-center items-center">
                  <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                  <div class="rounded-xl p-5 bg-cyan-500 my-2">
                      <p>
                          ${chat?.content}
                      </p>
                  </div>
                  <button class="text-center w-[25px] h-[25px] bg-cyan-600 text-gray-200 ml-2 rounded-full"><i class="fa fa-trash"></i></button>
                 </li>
                  ` :
              `
                  <li class="ml-[30%] flex grid-cols-2 justify-center items-center">
                  <div class="rounded-xl p-5 bg-white my-2">
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
        `

        document.querySelector("#chat").innerHTML = "";
        document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);
      })
      .then(() => {
        preSending();
      })
      .then(() => {
        preDeleting();
      })
      .then(() => {
        preUpdating();
      })
      .then(() => {
        document.querySelector("#backToContactsListBtn").addEventListener("click", async (event) => {
          event.stopPropagation();
          document.querySelector("#chat").classList.add("hidden");
          document.querySelector("#chatPreview").classList.remove("hidden");
      
          document.querySelector(".chat").classList.add("max-sm:hidden");
          document.querySelector(".chatList").classList.remove("max-sm:hidden");
        })

        document.querySelector("#backToContactsListBtn").addEventListener("touchmove", async (event) => {
          event.stopPropagation();
        })
      })
    }

    wholeChatSection.addEventListener("click", () => updateMessages());
    //wholeChatSection.addEventListener("touchmove", () => updateMessages());
  }

  const preDeleting = async () => {
    let deleteBtnEl = document.querySelectorAll(".messageItem");

    const deleteMessage = async (el) => {

      await fetch(uri + "/chats/" + foundChat?.id)
        .then(res => res.json())
        .then(data => foundChat = data)
        .then(async () => {
          selectedMessage = foundChat?.chats.filter((chat) => {
            if(chat.uid == parseInt(el.id) && chat.author == loggedInUser?.email) {
              return chat;
            }
          })[0]
    
          foundChat.chats = foundChat?.chats.filter((chat) => {
            if (chat.uid != parseInt(el.id)) {
              return chat;
            }
          })
        })
        .then(async () => {
          if(selectedMessage?.uid == parseInt(el.id)) {
            await fetch(uri + "/chats/" + foundChat?.id, {
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
              body: JSON.stringify(foundChat), // body data type must match "Content-Type" header
            })
          }
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
    
      <ul id="innerChat" class="mt-[100px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
          ${foundChat.chats?.map((chat) => {
            return (
              `
                 ${chat?.author == loggedInUser?.email ?
                `
                    <li id="${chat?.uid}" class="messageItem mr-[30%] flex grid-cols-2 justify-center items-center">
                    <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                    <div class="rounded-xl p-5 bg-cyan-500 my-2">
                        <p>
                            ${chat?.content}
                        </p>
                    </div>
                    <button class="text-center w-[25px] h-[25px] bg-cyan-600 text-gray-200 ml-2 rounded-full"><i class="fa fa-trash"></i></button>
                   </li>
                    ` :
                `
                    <li class="ml-[30%] flex grid-cols-2 justify-center items-center">
                    <div class="rounded-xl p-5 bg-white my-2">
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
          `
  
          document.querySelector("#chat").innerHTML = "";
          document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);
        })
        .then(() => {
          preSending();
        })
        .then(() => {
          preDeleting();
        })
        .then(() => {
          preUpdating();
        })
        .then(() => {
          document.querySelector("#backToContactsListBtn").addEventListener("click", async (event) => {
            event.stopPropagation();
            document.querySelector("#chat").classList.add("hidden");
            document.querySelector("#chatPreview").classList.remove("hidden");
        
            document.querySelector(".chat").classList.add("max-sm:hidden");
            document.querySelector(".chatList").classList.remove("max-sm:hidden");
          })

          document.querySelector("#backToContactsListBtn").addEventListener("touchmove", async (event) => {
            event.stopPropagation();
          })
        })
    
    }

    deleteBtnEl.forEach((el) => {
      el.children[2]?.addEventListener("click", async (event) => {
        event.stopPropagation();
        deleteMessage(el);
      })
    })
  }


  const preSending = async () => {
    let messageInputEl = document.querySelector("#messageInput");
    let sendBtnEl = document.querySelector("#sendBtn");

    let messageInput = "";

    messageInputEl.addEventListener("change", (event) => {
      messageInput = event.target.value;
    })


    const postMessage = async () => {

      if (messageInput != "") {
        let res = await fetch(uri + "/users/" + loggedInUser?.id);
        loggedInUser = await res.json();

        let foundContact = loggedInUser?.contacts.filter((contact) => {
          if (contact.uid == secondPerson?.uid + loggedInUser?.uid) {
            return contact;
          }
        })[0]

        const finishSending = async () => {
          await fetch(uri + "/chats/" + foundChat?.id, {
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
              ...foundChat,
              chats: [
                ...foundChat?.chats,
                {
                  uid: foundChat?.uid + Math.floor(Math.random() * 1000000000),
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
              })[0]
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
        
          <ul id="innerChat" class="mt-[100px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
              ${foundChat.chats?.map((chat) => {
                return (
                  `
                     ${chat?.author == loggedInUser?.email ?
                    `
                        <li id="${chat?.uid}" class="messageItem mr-[30%] flex grid-cols-2 justify-center items-center">
                        <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                        <div class="rounded-xl p-5 bg-cyan-500 my-2">
                            <p>
                                ${chat?.content}
                            </p>
                        </div>
                        <button class="text-center w-[25px] h-[25px] bg-cyan-600 text-gray-200 ml-2 rounded-full"><i class="fa fa-trash"></i></button>
                       </li>
                        ` :
                    `
                        <li class="ml-[30%] flex grid-cols-2 justify-center items-center">
                        <div class="rounded-xl p-5 bg-white my-2">
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
              `

              document.querySelector("#chat").innerHTML = "";
              document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);

              document.querySelector("#backToContactsListBtn").addEventListener("click", (event) => {
                event.stopPropagation();
                document.querySelector("#chat").classList.add("hidden");
                document.querySelector("#chatPreview").classList.remove("hidden");

                document.querySelector(".chat").classList.add("max-sm:hidden");
                document.querySelector(".chatList").classList.remove("max-sm:hidden");
              })

              document.querySelector("#backToContactsListBtn").addEventListener("touchmove", async (event) => {
                event.stopPropagation();
              })
            })
            .then(() => {
              preDeleting();
            })
            .then(() => {
              preSending();
            })
            .then(() => {
              preUpdating();
            })
            .then(() => {
              messageInputEl.value = "";
              messageInput = "";
            })
        }

        if (foundContact?.uid == secondPerson?.uid + loggedInUser?.uid) {
          finishSending();
        } else {
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
                  uid: secondPerson?.uid + loggedInUser?.uid,
                  date: today + " at " + formatAMPM(new Date()),
                  username: secondPerson?.username,
                  email: secondPerson?.email,
                  avatar: secondPerson?.avatar
                }
              ]
            }), // body data type must match "Content-Type" header
          })
            .then(async () => {
              let res = await fetch(uri + "/users/" + secondPerson?.id);
              secondPerson = await res.json();

              let secondPersonFoundContact = secondPerson?.contacts.filter((contact) => {
                if (contact.uid == secondPerson?.uid + loggedInUser?.uid) {
                  return contact;
                }
              })[0]

              if (secondPersonFoundContact?.uid != secondPerson?.uid + loggedInUser?.uid) {
                await fetch(uri + "/users/" + secondPerson?.id, {
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
                    ...secondPerson,
                    contacts: [
                      ...secondPerson?.contacts,
                      {
                        uid: loggedInUser?.uid + secondPerson?.uid,
                        date: today + " at " + formatAMPM(new Date()),
                        username: loggedInUser?.username,
                        email: loggedInUser?.email,
                        avatar: loggedInUser?.avatar
                      }
                    ]
                  }), // body data type must match "Content-Type" header
                })
              }
            })
            .then(() => {
              finishSending();
            })
        }
      }
    }


    sendBtnEl.addEventListener("click", async (event) => {
      event.stopPropagation();
      postMessage()
    });
    messageInputEl.addEventListener("keyup", (event) => {
      event.stopPropagation();
      if (event.key == "Enter") {
        postMessage();
      }
    })
    
    document.querySelector(".sending").addEventListener("click", (event) => {
      event.stopPropagation();
    })

    document.querySelector(".sending").addEventListener("touchmove", (event) => {
      event.stopPropagation();
    })
  }

  

  if (foundChat?.uid != loggedInUser.uid + secondPerson.uid) {
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
  
    <ul id="innerChat" class="mt-[100px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
        ${foundChat.chats?.map((chat) => {
          return (
            `
               ${chat?.author == loggedInUser?.email ?
              `
                  <li id="${chat?.uid}" class="messageItem mr-[30%] flex grid-cols-2 justify-center items-center">
                  <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
                  <div class="rounded-xl p-5 bg-cyan-500 my-2">
                      <p>
                          ${chat?.content}
                      </p>
                  </div>
                  <button class="text-center w-[25px] h-[25px] bg-cyan-600 text-gray-200 ml-2 rounded-full"><i class="fa fa-trash"></i></button>
                 </li>
                  ` :
              `
                  <li class="ml-[30%] flex grid-cols-2 justify-center items-center">
                  <div class="rounded-xl p-5 bg-white my-2">
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
        `

        document.querySelector("#chat").innerHTML = "";
        document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);
      })
      .then(() => {
        preSending();
      })
      .then(() => {
        preDeleting();
      })
      .then(() => {
        preUpdating();
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

<ul id="innerChat" class="mt-[100px] lg:mb-[140px] md:mb-[140px] sm:mb-[140px] max-sm:mb-[180px]">
    ${foundChat.chats?.map((chat) => {
      return (
        `
           ${chat?.author == loggedInUser?.email ?
          `
              <li id="${chat?.uid}" class="messageItem mr-[30%] flex grid-cols-2 justify-center items-center">
              <img src="${loggedInUser?.avatar}" alt="" class="text-center w-[50px] h-[50px] mr-5 rounded-full" />
              <div class="rounded-xl p-5 bg-cyan-500 my-2">
                  <p>
                      ${chat?.content}
                  </p>
              </div>
              <button class="text-center w-[25px] h-[25px] bg-cyan-600 text-gray-200 ml-2 rounded-full"><i class="fa fa-trash"></i></button>
             </li>
              ` :
          `
              <li class="ml-[30%] flex grid-cols-2 justify-center items-center">
              <div class="rounded-xl p-5 bg-white my-2">
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
    `

    document.querySelector("#chat").innerHTML = "";
    document.querySelector("#chat").insertAdjacentHTML("afterbegin", chatMessages);

    preSending();
    preDeleting();
    preUpdating();
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
  document.querySelector("#backToContactsListBtn").addEventListener("click", async (event) => {
    event.stopPropagation();
    document.querySelector("#chat").classList.add("hidden");
    document.querySelector("#chatPreview").classList.remove("hidden");

    document.querySelector(".chat").classList.add("max-sm:hidden");
    document.querySelector(".chatList").classList.remove("max-sm:hidden");
  })

  document.querySelector("#backToContactsListBtn").addEventListener("touchmove", async (event) => {
    event.stopPropagation();
  })
}

document.querySelectorAll(".userItem").forEach((el) => {
  el.addEventListener("click", listItemClicked)
});










//Search system
let searchInputEl = document.querySelector("#searchInput");

let searchInput = "";

searchInputEl.addEventListener("change", async (event) => {
  searchInput = event.target.value;
  if (event.target.value == "") {

    let res = await fetch(uri + "/users/" + loggedInUser?.id);
    loggedInUser = await res.json();

    contactListItems = `
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

    document.querySelector("#chatList").innerHTML = "";
    document.querySelector("#chatList").insertAdjacentHTML("afterbegin", contactListItems);

    document.querySelectorAll(".userItem").forEach((el) => {
      el.addEventListener("click", listItemClicked)
    });

  } else {
    document.querySelectorAll(".userItem").forEach((el) => {
      el.addEventListener("click", listItemClicked)
    });
  }
})


const searchUser = async () => {
  if (searchInput == "") {
    let res = await fetch(uri + "/users/" + loggedInUser?.id);
    loggedInUser = await res.json();

    contactListItems = `
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

    document.querySelector("#chatList").innerHTML = "";
    document.querySelector("#chatList").insertAdjacentHTML("afterbegin", contactListItems);

    document.querySelectorAll(".userItem").forEach((el) => {
      el.addEventListener("click", listItemClicked)
    });

  } else if (searchInput != "") {

    let foundUsers = users.filter((user) => {
      if (searchInput == "") {
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
      el.addEventListener("click", listItemClicked)
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
  signupProfileUrl = `https://ui-avatars.com/api/?name=${signupUsername}&background=${getRandomColor()}&color=fff`;
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
    crop: true,
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
