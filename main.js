let dropSelect = document.querySelector(".dropdown .select");
let dropList = document.querySelector(".dropdown .list");
let region = document.querySelectorAll(".dropdown .list li");
let main = document.querySelector(".main");
let darkIcon = document.querySelector(".mode");

darkIcon.addEventListener("click", () => {
  if (main.classList.contains("dark-theme")) {
    main.classList.remove("dark-theme");
  } else {
    main.classList.add("dark-theme");
    console.log(main.className);
  }
});
dropSelect.addEventListener("click", () => {
  if (dropList.style.opacity == "1") {
    dropList.style.opacity = "0";
  } else {
    dropList.style.opacity = "1";
  }
});

function getData() {
  return new Promise((res) => {
    let url = "https://restcountries.com/v3.1/all";
    fetch(url).then((response) => {
      res(response.json());
    });
  });
}
getData();
async function displayData() {
  let Flags = document.querySelector(".flags .container");
  try {
    let flag = ``;
    const data = await getData();
    data.forEach((d) => {
      {
        if (d.name.common == "Israel") {
          d.name.common = "Palestine";
          d.flags.png = "https://flagcdn.com/w320/ps.png";
          d.name.official = "Palestine";
          d.capital = "Ramallah";
          d.population = "4803269";
          d.region = "Asia";
        }
        flag += `
                        <div class="box all ${d.region}">
                            <img src="${d.flags.png}" alt="flag">
                            <div class="text">
                                <h2 class="name">${d.name.common}</h2>
                                <span><span>Population: </span>${d.population}</span>
                                <span><span>Region:</span> ${d.region}</span>
                                <span><span>Capital:</span> ${d.capital}</span>
                            </div>
                        </div>
                        `;
        Flags.innerHTML = flag;

        region.forEach((el) => {
          el.addEventListener("click",showCards);
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
displayData();

function showCards() {
  let cards = document.querySelectorAll(" .flags .container .box");
  cards.forEach((card) => {
    card.style.display = "none";
  });
  document.querySelectorAll(this.dataset.region).forEach((el) => {
    el.style.display = "block";
  });
}
let search = document.querySelector(".search input");
function searchCountry() {
  let cards = document.querySelectorAll(".flags .container .box");
  let searchValue = search.value.toUpperCase();
  cards.forEach((el) => {
    if (!el.innerHTML.toUpperCase().includes(searchValue)) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}
search.addEventListener("keyup", searchCountry);
