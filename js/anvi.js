/* ANVI — The Invitation · interaction engine (v3, no dependencies) */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  root.classList.add("js");
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia("(pointer: fine)").matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || doc).querySelectorAll(s)); };

  /* ============ entrance veil — a gold arch draws itself (once per session) ============ */
  (function () {
    if (RM || doc.body.hasAttribute("data-noveil")) return;
    try {
      if (sessionStorage.getItem("anvi3")) return;
      sessionStorage.setItem("anvi3", "1");
    } catch (e) { return; }
    var v = doc.createElement("div");
    v.className = "veil";
    v.setAttribute("aria-hidden", "true");
    v.innerHTML =
      '<div class="veil__mark"><svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path class="draw" d="M22 100 V48 A28 30 0 0 1 78 48 V100" stroke="currentColor" stroke-width="1.4"/>' +
      '<path class="draw" d="M30 100 V50 A20 22 0 0 1 70 50 V100" stroke="currentColor" stroke-width="1" style="animation-delay:.15s"/>' +
      '<ellipse class="draw" cx="50" cy="62" rx="9" ry="14" stroke="currentColor" stroke-width="1" style="animation-delay:.3s"/>' +
      '<circle cx="50" cy="65" r="2.8" fill="currentColor"/></svg></div>';
    doc.body.appendChild(v);
    requestAnimationFrame(function () { requestAnimationFrame(function () { v.classList.add("veil--in"); }); });
    setTimeout(function () { v.classList.add("veil--lift"); }, 1500);
    setTimeout(function () { v.parentNode && v.parentNode.removeChild(v); }, 2600);
  })();

  /* ============ header: tint after start, hide on scroll down ============ */
  (function () {
    var hd = $(".hd");
    if (!hd) return;
    var lastY = window.scrollY, tick = false;
    function apply() {
      var y = window.scrollY;
      hd.classList.toggle("hd--tint", y > 24);
      if (y > lastY + 6 && y > 340 && !doc.body.classList.contains("nav-open")) hd.classList.add("hd--hide");
      else if (y < lastY - 4 || y < 340) hd.classList.remove("hd--hide");
      lastY = y;
      var bar = $(".pgbar");
      if (bar) {
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
      }
      tick = false;
    }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(apply); } }, { passive: true });
    window.addEventListener("resize", apply);
    apply();
  })();

  /* ============ mobile nav ============ */
  (function () {
    var burger = $(".burger");
    if (!burger) return;
    $$(".hd__nav .hd__link").forEach(function (a, i) { a.style.setProperty("--i", i); });
    burger.addEventListener("click", function () {
      var open = doc.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.classList.toggle("no-scroll", open);
    });
    $$(".hd__nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        doc.body.classList.remove("nav-open", "no-scroll");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.body.classList.contains("nav-open")) {
        doc.body.classList.remove("nav-open", "no-scroll");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  })();

  /* ============ split display headings into masked words ============ */
  $$("[data-split]").forEach(function (el) {
    var wi = 0;
    function wrapNode(node) {
      if (node.nodeType === 3) {
        var frag = doc.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(" ")); return; }
          var w = doc.createElement("span"); w.className = "w";
          var inner = doc.createElement("span");
          inner.textContent = part;
          inner.style.setProperty("--wi", wi++);
          w.appendChild(inner);
          frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !node.classList.contains("w")) {
        [].slice.call(node.childNodes).forEach(wrapNode);
      }
    }
    [].slice.call(el.childNodes).forEach(wrapNode);
  });

  /* ============ reveal on scroll ============ */
  (function () {
    var els = $$("[data-rv], [data-split]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("rv-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ============ arch slideshow (hero) ============ */
  (function () {
    var slides = $$(".arch__slide");
    if (slides.length < 2 || RM) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("on");
    }, 6500);
  })();

  /* ============ pointer parallax — layered depth on the hero shrine ============ */
  (function () {
    if (RM || !FINE) return;
    var scene = $("[data-plx-scene]");
    if (!scene) return;
    var els = $$("[data-plx]", scene);
    if (!els.length) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    function loop() {
      cx += (tx - cx) * 0.065;
      cy += (ty - cy) * 0.065;
      els.forEach(function (el) {
        var d = parseFloat(el.getAttribute("data-plx")) || 8;
        el.style.transform = "translate3d(" + (-cx * d).toFixed(2) + "px," + (-cy * d).toFixed(2) + "px,0)";
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) requestAnimationFrame(loop);
      else running = false;
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }
    scene.addEventListener("pointermove", function (e) {
      var r = scene.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      kick();
    });
    scene.addEventListener("pointerleave", function () { tx = 0; ty = 0; kick(); });
  })();

  /* ============ door tilt — arches lean toward the hand ============ */
  (function () {
    if (RM || !FINE) return;
    $$(".door").forEach(function (door) {
      var frame = $(".arch-frame", door);
      if (!frame) return;
      door.addEventListener("pointermove", function (e) {
        var r = door.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = "perspective(700px) rotateY(" + (x * 4).toFixed(2) + "deg) rotateX(" + (-y * 3).toFixed(2) + "deg)";
      });
      door.addEventListener("pointerleave", function () { frame.style.transform = ""; });
    });
  })();

  /* ============ marquee: duplicate for seamless loop ============ */
  $$(".mq__t").forEach(function (t) { t.innerHTML += t.innerHTML; });

  /* ============ countdown (data-count="YYYY-MM-DD") ============ */
  $$("[data-count]").forEach(function (el) {
    var target = new Date(el.getAttribute("data-count") + "T18:00:00+01:00").getTime();
    var d = $("[data-cd-d]", el), h = $("[data-cd-h]", el), m = $("[data-cd-m]", el), s = $("[data-cd-s]", el);
    var plain = $("[data-cd-days]", el) || (el.hasAttribute("data-cd-days") ? el : null);
    function two(n) { return n < 10 ? "0" + n : "" + n; }
    function tickCd() {
      var diff = Math.max(target - Date.now(), 0);
      var days = Math.floor(diff / 864e5);
      if (plain) plain.textContent = days;
      if (d) d.textContent = two(days);
      if (h) h.textContent = two(Math.floor(diff / 36e5) % 24);
      if (m) m.textContent = two(Math.floor(diff / 6e4) % 60);
      if (s) s.textContent = two(Math.floor(diff / 1e3) % 60);
    }
    tickCd();
    setInterval(tickCd, (h || m || s) ? 1000 : 6e4);
  });

  /* ============ gallery lightbox ============ */
  (function () {
    var links = $$(".gal a");
    if (!links.length) return;
    var lb, img, cap, capN, idx = 0, lastFocus;
    function build() {
      lb = doc.createElement("div");
      lb.className = "lb";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Image viewer");
      lb.innerHTML = '<figure><img alt=""><figcaption><span class="n"></span><span class="t"></span></figcaption></figure>' +
        '<button class="lb-p" aria-label="Previous image">&#8592;</button>' +
        '<button class="lb-n" aria-label="Next image">&#8594;</button>' +
        '<button class="lb-x" aria-label="Close viewer">&#215;</button>';
      doc.body.appendChild(lb);
      img = $("img", lb); cap = $(".t", lb); capN = $(".n", lb);
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      $(".lb-x", lb).addEventListener("click", close);
      $(".lb-p", lb).addEventListener("click", function () { show(idx - 1); });
      $(".lb-n", lb).addEventListener("click", function () { show(idx + 1); });
      doc.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(idx - 1);
        if (e.key === "ArrowRight") show(idx + 1);
        if (e.key === "Tab") {
          var f = $$("button", lb);
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && doc.activeElement === first) { last.focus(); e.preventDefault(); }
          else if (!e.shiftKey && doc.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      });
    }
    function show(i) {
      idx = (i + links.length) % links.length;
      var im = $("img", links[idx]);
      if (!im) return;
      img.src = im.currentSrc || im.src;
      img.alt = im.alt || "";
      cap.textContent = im.alt || "";
      capN.textContent = (idx + 1) + " / " + links.length;
    }
    function open(i) {
      if (!lb) build();
      lastFocus = doc.activeElement;
      show(i);
      lb.classList.add("open");
      doc.body.classList.add("no-scroll");
      $(".lb-x", lb).focus();
    }
    function close() {
      lb.classList.remove("open");
      doc.body.classList.remove("no-scroll");
      lastFocus && lastFocus.focus && lastFocus.focus();
    }
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) { e.preventDefault(); open(i); });
    });
  })();

  /* ============ menu book: search + filters + scrollspy ============ */
  (function () {
    var book = $("[data-book]");
    if (!book) return;
    var chapters = $$(".mch", book);
    var search = $("#msearch");
    var count = $("#mcount");
    var empty = $("#mempty");
    var cuisineChips = $$("[data-cuisine]");
    var vegChip = $("[data-veg]");
    var sigChip = $("[data-sig]");
    var railLinks = $$(".book__rail a");
    var cuisine = "all", vegOnly = false, sigOnly = false;

    function apply() {
      var q = (search && search.value || "").trim().toLowerCase();
      var total = 0;
      chapters.forEach(function (ch) {
        var okC = cuisine === "all" || ch.getAttribute("data-cuisine") === cuisine;
        var vis = 0;
        $$(".mi", ch).forEach(function (mi) {
          var ok = okC &&
            (!vegOnly || mi.hasAttribute("data-veg")) &&
            (!sigOnly || mi.hasAttribute("data-sig")) &&
            (!q || mi.textContent.toLowerCase().indexOf(q) !== -1);
          mi.classList.toggle("hide", !ok);
          if (ok) vis++;
        });
        $$(".mgrp", ch).forEach(function (g) {
          var any = $$(".mi", g).some(function (mi) { return !mi.classList.contains("hide"); });
          g.classList.toggle("hide", !any);
        });
        ch.classList.toggle("hide", vis === 0);
        var c = $(".mch__head .c", ch);
        if (c) c.textContent = vis + (vis === 1 ? " dish" : " dishes");
        total += vis;
      });
      railLinks.forEach(function (a) {
        var target = $(a.getAttribute("href"));
        a.classList.toggle("hide", !!target && target.classList.contains("hide"));
      });
      if (count) {
        var f = [];
        if (cuisine !== "all") f.push(cuisine === "indian" ? "North Indian" : "Pan-Asian");
        if (vegOnly) f.push("vegetarian");
        if (sigOnly) f.push("signatures");
        if (q) f.push("“" + (search.value || "").trim() + "”");
        count.textContent = total + (total === 1 ? " dish" : " dishes") + (f.length ? " · " + f.join(" · ") : "");
      }
      if (empty) empty.classList.toggle("hide", total > 0);
    }
    cuisineChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        cuisine = chip.getAttribute("data-cuisine");
        cuisineChips.forEach(function (c) { c.classList.toggle("on", c === chip); });
        apply();
      });
    });
    vegChip && vegChip.addEventListener("click", function () {
      vegOnly = !vegOnly;
      vegChip.classList.toggle("on", vegOnly);
      vegChip.setAttribute("aria-pressed", vegOnly ? "true" : "false");
      apply();
    });
    sigChip && sigChip.addEventListener("click", function () {
      sigOnly = !sigOnly;
      sigChip.classList.toggle("on", sigOnly);
      sigChip.setAttribute("aria-pressed", sigOnly ? "true" : "false");
      apply();
    });
    if (search) {
      var deb;
      search.addEventListener("input", function () { clearTimeout(deb); deb = setTimeout(apply, 120); });
    }
    var clear = $("#mclear");
    clear && clear.addEventListener("click", function () {
      if (search) search.value = "";
      cuisine = "all"; vegOnly = false; sigOnly = false;
      cuisineChips.forEach(function (c) { c.classList.toggle("on", c.getAttribute("data-cuisine") === "all"); });
      vegChip && (vegChip.classList.remove("on"), vegChip.setAttribute("aria-pressed", "false"));
      sigChip && (sigChip.classList.remove("on"), sigChip.setAttribute("aria-pressed", "false"));
      apply();
      search && search.focus();
    });
    if ("IntersectionObserver" in window && railLinks.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          railLinks.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      chapters.forEach(function (ch) { spy.observe(ch); });
    }
    apply();
  })();

  /* ============ segmented switcher ============ */
  $$(".seg").forEach(function (seg) {
    var btns = $$("button", seg);
    var thumb = doc.createElement("span");
    thumb.className = "seg__thumb";
    thumb.setAttribute("aria-hidden", "true");
    seg.appendChild(thumb);
    function move(b) {
      thumb.style.left = b.offsetLeft + "px";
      thumb.style.width = b.offsetWidth + "px";
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-selected", "false"); });
        b.classList.add("on");
        b.setAttribute("aria-selected", "true");
        move(b);
        var target = b.getAttribute("data-panel");
        $$("[data-seg-panel]").forEach(function (p) {
          p.classList.toggle("hide", p.getAttribute("data-seg-panel") !== target);
        });
      });
    });
    function fromHash() {
      var want = location.hash.replace("#", "");
      var btn = btns.filter(function (b) { return b.getAttribute("data-panel") === want; })[0];
      btn && btn.click();
    }
    window.addEventListener("hashchange", fromHash);
    if (location.hash) fromHash();
    requestAnimationFrame(function () {
      var b = $(".on", seg) || btns[0];   /* re-query — a deep link may have switched tabs since init */
      b && move(b);
    });
    window.addEventListener("resize", function () { var b = $(".on", seg); b && move(b); });
  });

  /* ============ steppers ============ */
  $$(".stepper").forEach(function (st) {
    var input = $("input", st);
    $$("button", st).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = parseInt(input.value || "2", 10) + (b.hasAttribute("data-up") ? 1 : -1);
        var min = parseInt(input.min || "1", 10), max = parseInt(input.max || "40", 10);
        input.value = Math.min(Math.max(v, min), max);
      });
    });
  });

  /* ============ forms — delivered to the house inbox via Web3Forms ============ */
  /* The key is public by design: it can only send mail TO the inbox it belongs to. */
  var FORM_KEY = "PASTE-WEB3FORMS-KEY-HERE";
  $$("form[data-anvi]").forEach(function (form) {
    var ok = $(".fok", form);
    ok && ok.setAttribute("role", "status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      /* demo fallback until the key is installed */
      if (!/^[0-9a-f]{8}-[0-9a-f-]{20,}$/i.test(FORM_KEY)) {
        form.classList.add("sent");
        ok && ok.classList.add("show");
        try { console.log("[ANVI] form (demo):", Object.fromEntries(new FormData(form).entries())); } catch (err) {}
        return;
      }
      var data = Object.fromEntries(new FormData(form).entries());
      if (data.botcheck) return;               /* honeypot — drop bots silently */
      delete data.botcheck;
      data.access_key = FORM_KEY;
      data.subject = form.getAttribute("data-subject") || "New enquiry — anvilagos.com";
      data.from_name = "ANVI Website";
      if (data.email) data.replyto = data.email;
      data.page = location.href;
      var btn = $('[type="submit"]', form);
      var oldBtn = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      var stale = $(".ferr", form);
      stale && stale.remove();
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (!res.success) throw new Error(res.message || "send failed");
        form.classList.add("sent");
        ok && ok.classList.add("show");
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.innerHTML = oldBtn; }
        var p = doc.createElement("p");
        p.className = "ferr";
        p.setAttribute("role", "alert");
        p.style.cssText = "flex:1 1 100%;font-family:var(--f-ui);font-size:.72rem;letter-spacing:.08em;color:#C96F5A;text-align:center;margin-top:.7rem";
        p.innerHTML = "That didn&rsquo;t go through &mdash; please try again, or <a href=\"https://wa.me/2348110438371\" target=\"_blank\" rel=\"noopener\" style=\"border-bottom:1px solid currentColor\">WhatsApp us</a> directly.";
        form.appendChild(p);
      });
    });
  });

  /* date inputs — no past dates */
  (function () {
    var d = new Date();
    var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    $$('input[type="date"]').forEach(function (i) { if (!i.min) i.min = iso; });
  })();

  /* ============ back to top ============ */
  (function () {
    if (doc.body.hasAttribute("data-nochrome")) return;
    var b = doc.createElement("button");
    b.className = "backtop";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = "&#8593;";
    doc.body.appendChild(b);
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); });
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () { b.classList.toggle("show", window.scrollY > 900); tick = false; });
    }, { passive: true });
  })();

  /* ============ take a peek (coming soon) ============ */
  (function () {
    var peek = $(".peek");
    if (!peek) return;
    /* radius is computed per event, not at init — a backgrounded/zero-width
       tab at load would otherwise freeze it at 0 */
    function radius() { return (Math.min(window.innerWidth, 520) * 0.21) || 110; }
    function setVars(x, y, r) {
      peek.style.setProperty("--peek-x", x + "px");
      peek.style.setProperty("--peek-y", y + "px");
      peek.style.setProperty("--peek-r", r + "px");
    }
    if (RM) { setVars(window.innerWidth / 2, window.innerHeight * 0.4, radius()); peek.classList.add("peeking"); return; }
    var tx = window.innerWidth / 2, ty = window.innerHeight * 0.4, cx = tx, cy = ty, cr = 0, tr = 0;
    (function loop() {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12; cr += (tr - cr) * 0.1;
      setVars(cx, cy, cr);
      /* class gates the mask: solid cover whenever the hole is closed */
      peek.classList.toggle("peeking", cr > 1.5);
      requestAnimationFrame(loop);
    })();
    function at(e) {
      var p = e.touches ? e.touches[0] : e;
      var rect = peek.getBoundingClientRect();
      tx = p.clientX - rect.left; ty = p.clientY - rect.top;
    }
    function openPeek(e) { at(e); tr = radius(); }
    peek.addEventListener("pointermove", openPeek);
    peek.addEventListener("pointerdown", openPeek);
    peek.addEventListener("pointerleave", function () { tr = 0; });
    peek.addEventListener("touchstart", openPeek, { passive: true });
    peek.addEventListener("touchmove", openPeek, { passive: true });
    peek.addEventListener("touchend", function () { tr = 0; });
  })();

  /* footer year */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
