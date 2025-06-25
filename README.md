# 🧠 StackMind Web Blog – Client

StackMind is a modern and responsive web blogging platform where users can explore blogs, write and manage their own posts, interact with other users, and bookmark content they love. This repository contains the **frontend** codebase built using **React**, styled with **Tailwind CSS** and **DaisyUI**, and powered by modern tools like **TanStack Query**, **Axios**, and **Framer Motion** for an engaging user experience.

<p align="center">
  <img src="https://github.com/abedinalways/StackMind-Client/blob/main/stackMind_app.png" alt="StackMind Screenshot" />
</p>

---

## 🔗 Live Site

🌐 **Live Website:** [https://stackmind-auth.web.app/](https://stackmind-auth.web.app/)

---

## 🧰 Tech Stack

- ⚛️ **React** – Component-based UI library
- 🔁 **React Router DOM** – SPA routing
- 📦 **TanStack Query (React Query)** – Server state management and data fetching
- 🌐 **Axios** – Promise-based HTTP client
- 💨 **Tailwind CSS** – Utility-first CSS framework
- 🎨 **DaisyUI** – Pre-built UI components for Tailwind
- 🎬 **Framer Motion** – Declarative animations for React
- 🔥 **React Hot Toast** – Elegant toast notifications
- 📽️ **Lottie React** – Render Lottie animations in React
- 🎨 **React Icons** – Icon packs as React components
- ⚙️ **Dotenv** – Load environment variables

---

## 🌟 Key Features

- 📰 **Blog Browsing** – View all blogs, filter by category or author
- 🔒 **User Authentication** – Secure login/register with JWT-based token system
- ✍️ **Create & Manage Posts** – Add, edit, and delete your own blogs
- ❤️ **Wishlist System** – Bookmark blogs to your wishlist
- 💬 **Commenting** – Engage with blog authors and readers
- 🌈 **Animated UI** – Page transitions and dynamic components using Framer Motion
- 📱 **Responsive Design** – Works across all screen sizes
- 🔔 **Toast Notifications** – Real-time feedback for user actions

---

## 📦 Dependencies

```json
"dependencies": {
 "@emotion/react": "^11.14.0",
    "@tailwindcss/vite": "^4.1.8",
    "@tanstack/react-query": "^5.80.7",
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.9.0",
    "firebase": "^11.9.0",
    "framer-motion": "^12.16.0",
    "heroicons": "^2.2.0",
    "lottie-react": "^2.4.1",
    "lucide": "^0.513.0",
    "motion": "^12.16.0",
    "next-themes": "^0.4.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-router": "^7.6.2",
    "react-simple-typewriter": "^5.0.1",
    "shadcn": "^2.6.1",
    "shadcn-ui": "^0.9.5",
    "sweetalert2": "^11.22.0",
    "swiper": "^11.2.8",
    "tailwindcss": "^4.1.8"
}

----
🛠️ Getting Started
Follow these steps to set up the project on your local machine:
# 1. Clone the repository
git clone https://github.com/abedinalways/StackMind-Web-Blog.git

# 2. Navigate to the project directory
cd StackMind-Web-Blog

# 3. Install project dependencies
npm install

# 4. Create a .env file and add the backend URL
echo "VITE_API_BASE_URL=https://stack-mind-server.vercel.app" > .env

# 5. Start the development server
npm run dev


🔗 Open your browser and go to http://localhost:5173 to view the application.

---
#Project Structure

StackMind-Web-Blog/
├── public/                # Static files
├── src/
│   ├── assets/            # Images and Lottie files
│   ├── components/        # Reusable components
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Route-level pages
│   ├── routes/            # Route definitions
│   ├── services/          # API call functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite development server config
└── README.md              # Project documentation


---
🙋‍♂️ Author
Sheikh Minhajul Abedin
📧 Email: sheikh.minhajul1205045@gmail.com



