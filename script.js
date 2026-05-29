const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector(".nav");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-request-form]");
const formStatus = document.querySelector("[data-form-status]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-visible");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("menu-visible");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const workType = String(data.get("workType") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Заявка: ${workType || "студенческая работа"}`);
    const body = encodeURIComponent(
      `Имя: ${name}\nКонтакт: ${contact}\nТип работы: ${workType}\n\nЗадача:\n${message}`,
    );

    formStatus.textContent = "Открываем письмо с заполненной заявкой.";
    window.location.href = `mailto:info@buro-student.ru?subject=${subject}&body=${body}`;
  });
}
