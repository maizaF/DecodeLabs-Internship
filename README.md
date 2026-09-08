
# 🌿 DecodeLabs Internship 2026 — Full Stack Development

> **My journey from Frontend to Full Stack Developer**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat&logo=githubpages&logoColor=white)](https://pages.github.com/)

---

## 📋 Project Overview

This repository contains **all 3 projects** completed during my **Full Stack Development Internship at DecodeLabs (2026)**. The journey progressed from frontend design to backend API development, and finally to database integration — resulting in a complete Full Stack application.

### 🌱 The Application: Verdant Circle

**Verdant Circle** is a neighborhood plant-swap platform where plant lovers can share surplus cuttings and discover new plants from nearby growers — no money involved, just plants, community, and a little patience.

---

## 📂 Repository Structure

```
DecodeLabs-Internship/
│
├── 📁 Project-1-Verdant-Circle/
│   └── Frontend Application (HTML/CSS/JS)
│
├── 📁 Project-2-Backend-API/
│   └── RESTful API (Node.js/Express)
│
├── 📁 Project-3-Database-Integration/
│   └── MongoDB Integration (Mongoose)
│
├── 📄 index.html          → Redirect to live demo
└── 📄 README.md           → This file
```

---

## 🚀 Projects

### Project 1: Verdant Circle (Frontend)

**Description:** A fully responsive, accessible plant-swap web application built with vanilla HTML, CSS, and JavaScript.

**Key Features:**
- ✅ Responsive design (Mobile/Tablet/Desktop)
- ✅ Search, filter, and sort functionality
- ✅ Favorites with localStorage persistence
- ✅ Image upload with drag & drop
- ✅ Toast notifications
- ✅ Skeleton loading
- ✅ Keyboard shortcuts (`Ctrl+K`)
- ✅ WCAG AA accessibility

**Technologies:** HTML5, CSS3, Vanilla JavaScript

**Live Demo:** [View Project](https://maizaF.github.io/DecodeLabs-Internship/)

---

### Project 2: Backend API

**Description:** A RESTful API for the Verdant Circle platform with file-based storage.

**API Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/plants` | Get all plants |
| GET | `/api/plants/:id` | Get a single plant |
| GET | `/api/plants?category=succulent` | Filter by category |
| POST | `/api/plants` | Add a new plant |
| PUT | `/api/plants/:id` | Update a plant |
| DELETE | `/api/plants/:id` | Delete a plant |

**Features:**
- ✅ 6 RESTful endpoints
- ✅ Data validation
- ✅ Error handling (400, 404, 500)
- ✅ UUID for IDs
- ✅ Category filtering
- ✅ File-based storage (plants.json)

**Technologies:** Node.js, Express.js

---

### Project 3: Database Integration

**Description:** Upgraded backend from file storage to cloud-based MongoDB Atlas database.

**Features:**
- ✅ MongoDB Atlas cloud database
- ✅ Mongoose schema with validation
- ✅ Complete CRUD operations
- ✅ Category filtering
- ✅ Automatic timestamps
- ✅ Database indexing
- ✅ Seed script for sample data

**Database Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Plant name |
| `category` | String | ✅ | succulent/foliage/herb/flowering |
| `neighborhood` | String | ✅ | Location |
| `description` | String | ✅ | Plant description |
| `distance` | Number | ❌ | Auto-generated |
| `care` | String | ❌ | Care instructions |
| `size` | String | ❌ | Small/Medium/Large |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Update timestamp |

**Technologies:** Node.js, Express.js, MongoDB Atlas, Mongoose

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **API** | RESTful Architecture |
| **Version Control** | Git & GitHub |
| **Deployment** | GitHub Pages |

---

## 📊 Learning Journey

| Project | Focus | Skills Acquired |
|---------|-------|-----------------|
| **Project 1** | Frontend | HTML5, CSS3, Vanilla JS, Accessibility, Responsive Design |
| **Project 2** | Backend API | Node.js, Express.js, RESTful API, HTTP Methods, Data Validation |
| **Project 3** | Database | MongoDB, Mongoose, CRUD Operations, Schema Design, Cloud Database |

---

## 🔗 Live Links

| Project | Live URL |
|---------|----------|
| **Live Demo** | [https://maizaF.github.io/DecodeLabs-Internship/](https://maizaF.github.io/DecodeLabs-Internship/) |
| **GitHub Repository** | [https://github.com/maizaF/DecodeLabs-Internship](https://github.com/maizaF/DecodeLabs-Internship) |

---

## 🚀 How to Run Locally

### Clone the Repository

```bash
git clone https://github.com/maizaF/DecodeLabs-Internship.git
cd DecodeLabs-Internship
```

### Run Project 1 (Frontend)

1. Open `Project-1-Verdant-Circle/index.html` in your browser
2. Or use Live Server in VS Code

### Run Project 2 (Backend API)

```bash
cd Project-2-Backend-API
npm install
npm start
```

### Run Project 3 (Database Integration)

```bash
cd Project-3-Database-Integration
npm install
node seed.js  # Seed sample data
npm start
```

---

## 📸 Screenshots

### Project 1: Verdant Circle Frontend

![Verdant Circle Homepage](https://via.placeholder.com/800x400/3F5D3A/FFFFFF?text=Verdant+Circle+Homepage)

### Project 2: Backend API Response

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "1",
      "name": "Golden Pothos",
      "category": "foliage",
      "neighborhood": "Riverside",
      "distance": 1.2
    }
  ]
}
```

### Project 3: MongoDB Connection

```
✅ MongoDB Connected: ac-irkccqm-shard-00-02.oaoveiv.mongodb.net
🚀 Server running on port 5000
```

---

## 📧 Contact

**DecodeLabs**
- 📧 Email: decodelabs.tech@gmail.com
- 🌐 Website: www.decodelabs.tech
- 📍 Location: Greater Lucknow, India

**Developer**
- 🔗 GitHub: [maizaF](https://github.com/maizaF)
- 📧 Email: maizafatima84@gmail.com

---

## 📄 License

© 2026 DecodeLabs Internship Project. All rights reserved.

This project is created as part of the **DecodeLabs Full Stack Developer Internship Program**.

---

## 🙏 Acknowledgments

- **DecodeLabs** — For providing the internship opportunity and project requirements
- **MongoDB** — For the Atlas cloud database
- **Google Fonts** — For Inter and Source Sans 3 fonts
- **Material Symbols** — For the icon library

---

## 🏆 Certificate

This repository is submitted as part of the **DecodeLabs Full Stack Developer Internship Program 2026** requirements.

**Status:** ✅ Complete & Production Ready

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ for the DecodeLabs Internship Program**

---

**Version:** 1.0.0  
**Last Updated:** September 2026  
**Status:** ✅ Complete & Production Ready
```

---

## 📤 How to Add This README to GitHub

### Method 1: VS Code

1. Open your `DecodeLabs-Internship` folder in VS Code
2. Create `README.md` in the root
3. Paste the content above
4. Commit and push:

```bash
git add README.md
git commit -m "📄 Add main README.md with all projects"
git push origin main
```

---

### Method 2: GitHub Website

1. Go to: `https://github.com/maizaF/DecodeLabs-Internship`
2. Click on `README.md` file
3. Click the pencil icon ✏️
4. Delete everything and paste the new content
5. Click **"Commit changes"**

---

**🎉 Your repository now has a professional, complete README!**
