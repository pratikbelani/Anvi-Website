/* ANVI — interactions */
(function () {
  "use strict";
  var doc = document;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Entrance veil (once per session, skipped on coming-soon & reduced motion) ---- */
  (function () {
    if (doc.body.classList.contains("cs") || doc.body.classList.contains("nf")) return;
    if (reducedMotion) return;
    try {
      if (sessionStorage.getItem("anviIntro")) return;
      sessionStorage.setItem("anviIntro", "1");
    } catch (e) { return; }
    var v = doc.createElement("div");
    v.className = "intro-veil";
    v.setAttribute("aria-hidden", "true");
    v.innerHTML = '<img src="assets/logo/anvi-peacock-peach.svg" alt="">';
    doc.body.appendChild(v);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { v.classList.add("go"); });
    });
    setTimeout(function () { v.classList.add("lift"); }, 950);
    setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 1900);
  })();

  /* ---- Header: sits below the announce bar, slides up to stick on scroll ---- */
  var header = doc.querySelector(".site-header");
  var announce = doc.querySelector(".announce");
  var positionHeader = function () {
    if (!header) return;
    var ah = announce ? announce.offsetHeight : 0;
    doc.documentElement.style.setProperty("--ann-h", ah + "px");
    var y = window.scrollY;
    if (y >= ah - 1) {
      header.style.top = "0px";
      header.classList.add("scrolled");
    } else {
      header.style.top = (ah - y) + "px";
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", positionHeader, { passive: true });
  window.addEventListener("resize", positionHeader);
  positionHeader();

  /* ---- Mobile nav ---- */
  var toggle = doc.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      doc.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", doc.body.classList.contains("menu-open") ? "true" : "false");
    });
    doc.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { doc.body.classList.remove("menu-open"); });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Hero parallax (desktop, motion-safe) ---- */
  (function () {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    var img = doc.querySelector(".hero__media img, .pagehero__media img");
    if (!img) return;
    img.style.transform = "scale(1.08)";
    var ticking = false;
    var apply = function () {
      var y = Math.min(window.scrollY * 0.14, 56);
      img.style.transform = "scale(1.08) translateY(" + y + "px)";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
  })();

  /* ---- Marquee: duplicate track for seamless loop ---- */
  doc.querySelectorAll(".marquee__track").forEach(function (track) {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  /* ---- Gallery lightbox ---- */
  (function () {
    var links = [].slice.call(doc.querySelectorAll(".gallery a"));
    if (!links.length) return;
    var lb = null, lbImg, lbCap, idx = 0, lastFocus = null;
    function build() {
      lb = doc.createElement("div");
      lb.className = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Image viewer");
      lb.innerHTML =
        '<button class="lb-prev" aria-label="Previous image">&#8592;</button>' +
        '<figure><img alt=""><figcaption></figcaption></figure>' +
        '<button class="lb-next" aria-label="Next image">&#8594;</button>' +
        '<button class="lb-close" aria-label="Close viewer">&#215;</button>';
      doc.body.appendChild(lb);
      lbImg = lb.querySelector("img");
      lbCap = lb.querySelector("figcaption");
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      lb.querySelector(".lb-close").addEventListener("click", close);
      lb.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
      lb.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
      doc.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(idx - 1);
        if (e.key === "ArrowRight") show(idx + 1);
      });
    }
    function show(i) {
      idx = (i + links.length) % links.length;
      var im = links[idx].querySelector("img");
      if (!im) return;
      lbImg.src = im.currentSrc || im.src;
      lbImg.alt = im.alt || "";
      lbCap.textContent = im.alt || "";
    }
    function open(i) {
      if (!lb) build();
      lastFocus = doc.activeElement;
      show(i);
      lb.classList.add("open");
      doc.body.classList.add("no-scroll");
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      doc.body.classList.remove("no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) { e.preventDefault(); open(i); });
    });
  })();

  /* ---- Menu: cuisine tabs + live search, combined ---- */
  (function () {
    var cats = [].slice.call(doc.querySelectorAll(".menu-cat"));
    if (!cats.length) return;
    var tabs = [].slice.call(doc.querySelectorAll(".menu-tab[data-target]"));
    var search = doc.getElementById("menu-search");
    var countEl = doc.getElementById("menu-count");
    var emptyEl = doc.getElementById("menu-empty");
    var clearBtn = doc.getElementById("menu-clear");
    var active = "all";

    function apply() {
      var q = search && search.value ? search.value.trim().toLowerCase() : "";
      var total = 0;
      cats.forEach(function (cat) {
        var inCuisine = active === "all" || cat.getAttribute("data-cat") === active;
        var visible = 0;
        cat.querySelectorAll(".menu-item").forEach(function (item) {
          var show = inCuisine && (!q || item.textContent.toLowerCase().indexOf(q) !== -1);
          item.style.display = show ? "" : "none";
          if (show) visible++;
        });
        // hide sub-headings whose group has no visible dishes
        cat.querySelectorAll(".sub").forEach(function (sub) {
          var list = sub.nextElementSibling;
          if (list && list.classList.contains("menu-items")) {
            var any = [].some.call(list.querySelectorAll(".menu-item"), function (it) {
              return it.style.display !== "none";
            });
            sub.style.display = any ? "" : "none";
          }
        });
        cat.style.display = visible ? "" : "none";
        total += visible;
      });
      if (countEl) countEl.textContent = q || active !== "all"
        ? total + (total === 1 ? " dish" : " dishes") + (q ? " for “" + search.value.trim() + "”" : "")
        : total + " dishes";
      if (emptyEl) emptyEl.classList.toggle("hidden", total > 0);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        active = tab.getAttribute("data-target");
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        apply();
        var anchor = doc.getElementById("menu-top");
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    if (search) {
      var deb;
      search.addEventListener("input", function () {
        clearTimeout(deb);
        deb = setTimeout(apply, 120);
      });
    }
    if (clearBtn) clearBtn.addEventListener("click", function () {
      if (search) { search.value = ""; search.focus(); }
      apply();
    });
    apply();
  })();

  /* ---- Back to top ---- */
  (function () {
    if (doc.body.classList.contains("cs") || doc.body.classList.contains("nf")) return;
    var btn = doc.createElement("button");
    btn.className = "backtop";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "&#8593;";
    doc.body.appendChild(btn);
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        btn.classList.toggle("show", window.scrollY > 700);
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ---- Forms (front-end demo: validate + success state) ---- */
  doc.querySelectorAll("form[data-anvi-form]").forEach(function (form) {
    var ok = form.querySelector(".form-success");
    if (ok) ok.setAttribute("role", "status"); // announce to screen readers
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add("sent");
      if (ok) ok.classList.add("show");
      // NOTE: wire to a real endpoint (Formspree / CRM / WhatsApp API) — see README.
      try {
        var data = Object.fromEntries(new FormData(form).entries());
        console.log("[ANVI] form submitted (demo):", data);
      } catch (err) {}
    });
  });

  /* ---- Date inputs: no past dates ---- */
  (function () {
    var d = new Date();
    var iso = d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
    doc.querySelectorAll('input[type="date"]').forEach(function (i) {
      if (!i.min) i.min = iso;
    });
  })();

  /* ---- Footer year ---- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
