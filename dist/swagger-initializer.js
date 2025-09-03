window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "swagger.yaml",
    dom_id: "#swagger-ui",
    deepLinking: true,
    persistAuthorization: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [],
    layout: "StandaloneLayout",
  });

  //</editor-fold>
  //
  function waitForServerSelect(callback) {
    const interval = setInterval(() => {
      const serverSelect = document.querySelector("#servers");
      if (serverSelect) {
        clearInterval(interval);
        callback(serverSelect);
      }
    }, 100);
  }

  // Restore the server selection if saved
  waitForServerSelect((serverSelect) => {
    const savedIndex = localStorage.getItem("swagger-selected-server-index");
    if (savedIndex !== null && serverSelect.options.length > savedIndex) {
      serverSelect.selectedIndex = savedIndex;
      serverSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    serverSelect.addEventListener("change", function () {
      localStorage.setItem("swagger-selected-server-index", serverSelect.selectedIndex);
    });
  });
};
