const createTextRow = (div, text, qtd, image) => {
  const myimage = document.createElement("img");
  let base_url = window.location.origin;
  console.log(base_url);
  myimage.src = `${base_url}/${image}`;

  const p = document.createElement("p");
  p.innerText = text;

  const span = document.createElement("span");
  span.innerText = qtd;

  div.appendChild(myimage);
  div.appendChild(p);
  div.appendChild(span);
};

const createCard = (name, death, suspect, cases, uf) => {
  const container = document.querySelector(".container");

  const card = document.createElement("div");
  card.className = "card";

  const stateImage = document.createElement("div");
  stateImage.id = "state-image";
  stateImage.style.backgroundImage = `url("assets/${uf}.svg")`;

  const textDiv = document.createElement("div");
  textDiv.className = "text-div";

  const h2 = document.createElement("h2");
  h2.innerText = name;

  const textRow1 = document.createElement("div");
  textRow1.className = "text-row";

  const textRow2 = document.createElement("div");
  textRow2.className = "text-row";

  const textRow3 = document.createElement("div");
  textRow3.className = "text-row";

  createTextRow(textRow1, "Casos", cases, "/assets/icons/hospital.svg");
  createTextRow(textRow2, "Mortes", death, "/assets/icons/death.svg");
  createTextRow(textRow3, "Suspeitos", suspect, "/assets/icons/suspect.svg");

  textDiv.appendChild(h2);
  textDiv.appendChild(textRow1);
  textDiv.appendChild(textRow2);
  textDiv.appendChild(textRow3);

  // stateImage.appendChild(textDiv);

  card.appendChild(stateImage);
  card.appendChild(textDiv);

  container.appendChild(card);
};

(function () {
  var states = document.getElementsByClassName("estado");

  for (var i = 0; i < states.length; i++) {
    states[i].onclick = async function () {
      let card = document.querySelector(".card");
      if (card) {
        let container = document.querySelector(".container");
        container.removeChild(card);
      }

      let name = this.getAttribute("name");
      let sigla = this.querySelector("text").textContent.toLowerCase();
      sigla = sigla.replace(/\s/g, "");

      let data = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sigla}`
      );
      const { cases, deaths, suspects } = await data.json();

      createCard(name, deaths, suspects, cases, sigla);
    };
  }
})();
