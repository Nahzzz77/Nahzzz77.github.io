// ===== 逐字拆分动画 =====
// 把 .split-text 元素按字符拆分，逐个显现（复刻 ciridae.com 的 split-text 效果）
function splitText() {
  document.querySelectorAll(".split-text").forEach((el) => {
    const text = el.getAttribute("data-text") || el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", text);
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--i", i);
      span.setAttribute("aria-hidden", "true");
      el.appendChild(span);
    });
  });
}
splitText();

// ===== 导航栏滚动效果 =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===== 全屏菜单 =====
const menuToggle = document.getElementById("menu-toggle");
const menuOverlay = document.getElementById("menu-overlay");

menuToggle.addEventListener("click", () => {
  const open = menuOverlay.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
});

menuOverlay.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuOverlay.classList.remove("open");
    menuToggle.classList.remove("open");
  });
});

// ===== 滚动出现动画 =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== 技能条动画 =====
const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => {
  bar.dataset.width = bar.style.width;
  bar.style.width = "0";
  skillObserver.observe(bar);
});

// ===== 页脚年份 =====
document.getElementById("year").textContent = new Date().getFullYear();
