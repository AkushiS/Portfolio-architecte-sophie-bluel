const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
const modalGallery = document.querySelector(".modal-gallery");
const modalForm = document.querySelector(".modal-form");
const addPhotoButton = document.querySelector(".add-photo");
const modalBack = document.querySelector(".modal-back");
const form = document.querySelector(".modal-form form");
const photoInput = document.querySelector("#photo");
const titleInput = document.querySelector("#title");
const categoryInput = document.querySelector("#category");
const submitButton = document.querySelector('button[type="submit"]');
const photoPreview = document.querySelector(".photo-preview");
const formError = document.querySelector(".form-error");

function checkForm() {
  if (
    photoInput.files.length > 0 && // au moin une photo selectionner
    titleInput.value !== "" && // Ne dois pas être vide
    categoryInput.value !== ""
  ) {
    submitButton.disabled = false; // Bouton n'est plus désactiver
    formError.textContent = ""; // vide contenue du message d'erreur
  } else {
    submitButton.disabled = true; // Bouton reste désactiver
    formError.textContent = "Veuillez remplir tous les champs.";
  }
}

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0]; // Récupère l'image dans la variable file

  if (file) {
    photoPreview.src = URL.createObjectURL(file); // Créer et ajoute l'URL de l'image dans src
    photoPreview.style.display = "block"; // Rend visible l'image

    document.querySelector(".photo-upload .fa-image").style.display = "none"; // Cache l'icone image
    document.querySelector(".photo-upload label").style.display = "none"; // Cache bouton "+ Ajouter photo"
  }

  checkForm(); // execute la fonction checkForm
});
titleInput.addEventListener("input", checkForm); // execute checkForm quand le contenue de Titre change
categoryInput.addEventListener("change", checkForm); // execute checkForm quand le contenue de Catégories change

form.addEventListener("submit", async function (event) {
  // execute la fonction lorsque formulaire et envoyé
  event.preventDefault();

  const formData = new FormData(form); // Créer variable avec les valeurs du formulaire

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST", // Créer nouveau work
    headers: {
      Authorization: `Bearer ${token}`, // envoi token : preuve connecté
    },
    body: formData, // envoie données du formulaire
  });

  if (response.ok) {
    const newWork = await response.json(); // récupère le nouveau work

    works.push(newWork); // Ajout work dans works

    displayModalWorks(); // actualise la galerie du modale
    displayWorks(); // actualise la galerie principale

    modalBack.click(); // retour page précédente
  }
});

modifyButton.addEventListener("click", function () {
  modal.style.display = "flex"; // rend modale visible
  displayModalWorks(); // affiche les works dans galerie modale
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none"; // rend modale invisible
  resetForm(); // reinitialise le formulaire
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    // si on clique sur le fond de la modale
    modal.style.display = "none";
    resetForm();
  }
});

addPhotoButton.addEventListener("click", function () {
  modalGallery.style.display = "none"; // cache la galerie de la modale
  modalForm.style.display = "block"; // affiche le formulaire d'ajout photo
});

modalBack.addEventListener("click", function () {
  resetForm();
});

function resetForm() {
  form.reset();

  modalForm.style.display = "none"; // cache formulaire d'ajout photo
  modalGallery.style.display = "block"; // affiche la galerie de la modale

  photoPreview.src = ""; // retire l'image de l'aperçu
  photoPreview.style.display = "none"; // cache l'aperçu

  document.querySelector(".photo-upload .fa-image").style.display = "block"; // réaffiche l'icone image
  document.querySelector(".photo-upload label").style.display = "flex"; // réaffiche "+ Ajouter photo"

  submitButton.disabled = true; // désactive le bouton valider
}
