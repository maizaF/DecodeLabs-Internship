// ============================================================
// VERDANT CIRCLE — CONNECTED TO BACKEND API
// Complete Final Version
// ============================================================

// ---------- STATE ----------
const state = {
  category: "all",
  maxDistance: 5,
  searchTerm: "",
  sortBy: "distance",
  favorites: new Set(),
  nextId: 9,
};

// ---------- DOM REFERENCES ----------
const grid = document.getElementById("listingsGrid");
const skeletonGrid = document.getElementById("skeletonGrid");
const chipGroup = document.getElementById("categoryChips");
const distanceRange = document.getElementById("distanceRange");
const distanceValue = document.getElementById("distanceValue");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("headerSearch");
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
const activeCount = document.getElementById("activeCount");
const toastContainer = document.getElementById("toastContainer");

// ---------- API URL ----------
const API_URL = 'http://localhost:5000/api/plants';

// ---------- FETCH PLANTS FROM API ----------
async function fetchPlants() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch plants');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching plants:', error);
        showToast('🌿 Could not load plants. Please try again.', 'error');
        return [];
    }
}

// ---------- FAVORITES (localStorage) ----------
function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem('verdant_favorites') || '[]');
        state.favorites = new Set(saved);
    } catch {
        state.favorites = new Set();
    }
}

function saveFavorites() {
    localStorage.setItem('verdant_favorites', JSON.stringify([...state.favorites]));
}

loadFavorites();

// ---------- SKELETON LOADING ----------
function showSkeleton() {
    if (skeletonGrid) {
        skeletonGrid.hidden = false;
        grid.innerHTML = '';
    }
}

function hideSkeleton() {
    if (skeletonGrid) {
        skeletonGrid.hidden = true;
    }
}

function withLoading(callback) {
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
        callback();
    }, 300);
}

// ---------- RENDER GRID ----------
async function renderGrid() {
    withLoading(async () => {
        const plants = await fetchPlants();

        const filtered = plants.filter(p => {
            const matchCategory = state.category === "all" || p.category === state.category;
            const matchDistance = p.distance <= state.maxDistance;
            const matchSearch = !state.searchTerm ||
                p.name.toLowerCase().includes(state.searchTerm) ||
                p.category.includes(state.searchTerm) ||
                p.neighborhood.toLowerCase().includes(state.searchTerm);
            return matchCategory && matchDistance && matchSearch;
        });

        const sorted = [...filtered].sort((a, b) => {
            switch (state.sortBy) {
                case "name": return a.name.localeCompare(b.name);
                case "newest": return b.posted - a.posted;
                case "distance":
                default: return a.distance - b.distance;
            }
        });

        if (activeCount) {
            activeCount.textContent = sorted.length;
        }

        if (sorted.length === 0) {
            grid.innerHTML = `<div class="empty-state">
                <p>🌱 Nothing matches those filters yet. Try widening your search or distance range.</p>
            </div>`;
            return;
        }

        grid.innerHTML = sorted.map(p => {
            const isFav = state.favorites.has(p.id);
            const imageHtml = p.image ?
                `<img src="${p.image}" alt="${p.name}">` :
                `<span class="material-symbols-outlined" aria-hidden="true">${p.icon || 'eco'}</span>`;

            return `
                <article class="plant-card" data-id="${p.id}">
                    <div class="card-photo" style="background:${p.color || '#3F5D3A'}">
                        ${imageHtml}
                    </div>
                    <div class="card-body">
                        <div class="card-top-row">
                            <h3>${p.name}</h3>
                            <button class="favorite-btn" data-id="${p.id}" aria-pressed="${isFav}" aria-label="Save ${p.name} to favorites">
                                <span class="material-symbols-outlined" aria-hidden="true">${isFav ? "favorite" : "favorite_border"}</span>
                            </button>
                        </div>
                        <p class="card-meta">
                            <span class="material-symbols-outlined" aria-hidden="true" style="font-size:1rem;">location_on</span>
                            ${p.neighborhood} · ${p.distance} km away
                        </p>
                        <p class="card-desc">${p.desc || p.description}</p>
                        <div class="card-actions">
                            <button class="view-details-btn" data-id="${p.id}">View details</button>
                            <button class="request-btn" data-id="${p.id}">Request swap</button>
                        </div>
                    </div>
                </article>`;
        }).join("");
    });
}

// ---------- TOAST NOTIFICATIONS ----------
function showToast(message, type = "info", duration = 4000) {
    const icons = {
        success: "check_circle",
        error: "error",
        info: "info"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="material-symbols-outlined toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <span>${message}</span>
        <button class="toast-close" aria-label="Dismiss notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    const remove = () => {
        if (toast.parentNode) {
            toast.remove();
        }
    };

    toast.querySelector(".toast-close").addEventListener("click", remove);
    setTimeout(remove, duration);
}

// ---------- SEARCH ----------
searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value.toLowerCase().trim();
    renderGrid();
});

// ---------- SORT ----------
sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderGrid();
});

// ---------- CATEGORY FILTER ----------
chipGroup.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    chipGroup.querySelectorAll(".chip").forEach(c => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("is-active");
    chip.setAttribute("aria-pressed", "true");

    state.category = chip.dataset.category;
    renderGrid();
});

// ---------- DISTANCE FILTER ----------
distanceRange.addEventListener("input", () => {
    state.maxDistance = Number(distanceRange.value);
    distanceValue.textContent = distanceRange.value;
    renderGrid();
});

// ---------- GRID EVENTS ----------
grid.addEventListener("click", (e) => {
    // Favorite
    const favBtn = e.target.closest(".favorite-btn");
    if (favBtn) {
        const id = Number(favBtn.dataset.id);
        state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
        saveFavorites();
        renderGrid();
        return;
    }

    // Request swap
    const reqBtn = e.target.closest(".request-btn");
    if (reqBtn) {
        openModal(Number(reqBtn.dataset.id));
        return;
    }

    // View details
    const detailBtn = e.target.closest(".view-details-btn");
    if (detailBtn) {
        openDetailModal(Number(detailBtn.dataset.id));
    }
});

// ---------- MOBILE NAV ----------
navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
});

primaryNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    }
});

// ---------- IMAGE UPLOAD ----------
const imageUpload = document.getElementById("plantImage");
const uploadArea = document.getElementById("imageUploadArea");
const uploadPreview = document.getElementById("uploadPreview");
const previewImage = document.getElementById("previewImage");
const removeImageBtn = document.getElementById("removeImage");
let uploadedImageData = null;

if (imageUpload) {
    imageUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            document.getElementById("imageError").textContent = "Image must be under 5MB";
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedImageData = event.target.result;
            previewImage.src = uploadedImageData;
            uploadPreview.hidden = false;
            uploadArea.querySelector(".upload-placeholder").style.display = "none";
            document.getElementById("imageError").textContent = "";
            showToast("📸 Image uploaded successfully", "success");
        };
        reader.readAsDataURL(file);
    });

    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--moss-deep)";
        uploadArea.style.background = "#f0ede3";
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.borderColor = "var(--line)";
        uploadArea.style.background = "var(--parchment)";
    });

    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--line)";
        uploadArea.style.background = "var(--parchment)";
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            imageUpload.files = files;
            imageUpload.dispatchEvent(new Event("change"));
        }
    });

    if (removeImageBtn) {
        removeImageBtn.addEventListener("click", () => {
            uploadedImageData = null;
            uploadPreview.hidden = true;
            uploadArea.querySelector(".upload-placeholder").style.display = "flex";
            imageUpload.value = "";
            document.getElementById("imageError").textContent = "";
        });
    }
}

// ---------- FORM SUBMIT ----------
const form = document.getElementById("plantForm");
const formSuccess = document.getElementById("formSuccess");
const formLoading = document.getElementById("formLoading");
const formSubmitBtn = document.getElementById("formSubmitBtn");

const fields = [
    { input: "plantName", error: "plantNameError", message: "Give your plant a name so neighbors know what it is." },
    { input: "category", error: "categoryError", message: "Choose the category that fits best." },
    { input: "neighborhood", error: "neighborhoodError", message: "Let neighbors know roughly where you are." },
    { input: "description", error: "descriptionError", message: "A short description helps set expectations." },
];

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(({ input, error, message }) => {
        const el = document.getElementById(input);
        const errorEl = document.getElementById(error);
        if (!el.value.trim()) {
            errorEl.textContent = message;
            el.style.borderColor = "var(--clay-rust)";
            isValid = false;
        } else {
            errorEl.textContent = "";
            el.style.borderColor = "";
        }
    });

    if (isValid) {
        formLoading.hidden = false;
        formSubmitBtn.disabled = true;

        try {
            const plantData = {
                name: document.getElementById("plantName").value.trim(),
                category: document.getElementById("category").value,
                neighborhood: document.getElementById("neighborhood").value.trim(),
                description: document.getElementById("description").value.trim(),
                care: "Not specified",
                size: "Not specified"
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plantData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add plant');
            }

            const result = await response.json();

            formLoading.hidden = true;
            formSubmitBtn.disabled = false;
            formSuccess.hidden = false;

            showToast(`🌱 ${result.data.name} listed successfully!`, 'success');

            form.reset();
            if (uploadedImageData) {
                uploadedImageData = null;
                uploadPreview.hidden = true;
                uploadArea.querySelector(".upload-placeholder").style.display = "flex";
                imageUpload.value = "";
            }

            renderGrid();

            setTimeout(() => { formSuccess.hidden = true; }, 4000);

        } catch (error) {
            formLoading.hidden = true;
            formSubmitBtn.disabled = false;
            showToast(`❌ ${error.message}`, 'error');
        }
    } else {
        formSuccess.hidden = true;
        showToast("Please fill in all required fields", "error");
    }
});

// ---------- MODAL ----------
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalPlantInfo = document.getElementById("modalPlantInfo");
const modalMessage = document.getElementById("modalMessage");
const modalSend = document.getElementById("modalSend");
const modalLoading = document.getElementById("modalLoading");
let lastFocusedEl = null;

async function openModal(plantId) {
    const plants = await fetchPlants();
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    modalPlantInfo.textContent = `Send ${plant.name}'s owner in ${plant.neighborhood} a quick note.`;
    modalMessage.value = "";
    lastFocusedEl = document.activeElement;

    modalBackdrop.hidden = false;
    modalClose.focus();
}

function closeModal() {
    modalBackdrop.hidden = true;
    if (lastFocusedEl) lastFocusedEl.focus();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
});

modalSend.addEventListener("click", () => {
    modalSend.disabled = true;
    modalLoading.hidden = false;

    setTimeout(() => {
        modalLoading.hidden = true;
        modalSend.disabled = false;
        modalPlantInfo.textContent = "✅ Request sent! You'll hear back once the grower responds.";
        modalMessage.value = "";
        showToast("📨 Swap request sent successfully!", "success");
        setTimeout(closeModal, 1200);
    }, 1200);
});

// ---------- DETAIL MODAL ----------
async function openDetailModal(plantId) {
    const plants = await fetchPlants();
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    const detailModal = document.createElement("div");
    detailModal.className = "modal-backdrop plant-detail-modal";
    detailModal.style.display = "flex";
    detailModal.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
            <button class="modal-close detail-close" aria-label="Close details">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
            <h2 id="detailTitle">${plant.name}</h2>
            <div style="margin: 1rem 0; padding: 0.5rem; background: ${plant.color || '#3F5D3A'}20; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">
                <span class="material-symbols-outlined" style="color:${plant.color || '#3F5D3A'}">local_florist</span>
                <span><strong>Category:</strong> ${plant.category}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">📍 Location</span>
                <span>${plant.neighborhood} (${plant.distance} km away)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">📝 Description</span>
                <span>${plant.desc || plant.description}</span>
            </div>
            ${plant.care ? `<div class="detail-row"><span class="detail-label">🌿 Care</span><span>${plant.care}</span></div>` : ''}
            ${plant.size ? `<div class="detail-row"><span class="detail-label">📏 Size</span><span>${plant.size}</span></div>` : ''}
            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button class="btn btn-primary request-btn" data-id="${plant.id}">Request swap</button>
                <button class="btn btn-ghost detail-close">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(detailModal);
    detailModal.querySelector(".modal-close").focus();

    const closeDetail = () => {
        detailModal.remove();
    };

    detailModal.querySelectorAll(".detail-close").forEach(btn => {
        btn.addEventListener("click", closeDetail);
    });

    detailModal.addEventListener("click", (e) => {
        if (e.target === detailModal) closeDetail();
    });

    detailModal.querySelector(".request-btn").addEventListener("click", () => {
        closeDetail();
        setTimeout(() => openModal(plantId), 300);
    });

    const escHandler = (e) => {
        if (e.key === "Escape") {
            closeDetail();
            document.removeEventListener("keydown", escHandler);
        }
    };
    document.addEventListener("keydown", escHandler);
}

// ---------- KEYBOARD SHORTCUTS ----------
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    if (e.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        state.searchTerm = "";
        renderGrid();
        searchInput.blur();
    }
});

// ---------- INIT ----------
renderGrid();

setTimeout(() => {
    showToast("🌱 Welcome to Verdant Circle! Find your next plant baby.", "info", 5000);
}, 800);
