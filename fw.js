let eachSection = document.getElementById("eachSection");
let userIn = document.getElementById("userIn");
let city = document.getElementById("city");
let saveBtn = document.getElementById("saveBtn");
let clearBtn = document.getElementById("clearBtn");
let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let storageOutput = document.getElementById("storageOutput");
let myModal = document.getElementById("myModal");
let newBtn = document.getElementById("newBtn");

const savetoLocal = () => {
  let key = userIn.value;
  let val = city.value;

  if (key && val) {
    localStorage.setItem(key, val);
  }
};

saveBtn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    let user = userIn.value;
    let style = city.value;
    let complete = document.getElementById("complete");
    complete.style.textAlign = "center";
    complete.style.color = "#700000";
    complete.style.fontSize = "3rem";

    if (user === "") {
    
      popUp((complete.innerText = "please enter a brand name"));
      closeModal();
    } else {
      popUp((complete.innerText = `${user} - ${style}, added`));
      closeModal();
    }

    savetoLocal();
    savedOutput();
    // reset
    userIn.value = "";
  }
  // console.log(fullItem);
);

// modal
function popUp(message, duration) {
  const complete = document.getElementById("complete");
  complete.innerText = message;
  myModal.style.display = "block";
  complete.style.color = "black";
  complete.style.textAlign = "center";
}

// close modal
function closeModal() {
  setTimeout(() => {
    myModal.style.display = "none";
    complete.innerText = "";
  }, 2000);
}

// saved items
const savedOutput = () => {
  let storageOutput = document.getElementById("storageOutput");
  storageOutput.innerText = "";

  for (let i = 0; i < localStorage.length; i++) {
    let user = localStorage.key(i);
    let style = localStorage.getItem(user);
    let fullItem = `${user} - ${style}`;

    let listItem = document.createElement("li");
    listItem.style.listStyleType = "none";
    listItem.innerText += `${fullItem}`;
    storageOutput.appendChild(listItem);
  }
};

// keep saved on refresh
window.addEventListener("load", savedOutput);

// search local
const searchLocalStorage = (e) => {
  e.preventDefault();
  searchOutput.innerText = "";
  let user = searchInput.value;
  let style = localStorage.getItem(user);
  if (style!== null && style!== undefined) {
    let searchResult = document.createElement("p");
    searchResult.innerText = `results from search: \n ${style}, ${user}`;
    searchOutput.append(searchResult);
  } else {
    let searchResult = document.createElement("p");
    searchResult.innerText = `${user} not found`;
    searchOutput.append(searchResult);
  }

  searchInput.value = "";
};

const clearLocal = () => {
  localStorage.clear();
  location.reload();
};

searchBtn.addEventListener("click", searchLocalStorage);

clearBtn.addEventListener("click", clearLocal);
