const loginForm = document.querySelector("#login-form"); // récupère ID du formulaire
const loginError = document.querySelector("#login-error"); // récupère ID login-error

loginForm.addEventListener("submit", async function (event) {
  // quand formulaire est SubmitEvent, execute cette fonction
  event.preventDefault();

  const email = document.querySelector("#email").value; // récupère le mail utilisateur
  const password = document.querySelector("#password").value; // récupère le mot de passe utilisateur

  const response = await fetch("http://localhost:5678/api/users/login", {
    // Envoie une requête et attend la réponse
    method: "POST",
    headers: {
      "Content-Type": "application/json", // données envoyer en format JSON
    },
    body: JSON.stringify({
      // transformation de texte au format JSON
      email: email,
      password: password,
    }),
  });

  const data = await response.json(); // attend que response est terminé et met le résultat dans data

  if (response.ok) {
    // si connexion réussi
    localStorage.setItem("token", data.token); // enregistre le token dans le navigateur
    window.location.href = "./index.html"; // va sur la page index.html
  } else {
    // si connexion échouer
    loginError.textContent = "E-mail ou mot de passe incorrect."; // modifie le test de loginError
  }

  console.log(data);
});
