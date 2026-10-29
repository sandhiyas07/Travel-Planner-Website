
/* =========================================
   TRAVELMATE - TRAVEL PLANNER WEBSITE
   HTML + CSS + JavaScript
========================================= */

// ---------- DESTINATION DATA ----------
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    price: 35000,
    rating: 4.9,
    duration: "5 days",
    description: "Tropical beaches, green rice terraces and peaceful temples.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Manali",
    country: "India",
    category: "Mountain",
    price: 12000,
    rating: 4.8,
    duration: "4 days",
    description: "Snowy mountains, pine forests and beautiful valleys.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    category: "City",
    price: 85000,
    rating: 4.9,
    duration: "5 days",
    description: "Romantic streets, iconic landmarks and beautiful cafes.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Maldives",
    country: "Maldives",
    category: "Beach",
    price: 65000,
    rating: 4.9,
    duration: "4 days",
    description: "Clear blue waters, coral reefs and island escapes.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Ooty",
    country: "India",
    category: "Nature",
    price: 8000,
    rating: 4.7,
    duration: "3 days",
    description: "Tea gardens, misty hills and relaxing nature walks.",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Tokyo",
    country: "Japan",
    category: "City",
    price: 75000,
    rating: 4.8,
    duration: "6 days",
    description: "Experience modern city life, culture and Japanese food.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Mountain",
    price: 95000,
    rating: 5.0,
    duration: "6 days",
    description: "Majestic mountains, alpine villages and scenic railways.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Goa",
    country: "India",
    category: "Beach",
    price: 15000,
    rating: 4.6,
    duration: "4 days",
    description: "Sunny beaches, Portuguese heritage and coastal cafes.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Dubai",
    country: "United Arab Emirates",
    category: "City",
    price: 45000,
    rating: 4.7,
    duration: "4 days",
    description: "Iconic skyscrapers, desert adventures and shopping.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Munnar",
    country: "India",
    category: "Nature",
    price: 10000,
    rating: 4.8,
    duration: "3 days",
    description: "Rolling tea plantations, waterfalls and cool weather.",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Bali Highlands",
    country: "Indonesia",
    category: "Nature",
    price: 28000,
    rating: 4.7,
    duration: "4 days",
    description: "Lush landscapes, quiet villages and tropical scenery.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "New York",
    country: "United States",
    category: "City",
    price: 110000,
    rating: 4.8,
    duration: "5 days",
    description: "Famous city sights, museums, parks and vibrant streets.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80"
  }
];

// ---------- STORAGE HELPERS ----------
function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Could not load ${key} from LocalStorage.`, error);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} to LocalStorage.`, error);
    showToast("Unable to save data. Check your browser storage.");
    return false;
  }
}

// ---------- APPLICATION STATE ----------
let favorites = loadStorage("travelmate-favorites", []);
let trips = loadStorage("travelmate-trips", []);
let activeCategory = "All";
let searchText = "";
let sortBy = "default";
let toastTimer;

// Validate saved data before using it.
if (!Array.isArray(favorites)) favorites = [];
if (!Array.isArray(trips)) trips = [];

favorites = favorites.filter(id =>
  Number.isInteger(id) && destinations.some(place => place.id === id)
);

trips = trips.filter(trip =>
  trip &&
  typeof trip.id === "string" &&
  typeof trip.name === "string" &&
  typeof trip.destinationId === "number" &&
  destinations.some(place => place.id === trip.destinationId) &&
  typeof trip.budget === "number" &&
  Number.isFinite(trip.budget) &&
  trip.budget > 0 &&
  typeof trip.startDate === "string" &&
  typeof trip.endDate === "string"
);

// ---------- DOM ELEMENTS ----------
const destinationGrid = document.getElementById("destinationGrid");
const destinationEmpty = document.getElementById("destinationEmpty");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const tripForm = document.getElementById("tripForm");
const tripDestination = document.getElementById("tripDestination");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const tripList = document.getElementById("tripList");
const tripEmpty = document.getElementById("tripEmpty");
const favoriteList = document.getElementById("favoriteList");
const toast = document.getElementById("toast");

// ---------- UTILITY FUNCTIONS ----------
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  // Use local date components to avoid timezone date shifts.
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function getDestination(id) {
  return destinations.find(place => place.id === Number(id));
}

function getTripStatus(trip) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(`${trip.startDate}T00:00:00`);
  const end = new Date(`${trip.endDate}T00:00:00`);

  if (end < today) return "Completed";
  if (start <= today && end >= today) return "Ongoing";
  return "Upcoming";
}

// ---------- DESTINATION DROPDOWN ----------
function populateDestinationDropdown() {
  tripDestination.innerHTML = `
    <option value="">Choose a destination</option>
    ${destinations.map(place => `
      <option value="${place.id}">
        ${escapeHTML(place.name)}, ${escapeHTML(place.country)}
      </option>
    `).join("")}
  `;
}

// ---------- RENDER DESTINATIONS ----------
function getFilteredDestinations() {
  let filtered = destinations.filter(place => {
    const matchesCategory =
      activeCategory === "All" || place.category === activeCategory;

    const search = searchText.toLowerCase();
    const matchesSearch =
      place.name.toLowerCase().includes(search) ||
      place.country.toLowerCase().includes(search) ||
      place.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  if (sortBy === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

function renderDestinations() {
  const filtered = getFilteredDestinations();

  resultCount.textContent =
    `${filtered.length} destination${filtered.length !== 1 ? "s" : ""}`;

  destinationEmpty.classList.toggle("hidden", filtered.length !== 0);

  destinationGrid.innerHTML = filtered.map(place => {
    const isFavorite = favorites.includes(place.id);

    return `
      <article class="destination-card">
        <div class="destination-image">
          <img
            src="${place.image}"
            alt="${escapeHTML(place.name)}, ${escapeHTML(place.country)}"
            loading="lazy"
          />
          <span class="category-tag">${escapeHTML(place.category)}</span>

          <button
            class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
            data-favorite="${place.id}"
            aria-label="${isFavorite ? "Remove" : "Add"} ${escapeHTML(place.name)} ${isFavorite ? "from" : "to"} favourites"
            aria-pressed="${isFavorite}"
            title="${isFavorite ? "Remove favourite" : "Add favourite"}"
          >${isFavorite ? "♥" : "♡"}</button>
        </div>

        <div class="destination-body">
          <p class="destination-location">📍 ${escapeHTML(place.country)}</p>
          <h3>${escapeHTML(place.name)}</h3>
          <p class="destination-description">
            ${escapeHTML(place.description)}
          </p>

          <div class="destination-meta">
            <div class="destination-price">
              <strong>${formatCurrency(place.price)}</strong>
              <span>Estimated per person</span>
            </div>
            <span class="rating">★ ${place.rating.toFixed(1)}</span>
          </div>

          <button class="card-plan-btn" data-plan="${place.id}">
            Plan a Trip →
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// ---------- SEARCH, SORT AND FILTER ----------
searchInput.addEventListener("input", event => {
  searchText = event.target.value.trim();
  renderDestinations();
});

sortSelect.addEventListener("change", event => {
  sortBy = event.target.value;
  renderDestinations();
});

document.getElementById("categoryFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter-btn").forEach(filterButton => {
    const isActive = filterButton === button;
    filterButton.classList.toggle("active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });

  renderDestinations();
});

// ---------- FAVOURITES ----------
function toggleFavorite(id) {
  const place = getDestination(id);
  if (!place) return;

  if (favorites.includes(place.id)) {
    favorites = favorites.filter(favoriteId => favoriteId !== place.id);
    if (!saveStorage("travelmate-favorites", favorites)) {
      favorites.push(place.id);
      return;
    }
    showToast(`${place.name} removed from favourites.`);
  } else {
    favorites.push(place.id);
    if (!saveStorage("travelmate-favorites", favorites)) {
      favorites = favorites.filter(favoriteId => favoriteId !== place.id);
      return;
    }
    showToast(`${place.name} added to favourites!`);
  }

  renderDestinations();
  renderFavorites();
}

function renderFavorites() {
  const favoritePlaces = favorites
    .map(id => getDestination(id))
    .filter(Boolean);

  document.getElementById("favoriteCount").textContent = favoritePlaces.length;
  document.getElementById("favoriteHeadingCount").textContent = favoritePlaces.length;

  if (favoritePlaces.length === 0) {
    favoriteList.innerHTML = `
      <p class="muted-message">
        You haven't saved any favourites yet.
        Tap the heart on a destination to add one.
      </p>
    `;
    return;
  }

  favoriteList.innerHTML = favoritePlaces.map(place => `
    <div class="favorite-chip">
      <img src="${place.image}" alt="" loading="lazy" />
      <div>
        <strong>${escapeHTML(place.name)}</strong>
        <span>${escapeHTML(place.country)}</span>
      </div>
      <button
        class="remove-favorite"
        data-remove-favorite="${place.id}"
        aria-label="Remove ${escapeHTML(place.name)} from favourites"
        title="Remove favourite"
      >×</button>
    </div>
  `).join("");
}

destinationGrid.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const planButton = event.target.closest("[data-plan]");

  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
  }

  if (planButton) {
    const id = Number(planButton.dataset.plan);
    tripDestination.value = String(id);
    document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
    document.getElementById("tripName").focus({ preventScroll: true });
    showToast(`Selected ${getDestination(id).name}. Add your trip details.`);
  }
});

favoriteList.addEventListener("click", event => {
  const button = event.target.closest("[data-remove-favorite]");
  if (button) toggleFavorite(Number(button.dataset.removeFavorite));
});

// ---------- DATE VALIDATION ----------
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function updateDateLimits() {
  const today = getTodayString();
  startDateInput.min = today;

  if (startDateInput.value && startDateInput.value >= today) {
    endDateInput.min = startDateInput.value;
  } else {
    endDateInput.min = today;
  }

  if (endDateInput.value && endDateInput.value < endDateInput.min) {
    endDateInput.value = "";
  }
}

startDateInput.addEventListener("change", updateDateLimits);

endDateInput.addEventListener("change", () => {
  updateDateLimits();
});

// ---------- CREATE AND SAVE TRIPS ----------
tripForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("tripName").value.trim();
  const destinationId = Number(tripDestination.value);
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const budget = Number(document.getElementById("tripBudget").value);
  const notes = document.getElementById("travelNotes").value.trim();

  const place = getDestination(destinationId);

  if (!name || !place || !startDate || !endDate ||
      !Number.isFinite(budget) || budget <= 0 ||
      budget > 100000000) {
    showToast("Please enter valid trip details.");
    return;
  }

  if (startDate < getTodayString()) {
    showToast("Start date cannot be in the past.");
    return;
  }

  if (endDate < startDate) {
    showToast("End date must be on or after the start date.");
    return;
  }

  const newTrip = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    destinationId: place.id,
    startDate,
    endDate,
    budget,
    notes,
    createdAt: new Date().toISOString()
  };

  trips.unshift(newTrip);

  if (!saveStorage("travelmate-trips", trips)) {
    trips.shift();
    return;
  }

  tripForm.reset();
  updateDateLimits();
  renderTrips();

  showToast("Your trip has been saved successfully! ✈");

  document.getElementById("my-trips").scrollIntoView({
    behavior: "smooth"
  });
});

// ---------- DISPLAY SAVED TRIPS ----------
function renderTrips() {
  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);

  const uniqueDestinationIds = new Set(
    trips.map(trip => trip.destinationId)
  );

  document.getElementById("tripCount").textContent = trips.length;
  document.getElementById("tripHeadingCount").textContent = trips.length;
  document.getElementById("totalTrips").textContent = trips.length;
  document.getElementById("totalBudget").textContent =
    formatCurrency(totalBudget);
  document.getElementById("uniqueDestinations").textContent =
    uniqueDestinationIds.size;

  tripEmpty.classList.toggle("hidden", trips.length !== 0);

  if (trips.length === 0) {
    tripList.innerHTML = "";
    return;
  }

  tripList.innerHTML = trips.map(trip => {
    const place = getDestination(trip.destinationId);
    if (!place) return "";

    const status = getTripStatus(trip);

    return `
      <article class="trip-card">
        <div class="trip-card-top">
          <div>
            <h3>${escapeHTML(trip.name)}</h3>
            <p class="trip-destination">
              📍 ${escapeHTML(place.name)}, ${escapeHTML(place.country)}
            </p>
          </div>
          <span class="trip-status">${status}</span>
        </div>

        <p class="trip-dates">
          📅 ${formatDate(trip.startDate)} – ${formatDate(trip.endDate)}
        </p>

        ${trip.notes ? `
          <p class="trip-notes">${escapeHTML(trip.notes)}</p>
        ` : ""}

        <div class="trip-card-bottom">
          <div>
            <span class="destination-price">
              <span>Estimated budget</span>
              <strong class="trip-budget">${formatCurrency(trip.budget)}</strong>
            </span>
          </div>
          <button
            class="delete-trip"
            data-delete-trip="${escapeHTML(trip.id)}"
            aria-label="Delete trip ${escapeHTML(trip.name)}"
          >Delete trip</button>
        </div>
      </article>
    `;
  }).join("");
}

// ---------- DELETE A TRIP ----------
tripList.addEventListener("click", event => {
  const button = event.target.closest("[data-delete-trip]");
  if (!button) return;

  const tripId = button.dataset.deleteTrip;
  const trip = trips.find(item => item.id === tripId);
  if (!trip) return;

  const previousTrips = trips;
  trips = trips.filter(item => item.id !== tripId);

  if (!saveStorage("travelmate-trips", trips)) {
    trips = previousTrips;
    return;
  }

  renderTrips();
  showToast(`"${trip.name}" was removed from your trips.`);
});

// ---------- MOBILE NAVIGATION ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.addEventListener("click", event => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
});

// ---------- INITIALIZE WEBSITE ----------
function initializeApp() {
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  populateDestinationDropdown();
  updateDateLimits();
  renderDestinations();
  renderFavorites();
  renderTrips();
}

initializeApp();
