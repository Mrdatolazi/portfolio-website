const scrollButtons = document.querySelectorAll("[data-scroll-target]");

scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll-target");
    if (!target) return;

    if (target === "body") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.querySelector(target);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + offset - 80;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector(".project-title")?.textContent?.trim();
    if (!title) return;
    window.alert(`Project: ${title}\n\nHere you can later open a full gallery or details page.`);
  });
});

