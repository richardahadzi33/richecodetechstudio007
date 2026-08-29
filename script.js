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

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animate once per element
      }
    });
  }, observerOptions);

  // Targets h2 elements, cards, and portfolio items across the page
  const revealElements = document.querySelectorAll(
    "section h2, .card, .portfolio .item, .contact-container > *"
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

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
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            item.style.display = "block";
            // Re-trigger visual entry state
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.display = "none";
          }
        });
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
      const originalText = submitBtn.innerText;

      // Update button state while sending
      submitBtn.innerText = "SENDING MESSAGE...";
      submitBtn.disabled = true;

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
          submitBtn.innerText = "MESSAGE SENT SUCCESSFULLY!";
          submitBtn.style.backgroundColor = "#22c55e"; // Success green highlight
          submitBtn.style.color = "#ffffff";
          contactForm.reset();

          // Reset button state after 4 seconds
          setTimeout(() => {
            submitBtn.innerText = originalText;
            submitBtn.style.backgroundColor = "";
            submitBtn.style.color = "";
            submitBtn.disabled = false;
          }, 4000);
        } else {
          throw new Error("Form submission error");
        }
      } catch (error) {
        submitBtn.innerText = "FAILED TO SEND. TRY AGAIN";
        submitBtn.style.backgroundColor = "#ef4444"; // Error red highlight
        submitBtn.style.color = "#ffffff";

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
          submitBtn.disabled = false;
        }, 4000);
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