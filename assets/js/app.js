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
