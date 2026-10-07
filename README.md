# FOODBANK 🍲
> **“Share Food. Reduce Waste. Feed Hope.”**
> *A Frontend College Web Development Technology Project*

---

## 📌 Project Overview
**FoodBank** is a modern, responsive web application concept built to combat food wastage and address hunger in urban and semi-urban communities. The platform allows individuals, banquet halls, restaurants, and caterers to donate surplus food, which is then routed directly to verified local NGOs, shelter homes, and volunteers for safe and rapid distribution.

This project was built strictly using **Frontend Web Technologies (HTML5, CSS3, JavaScript, Bootstrap 5)** for presentation, screenshots, and evaluation.

---

## 🎨 Modern Design System & Multi-Theme Engine
The website features an ultra-modern, high-performance design system with glassmorphic cards, mesh gradients, floating micro-interactions, and a built-in live theme switcher:
- **Default Theme (Royal Indigo & Sunset Coral):**
  - **Primary:** Deep Royal Indigo (`#4f46e5`, `#6366f1`) — represents innovation, trust, and tech-forward philanthropy.
  - **Accent:** Vibrant Sunset Coral (`#f43f5e`, `#fb7185`) — provides energetic, high-contrast callouts.
  - **Typography:** Display titles in `Outfit` (700/800/900) and body in `Plus Jakarta Sans` for crisp legibility.
- **Available Themes (Switchable via the Floating Theme Switcher on all pages):**
  1. 🟣 **Royal Indigo & Coral:** Modern Silicon Valley tech aesthetic.
  2. 🟢 **Emerald Luxe & Amber:** Organic harvest, freshness, and environmental action.
  3. 🔵 **Oceanic Teal & Tangerine:** Clean coastal energy and vibrant community pulse.
  4. 🌙 **Midnight Dark Luxe:** Sleek, high-contrast dark mode with neon accents.
- **Glassmorphism & Micro-Interactions:** Frosted glass navbar (`backdrop-filter: blur(16px)`), animated floating cards, hover shine effects, live pulsing status indicators, and dynamic Chart.js recoloring.

---

## 📁 Project Structure

```
FoodBank/
│
├── index.html          # 1. Home Page (Hero, statistics, 4-step workflow, recent cards, CTA)
├── about.html          # 2. About Us (Mission, vision, why food donation matters, impact stats)
├── donate.html         # 3. Donate Food (Interactive form with Veg/Non-Veg selector & success modal)
├── find-food.html      # 4. Find Food (Live search, city & category filters, donation cards, request modal)
├── how-it-works.html   # 5. How It Works (Detailed 4-step process breakdown & donor/NGO pathways)
├── login.html          # 6. Login Portal (Donor & NGO role tabs, credentials preview)
├── register.html       # 7. Registration Page (Account type selection & form validation)
├── dashboard.html      # 8. Donor Dashboard (Metrics cards, interactive Chart.js graph, donations table)
├── contact.html        # 9. Contact Us (Contact form, 24/7 hotline, address, Google Maps preview)
│
├── css/
│   └── style.css       # Unified, modular CSS stylesheet for all pages
│
└── js/
    └── script.js       # Unified vanilla JavaScript for all frontend interactions
```

---

## 🚀 How to Run the Project
1. **Direct Browser Execution (No server needed):**
   - Double-click on `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).
   - All navigation links, modals, filters, and forms work directly via the file protocol (`file:///`).

2. **VS Code Live Server (Optional):**
   - Open the project directory in Visual Studio Code.
   - Right-click `index.html` and click **"Open with Live Server"**.

---

## 💻 Pages & Features Checklist

### 1. Home Page (`index.html`)
- **Top Announcement Bar:** Highlights live community impact milestones.
- **Navbar:** Sticky frosted-glass navbar with active link indicator and brand logo.
- **Hero Section:** High-converting headline *"Turn Surplus Food Into Someone’s Meal"*, badges, action buttons, floating metrics.
- **Impact Counter:** 10,000+ Meals Donated, 2,500+ Active Donors, 120+ Partner NGOs, 8,500+ People Helped.
- **How FoodBank Works:** 4-card overview (Donate, Connect, Collect, Share).
- **Why FoodBank?:** 4 feature cards highlighting environmental and social benefits.
- **Recent Donations:** Real-time cards with food photos, servings, city, and pickup times.
- **CTA & Comprehensive Footer:** Quick links, portals, social media icons, and copyright.

### 2. About Page (`about.html`)
- Mission and Vision statements.
- **Why Food Donation Matters:** Real global statistics on food waste and emissions.
- **How FoodBank Helps:** 4 operational pillars (Real-Time Alerts, Quality & Hygiene, Seamless Pickup, Impact Verification).
- Measurable impact statistics.

### 3. Donate Food Page (`donate.html`)
- Structured multi-section form:
  - Donor Contact Details (Name, Email, Phone)
  - Food Information (Name, Category, Quantity, Number of Servings, Veg/Non-Veg toggle, Dates, Description, Image Upload)
  - Pickup Logistics (Address, City, Pincode, Pickup Date & Time)
- **Frontend Submission Feedback:** Clicking *Submit Food Donation* triggers a modern Bootstrap modal displaying a unique reference ID (e.g. `#FB-8942`) and instructions.

### 4. Find Food Page (`find-food.html`)
- Instant search bar with real-time filtering.
- Filter dropdowns for City (Vadodara, Ahmedabad, Surat, Rajkot) and Category.
- Dietary toggles: All, Vegetarian, Non-Vegetarian.
- Sample donation cards as specified:
  - *Vegetable Biryani* (150 Servings, Vadodara, Pickup: Today 8:00 PM)
  - *Rice & Dal* (100 Servings, Ahmedabad, Pickup: Tomorrow 12:00 PM)
  - *Packed Meals* (80 Servings, Vadodara, Pickup: Today 6:00 PM)
  - Plus additional realistic banquet and bakery listings.
- Interactive **"Request Food"** button with a popup confirmation dialog.

### 5. How It Works Page (`how-it-works.html`)
- Clean 4-step modern timeline cards with real-world photos:
  - Step 1: Donate Food
  - Step 2: FoodBank Connects Donors & NGOs
  - Step 3: Volunteer / NGO Collects Food
  - Step 4: Food Reaches People In Need
- Dual pathways for Food Donors vs. NGO Volunteers.

### 6. Login Page (`login.html`)
- Clean split card with role switcher tabs: *“Continue as Donor”* vs *“Continue as NGO/Volunteer”*.
- Password visibility toggle.
- Demo pre-filled credentials for quick presentation and direct redirect to Dashboard.

### 7. Register Page (`register.html`)
- Role / Account Type selector (Donor, Restaurant, NGO, Volunteer).
- Fields for full contact information, city selection, and password confirmation check.

### 8. Dashboard UI (`dashboard.html`)
- Sticky sidebar with navigation items (*Dashboard, My Donations, Donate Food, Find Food, Requests, Notifications, Profile, Logout*).
- Personalized greeting: *"Welcome back, Rahul!"*.
- **4 Key Statistic Cards:**
  - Total Donations: 24
  - Pending: 4
  - Completed: 20
  - People Helped: 850
- **Dynamic Chart.js Visualizer:** Displays 6-month trends for meals rescued and lives touched.
- **Recent Donations Table:** Filterable table with status badges (*Pending*, *Accepted*, *Completed*).

### 9. Contact Page (`contact.html`)
- Contact form with frontend confirmation feedback.
- Physical address: *104 Hope Avenue, Sayajigunj, Vadodara, Gujarat 390005*.
- Emergency helpline: *1800-FOOD-HOPE* / *+91 98765 43210*.
- Operational working hours and embedded regional map preview.

---

## 🎓 College Viva / Presentation Q&A Guide

**Q1: What is the primary purpose of the FoodBank project?**
> *Answer:* FoodBank is a non-profit technology platform designed to reduce food wastage by seamlessly linking food donors (banquets, restaurants, citizens) with verified NGOs and volunteer groups who collect and distribute surplus meals to underprivileged communities.

**Q2: What frontend technologies were utilized?**
> *Answer:* HTML5 for semantic page layout, CSS3 (custom CSS variables, flexbox, CSS grid, keyframe animations) for modern styling, Bootstrap 5 for grid scaffolding and responsive components, Chart.js for data visualization on the dashboard, and Vanilla JavaScript (ES6) for DOM manipulation and client-side interactions.

**Q3: How are images and styling handled without slowing the browser?**
> *Answer:* High-efficiency CDN links are used for fonts, icons, and Bootstrap. High-resolution food images are loaded via optimized responsive CDNs with fast fallback caching.

**Q4: How does the filtering on the "Find Food" page work?**
> *Answer:* The JavaScript listens to the `input` event on the search box and the `change` events on the dropdowns/pills, dynamically toggling the display of each card based on whether its dataset attributes (`data-title`, `data-city`, `data-category`, `data-diet`) match the query.

---

## 📷 Recommended Screenshot Tour for Presentation
1. **Home Page:** Hero section showing the *"Turn Surplus Food Into Someone’s Meal"* headline + statistics bar.
2. **Find Food:** Listings grid with the search and city filters active.
3. **Donate Food:** Clean 3-step donation form and the submission modal popup.
4. **Dashboard:** Welcome banner, 4 KPI cards, and the Chart.js visualizer.
5. **Login Page:** Clean authentication card with the Donor / NGO toggle tabs.
6. **How It Works:** Modern 4-step timeline layout.
