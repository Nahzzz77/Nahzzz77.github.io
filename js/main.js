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

const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const navTargets = navLinks
  .map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) }))
  .filter(({ target }) => target);

const updateActiveNav = () => {
  const readingLine = window.scrollY + window.innerHeight * 0.32;
  let activeTarget = navTargets[0]?.target;
  navTargets.forEach(({ target }) => {
    if (target.offsetTop <= readingLine) activeTarget = target;
  });
  navTargets.forEach(({ link, target }) => link.classList.toggle("active", target === activeTarget));
};

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });

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

const cinematicHero = document.querySelector(".cinematic-hero");
const sceneButtons = [...document.querySelectorAll(".scene-button")];
const scenePosters = [...document.querySelectorAll(".scene-poster")];
const videoSlots = [...document.querySelectorAll(".cinematic-video")];
const sceneNote = document.getElementById("scene-note");

const sceneVideos = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4"
];

const sceneNotes = [
  "洞察｜确认用户、场景和成功标准。",
  "设计｜定义模型、人和边界如何协作。",
  "验证｜用原型与评测缩小不确定性。",
  "复盘｜沉淀失败路径与改进优先级。"
];

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactViewport = window.matchMedia("(max-width: 620px)");
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const shouldUseVideo = !motionPreference.matches && !compactViewport.matches && !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType);

let currentScene = 0;
let currentSlot = 0;
let sceneTransitioning = false;
let videoRequestId = 0;

const updateSceneCopy = (index) => {
  if (cinematicHero) cinematicHero.dataset.scene = String(index);
  sceneButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  scenePosters.forEach((poster, posterIndex) => {
    poster.classList.toggle("is-active", posterIndex === index);
  });

  if (!sceneNote) return;
  sceneNote.classList.add("is-changing");
  window.setTimeout(() => {
    sceneNote.textContent = sceneNotes[index];
    sceneNote.classList.remove("is-changing");
  }, 140);
};

const waitForVideo = (video) => new Promise((resolve, reject) => {
  if (video.readyState >= 3) {
    resolve();
    return;
  }

  const timeout = window.setTimeout(() => {
    cleanup();
    reject(new Error("video timeout"));
  }, 30000);

  const cleanup = () => {
    window.clearTimeout(timeout);
    video.removeEventListener("canplay", onReady);
    video.removeEventListener("error", onError);
  };
  const onReady = () => { cleanup(); resolve(); };
  const onError = () => { cleanup(); reject(new Error("video unavailable")); };

  video.addEventListener("canplay", onReady, { once: true });
  video.addEventListener("error", onError, { once: true });
});

const prepareVideo = async (video, index) => {
  if (video.dataset.sceneIndex !== String(index)) {
    video.src = sceneVideos[index];
    video.dataset.sceneIndex = String(index);
    video.load();
  }
  await waitForVideo(video);
  await video.play();
};

const setButtonsBusy = (busy) => {
  sceneButtons.forEach((button) => { button.disabled = busy; });
};

const resetVideo = (video, expectedSceneIndex) => {
  if (!video || (expectedSceneIndex !== undefined && video.dataset.sceneIndex !== String(expectedSceneIndex))) return;
  video.classList.remove("is-active");
  video.pause();
  video.removeAttribute("src");
  delete video.dataset.sceneIndex;
  video.load();
};

const switchScene = (index) => {
  if (index === currentScene || sceneTransitioning || !Number.isInteger(index)) return;
  currentScene = index;
  updateSceneCopy(index);

  if (!shouldUseVideo || videoSlots.length < 2) {
    return;
  }

  sceneTransitioning = true;
  setButtonsBusy(true);
  window.setTimeout(() => {
    sceneTransitioning = false;
    setButtonsBusy(false);
  }, 720);

  const requestId = ++videoRequestId;
  const nextSlot = currentSlot === 0 ? 1 : 0;
  const incoming = videoSlots[nextSlot];
  const outgoing = videoSlots[currentSlot];
  const outgoingScene = outgoing.dataset.sceneIndex;
  currentSlot = nextSlot;
  outgoing.classList.remove("is-active");

  window.setTimeout(() => {
    if ((outgoing.dataset.sceneIndex ?? "") === (outgoingScene ?? "")) resetVideo(outgoing);
  }, 1050);

  prepareVideo(incoming, index)
    .then(() => {
      if (requestId !== videoRequestId || currentScene !== index || currentSlot !== nextSlot) {
        resetVideo(incoming, index);
        return;
      }
      incoming.classList.add("is-active");
    })
    .catch(() => resetVideo(incoming, index));
};

sceneButtons.forEach((button) => {
  button.addEventListener("click", () => switchScene(Number(button.dataset.sceneIndex)));
});

if (shouldUseVideo && videoSlots[0]) {
  const startInitialVideo = async () => {
    const requestId = videoRequestId;
    try {
      await prepareVideo(videoSlots[0], 0);
      if (requestId === videoRequestId && currentScene === 0 && currentSlot === 0) {
        videoSlots[0].classList.add("is-active");
      } else {
        resetVideo(videoSlots[0], 0);
      }
    } catch (error) {
      resetVideo(videoSlots[0], 0);
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(startInitialVideo, { timeout: 1200 });
  } else {
    window.setTimeout(startInitialVideo, 300);
  }
}

document.addEventListener("visibilitychange", () => {
  if (!shouldUseVideo) return;
  if (document.hidden) {
    videoSlots.forEach((video) => video.pause());
  } else {
    videoSlots[currentSlot]?.play().catch(() => {});
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
