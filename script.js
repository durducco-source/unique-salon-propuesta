(function () {
  var S = window.SALON || {};
  var igUrl = "https://www.instagram.com/" + S.instagram + "/";
  var igDm = "https://ig.me/m/" + S.instagram;
  var waUrl = S.whatsapp
    ? "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(S.whatsappMessage || "")
    : igDm;

  function each(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  // Enlaces de contacto
  each("[data-ig]", function (a) {
    a.href = igUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });
  each("[data-ig-dm]", function (a) { a.href = igDm; });
  each("[data-wa]", function (a) { a.href = waUrl; });
  each("[data-ig-handle]", function (el) { el.textContent = "@" + S.instagram; });
  each("[data-wa-label]", function (el) {
    el.textContent = S.whatsapp ? "+" + S.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4") : "WhatsApp (próximamente)";
  });

  // Año del pie
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function closeNav() {
    document.body.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });

  // Cabecera al hacer scroll
  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    document.body.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Pestañas de servicios
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !on;
        panel.classList.toggle("is-active", on);
      });
    });
  });

  // Aparición suave al hacer scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    each(".section__head, .service-panel, .gallery__item, .about__media, .about__text, .review, .info-block, .contact__map", function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
