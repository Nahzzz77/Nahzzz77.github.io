document.documentElement.classList.add("js");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const closeMenu = () => {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航菜单");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute("aria-label", willOpen ? "关闭导航菜单" : "打开导航菜单");
    nav.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 14);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const reveals = document.querySelectorAll(".reveal:not(.is-visible)");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

const search = document.getElementById("article-search");
const articles = [...document.querySelectorAll(".article-row")];
const searchStatus = document.getElementById("search-status");

if (search && articles.length) {
  search.addEventListener("input", () => {
    const query = search.value.trim().toLocaleLowerCase("zh-CN");
    let visibleCount = 0;

    articles.forEach((article) => {
      const content = `${article.dataset.search || ""} ${article.textContent}`.toLocaleLowerCase("zh-CN");
      const matches = !query || content.includes(query);
      article.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (!searchStatus) return;
    searchStatus.textContent = query
      ? visibleCount > 0
        ? `找到 ${visibleCount} 篇相关文章`
        : "没有找到匹配的文章，换个关键词试试。"
      : "";
  });
}
