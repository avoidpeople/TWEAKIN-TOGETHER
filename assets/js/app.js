const flash = document.getElementById("screen-flash");
    const systemMessage = document.getElementById("system-message");
    const boardCanvas = document.querySelector(".board-canvas");
    const boardFullscreenBtn = document.getElementById("board-fullscreen-btn");
    const boardCloseBtn = document.getElementById("board-close-btn");

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randi(min, max) {
      return Math.floor(rand(min, max + 1));
    }

    const flashColors = ["#ffffff", "#ff2b2b", "#32cd32", "#ff57ff", "#00ffff", "#ff0015"];

    function doFlash() {
      let flashes = randi(4, 6);
      if (Math.random() < 0.22) flashes = randi(7, 9);

      let delay = 0;
      for (let i = 0; i < flashes; i += 1) {
        setTimeout(() => {
          flash.style.background = flashColors[randi(0, flashColors.length - 1)];
          flash.classList.add("active");
          setTimeout(() => flash.classList.remove("active"), randi(35, 90));
        }, delay);
        delay += randi(95, 220);
      }

      setTimeout(doFlash, randi(4000, 8000));
    }

    setTimeout(doFlash, randi(1200, 2600));

    const floatingImages = ["assets/images/404 1.png", "assets/images/404.png", "assets/images/akaka.png", "assets/images/rec.png", "assets/images/ss44.png", "assets/images/tweakin.png"];

    function spawnFloatingImage() {
      const img = document.createElement("img");
      img.className = "floating-photo";
      img.src = floatingImages[randi(0, floatingImages.length - 1)];

      const size = randi(120, 280);
      const maxX = Math.max(0, window.innerWidth - size - 26);
      const maxY = Math.max(0, window.innerHeight - size - 26);

      img.style.width = `${size}px`;
      img.style.left = `${randi(13, maxX + 13)}px`;
      img.style.top = `${randi(13, maxY + 13)}px`;
      img.style.transform = `rotate(${rand(-25, 25).toFixed(2)}deg)`;

      const life = randi(1000, 2000);
      img.style.animationDuration = `${life}ms`;

      document.body.appendChild(img);
      setTimeout(() => img.remove(), life + 180);
    }

    function floatingLoop() {
      const count = Math.random() < 0.3 ? 3 : (Math.random() < 0.7 ? 2 : 1);
      for (let i = 0; i < count; i += 1) spawnFloatingImage();
      setTimeout(floatingLoop, randi(4000, 6000));
    }

    setTimeout(floatingLoop, 2100);

    const stampWords = [
      "СЕКРЕТНО", "CONFIDENTIAL", "CLASSIFIED", "ПРОСМОТР ЗАПИСАН", "АРХИВ",
      "VERIFIED", "ARCHIVED", "UNDER INVESTIGATION", "EVIDENCE", "DIGITAL COPY",
      "DATA SEALED", "CLASSIFIED MATERIAL"
    ];
    const stampColors = ["stamp-red", "stamp-blue", "stamp-yellow"];
    const zones = document.querySelectorAll(".stamp-zone");

    zones.forEach((zone) => {
      const amount = randi(2, 6);
      zone.style.position = "relative";
      for (let i = 0; i < amount; i += 1) {
        const stamp = document.createElement("span");
        stamp.className = `floating-stamp ${stampColors[randi(0, stampColors.length - 1)]}`;
        stamp.textContent = stampWords[randi(0, stampWords.length - 1)];
        stamp.style.left = `${rand(-8, 90).toFixed(1)}%`;
        stamp.style.top = `${rand(-4, 92).toFixed(1)}%`;
        stamp.style.transform = `translate(${rand(-12, 12).toFixed(1)}px, ${rand(-10, 10).toFixed(1)}px) rotate(${rand(-30, 30).toFixed(1)}deg) scale(${rand(0.9, 1.2).toFixed(2)})`;
        stamp.style.zIndex = String(randi(2, 9));
        zone.appendChild(stamp);
      }
    });

    const archiveMsgs = [
      "ACCESSING ARCHIVE", "LOADING FILE", "SCANNING DATA", "FILE CORRUPTED",
      "ACCESS LOGGED", "ARCHIVE SYSTEM ONLINE", "MONITORING ACTIVE"
    ];

    function pulseSystemMessage() {
      systemMessage.textContent = archiveMsgs[randi(0, archiveMsgs.length - 1)];
      systemMessage.classList.add("show");
      setTimeout(() => systemMessage.classList.remove("show"), randi(1000, 2000));
      setTimeout(pulseSystemMessage, randi(6000, 12000));
    }

    setTimeout(pulseSystemMessage, 4000);

    const censorBlocks = document.querySelectorAll(".censor");
    censorBlocks.forEach((el, idx) => {
      setTimeout(() => {
        el.textContent = el.dataset.reveal || "[РАССЕКРЕЧЕНО]";
        el.classList.add("revealed");
      }, 2400 + idx * 1200);
    });

    const stickerTargets = Array.from(document.querySelectorAll(".section"));
    const stickerCount = Math.min(6, stickerTargets.length);
    for (let i = 0; i < stickerCount; i += 1) {
      const target = stickerTargets[randi(0, stickerTargets.length - 1)];
      const sticker = document.createElement("a");
      sticker.className = "listen-sticker";
      sticker.href = "https://band.link/2r6BC";
      sticker.target = "_blank";
      sticker.rel = "noreferrer";
      sticker.textContent = "НАЖМИ ЧТО БЫ СЛУШАТЬ ВЕЗДЕ";
      sticker.style.left = `${rand(6, 70).toFixed(1)}%`;
      sticker.style.top = `${rand(10, 78).toFixed(1)}%`;
      sticker.style.setProperty("--rot", `${rand(-12, 12).toFixed(1)}deg`);
      target.appendChild(sticker);
    }

    const sectionToast = document.getElementById("section-toast");
    let toastTimer = null;

    function showToast(message) {
      if (!sectionToast) return;
      if (toastTimer) clearTimeout(toastTimer);
      sectionToast.textContent = message;
      sectionToast.classList.add("show");
      toastTimer = setTimeout(() => sectionToast.classList.remove("show"), randi(2000, 3000));
    }

    const mobileNav = document.getElementById("mobile-nav");
    const mobileToggle = mobileNav ? mobileNav.querySelector(".mobile-nav-toggle") : null;

    function setMobileNavOpen(open) {
      if (!mobileNav || !mobileToggle) return;
      mobileNav.classList.toggle("open", open);
      mobileToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        const next = !mobileNav.classList.contains("open");
        setMobileNavOpen(next);
      });

      document.addEventListener("click", (evt) => {
        if (!mobileNav.classList.contains("open")) return;
        if (evt.target.closest("#mobile-nav")) return;
        setMobileNavOpen(false);
      });
    }

    document.addEventListener("click", (evt) => {
      const btn = evt.target.closest("[data-scroll]");
      if (!btn) return;
      const selector = btn.getAttribute("data-scroll");
      if (!selector) return;

      const target = document.querySelector(selector);
      if (!target) return;

      evt.preventDefault();

      const tape = document.querySelector(".warning-tape");
      const tapeOffset = tape ? tape.offsetHeight : 54;
      const navOffset = mobileNav && window.getComputedStyle(mobileNav).display !== "none" ? mobileNav.offsetHeight : 0;
      const extraOffset = 18;
      const y = Math.max(0, window.scrollY + target.getBoundingClientRect().top - (tapeOffset + navOffset + extraOffset));
      window.scrollTo({ top: y, behavior: "smooth" });

      const label = btn.getAttribute("data-label") || btn.textContent || "РАЗДЕЛ";
      const prefix = Math.random() < 0.5 ? "Вы перешли в раздел:" : "Вы выбрали раздел:";
      showToast(`${prefix} \"${String(label).trim()}\"`);

      if (btn.closest(".mobile-nav-panel")) setMobileNavOpen(false);
    });

    const toTopBtn = document.getElementById("to-top");
    const topHeader = document.querySelector(".top-block");
    const showAfter = topHeader ? Math.max(200, topHeader.offsetHeight - 20) : 420;

    function updateToTop() {
      if (!toTopBtn) return;
      if (window.scrollY > showAfter) toTopBtn.classList.add("show");
      else toTopBtn.classList.remove("show");
    }

    if (toTopBtn) {
      toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        showToast("Возврат в начало архива.");
      });
    }

    window.addEventListener("scroll", updateToTop, { passive: true });
    setTimeout(updateToTop, 50);

    const evidenceVideo = document.getElementById("evidence-video");
    const videoPreview = document.getElementById("video-preview");
    const videoPlayBtn = document.getElementById("video-play");
    const videoLoader = document.querySelector(".video-loader");
    const loaderSub = videoLoader ? videoLoader.querySelector(".loader-sub") : null;

    function buildEvidenceEmbedUrl() {
      const url = new URL("https://www.youtube.com/embed/pBcQz4vBzw4");
      url.searchParams.set("si", "xG4wIkcCFpX1BTMD");
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", "1");
      url.searchParams.set("modestbranding", "1");
      url.searchParams.set("rel", "0");
      url.searchParams.set("showinfo", "0");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("iv_load_policy", "3");
      return url.toString();
    }

    function runVideoDecryptAndPlay() {
      if (!evidenceVideo || !videoLoader || !loaderSub || !videoPreview) return;
      if (evidenceVideo.dataset.loaded === "1") return;

      videoPreview.classList.add("hidden");
      videoLoader.classList.remove("hide");

      const baseText = loaderSub.getAttribute("data-base") || loaderSub.textContent || "РАСШИФРОВКА ФАЙЛА";
      let dots = 0;
      loaderSub.textContent = baseText;

      const tick = setInterval(() => {
        dots = (dots + 1) % 4;
        loaderSub.textContent = `${baseText}${".".repeat(dots)}`;
      }, 450);

      const duration = randi(1000, 1700);
      setTimeout(() => {
        clearInterval(tick);
        evidenceVideo.src = buildEvidenceEmbedUrl();
        evidenceVideo.dataset.loaded = "1";

        videoLoader.classList.add("hide");
      }, duration);
    }

    if (videoPlayBtn) videoPlayBtn.addEventListener("click", runVideoDecryptAndPlay);

    const glitchRunning = new WeakMap();

    function startGlitch(img, baseSrc, glitchSrcs, opts) {
      if (!img) return;
      if (glitchRunning.get(img)) return;

      const options = {
        minCycleDelay: 4000,
        maxCycleDelay: 7000,
        minSteps: 6,
        maxSteps: 10,
        minStepDelay: 250,
        maxStepDelay: 350,
        ...opts
      };

      const pool = [baseSrc, ...glitchSrcs];

      function applyJitter() {
        img.classList.add("glitching");
        img.style.transform = `translate(${rand(-2.6, 2.6).toFixed(2)}px, ${rand(-2.2, 2.2).toFixed(2)}px) rotate(${rand(-0.6, 0.6).toFixed(2)}deg)`;
        img.style.filter = `contrast(${rand(1.0, 1.45).toFixed(2)}) saturate(${rand(0.9, 1.7).toFixed(2)}) hue-rotate(${randi(-10, 10)}deg)`;
        img.style.opacity = String(rand(0.86, 1.0).toFixed(2));
      }

      function clearJitter() {
        img.classList.remove("glitching");
        img.style.transform = "";
        img.style.filter = "";
        img.style.opacity = "";
      }

      function runCycle() {
        if (!img.isConnected) return;
        glitchRunning.set(img, true);

        const steps = randi(options.minSteps, options.maxSteps);
        let idx = 0;
        let lastSrc = img.getAttribute("src") || baseSrc;

        function step() {
          if (!img.isConnected) return;
          idx += 1;

          let nextSrc = pool[randi(0, pool.length - 1)];
          if (pool.length > 1) {
            for (let tries = 0; tries < 4 && nextSrc === lastSrc; tries += 1) {
              nextSrc = pool[randi(0, pool.length - 1)];
            }
          }

          lastSrc = nextSrc;
          img.src = nextSrc;
          applyJitter();

          const delay = randi(options.minStepDelay, options.maxStepDelay);
          if (idx >= steps) {
            setTimeout(() => {
              img.src = baseSrc;
              clearJitter();
              glitchRunning.set(img, false);
              setTimeout(runCycle, randi(options.minCycleDelay, options.maxCycleDelay));
            }, delay);
            return;
          }

          setTimeout(step, delay);
        }

        step();
      }

      setTimeout(runCycle, randi(options.minCycleDelay, options.maxCycleDelay));
    }

    startGlitch(
      document.getElementById("album-cover"),
      "assets/images/obloga.jpg",
      ["assets/images/obloga2.PNG", "assets/images/obloga3.PNG"],
      { minSteps: 6, maxSteps: 10, minStepDelay: 250, maxStepDelay: 350 }
    );

    startGlitch(
      document.getElementById("suspect-akaka"),
      "assets/images/akaka.JPEG",
      ["assets/images/akaka1.PNG", "assets/images/akaka2.PNG", "assets/images/akaka3.PNG"],
      { minCycleDelay: 3500, maxCycleDelay: 6000, minSteps: 7, maxSteps: 12, minStepDelay: 180, maxStepDelay: 260 }
    );

    startGlitch(
      document.getElementById("suspect-maksim"),
      "assets/images/maksim.JPEG",
      ["assets/images/maksim1.PNG", "assets/images/maksim2.PNG", "assets/images/maksim3.PNG"],
      { minCycleDelay: 3500, maxCycleDelay: 6000, minSteps: 7, maxSteps: 12, minStepDelay: 180, maxStepDelay: 260 }
    );
