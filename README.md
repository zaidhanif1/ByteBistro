### ByteBistro 🍳

<img width="1906" height="908" alt="image" src="https://github.com/user-attachments/assets/4420961b-6441-48ef-83a1-0c9bca9371a9" />
<img width="1904" height="908" alt="image (55)" src="https://github.com/user-attachments/assets/d88ebcd0-1bde-431b-b59a-13a78d7275be" />

AI-Powered Recipe Discovery & Meal Planning

ByteBistro is a full-stack web app that helps users generate, save, and manage personalized recipes. It combines modern web technologies with AI to create a smart, interactive cooking assistant.

### 🚀 Features

AI Recipe Generation – Generate recipes tailored to ingredients, preferences, and dietary needs using the Gemini API.

Recipe Images – HuggingFace image models provide visuals for each recipe.

User Authentication – Secure signup/login with JWT and password hashing via bcrypt.

Saved Recipes – Store and manage favorites with PostgreSQL.

Modern UI – Responsive interface built with React + CSS.

Express API – Backend routes handle auth, recipe generation, and database queries.

### 🛠️ Tech Stack

Frontend: React, CSS

Backend: Express.js, Node.js

Database: PostgreSQL

Authentication: JWT, bcrypt

AI/ML: Gemini API (text), HuggingFace API (images)

Deployment: Netlify / Render

### 🛑 Prerequisites

Node.js (>= 18)

PostgreSQL running locally or in the cloud

API keys for Gemini + HuggingFace

### ⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/yourusername/bytebistro.git
cd bytebistro

2. Environment variables

Create a `.env` file in the **server** directory with:

```env
ALLOWED_ORIGINS=http://localhost:5173
PORT=8000
DATABASE_URL=postgres://username:password@localhost:5432/bytebistro
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
HUGGINGFACE_API_KEY=your_hf_key
```
3. Install dependencies
```npm install```

4. Run backend & frontend

You can run both servers separately:
```
# In /server
npm run dev  

# In /client
npm start
```


Or install concurrently and add a script to package.json:
```
npm install --save-dev concurrently
```

Inside package.json:
```
"scripts": {
  "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm start\""
}
```

Now run both with:
```
npm run dev
```
🤝 Contributing

Contributions are welcome! Fork the repo, open a PR, or suggest features via Issues.
