const token = localStorage.getItem("token");
const editionMode = document.querySelector(".edition-mode");
const loginLink = document.querySelector("#login-link");
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const modifyButton = document.querySelector("#modify-button");

if (token) {
  console.log("utilisateur connecté");
  editionMode.style.display = "flex"; // affiche le mode edition
  loginLink.textContent = "logout"; // modifie le text " login " par " logout "
  filters.style.display = "none"; // cache .filters
  modifyButton.style.display = "block"; // affiche modifyButton

  loginLink.addEventListener("click", function (event) {
    event.preventDefault(); // empêche la navigation vers login.html
    localStorage.removeItem("token"); // supprime le token
    window.location.href = "./index.html"; // Recharge la page
  });
}

let works = [];

function setActiveButton(button) {
  //bouton qui sera actif
  filters.querySelectorAll("button").forEach((button) => {
    // selectionnes les boutons dans filters, fait une action pour chacun d'eux
    button.classList.remove("active"); // supprime la class "active" de tous les boutons
  });

  button.classList.add("active"); // ajoute la class "active" au bouton actuel
}

const allButton = document.createElement("button"); // Crée variable allbuton contenant l'élément "button"
allButton.textContent = "Tous"; // ajout texte "Tous" dans ce button
allButton.classList.add("active"); // ajout class "active" dans ce button
filters.appendChild(allButton); // allButton enfant de filters

allButton.addEventListener("click", () => {
  // ajout event click à allButton
  displayWorks(works); // éxecute la fonction displayWorks en donnant "works" ce qui affiche les travaux
  setActiveButton(allButton); // éxecute la fonction setActiveButton en donnant "allButton" ce qui retire la class "active" à nos button et l'ajoute à allButton
});

function displayWorks(worksToDisplay) {
  // fonction displayWorks avec worksToDisplay en parametre
  gallery.innerHTML = ""; // vide le contenue gallery

  worksToDisplay.forEach((work) => {
    // pour chaque work dans worksToDisplay
    const figure = document.createElement("figure"); //créer élément "figure"
    const img = document.createElement("img"); //créer élément "img"

    img.src = work.imageUrl; // ajout à src l'URL qui ce trouve dans imageUrl
    img.alt = work.title; // ajout à alt le texte qui ce trouve dans title

    const figcaption = document.createElement("figcaption"); // créer l'élement figcaption
    figcaption.textContent = work.title; // ajout texte dans figcaption qui est le titre du work

    figure.appendChild(img); // img deviens enfant de figure
    figure.appendChild(figcaption); // figcaption deviens enfant de figure

    gallery.appendChild(figure); // figure deviens enfant de gallery
  });
}

function displayModalWorks() {
  const modalGalleryContainer = document.querySelector(
    ".modal-gallery-container",
  );

  modalGalleryContainer.innerHTML = ""; // vide le contenue

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const deleteButton = document.createElement("button");

    deleteButton.addEventListener("click", async function () {
      const response = await fetch(
        // Requête API
        `http://localhost:5678/api/works/${work.id}`, // Cible le work cliqué
        {
          method: "DELETE", // Suppression de ce work
          headers: {
            Authorization: `Bearer ${token}`, // envoi token : preuve connecté
          },
        },
      );

      if (response.ok) {
        works = works.filter((item) => item.id !== work.id); // retire le work supprimé de works
        figure.remove(); // supprime l'élément figure
      }
    });

    img.src = work.imageUrl;
    img.alt = work.title;

    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // ajout icone corbeille

    figure.appendChild(img);
    figure.appendChild(deleteButton);

    modalGalleryContainer.appendChild(figure);
  });
}

fetch("http://localhost:5678/api/works") // requête vers l'URL
  .then((response) => response.json()) // convertie la réponse en JS
  .then((data) => {
    // la réponse en JS
    works = data; // works récupére la réponse JS
    console.log(works); // affiche works dans la consol
    displayWorks(works); // éxecute la fonction displayWorks en lui donnant works, affiche dans la gallery
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      // pour chaque category dans categories
      const button = document.createElement("button"); // créer bouton
      button.textContent = category.name; // on donne comme texte le nom de la catégorie

      const option = document.createElement("option");
      option.value = category.id; // donne l'ID de la catégorie
      option.textContent = category.name; // affiche le nom de la catégorie

      document.querySelector("#category").appendChild(option); // ajoute option comme enfant de #category

      button.addEventListener("click", () => {
        const filteredWorks = works.filter(
          // créer variable qui contient le résultat du filtrage
          (work) => work.categoryId === category.id, //condition: id de la catégori dans work = à l'id de la catégorie actuel
        );
        displayWorks(filteredWorks); // éxecute la fonction displayWorks avec filteredWorks
        setActiveButton(button); // éxecute la fonction setActiveButton avec button
      });

      filters.appendChild(button); // button deviens enfant de filters
    });
  });
