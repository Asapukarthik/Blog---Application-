# Blogify 📝 - Premium Cloud-First Blog Platform

Blogify is a full-stack, professional blog application built for modern storytellers. Leveraging the **MERN stack** (with EJS) and **Cloudinary**, it offers a premium SaaS experience with rich text editing, real-time engagement analytics, and a sleek, responsive design.

---

## 🚀 Modern Features

- **✍️ Professional Writing**: Integrated **Quill.js Rich Text Editor** for beautiful content formatting.
- **☁️ Cloud Storage**: Seamless image management via **Cloudinary** (Profiles & Blog Covers).
*   **🔍 Power Search**: Real-time filtering to find stories by title or tags.
*   **📈 Engagement Analytics**: Track **View Counts** and **Reading Time** for every post.
*   **❤️ Interative Likes**: Let users engage with content through a heart-based like system.
*   **🏷️ Smart Tagging**: Organize and discover content using a dynamic tagging system.
*   **👤 Account Management**: Custom user profiles with profile picture uploads.
*   **📢 Social Sharing**: One-click sharing to LinkedIn and X (Twitter).
*   **🎨 Premium UI**: Modern aesthetic with glassmorphism, responsive layouts, and FontAwesome 6 icons.

---

## 🛠️ Tech Stack

| Category        | Technology                       |
|----------------|----------------------------------|
| **Backend**     | Node.js, Express.js              |
| **Frontend**    | EJS, Bootstrap 5, Custom CSS3    |
| **Database**    | MongoDB (Mongoose)               |
| **Cloud Storage**| Cloudinary                       |
| **Rich Text**   | Quill.js                         |
| **Icons**       | FontAwesome 6                    |
| **Auth**        | JWT, Cookie-Parser, Bcrypt       |

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# Database
MONGO_URI=your_mongodb_connection_string

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
SESSION_SECRET=your_session_secret
```

---

## 📂 Project Structure

```text
blogify/
├── public/               # Assets (Modern CSS, Images)
├── routes/               # Express Routes (Blog, User, Auth)
├── models/               # Mongoose Schemas (User, Blog, Comment)
├── views/                # EJS Templates (Home, Profile, Add/Edit)
├── utils/                # Utilities (Cloudinary Config)
├── middlewares/          # Custom Auth Middlewares
├── app.js                # Core Application Entry
├── package.json          # Dependencies & Scripts
└── README.md             # Documentation
```

---

## 🚦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment**: Add your MongoDB and Cloudinary keys to `.env`.
4. **Run in Dev Mode**:
   ```bash
   npm run dev
   ```
5. **Start Production**:
   ```bash
   npm start
   ```
