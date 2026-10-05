const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");

modifyButton.addEventListener("click", function () {
  modal.style.display = "flex";
  displayModalWorks();
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
