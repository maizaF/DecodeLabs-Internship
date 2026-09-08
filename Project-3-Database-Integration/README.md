# Verdant Circle API — MongoDB Integration

> **DecodeLabs Internship Program — Project 3: Database Integration**

A RESTful API for the **Verdant Circle** plant-swap platform, upgraded from file-based storage to **MongoDB Atlas** using **Node.js, Express.js, and Mongoose**.

---

## Project Overview

Project 3 replaces the previous `plants.json` file-based storage system with a cloud-based MongoDB database.

### Key Features

* MongoDB Atlas cloud database integration
* Mongoose schema and validation
* Complete CRUD operations
* Category-based filtering
* Automatic timestamps
* Database indexing
* Error handling
* Environment variable configuration
* Seed data support

---

## Technologies Used

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | JavaScript runtime    |
| Express.js    | REST API framework    |
| MongoDB Atlas | Cloud database        |
| Mongoose      | MongoDB ODM           |
| dotenv        | Environment variables |
| CORS          | Cross-origin requests |

---

## Project Structure

```text
Project-3-Database-Integration/
│
├── config/
│   └── db.js
├── controllers/
│   └── plantController.js
├── models/
│   └── Plant.js
├── routes/
│   └── plants.js
├── .env
├── .gitignore
├── package.json
├── server.js
├── seed.js
└── README.md
```

---

## Database Schema

### Plant Model

| Field          | Type   | Required | Description            |
| -------------- | ------ | -------- | ---------------------- |
| `name`         | String | Yes      | Plant name             |
| `category`     | String | Yes      | Plant category         |
| `neighborhood` | String | Yes      | Plant location         |
| `distance`     | Number | No       | Distance in kilometers |
| `description`  | String | Yes      | Plant description      |
| `care`         | String | No       | Care instructions      |
| `size`         | String | No       | Plant size             |
| `image`        | String | No       | Image URL              |
| `createdAt`    | Date   | Auto     | Creation timestamp     |
| `updatedAt`    | Date   | Auto     | Update timestamp       |

### Supported Categories

```text
succulent
foliage
herb
flowering
```

### Supported Sizes

```text
Small
Medium
Large
Seedling
```

---

## API Endpoints

| Method | Endpoint                         | Description        |
| ------ | -------------------------------- | ------------------ |
| GET    | `/api/plants`                    | Get all plants     |
| GET    | `/api/plants/:id`                | Get a single plant |
| GET    | `/api/plants?category=succulent` | Filter by category |
| POST   | `/api/plants`                    | Create a new plant |
| PUT    | `/api/plants/:id`                | Update a plant     |
| DELETE | `/api/plants/:id`                | Delete a plant     |

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/maizaF/DecodeLabs-Internship.git
cd DecodeLabs-Internship/Project-3-Database-Integration
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the Server

```bash
npm start
```

Server:

```text
http://localhost:5000
```

### 5. Seed Sample Data

```bash
node seed.js
```

---

## API Testing

### Get All Plants

```bash
curl http://localhost:5000/api/plants
```

### Create a Plant

```bash
curl -X POST http://localhost:5000/api/plants \
  -H "Content-Type: application/json" \
  -d '{"name":"Snake Plant","category":"foliage","neighborhood":"Downtown","description":"Very hardy"}'
```

### Filter by Category

```bash
curl "http://localhost:5000/api/plants?category=succulent"
```

### Update a Plant

```bash
curl -X PUT http://localhost:5000/api/plants/PLANT_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Plant"}'
```

### Delete a Plant

```bash
curl -X DELETE http://localhost:5000/api/plants/PLANT_ID
```

---

## Database Features

| Feature                   | Status |
| ------------------------- | ------ |
| MongoDB Atlas Integration | ✅      |
| Mongoose Schema           | ✅      |
| Schema Validation         | ✅      |
| Required Fields           | ✅      |
| Enum Validation           | ✅      |
| Length Validation         | ✅      |
| Automatic Timestamps      | ✅      |
| Database Indexing         | ✅      |
| CRUD Operations           | ✅      |
| Category Filtering        | ✅      |
| Error Handling            | ✅      |
| Seed Script               | ✅      |

---

## Security

The MongoDB connection string is stored in environment variables and should not be committed to GitHub.

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

## Project Status

**Project 3 — Database Integration: Complete ✅**

The backend now uses **MongoDB Atlas for persistent cloud-based data storage** with a validated Mongoose schema and complete RESTful CRUD functionality.

