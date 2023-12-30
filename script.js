let apikey = `uPk7zFSaRRcnj3A5xYxkVDiJfIoqO4cgKj00uram`;

const currentDate = new Date("2023-01-28").toISOString().split("T")[0];

getCurrentImageOfTheDay(currentDate);

async function getCurrentImageOfTheDay(currentDate) {
  let url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apikey}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    picGenerator(data);
  } catch (error) {
    console.error(error.message);
  }
}

let imageContainer = document.getElementById("current-image-container");

function picGenerator(data) {
  imageContainer.innerHTML = "";
  imageContainer.innerHTML = `<h1>Picture On ${data.date}</h1>
                         <img width="500px" src="${data.hdurl}" alt="picoftheday">
                         <h2>${data.title}</h2>
                         <p>${data.explanation}</p>`;
}

let inputDate = document.getElementById("search-input");

document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  getCurrentImageOfTheDay(inputDate.value);
  saveSearch(inputDate.value.toString());
});

let searches = [];
localStorage.setItem("searches", JSON.stringify(searches));

function saveSearch(searchedDate) {
  searches = JSON.parse(localStorage.getItem("searches"));

  let date = searchedDate.toString();
  let flag = true;
  searches.forEach((item) => {
    if (item.date === date) {
      flag = false;
    }
  });
  if (flag) {
    let obj = {
      date: date,
    };
    searches.unshift(obj);
  }

  localStorage.setItem("searches", JSON.stringify(searches));
  addSearchToHistory();
}

function addSearchToHistory() {
  searches = JSON.parse(localStorage.getItem("searches"));

  let ul = document.getElementById("seach-history");
  ul.innerHTML = "";
  searches.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.date;
    li.addEventListener("click", (event) => {
      let date = event.target.innerText;
      console.log(date);
      getCurrentImageOfTheDay(date);
    });
    ul.appendChild(li);
  });
}