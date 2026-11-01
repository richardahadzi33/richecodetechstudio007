/* ==========================================================================
   RICHECODE TECHSTUDIO — INTERACTIVITY SYSTEM (script.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. SCROLL REVEAL ANIMATIONS
     Uses IntersectionObserver for smooth fade-in and slide-up effects.
     ------------------------------------------------------------------------ */
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      "section h2, .project-card, .contact-container > *"
    );

    revealElements.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     2. PORTFOLIO PROJECT FILTERING SYSTEM
     Filters portfolio items dynamically based on data-category attributes.
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-items .item");

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Active button highlight state
        filterBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        const filterValue = btn.getAttribute("data-filter");
        let visibleCount = 0;

        portfolioItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            item.hidden = false;
            visibleCount += 1;
          } else {
            item.hidden = true;
          }
        });

        const projectCount = document.querySelector(".project-count");
        if (projectCount) {
          projectCount.textContent = `${visibleCount} ${
            visibleCount === 1 ? "project" : "projects"
          }`;
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. ASYNC CONTACT FORM HANDLING
     Handles form submission via Fetch API with inline feedback.
     ------------------------------------------------------------------------ */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".form-submit");
      const formStatus = contactForm.querySelector(".form-status");
      const originalText = submitBtn.innerText;

      submitBtn.innerText = "SENDING MESSAGE...";
      submitBtn.disabled = true;
      formStatus.textContent = "Sending your message…";

      const formData = new FormData(contactForm);

      try {
        // Replace with your endpoint URL (e.g., Formspree endpoint)
        const response = await fetch("https://formspree.io/f/mqkrvkpq", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.textContent = "Thanks — your message has been sent.";
          contactForm.reset();
        } else {
          throw new Error(`Form submission failed with status ${response.status}`);
        }
      } catch (error) {
        console.error("Unable to send contact form:", error);
        formStatus.textContent =
          "Your message could not be sent. Please try again or email directly.";
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. MOBILE MENU ACCESSIBILITY POLISH
     Closes the navigation dropdown automatically when a menu link is tapped.
     ------------------------------------------------------------------------ */
  const navMenuDetails = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (navMenuDetails) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenuDetails.hasAttribute("open")) {
          navMenuDetails.removeAttribute("open");
        }
      });
    });
  }
});