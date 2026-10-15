/**
 * ==========================================================================
 * Kinetic Portfolio & Zigzag Showcase - Shared Utility Script
 * Handles universal navigation, shared footer with paper form, and accessibility.
 * ==========================================================================
 */

/**
 * Global form submission handler
 * @param {Object} data - Cleaned form field values
 * @returns {Promise<void>} resolves on success, rejects with an Error on failure
 */
async function submitForm(data) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch (_) {
      /* keep default message */
    }
    throw new Error(message);
  }
}

/**
 * Resolve relative URL prefixes (pages nested under /posts/ need "../")
 */
function siteBase() {
  return /\/posts\//.test(window.location.pathname) ? "../" : "";
}

function withBase(href) {
  if (/^(https?:|\/|#|mailto:)/.test(href)) return href;
  return siteBase() + href;
}

/**
 * Universal Header & Navigation Synchronization
 */
function initSharedNav() {
  const SITE = window.SITE;
  if (!SITE) return;

  const navContainer = document.querySelector(".site-header");
  if (!navContainer) return;

  const logoEl = navContainer.querySelector(".nav__logo");
  if (logoEl && SITE.brand) {
    const logoText = logoEl.querySelector(".nav__logo-text");
    if (logoText) {
      logoText.textContent = SITE.brand.name;
    } else if (!logoEl.querySelector("img")) {
      logoEl.textContent = SITE.brand.name;
    }
    logoEl.setAttribute("href", withBase("index.html#hero"));
  }

  const navList = navContainer.querySelector(".nav__list");
  if (!navList) return;

  const pathname = window.location.pathname.toLowerCase();
  const isIndexPage = pathname.endsWith("index.html") || pathname === "/" || pathname === "";

  const navItems = (SITE.navigation && SITE.navigation.length)
    ? SITE.navigation.map(item => ({ ...item, id: item.label.toLowerCase() }))
    : [
        { label: "Work", href: "index.html#work", id: "work" },
        { label: "Design", href: "/design.html", id: "design" },
        { label: "Writing", href: "/writing.html", id: "writing" },
        { label: "About", href: "404.html", id: "about" },
        { label: "Contact", href: "index.html#contact", id: "contact" }
      ];

  navList.innerHTML = navItems
    .map((item) => {
      let isCurrent = false;
      if (item.id === "work" && isIndexPage) {
        isCurrent = true;
      }

      const activeAttr = isCurrent ? ' aria-current="page" class="nav__link is-active"' : ' class="nav__link"';
      return `<li><a href="${withBase(item.href)}"${activeAttr}>${item.label}</a></li>`;
    })
    .join("");

  // Attach special link behaviors
  navList.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href") || "";

    // Contact link: if current page has id="contact", scroll to it smoothly
    if (href.includes("#contact")) {
      link.addEventListener("click", (e) => {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          e.preventDefault();
          contactEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Work link: if current page has id="work", scroll to it smoothly
    if (href.includes("#work")) {
      link.addEventListener("click", (e) => {
        const workEl = document.getElementById("work");
        if (workEl) {
          e.preventDefault();
          workEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Design, Writing, About links go to 404.html
    if (href.includes("404.html")) {
      link.addEventListener("click", (e) => {
        if (!window.location.pathname.endsWith("404.html")) {
          e.preventDefault();
          window.location.href = "404.html";
        }
      });
    }
  });
}

/**
 * Universal Footer Generator with Paper-Stack Form
 */
function buildFooter(container) {
  const SITE = window.SITE || {};
  const footerEl = container || document.querySelector(".site-footer");
  if (!footerEl) return;

  const base = siteBase();
  const currentYear = new Date().getFullYear();
  const brandName = SITE.brand ? SITE.brand.name : "Your Name";
  const footerDesc = SITE.footer ? SITE.footer.description : "A brief concluding sentence about your work and availability.";
  const copyrightText = SITE.footer && SITE.footer.copyrightName
    ? SITE.footer.copyrightName
    : `${brandName}. All rights reserved.`;

  const optionsHtml = (SITE.contact && SITE.contact.options)
    ? SITE.contact.options.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join("")
    : `
      <option value="option-1">Option One</option>
      <option value="option-2">Option Two</option>
      <option value="option-3">Option Three</option>
      <option value="option-4">Option Four</option>
    `;

  // 1) Contact section with the paper-stack form — inserted before the footer
  //    so the white card straddles the cream/black boundary like the home page.
  if (!document.getElementById("contact")) {
    const section = document.createElement("section");
    section.className = "contact-section";
    section.id = "contact";
    section.innerHTML = `
      <div class="contact-inner">
        <div class="paper-stack" id="paper-stack">
      <!-- paper--back: empty sheet shifted and rotated -->
      <div class="paper-sheet paper--back" aria-hidden="true"></div>

      <!-- paper--front: the contact form -->
      <div class="paper-sheet paper--front">
        <form class="contact-form" id="contact-form" novalidate>
          <!-- Honeypot Field for Spam Prevention -->
          <div style="display:none;" aria-hidden="true">
            <label for="field-trap">Do not fill this</label>
            <input type="text" id="field-trap" name="_bot_trap" tabindex="-1" autocomplete="off">
          </div>

          <!-- Full Name -->
          <div class="form-field">
            <div class="floating-group">
              <input type="text" id="field-name" name="name" class="form-input" placeholder=" " required autocomplete="name">
              <label for="field-name" class="floating-label">Full name</label>
            </div>
            <span class="field-error" id="error-name" role="alert"></span>
          </div>

          <!-- Email Address -->
          <div class="form-field">
            <div class="floating-group">
              <input type="email" id="field-email" name="email" class="form-input" placeholder=" " required autocomplete="email">
              <label for="field-email" class="floating-label">Email address</label>
            </div>
            <span class="field-error" id="error-email" role="alert"></span>
          </div>

          <!-- Dropdown: What do you need? -->
          <div class="form-field">
            <div class="floating-group is-active">
              <select id="field-need" name="need" class="form-select" aria-label="What do you need?">
                ${optionsHtml}
              </select>
              <label for="field-need" class="floating-label">What do you need?</label>
            </div>
          </div>

          <!-- Message -->
          <div class="form-field form-field--message">
            <div class="floating-group">
              <textarea id="field-message" name="message" class="form-textarea" placeholder=" " required minlength="10"></textarea>
              <label for="field-message" class="floating-label">Message</label>
            </div>
            <span class="field-error" id="error-message" role="alert"></span>
          </div>

          <!-- Form-level error -->
          <span class="field-error" id="error-form" role="alert"></span>

          <!-- Full-width Submit Button in --sage with Arrow -->
          <button type="submit" class="form-submit-btn" id="form-submit-btn">
            <span>Send inquiry</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        <!-- Success State -->
        <div class="form-success-state" id="contact-success" role="status" aria-live="polite">
          <div class="success-check-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 class="success-title">Message received.</h3>
          <p class="success-body">Thank you for reaching out. I will get back to you shortly.</p>
        </div>
      </div>
    </div>
      </div>
    `;
    footerEl.parentNode.insertBefore(section, footerEl);
  }

  // 2) Footer content — same structure and classes as the home page footer
  const pages = (SITE.footer && SITE.footer.pages) || [
    { label: "Work", href: "index.html#work" },
    { label: "Design", href: "/design.html" },
    { label: "Writing", href: "/writing.html" },
    { label: "Contact", href: "index.html#contact" }
  ];
  const social = (SITE.footer && SITE.footer.social) || [
    { label: "GitHub", href: "https://github.com/Arem-ee" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/toromadeabdulrahman" },
    { label: "X", href: "https://x.com/Arem_ee" }
  ];

  const pagesHtml = pages
    .map((p) => `<li><a href="${p.href.includes("#contact") ? "#contact" : withBase(p.href)}" class="footer-link">${p.label}</a></li>`)
    .join("");
  const socialHtml = social
    .map((s) => `<li><a href="${s.href}" class="footer-link" target="_blank" rel="noopener noreferrer">${s.label}</a></li>`)
    .join("");

  footerEl.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo"><img src="${base}assets/logo.svg" alt="" class="footer-logo-mark" width="24" height="24"><span class="footer-logo-text">${brandName}</span></span>
        <p class="footer-sentence">${footerDesc}</p>
      </div>
      <div class="footer-links">
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Pages</h4>
          <ul class="footer-link-list" id="footer-pages-list">${pagesHtml}</ul>
        </div>
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Social</h4>
          <ul class="footer-link-list" id="footer-social-list">${socialHtml}</ul>
        </div>
      </div>
      <div class="footer-meta">
        <p class="footer-copyright" id="copyright-text">&copy; <span id="copyright-year">${currentYear}</span> ${copyrightText}</p>
        <a href="#hero" class="footer-back-top" id="back-to-top">Back to top <span aria-hidden="true">&uarr;</span></a>
      </div>
    </div>
  `;

  initForm();
}

/**
 * Contact Form Logic, Validation & Entrance Animation
 */
function initForm() {
  const form = document.getElementById("contact-form");
  const successState = document.getElementById("contact-success");
  if (!form) return;

  const nameInput = document.getElementById("field-name");
  const emailInput = document.getElementById("field-email");
  const needSelect = document.getElementById("field-need");
  const messageInput = document.getElementById("field-message");
  const botTrap = document.getElementById("field-trap");
  const submitBtn = document.getElementById("form-submit-btn");

  const inputs = [nameInput, emailInput, needSelect, messageInput];
  inputs.forEach((input) => {
    if (!input) return;

    function checkActive() {
      const parent = input.closest(".floating-group");
      if (!parent) return;
      if (input.value && input.value.trim().length > 0) {
        parent.classList.add("is-active");
      } else {
        parent.classList.remove("is-active");
      }
    }

    input.addEventListener("input", checkActive);
    input.addEventListener("change", checkActive);
    input.addEventListener("focus", () => {
      const parent = input.closest(".floating-group");
      if (parent) parent.classList.add("is-active");
    });
    input.addEventListener("blur", checkActive);
    checkActive();
  });

  function validateField(input, errorId, validatorFn, errorMessage) {
    const errorEl = document.getElementById(errorId);
    const isValid = validatorFn(input.value.trim());

    if (!isValid) {
      if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.classList.add("is-visible");
      }
      return false;
    } else {
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("is-visible");
      }
      return true;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (botTrap && botTrap.value.trim().length > 0) {
      console.warn("Spam submission prevented.");
      return;
    }

    const isNameValid = validateField(
      nameInput,
      "error-name",
      (val) => val.length > 0,
      "Please enter your full name."
    );

    const isEmailValid = validateField(
      emailInput,
      "error-email",
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address."
    );

    const isMessageValid = validateField(
      messageInput,
      "error-message",
      (val) => val.length >= 10,
      "Please provide at least 10 characters."
    );

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <span aria-hidden="true">&rarr;</span>';

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      need: needSelect.value,
      message: messageInput.value.trim()
    };

    const formError = document.getElementById("error-form");

    submitForm(formData)
      .then(() => {
        if (formError) {
          formError.textContent = "";
          formError.classList.remove("is-visible");
        }
        form.style.display = "none";
        if (successState) {
          successState.classList.add("is-visible");
        }
      })
      .catch((err) => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send inquiry <span aria-hidden="true">&rarr;</span>';
        if (formError) {
          formError.textContent =
            err && err.message ? err.message : "Something went wrong. Please try again.";
          formError.classList.add("is-visible");
        }
      });
  });

  // Paper stack drop-in entrance animation
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paperStack = document.getElementById("paper-stack");
  const contactSection = document.getElementById("contact");

  if (paperStack && contactSection) {
    if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      paperStack.style.opacity = "1";
      paperStack.style.transform = "none";
    } else {
      gsap.fromTo(
        paperStack,
        {
          opacity: 0,
          y: 64,
          rotation: 4
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactSection,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }

  // Back to top link smooth scroll
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Window attachments for universal access
window.initSharedNav = initSharedNav;
window.buildFooter = buildFooter;
window.initForm = initForm;
window.submitForm = submitForm;

// Auto-run nav synchronization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSharedNav);
} else {
  initSharedNav();
}
