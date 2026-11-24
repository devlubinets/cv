const downloadLink = document.querySelector("[data-tracking-url]");

downloadLink.addEventListener("click", () => {
  fetch(downloadLink.dataset.trackingUrl, {
    cache: "no-store",
    credentials: "omit",
    keepalive: true,
    redirect: "manual",
  }).catch(() => {
    // The native PDF download works independently of the tracking request.
  });
});
