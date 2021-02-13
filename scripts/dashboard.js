const getUserJSON = localStorage.getItem("user");
const getUser = JSON.parse(getUserJSON);
console.log(getUser);

const sessionID = sessionStorage.getItem("firstLogin");

if (!sessionID) {
  window.location.href = "/login.html";
}

const username = document.querySelector("#username");
const signOut = document.querySelector("#signout");
const fetchMessageID = document.querySelector("#fetchMessage");

username.innerHTML = getUser.name;

signOut.addEventListener("click", () => {
  sessionStorage.removeItem("firstLogin");
  window.location.href = "../login.html";
});

// const fetchMessage = async () => {
//   await fetch("https://type.fit/api/quotes")
//     .then((response) => response.json())
//     .then((data) => {
//       const dataArray = data[Math.floor(Math.random() * 98)].text;
//       fetchMessageID.innerHTML = dataArray;
//     });
// };

const fetchMessage = async () => {
  const token = "94ffb00fe6d51b369b138e7666b80438351d5870";

  await fetch("https://api.paperquotes.com/apiv1/quotes", {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const dataArray = data.results[Math.floor(Math.random() * 5)];

      fetchMessageID.innerHTML = dataArray.quote;
    });
};

fetchMessage();
