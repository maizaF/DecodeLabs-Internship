# 🌿 Verdant Circle — Swap Cuttings, Not Cash

> **DecodeLabs Internship Program — Project 1: Responsive Frontend Interface**

Verdant Circle is a responsive neighborhood plant-swapping platform where plant lovers can share surplus cuttings and discover new plants from nearby growers — **no money involved, just plants, community, and a little patience.**

---

## 📖 Project Overview

**Verdant Circle** is a frontend web application designed to connect plant enthusiasts within local communities.

Users can:

* 🌱 Browse available plant cuttings and seedlings
* 🔎 Search plants by name, category, or neighborhood
* 🎯 Filter plants by category and distance
* ❤️ Save plants to favorites
* 🔄 Send swap requests to plant owners
* 📋 List their own plants for swapping
* 🌿 View detailed plant information and care tips

The project focuses on creating a clean, accessible, and responsive user experience using **HTML, CSS, and Vanilla JavaScript**.

---

## ✨ Key Features

### 🔍 Search & Filtering

* Real-time plant search
* Search by plant name, category, or neighborhood
* Category filters:

  * Succulents
  * Foliage
  * Herbs
  * Flowering
* Adjustable distance filter
* Sort plants by:

  * Distance
  * Name
  * Newest

### ❤️ User Interactions

* Add/remove plants from favorites
* Favorites persist using `localStorage`
* Send swap requests to growers
* View detailed plant information
* List new plants through a submission form
* Upload plant images with preview

### 🎨 Visual Feedback

* Skeleton loading states
* Loading spinner during form submission
* Toast notifications
* Hover animations
* Interactive plant cards
* Modal dialogs for plant details and actions

### ⌨️ Keyboard Shortcuts

| Shortcut   | Action                                |
| ---------- | ------------------------------------- |
| `Ctrl + K` | Focus the search bar                  |
| `Escape`   | Clear search / close modal            |
| `Tab`      | Navigate through interactive elements |

---

## 🛠️ Technologies Used

| Technology           | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| **HTML5**            | Semantic page structure                              |
| **CSS3**             | Responsive styling, Grid, Flexbox, and CSS variables |
| **JavaScript**       | Dynamic interactions and application logic           |
| **Google Fonts**     | Typography                                           |
| **Material Symbols** | Icons                                                |
| **LocalStorage**     | Persisting favorite plants                           |

---

## 📱 Responsive Design

Verdant Circle is designed to work across desktop, tablet, and mobile devices.

| Device      | Width            | Layout               |
| ----------- | ---------------- | -------------------- |
| 📱 Mobile   | `< 768px`        | Single-column layout |
| 💻 Tablet   | `768px – 1023px` | Two-column layout    |
| 🖥️ Desktop | `1024px+`        | Three-column layout  |

The interface follows a **mobile-first approach** using responsive CSS media queries.

---

## 📁 Project Structure

```text
verdant-circle/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

You only need:

* A modern web browser
* Chrome, Firefox, Edge, or Safari
* No additional dependencies or build tools are required

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/DecodeLabs-Internship.git
```

#### 2. Navigate to the project folder

```bash
cd DecodeLabs-Internship
```

#### 3. Open the project

You can simply open:

```text
index.html
```

in your browser.

Alternatively, run a local development server.

**Python:**

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 🎮 How to Use

### 🌱 Browse Plants

1. Open the Verdant Circle homepage.
2. Browse available plant listings.
3. Select **View Details** to see complete plant information.
4. Select **Request Swap** to contact the grower.

### 🔎 Search & Filter

1. Use the search bar to find a specific plant.
2. Select a category such as **Succulents** or **Foliage**.
3. Adjust the distance range.
4. Use the sorting dropdown to change the order of results.

### 📋 List a Plant

1. Upload a plant image.
2. Enter the plant name.
3. Select a category.
4. Enter the neighborhood.
5. Add a description and care information.
6. Submit the form.
7. Your plant listing will appear in the plant grid.

### ❤️ Save Favorites

Click the heart icon on any plant card to save it.

Favorite plants are stored in the browser using `localStorage`, so they remain available after refreshing the page.

---

## 🎨 Color Palette

| Color     | Hex       | Usage                         |
| --------- | --------- | ----------------------------- |
| Moss Deep | `#3F5D3A` | Primary buttons and headings  |
| Moss Soft | `#8FAE83` | Secondary accents             |
| Sage Mist | `#B7C9A8` | Light accents and backgrounds |
| Clay Rust | `#B5563C` | Accent and favorite states    |
| Bark      | `#241F1A` | Main text                     |
| Parchment | `#F3F1E9` | Page background               |
| Linen     | `#FBFAF5` | Cards and surfaces            |

---

## ♿ Accessibility

The interface includes accessibility-focused features such as:

* Semantic HTML5 elements
* Accessible form controls
* ARIA labels where required
* Keyboard navigation
* Visible focus states
* Skip navigation link
* Reduced-motion support
* Clear visual hierarchy

---

## 📸 Screenshots

### 🖥️ Desktop View

*Add your actual desktop screenshot here.*

```text
screenshots/
└── desktop.png
```

### 📱 Mobile View

*Add your actual mobile screenshot here.*

### 🌿 Plant Details

*Add your plant details/modal screenshot here.*

> **Tip:** Replace these placeholders with actual screenshots once you have them.

---

## 🧪 Test Scenarios

| Feature         | Test Scenario                                                |
| --------------- | ------------------------------------------------------------ |
| Search          | Search `pothos` and verify relevant plants appear            |
| Category Filter | Select `Succulents` and verify only succulent plants appear  |
| Distance Filter | Adjust the distance slider and verify results update         |
| Sorting         | Select `Name (A-Z)` and verify alphabetical ordering         |
| Favorites       | Click the heart icon and verify the favorite persists        |
| Image Upload    | Upload an image and verify the preview appears               |
| Form Validation | Submit incomplete information and verify validation messages |
| Form Submission | Complete the form and verify the loading state               |
| Keyboard        | Press `Ctrl + K` and verify the search field receives focus  |
| Modal           | Press `Escape` and verify the modal closes                   |

---

## 🔮 Future Enhancements

The following features can be added in future versions:

* [ ] Backend API integration
* [ ] Node.js and MongoDB integration
* [ ] User authentication and authorization
* [ ] Real-time chat between growers
* [ ] Google Maps integration for meetup locations
* [ ] Grower rating and review system
* [ ] Email notifications
* [ ] Progressive Web App (PWA) support
* [ ] Mobile application

---

## 📚 Learning Outcomes

### HTML

* Semantic HTML5
* Accessible forms
* Form validation
* Proper heading hierarchy
* HTML landmarks

### CSS

* Mobile-first responsive design
* CSS Grid
* Flexbox
* CSS variables
* Responsive media queries
* Fluid layouts
* Hover and transition effects

### JavaScript

* DOM manipulation
* Event handling
* Form handling
* Client-side validation
* LocalStorage
* Dynamic filtering and sorting
* Modal management
* Keyboard event handling

---

## ⚠️ Current Limitations

* Plant data is handled on the frontend.
* There is currently no backend server.
* User authentication is not implemented.
* Swap requests are frontend-only.
* Uploaded images are handled locally in the browser.
* Data is not synchronized between different users or devices.

---

## 📄 License

© 2026 DecodeLabs Internship Project.

This project was created as part of the **DecodeLabs Full Stack Developer Internship Program**.

---

## 🙏 Acknowledgments

* **DecodeLabs** — Internship opportunity and project requirements
* **Google Fonts** — Typography
* **Material Symbols** — Iconography

---

## ⭐ Project Status

**Version:** `1.0`

**Status:** ✅ Completed Frontend Project

**Built with:** HTML5 · CSS3 · JavaScript

---

## 💚 About Verdant Circle

> **Swap cuttings, not cash. 🌱**

Verdant Circle is built around a simple idea: **plants grow better when communities grow together.**
