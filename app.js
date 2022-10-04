const input = document.querySelector(".input");
const search = document.querySelector(".search");
const container = document.querySelector(".pokemon-container");
const pokeName = document.querySelector(".name");
const pokeImg = document.querySelector(".img");
const baseStat = document.querySelectorAll(".value");
const abilities = document.querySelector(".abilities");

search.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(input.value);
  if (input.value === "") {
    container.style.display = "block";
    pokeName.innerText = "No pokemon selected";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      // Display the container
      container.style.display = "block";

      // Pokemon name
      pokeName.innerText = data.name;

      // Pokemon picture
      pokeImg.src = data.sprites.front_default;

      //Base stat
      const baseStatArr = [];
      data.stats.forEach((el) => {
        baseStatArr.push(el.base_stat);
      });

      baseStat.forEach((el, i) => {
        el.innerText = baseStatArr[i];
      });

      // Pokemon abilities
      data.abilities.forEach((el) => {
        const li = document.createElement("li");
        li.classList.add("ability");
        li.textContent = el.ability.name;
        abilities.appendChild(li);
      });
    });
});
