// ===== 导航栏滚动效果 =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===== 背景视差效果 =====
const heroBg = document.querySelector(".hero-bg");
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.3) {
        heroBg.style.transform = `translateY(${y * 0.28}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ===== 移动端菜单 =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// 点击链接后关闭菜单
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ===== 邮箱联系表单 =====
const ctaForm = document.getElementById("cta-form");
const ctaEmail = document.getElementById("cta-email");

ctaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = ctaEmail.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (isValid) {
    // 打开邮件客户端，主题带上访客邮箱
    window.location.href =
      "mailto:you@example.com?subject=" +
      encodeURIComponent("来自个人网站的问候（" + email + "）") +
      "&body=" +
      encodeURIComponent("你好，我想与你联系。\n\n我的邮箱：" + email + "\n\n");
  } else {
    ctaEmail.focus();
    ctaEmail.placeholder = "请输入有效的邮箱地址";
    ctaEmail.style.borderColor = "rgba(255,255,255,0.5)";
    setTimeout(() => {
      ctaEmail.placeholder = "输入邮箱，与我联系";
      ctaEmail.style.borderColor = "";
    }, 2000);
  }
});

// ===== 打字机效果 =====
const typedEl = document.getElementById("typed");
const phrases = [
  "我是一名 AI 产品经理",
  "我专注于 AI 产品",
  "我热爱创造",
  "我专注于解决问题",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.innerHTML =
    current.substring(0, charIndex) + '<span class="cursor"></span>';

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();

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

// ===== 当前导航高亮 =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => navObserver.observe(s));

// ===== 页脚年份 =====
document.getElementById("year").textContent = new Date().getFullYear();
