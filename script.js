/**
 * FOODBANK - Main Shared JavaScript & Theme Engine
 * Lightweight, Vanilla JS for clean UI interactivity & dynamic multi-theme presentation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initNavbar();
  initDonationForm();
  initFindFoodFilters();
  initContactForm();
  initAuthPages();
  initDashboard();
});

/* -------------------------------------------------------------
 * 0. Multi-Theme Switching System & Widget
 * ------------------------------------------------------------- */
const THEME_CONFIG = {
  indigo: {
    name: 'Royal Indigo & Coral',
    primary: '#4f46e5',
    accent: '#f43f5e',
    tooltipBg: '#0f172a',
    chartFill: 'rgba(79, 70, 229, 0.25)'
  },
  emerald: {
    name: 'Emerald & Amber',
    primary: '#059669',
    accent: '#f59e0b',
    tooltipBg: '#064e3b',
    chartFill: 'rgba(5, 150, 105, 0.25)'
  },
  teal: {
    name: 'Oceanic Teal & Orange',
    primary: '#0891b2',
    accent: '#f97316',
    tooltipBg: '#164e63',
    chartFill: 'rgba(8, 145, 178, 0.25)'
  },
  dark: {
    name: 'Midnight Dark Luxe',
    primary: '#818cf8',
    accent: '#fb7185',
    tooltipBg: '#111827',
    chartFill: 'rgba(129, 140, 248, 0.25)'
  }
};

function initThemeSystem() {
  const savedTheme = localStorage.getItem('foodbank_theme') || 'indigo';
  applyTheme(savedTheme, false);

  // Inject Theme Switcher FAB widget if not present
  if (!document.getElementById('themeSwitcherFab')) {
    const fabWrapper = document.createElement('div');
    fabWrapper.id = 'themeSwitcherFab';
    fabWrapper.className = 'theme-switcher-fab-wrapper';
    fabWrapper.innerHTML = `
      <div class="theme-switcher-panel" id="themeSwitcherPanel">
        <div class="theme-panel-header">
          <span class="theme-panel-title"><i class="fa-solid fa-palette me-1 text-primary"></i> Color Themes</span>
          <button type="button" class="btn-close btn-sm" id="closeThemePanelBtn" aria-label="Close"></button>
        </div>
        <button type="button" class="theme-choice-btn ${savedTheme === 'indigo' ? 'active' : ''}" data-theme-val="indigo">
          <span class="theme-color-dot" style="background: linear-gradient(135deg, #4f46e5, #f43f5e);"></span>
          <span>Royal Indigo &amp; Coral</span>
        </button>
        <button type="button" class="theme-choice-btn ${savedTheme === 'emerald' ? 'active' : ''}" data-theme-val="emerald">
          <span class="theme-color-dot" style="background: linear-gradient(135deg, #059669, #f59e0b);"></span>
          <span>Emerald &amp; Amber</span>
        </button>
        <button type="button" class="theme-choice-btn ${savedTheme === 'teal' ? 'active' : ''}" data-theme-val="teal">
          <span class="theme-color-dot" style="background: linear-gradient(135deg, #0891b2, #f97316);"></span>
          <span>Oceanic Teal &amp; Orange</span>
        </button>
        <button type="button" class="theme-choice-btn ${savedTheme === 'dark' ? 'active' : ''}" data-theme-val="dark">
          <span class="theme-color-dot" style="background: linear-gradient(135deg, #111827, #818cf8);"></span>
          <span>Midnight Dark Luxe</span>
        </button>
      </div>
      <button type="button" class="theme-switcher-toggle-btn" id="themeSwitcherToggle" title="Switch Color Theme">
        <i class="fa-solid fa-wand-magic-sparkles text-primary"></i>
        <span>Change Theme</span>
      </button>
    `;
    document.body.appendChild(fabWrapper);

    const toggleBtn = document.getElementById('themeSwitcherToggle');
    const panel = document.getElementById('themeSwitcherPanel');
    const closeBtn = document.getElementById('closeThemePanelBtn');

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
      if (!fabWrapper.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    const themeButtons = panel.querySelectorAll('.theme-choice-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const chosen = btn.getAttribute('data-theme-val');
        applyTheme(chosen, true);
        panel.classList.remove('show');
      });
    });
  }
}

function applyTheme(themeKey, notify = false) {
  if (!THEME_CONFIG[themeKey]) themeKey = 'indigo';
  document.documentElement.setAttribute('data-theme', themeKey);
  localStorage.setItem('foodbank_theme', themeKey);

  // Update chart if on dashboard
  updateDashboardChart(themeKey);

  if (notify && typeof bootstrap !== 'undefined') {
    // Show subtle feedback
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      z-index: 1095;
      background: var(--bg-card);
      color: var(--text-dark);
      padding: 0.65rem 1.25rem;
      border-radius: 9999px;
      border: 1.5px solid var(--primary-border);
      box-shadow: 0 8px 24px var(--primary-glow);
      font-size: 0.86rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: themeMenuPop 0.25s ease;
    `;
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> Theme: ${THEME_CONFIG[themeKey].name}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2000);
  }
}

/* -------------------------------------------------------------
 * 1. Navbar Scroll Effect & Active Page Link
 * ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active page detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------
 * 2. Donate Food Page Form Handling
 * ------------------------------------------------------------- */
function initDonationForm() {
  const donateForm = document.getElementById('foodDonationForm');
  if (!donateForm) return;

  // Food Type (Veg / Non-Veg) selector buttons
  const dietButtons = document.querySelectorAll('.diet-pill-btn');
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dietButtons.forEach(b => {
        b.classList.remove('active-veg', 'active-nonveg');
      });
      const radio = btn.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        if (radio.value === 'veg') {
          btn.classList.add('active-veg');
        } else {
          btn.classList.add('active-nonveg');
        }
      }
    });
  });

  // Image upload preview
  const fileInput = document.getElementById('foodImageInput');
  const previewContainer = document.getElementById('imagePreviewBox');
  if (fileInput && previewContainer) {
    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewContainer.innerHTML = `
            <div class="position-relative d-inline-block">
              <img src="${e.target.result}" alt="Preview" style="max-height: 140px; border-radius: 12px; border: 2px solid var(--primary-color);">
              <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle" id="removeImgBtn" style="padding: 2px 7px;">&times;</button>
            </div>
            <p class="text-success small mt-2 mb-0 fw-semibold"><i class="fa-solid fa-circle-check"></i> Image selected: ${file.name}</p>
          `;
          document.getElementById('removeImgBtn')?.addEventListener('click', (ev) => {
            ev.stopPropagation();
            fileInput.value = '';
            previewContainer.innerHTML = `
              <i class="fa-solid fa-cloud-arrow-up fa-2x text-muted mb-2"></i>
              <div class="fw-semibold text-dark">Click to browse or drag and drop food photo</div>
              <div class="text-muted small">Supports JPG, PNG (Max 5MB)</div>
            `;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle Form Submission
  donateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!donateForm.checkValidity()) {
      donateForm.reportValidity();
      return;
    }

    const randomId = 'FB-' + Math.floor(1000 + Math.random() * 9000);
    const donationIdElem = document.getElementById('modalDonationId');
    if (donationIdElem) donationIdElem.innerText = randomId;

    const successModalElem = document.getElementById('donationSuccessModal');
    if (successModalElem && typeof bootstrap !== 'undefined') {
      const modal = new bootstrap.Modal(successModalElem);
      modal.show();
    } else {
      alert(`Food donation submitted successfully!\nDonation ID: ${randomId}\nA nearby NGO will contact you for pickup.`);
    }

    donateForm.reset();
  });
}

/* -------------------------------------------------------------
 * 3. Find Food Search & Real-Time Filter
 * ------------------------------------------------------------- */
function initFindFoodFilters() {
  const searchInput = document.getElementById('foodSearchInput');
  const cityFilter = document.getElementById('cityFilterSelect');
  const categoryFilter = document.getElementById('categoryFilterSelect');
  const filterPills = document.querySelectorAll('.filter-pill-btn');
  const foodCards = document.querySelectorAll('.food-listing-card');

  if (!foodCards.length) return;

  let currentDietFilter = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCity = cityFilter ? cityFilter.value.toLowerCase() : 'all';
    const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';

    let matchCount = 0;

    foodCards.forEach(card => {
      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const city = card.getAttribute('data-city')?.toLowerCase() || '';
      const diet = card.getAttribute('data-diet')?.toLowerCase() || '';
      const category = card.getAttribute('data-category')?.toLowerCase() || '';

      const matchesQuery = !query || title.includes(query) || city.includes(query) || category.includes(query);
      const matchesCity = selectedCity === 'all' || city === selectedCity;
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesDiet = currentDietFilter === 'all' || diet === currentDietFilter;

      if (matchesQuery && matchesCity && matchesCategory && matchesDiet) {
        card.parentElement.style.display = 'block';
        matchCount++;
      } else {
        card.parentElement.style.display = 'none';
      }
    });

    const countElem = document.getElementById('resultCountText');
    if (countElem) {
      countElem.textContent = `Showing ${matchCount} available donation${matchCount === 1 ? '' : 's'}`;
    }

    const noResultsMsg = document.getElementById('noResultsContainer');
    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (cityFilter) cityFilter.addEventListener('change', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentDietFilter = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  const requestButtons = document.querySelectorAll('.btn-request-food');
  requestButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const foodTitle = this.getAttribute('data-food') || 'Food Item';
      const foodServings = this.getAttribute('data-servings') || '100 Servings';
      const modalFoodName = document.getElementById('reqModalFoodTitle');
      const modalFoodServings = document.getElementById('reqModalServings');

      if (modalFoodName) modalFoodName.innerText = foodTitle;
      if (modalFoodServings) modalFoodServings.innerText = foodServings;

      const requestModal = document.getElementById('requestFoodModal');
      if (requestModal && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(requestModal);
        modal.show();
      }
    });
  });

  const confirmRequestBtn = document.getElementById('btnConfirmRequest');
  if (confirmRequestBtn) {
    confirmRequestBtn.addEventListener('click', () => {
      const requestModalElem = document.getElementById('requestFoodModal');
      if (requestModalElem && typeof bootstrap !== 'undefined') {
        bootstrap.Modal.getInstance(requestModalElem)?.hide();
      }
      const successModal = document.getElementById('requestSuccessModal');
      if (successModal && typeof bootstrap !== 'undefined') {
        new bootstrap.Modal(successModal).show();
      } else {
        alert("Food request successfully submitted! The donor has been notified.");
      }
    });
  }
}

/* -------------------------------------------------------------
 * 4. Contact Form Feedback
 * ------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactUsForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const toastBox = document.getElementById('contactSuccessToast');
    if (toastBox) {
      toastBox.classList.remove('d-none');
      contactForm.reset();
      setTimeout(() => {
        toastBox.classList.add('d-none');
      }, 6000);
    } else {
      alert("Thank you! Your message has been sent successfully. We will reach out to you within 24 hours.");
      contactForm.reset();
    }
  });
}

/* -------------------------------------------------------------
 * 5. Login & Register UI Behaviors
 * ------------------------------------------------------------- */
function initAuthPages() {
  const roleButtons = document.querySelectorAll('.auth-tab-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const role = btn.getAttribute('data-role');
      const roleNotice = document.getElementById('authRoleNotice');
      if (roleNotice) {
        if (role === 'ngo') {
          roleNotice.innerHTML = `<i class="fa-solid fa-building-ngo text-success me-1"></i> Logging in as verified <strong>NGO / Community Volunteer</strong>`;
        } else {
          roleNotice.innerHTML = `<i class="fa-solid fa-heart text-success me-1"></i> Logging in as compassionate <strong>Food Donor</strong>`;
        }
      }
    });
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Logging in...`;
      btn.disabled = true;

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('regPassword')?.value;
      const confirmPwd = document.getElementById('regConfirmPassword')?.value;

      if (pwd && confirmPwd && pwd !== confirmPwd) {
        alert("Passwords do not match. Please check and try again.");
        return;
      }

      const btn = registerForm.querySelector('button[type="submit"]');
      btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Creating Account...`;
      btn.disabled = true;

      setTimeout(() => {
        alert("Account registered successfully! Welcome to FoodBank.");
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }

  const togglePassBtns = document.querySelectorAll('.toggle-password');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
          input.type = 'password';
          btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Dashboard Chart & UI
 * ------------------------------------------------------------- */
let dashboardChartInstance = null;

function initDashboard() {
  const chartCanvas = document.getElementById('donationTrendsChart');
  if (!chartCanvas) return;

  const currentTheme = localStorage.getItem('foodbank_theme') || 'indigo';
  buildDashboardChart(currentTheme);

  const tableSearch = document.getElementById('dashTableSearch');
  if (tableSearch) {
    tableSearch.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      const rows = document.querySelectorAll('#dashDonationsTable tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
}

function buildDashboardChart(themeKey) {
  const chartCanvas = document.getElementById('donationTrendsChart');
  if (!chartCanvas || typeof Chart === 'undefined') return;

  const conf = THEME_CONFIG[themeKey] || THEME_CONFIG['indigo'];
  const ctx = chartCanvas.getContext('2d');

  if (dashboardChartInstance) {
    dashboardChartInstance.destroy();
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, conf.chartFill);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  dashboardChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [
        {
          label: 'Meals Donated',
          data: [420, 680, 850, 1100, 1420, 1850],
          borderColor: conf.primary,
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.38,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: conf.primary,
          pointBorderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 8
        },
        {
          label: 'People Impacted',
          data: [350, 520, 710, 940, 1200, 1600],
          borderColor: conf.accent,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          borderDash: [5, 5],
          tension: 0.38,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: conf.accent,
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              weight: '600',
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: conf.tooltipBg,
          padding: 12,
          cornerRadius: 10,
          titleFont: { family: "'Outfit', sans-serif", weight: '700' },
          bodyFont: { family: "'Plus Jakarta Sans', sans-serif" }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(226, 232, 240, 0.6)' },
          ticks: {
            font: { family: "'Plus Jakarta Sans', sans-serif" },
            color: '#64748b'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'Plus Jakarta Sans', sans-serif" },
            color: '#64748b'
          }
        }
      }
    }
  });
}

function updateDashboardChart(themeKey) {
  if (document.getElementById('donationTrendsChart')) {
    buildDashboardChart(themeKey);
  }
}
