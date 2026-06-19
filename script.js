/* ====================================================================
   NOVA AI — INTERACTIONS
   ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollReveal();
  initIgniteDemo();
  initStickyNavShadow();
});

/* ---------------------------------------------------------------
   Mobile nav toggle
---------------------------------------------------------------- */
function initMobileNav() {
  const burger = document.getElementById("burgerBtn");
  const nav = document.querySelector(".nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu when a link is tapped
  document.querySelectorAll(".nav__mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------------
   Scroll reveal — fades sections in as they enter the viewport
---------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".feature-card, .how__step, .price-card, .testimonial blockquote, .faq__item",
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   Signature moment: the "ignite" transform demo
   - Hero word "unfinished" lights up on load
   - Burst graphic fades in behind the demo card
   - Clicking "Ignite a document" replays the chaos -> structure reveal
---------------------------------------------------------------- */
function initIgniteDemo() {
  const igniteText = document.getElementById("igniteText");
  const burst = document.querySelector(".hero__burst");
  const arrow = document.getElementById("demoArrow");
  const output = document.getElementById("demoOutput");
  const igniteBtn = document.getElementById("igniteBtn");
  const finalCtaBtn = document.getElementById("finalCtaBtn");

  const playIgnite = () => {
    igniteText && igniteText.classList.add("is-ignited");
    burst && burst.classList.add("is-visible");

    // Reset, then replay the arrow + output reveal
    arrow && arrow.classList.remove("is-active");
    output && output.classList.remove("is-visible");

    requestAnimationFrame(() => {
      setTimeout(() => arrow && arrow.classList.add("is-active"), 150);
      setTimeout(() => output && output.classList.add("is-visible"), 420);
    });
  };

  // Play once automatically shortly after load
  setTimeout(playIgnite, 500);

  // Replay on demand from either CTA
  [igniteBtn, finalCtaBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      playIgnite();
      document
        .querySelector(".hero__demo")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

/* ---------------------------------------------------------------
   Subtle shadow on the sticky nav once the page has scrolled
---------------------------------------------------------------- */
function initStickyNavShadow() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 8) {
      nav.style.boxShadow = "0 8px 24px -16px rgba(0,0,0,0.6)";
    } else {
      nav.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
