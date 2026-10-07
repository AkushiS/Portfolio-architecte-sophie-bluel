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
    photoInput.files.length > 0 &&
    titleInput.value !== "" &&
    categoryInput.value !== ""
  ) {
    submitButton.disabled = false;
    formError.textContent = "";
  } else {
    submitButton.disabled = true;
    formError.textContent = "Veuillez remplir tous les champs.";
  }
}

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];

  if (file) {
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.display = "block";

    document.querySelector(".photo-upload .fa-image").style.display = "none";
    document.querySelector(".photo-upload label").style.display = "none";
  }

  checkForm();
});
titleInput.addEventListener("input", checkForm);
categoryInput.addEventListener("change", checkForm);

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  console.log([...formData]);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const newWork = await response.json();

    works.push(newWork);

    displayModalWorks();
    displayWorks(works);

    modalBack.click();
  }
});

modifyButton.addEventListener("click", function () {
  modal.style.display = "flex";
  displayModalWorks();
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  resetForm();
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    resetForm();
  }
});

addPhotoButton.addEventListener("click", function () {
  modalGallery.style.display = "none";
  modalForm.style.display = "block";
});

modalBack.addEventListener("click", function () {
  resetForm();
});

function resetForm() {
  form.reset();

  modalForm.style.display = "none";
  modalGallery.style.display = "block";

  photoPreview.src = "";
  photoPreview.style.display = "none";

  document.querySelector(".photo-upload .fa-image").style.display = "block";
  document.querySelector(".photo-upload label").style.display = "flex";

  submitButton.disabled = true;
}
