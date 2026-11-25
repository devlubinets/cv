(() => {
  const duration = document.querySelector("#software-experience");
  const months = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");

  function monthNumber(label) {
    const match = label.trim().match(/^([a-z]+)\.?\s+(\d{4})$/i);
    const month = match ? months.indexOf(match[1].slice(0, 3).toLowerCase()) : -1;
    if (month < 0) throw new Error("Unrecognised CV date");
    return Number(match[2]) * 12 + month;
  }

  async function updateExperience() {
    const response = await fetch("./cv.html", { cache: "no-cache" });
    if (!response.ok) throw new Error("CV page unavailable");

    const cv = new DOMParser().parseFromString(await response.text(), "text/html");
    const dates = cv.querySelectorAll('section[aria-labelledby="experience"] .resume-date');
    if (!dates.length) throw new Error("No experience dates in the CV");

    const now = new Date();
    const currentMonth = now.getFullYear() * 12 + now.getMonth();
    const workedMonths = new Set();

    for (const date of dates) {
      const [start, end] = date.textContent.trim().split(/\s*[–—-]\s*/);
      const first = monthNumber(start);
      const last = /^present$/i.test(end) ? currentMonth : monthNumber(end ?? "") + 1;

      for (let month = first; month < Math.min(last, currentMonth); month++) {
        workedMonths.add(month);
      }
    }

    const years = Math.floor(workedMonths.size / 12);
    duration.textContent = years === 1 ? "1 year" : years + " years";
  }

  updateExperience().catch(() => {
    // Keep the displayed value when the CV dates cannot be loaded.
  });
})();
