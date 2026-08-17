(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) {
    nodes.forEach(function (el) {
      el.classList.add("is-static");
    });
    return;
  }

  function rewind(el, type) {
    el.style.opacity = "0";
    if (type === "fade-up") {
      el.style.transform = "translateY(1.5rem)";
      return;
    }
    el.style.webkitMaskRepeat = "no-repeat";
    el.style.maskRepeat = "no-repeat";
    el.style.webkitMaskComposite = "exclude";
    el.style.maskComposite = "exclude";
    if (type === "wipe-right") {
      el.style.webkitMaskImage = "linear-gradient(90deg, black 100%, transparent 100%)";
      el.style.maskImage = "linear-gradient(90deg, black 100%, transparent 100%)";
      el.style.webkitMaskPosition = "0% 0%";
      el.style.maskPosition = "0% 0%";
      el.style.webkitMaskSize = "0% 100%";
      el.style.maskSize = "0% 100%";
      return;
    }
    if (type === "wipe-reverse-diagonal") {
      el.style.webkitMaskImage = "linear-gradient(135deg, transparent 50%, black 50%)";
      el.style.maskImage = "linear-gradient(135deg, transparent 50%, black 50%)";
      el.style.webkitMaskPosition = "100% 100%";
      el.style.maskPosition = "100% 100%";
    } else {
      el.style.webkitMaskImage = "linear-gradient(45deg, black 50%, transparent 50%)";
      el.style.maskImage = "linear-gradient(45deg, black 50%, transparent 50%)";
      el.style.webkitMaskPosition = "0% 100%";
      el.style.maskPosition = "0% 100%";
    }
    el.style.webkitMaskSize = "0% 0%";
    el.style.maskSize = "0% 0%";
  }

  function play(el, type, speed) {
    el.classList.add("is-in");
    var duration = speed || 900;
    if (type === "fade-up") {
      el.animate(
        [
          { opacity: 0, transform: "translateY(1.5rem)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: duration, easing: "ease", fill: "forwards" }
      );
      return;
    }
    var fromSize = type === "wipe-right" ? "0% 100%" : "0% 0%";
    var toSize = type === "wipe-right" ? "110% 110%" : "220% 220%";
    el.style.opacity = "1";
    el.animate([{ maskSize: fromSize }, { maskSize: toSize }], {
      duration: duration,
      easing: "ease",
      fill: "forwards",
    });
    el.animate([{ webkitMaskSize: fromSize }, { webkitMaskSize: toSize }], {
      duration: duration,
      easing: "ease",
      fill: "forwards",
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        var type = el.getAttribute("data-reveal") || "fade-up";
        var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
        var speed = parseInt(el.getAttribute("data-speed") || "0", 10) || (type.indexOf("wipe") === 0 ? 900 : 700);
        window.setTimeout(function () {
          play(el, type, speed);
        }, delay);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach(function (el) {
    rewind(el, el.getAttribute("data-reveal") || "fade-up");
    observer.observe(el);
  });
})();
