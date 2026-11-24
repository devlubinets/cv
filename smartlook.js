(() => {
  if (!window.smartlook) {
    const queuedSmartlook = function () {
      queuedSmartlook.api.push(arguments);
    };
    queuedSmartlook.api = [];
    window.smartlook = queuedSmartlook;

    const recorder = document.createElement("script");
    recorder.async = true;
    recorder.src = "https://web-sdk.smartlook.com/recorder.js";
    document.head.appendChild(recorder);
  }

  window.smartlook("init", "d96c6d20777849db7133161ea405ab8bc37929d7", { region: "eu" });
})();
