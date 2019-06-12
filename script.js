if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

function displayNotification() {
  document.querySelector("#notification").style.display = "block";
}

navigator.serviceWorker.getRegistration().then(registration => {
  registration.addEventListener("updatefound", () => {
    // On récupère le Service
    // Worker en cours
    // d'installation
    const newWorker = registration.installing;

    // On se branche à ses mises
    // à jour pour savoir quand
    // il a fini de s'installer
    newWorker.addEventListener("statechange", () => {
      if (newWorker.state === "installed") {
        // Un nouveau Service
        // Worker est prêt.
        // Donc on affiche la
        // notification
        displayNotification();
      }
    });
  });
});
