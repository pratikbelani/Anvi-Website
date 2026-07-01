/* ANVI — interactions */
(function () {
  "use strict";
  var doc = document;

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
      var open = doc.body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
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

  /* ---- Marquee: duplicate track for seamless loop ---- */
  doc.querySelectorAll(".marquee__track").forEach(function (track) {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  /* ---- Menu category filter ---- */
  var tabs = doc.querySelectorAll(".menu-tab");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-target");
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        doc.querySelectorAll(".menu-cat").forEach(function (cat) {
          var show = target === "all" || cat.getAttribute("data-cat") === target;
          cat.style.display = show ? "" : "none";
        });
        var anchor = doc.getElementById("menu-top");
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---- Forms (front-end demo: validate + success state) ---- */
  doc.querySelectorAll("form[data-anvi-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add("sent");
      var ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      // NOTE: wire to a real endpoint (Formspree / CRM / WhatsApp API) — see README.
      try {
        var data = Object.fromEntries(new FormData(form).entries());
        console.log("[ANVI] form submitted (demo):", data);
      } catch (err) {}
    });
  });

  /* ---- Footer year ---- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
