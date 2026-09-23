const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let works = [];

function setActiveButton(button) {
  filters.querySelectorAll("button").forEach((button) => {
    button.classList.remove("active");
  });

  button.classList.add("active");
}

const allButton = document.createElement("button");
allButton.textContent = "Tous";
allButton.classList.add("active");
filters.appendChild(allButton);

allButton.addEventListener("click", () => {
  displayWorks(works);
  setActiveButton(allButton);
});

function displayWorks(worksToDisplay) {
  gallery.innerHTML = "";

  worksToDisplay.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    works = data;
    console.log(works);
    displayWorks(works);
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;

      button.addEventListener("click", () => {
        const filteredWorks = works.filter(
          (work) => work.categoryId === category.id,
        );
        displayWorks(filteredWorks);
        setActiveButton(button);
      });

      filters.appendChild(button);
    });
  });
