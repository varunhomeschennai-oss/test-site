document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({ duration: 850, once: true, offset: 80 });
  }

  if (window.matchMedia("(pointer: fine)").matches) {
    const dot = document.createElement("span");
    const ring = document.createElement("span");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.body.classList.add("custom-cursor-ready");

    // Hardware CSS cursor now handles pointer positioning seamlessly
    // Retaining cursor-hover class for non-standard interactive elements


    document.querySelectorAll("a, button, input, select, textarea, .gallery-item").forEach((item) => {
      item.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    if (loader) loader.classList.add("hidden");
  });
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 900);

  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  });
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const visitModal = document.createElement("div");
  visitModal.className = "visit-modal";
  visitModal.innerHTML = `
    <div class="visit-modal-panel" role="dialog" aria-modal="true" aria-labelledby="visitModalTitle">
      <button class="visit-modal-close" type="button" aria-label="Close"><i class="bi bi-x-lg"></i></button>
      <p class="section-kicker">Redwood Residence</p>
      <h2 id="visitModalTitle">Choose Visit Type</h2>
      <p>Select the unit you want to enquire about. The contact form will be filled automatically.</p>
      <div class="visit-modal-options">
        <a href="contact.html?project=Redwood%20Residence&project_type=Book%20a%20Site%20Visit&bhk_type=1%20BHK"><strong>1 BHK</strong><span>Compact premium unit</span></a>
        <a href="contact.html?project=Redwood%20Residence&project_type=Book%20a%20Site%20Visit&bhk_type=2%20BHK"><strong>2 BHK</strong><span>Spacious family unit</span></a>
      </div>
    </div>
  `;
  document.body.append(visitModal);

  const closeVisitModal = () => visitModal.classList.remove("open");
  visitModal.querySelector(".visit-modal-close")?.addEventListener("click", closeVisitModal);
  visitModal.addEventListener("click", (event) => {
    if (event.target === visitModal) closeVisitModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeVisitModal();
  });

  document.querySelectorAll(".visit-choice > button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      visitModal.classList.add("open");
    });
  });

  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (counter) => {
    const target = Number(counter.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const tick = () => {
      current += step;
      if (current >= target) current = target;
      counter.textContent = `${current}${target === 98 ? "%" : "+"}`;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  };
  if ("IntersectionObserver" in window && counters.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .4 });
    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(runCounter);
  }

  const calcButton = document.getElementById("calculateEmi");
  const currency = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  const calculateEmi = () => {
    const principal = Number(document.getElementById("loanAmount")?.value || 0);
    const annualRate = Number(document.getElementById("interestRate")?.value || 0);
    const years = Number(document.getElementById("loanTenure")?.value || 0);
    const months = years * 12;
    const rate = annualRate / 12 / 100;
    if (!principal || !months) return;
    const emi = rate === 0 ? principal / months : principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    const total = emi * months;
    const interest = total - principal;
    document.getElementById("monthlyEmi").textContent = `INR ${currency.format(emi)}`;
    document.getElementById("totalInterest").textContent = `INR ${currency.format(interest)}`;
    document.getElementById("totalAmount").textContent = `INR ${currency.format(total)}`;
  };
  if (calcButton) {
    calcButton.addEventListener("click", calculateEmi);
    calculateEmi();
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.parentElement.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add("open");
    });
  });
  document.getElementById("closeLightbox")?.addEventListener("click", () => lightbox?.classList.remove("open"));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });

  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    const params = new URLSearchParams(window.location.search);
    const bhkType = params.get("bhk_type");
    const projectName = params.get("project");
    const bhkTypeSelect = document.getElementById("bhkType");
    const selectedProjectName = document.getElementById("selectedProjectName");
    const messageBox = enquiryForm.querySelector("textarea[name='message']");
    const budgetRange = document.getElementById("budgetRange");
    const budgetDisplay = document.getElementById("budgetDisplay");

    if (budgetRange && budgetDisplay) {
      const updateSlider = (e) => {
        const val = e.target.value;
        budgetDisplay.textContent = `INR ${val} Lakhs`;
        const min = e.target.min || 15;
        const max = e.target.max || 65;
        const percent = ((val - min) / (max - min)) * 100;
        e.target.style.background = `linear-gradient(to right, var(--red) ${percent}%, var(--line) ${percent}%)`;
      };
      budgetRange.addEventListener("input", updateSlider);
      updateSlider({ target: budgetRange });
    }

    if (bhkType && bhkTypeSelect) bhkTypeSelect.value = bhkType;
    if (projectName && selectedProjectName) selectedProjectName.value = projectName;
    if (projectName && messageBox && !messageBox.value) {
      messageBox.value = `I want to book a site visit for ${projectName}${bhkType ? ` - ${bhkType}` : ""}.`;
    }

    enquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = document.getElementById("formNote");
      const button = enquiryForm.querySelector("button[type='submit']");
      if (note) note.textContent = "Submitting your enquiry...";
      if (button) button.disabled = true;
      try {
        const response = await fetch(enquiryForm.action, {
          method: "POST",
          body: new FormData(enquiryForm),
          headers: { Accept: "application/json" }
        });
        if (response.ok) {
          window.location.href = "success.html";
          return;
        }
        throw new Error("Formspree rejected the submission");
      } catch (error) {
        if (note) note.textContent = "Submission failed. Please try again or contact us on WhatsApp.";
        if (button) button.disabled = false;
      }
    });
  }

  const visitCalendar = document.getElementById("visitCalendar");
  if (visitCalendar) {
    const trigger = visitCalendar.querySelector(".calendar-trigger");
    const label = document.getElementById("visitDateLabel");
    const hiddenInput = document.getElementById("preferredVisitDate");
    const monthLabel = document.getElementById("calendarMonth");
    const grid = document.getElementById("calendarGrid");
    const prev = document.getElementById("prevMonth");
    const next = document.getElementById("nextMonth");
    const monthFormatter = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" });
    const labelFormatter = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    let visibleDate = new Date();
    let selectedValue = "";

    const isoDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const renderCalendar = () => {
      const year = visibleDate.getFullYear();
      const month = visibleDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const totalDays = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      monthLabel.textContent = monthFormatter.format(visibleDate);
      grid.innerHTML = "";

      for (let blank = 0; blank < firstDay.getDay(); blank += 1) {
        grid.append(document.createElement("span"));
      }

      for (let day = 1; day <= totalDays; day += 1) {
        const date = new Date(year, month, day);
        const value = isoDate(date);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-day";
        button.textContent = day;
        if (value === isoDate(today)) button.classList.add("is-today");
        if (value === selectedValue) button.classList.add("selected");
        if (date < today) button.disabled = true;
        button.addEventListener("click", () => {
          selectedValue = value;
          hiddenInput.value = value;
          label.textContent = labelFormatter.format(date);
          visitCalendar.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
          renderCalendar();
        });
        grid.append(button);
      }
    };

    trigger.addEventListener("click", () => {
      const isOpen = visitCalendar.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      renderCalendar();
    });

    prev.addEventListener("click", () => {
      visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1, 1);
      renderCalendar();
    });

    next.addEventListener("click", () => {
      visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 1);
      renderCalendar();
    });

    document.addEventListener("click", (event) => {
      if (!visitCalendar.contains(event.target)) {
        visitCalendar.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    renderCalendar();
  }
});
