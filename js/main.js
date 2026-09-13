document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-ready");
  if (window.AOS) {
    AOS.init({ duration: 1150, easing: "cubic-bezier(.16, 1, .3, 1)", once: true, offset: 90 });
  }

  const slowRevealItems = document.querySelectorAll(".btn:not([data-aos]), .social-profile-box:not([data-aos]), .stat-card:not([data-aos]), .project-finder-card:not([data-aos]), .service-card:not([data-aos]), .feature-card:not([data-aos]), .config-card:not([data-aos]), .gallery-item:not([data-aos]), .form-panel:not([data-aos]), .emi-result:not([data-aos]), .testimonial-card:not([data-aos])");
  if (slowRevealItems.length && "IntersectionObserver" in window) {
    const slowRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    slowRevealItems.forEach((item, index) => {
      item.classList.add("slow-reveal");
      item.style.transitionDelay = `${Math.min(index % 5, 4) * 80}ms`;
      slowRevealObserver.observe(item);
    });
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
  let scrollFrame = null;
  const syncScrollChrome = () => {
    scrollFrame = null;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
    document.body.classList.toggle("is-scrolled", window.scrollY > 36);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncScrollChrome);
  }, { passive: true });
  syncScrollChrome();
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const bhkButtons = document.querySelectorAll(".bhk-pill");
  const parkingButtons = document.querySelectorAll(".parking-pill");
  const configCards = document.querySelectorAll(".config-card");

  const syncConfigSelection = () => {
    const activeBhk = document.querySelector(".bhk-pill.active")?.textContent.trim() || "2 BHK";
    const activeParking = document.querySelector(".parking-pill.active")?.textContent.trim() || "Without Car Parking";

    configCards.forEach((card) => {
      const cardBhk = card.dataset.bhk;
      const statusNode = card.querySelector(".config-status");
      const isMatch = cardBhk === activeBhk;
      card.classList.toggle("active", isMatch);
      if (statusNode) statusNode.textContent = activeParking;
    });
  };

  if (!document.querySelector(".bhk-pill.active")) {
    const defaultBhk = document.querySelectorAll(".bhk-pill")[1];
    if (defaultBhk) defaultBhk.classList.add("active");
  }

  if (!document.querySelector(".parking-pill.active")) {
    const defaultParking = document.querySelector(".parking-pill");
    if (defaultParking) defaultParking.classList.add("active");
  }

  bhkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bhkButtons.forEach((item) => item.classList.toggle("active", item === button));
      syncConfigSelection();
    });
  });

  parkingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      parkingButtons.forEach((item) => item.classList.toggle("active", item === button));
      syncConfigSelection();
    });
  });

  syncConfigSelection();

  const projectFinderResults = document.getElementById("projectFinderResults");
  const projectFinderDetail = document.getElementById("projectFinderDetail");
  if (projectFinderResults && projectFinderDetail) {
    const projects = [
      { id: "sriperumbudur-1", name: "Greenfield Starter Home", location: "sriperumbudur", locationLabel: "Sriperumbudur", bhk: ["1 BHK", "2 BHK"], parking: ["with", "without"], type: "Compact villa plots and homes", area: "720 - 1,050 sq ft", status: "New launch", description: "A practical first home planned for easy maintenance, natural light, and flexible future expansion.", features: ["DTCP planned layout", "Water connection", "Living and dining space", "Electrical and plumbing work"], floorPlan: "images/1bhk.png" },
      { id: "sriperumbudur-2", name: "Highway Garden Villa", location: "sriperumbudur", locationLabel: "Sriperumbudur", bhk: ["2 BHK", "3 BHK"], parking: ["with"], type: "Family villa community", area: "1,200 - 1,650 sq ft", status: "Site visits open", description: "A family-focused villa option with dedicated parking, open surroundings, and room to grow.", features: ["Dedicated car parking", "On-road connectivity", "Three-bedroom upgrade option", "Construction support"], floorPlan: "images/1bhk.png" },
      { id: "avadi-1", name: "Avadi Urban Villa", location: "avadi", locationLabel: "Avadi", bhk: ["2 BHK", "3 BHK"], parking: ["with", "without"], type: "Urban family residence", area: "1,050 - 1,500 sq ft", status: "Available for enquiry", description: "A well-connected home format designed for modern family routines, with practical layouts and finish choices.", features: ["Flexible floor plans", "Optional car parking", "Kitchen and bathroom package", "Turnkey project guidance"], floorPlan: "images/1bhk.png" },
      { id: "avadi-2", name: "Avadi Signature Residence", location: "avadi", locationLabel: "Avadi", bhk: ["3 BHK"], parking: ["with"], type: "Premium villa residence", area: "1,650 - 2,100 sq ft", status: "Premium collection", description: "A larger signature residence with extra family space, premium finishes, and dedicated vehicle parking.", features: ["Three-bedroom layout", "Dedicated car parking", "Premium flooring options", "Site supervision and handover"], floorPlan: "images/1bhk.png" }
    ];
    const locationSelect = document.getElementById("projectLocation");
    const bhkSelect = document.getElementById("projectBhk");
    const parkingSelect = document.getElementById("projectParking");
    let selectedProject = null;
    const customSelects = [];
    const closeCustomSelects = (activeSelect) => customSelects.forEach((customSelect) => {
      if (customSelect !== activeSelect) customSelect.classList.remove("open");
    });
    [locationSelect, bhkSelect, parkingSelect].forEach((select) => {
      const field = select.closest(".finder-field");
      if (!field) return;
      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";
      const trigger = document.createElement("button");
      trigger.className = "custom-select-trigger";
      trigger.type = "button";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      const menu = document.createElement("div");
      menu.className = "custom-select-menu";
      menu.setAttribute("role", "listbox");
      const options = Array.from(select.options).map((option) => {
        const optionButton = document.createElement("button");
        optionButton.type = "button";
        optionButton.className = "custom-select-option";
        optionButton.dataset.value = option.value;
        optionButton.setAttribute("role", "option");
        optionButton.textContent = option.textContent;
        optionButton.addEventListener("click", () => {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          wrapper.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
          trigger.textContent = option.textContent;
          menu.querySelectorAll(".custom-select-option").forEach((item) => item.classList.toggle("active", item === optionButton));
        });
        menu.append(optionButton);
        return optionButton;
      });
      trigger.textContent = select.options[select.selectedIndex].textContent;
      options[select.selectedIndex]?.classList.add("active");
      trigger.addEventListener("click", () => {
        closeCustomSelects(wrapper);
        const isOpen = wrapper.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
      wrapper.append(trigger, menu);
      select.classList.add("native-select-hidden");
      field.append(wrapper);
      customSelects.push(wrapper);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".custom-select")) {
        customSelects.forEach((customSelect) => customSelect.classList.remove("open"));
      }
    });
    const renderDetail = (project) => {
      selectedProject = project;
      projectFinderDetail.innerHTML = `<div class="finder-detail-media"><img src="${project.floorPlan}" alt="${project.name} floor plan"></div><div class="finder-detail-copy"><p class="section-kicker">${project.locationLabel} / ${project.type}</p><h3>${project.name}</h3><p>${project.description}</p><div class="finder-detail-specs"><span><b>Size</b>${project.area}</span><span><b>Options</b>${project.bhk.join(" / ")}</span><span><b>Parking</b>${project.parking.includes("with") ? "Available" : "On request"}</span><span><b>Status</b>${project.status}</span></div><h4>Project details</h4><ul>${project.features.map((feature) => `<li><i class="bi bi-check2"></i>${feature}</li>`).join("")}</ul><div class="finder-detail-actions"><a class="btn btn-red" href="villa-brochure.html"><i class="bi bi-file-earmark-text"></i> View Brochure</a><a class="btn btn-dark-line" href="contact.html?project=${encodeURIComponent(project.name)}&project_type=Book%20a%20Site%20Visit"><i class="bi bi-calendar-check"></i> Book Site Visit</a></div></div>`;
    };
    const renderProjects = () => {
      const location = locationSelect.value;
      const bhk = bhkSelect.value;
      const parking = parkingSelect.value;
      const matches = projects.filter((project) => (location === "all" || project.location === location) && (bhk === "all" || project.bhk.includes(bhk)) && (parking === "all" || project.parking.includes(parking)));
      projectFinderResults.innerHTML = matches.length ? matches.map((project) => `<button class="project-finder-card${selectedProject?.id === project.id ? " active" : ""}" type="button" data-project-id="${project.id}"><span class="finder-card-location">${project.locationLabel}</span><strong>${project.name}</strong><span>${project.bhk.join(" / ")} | ${project.parking.includes("with") ? "Parking available" : "Parking on request"}</span><i class="bi bi-arrow-right"></i></button>`).join("") : `<p class="finder-no-results">No projects match these choices. Try another combination.</p>`;
      projectFinderResults.querySelectorAll("[data-project-id]").forEach((card) => card.addEventListener("click", () => { const project = projects.find((item) => item.id === card.dataset.projectId); renderDetail(project); renderProjects(); projectFinderDetail.scrollIntoView({ behavior: "smooth", block: "start" }); }));
      if (!matches.some((project) => project.id === selectedProject?.id)) {
        selectedProject = null;
        projectFinderDetail.innerHTML = `<div class="finder-detail-empty"><i class="bi bi-hand-index-thumb"></i><h3>Select a project</h3><p>Project details, specifications, floor plan, and brochure will appear here.</p></div>`;
      }
    };
    [locationSelect, bhkSelect, parkingSelect].forEach((select) => select.addEventListener("change", renderProjects));
    renderProjects();
  }

  const liveSubscriberCount = document.getElementById("liveSubscriberCount");
  if (liveSubscriberCount) {
    const channelId = liveSubscriberCount.dataset.channelId;
    const updateLiveSubscriberCount = async () => {
      try {
        const response = await fetch(`https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`);
        if (!response.ok) throw new Error("Live subscriber request failed");
        const data = await response.json();
        const subscriberCount = data.counters?.api?.subscriberCount ?? data.counters?.estimation?.subscriberCount;
        if (subscriberCount !== undefined) liveSubscriberCount.textContent = Number(subscriberCount).toLocaleString("en-IN");
      } catch (error) {
        liveSubscriberCount.textContent = "Unavailable";
      }
    };
    updateLiveSubscriberCount();
    window.setInterval(updateLiveSubscriberCount, 10000);
  }

  document.querySelectorAll(".spec-row").forEach((row) => {
    row.addEventListener("click", () => {
      const expanded = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", String(!expanded));
    });
  });

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
