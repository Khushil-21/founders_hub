# 🚀 Founders Hub

Welcome to **Founders Hub** – a platform where startup enthusiasts can discover, share, and explore innovative ideas in real-time.

---

## 🌟 Features

- **Discover New Startups**: Browse through ideas pitched by users and see real-time engagement metrics.
- **Share Your Ideas**: Log in and pitch your own startup concept to the community.
- **Explore User Profiles**: Check out other creators' profiles and see all startups they've shared.
- **Efficient Search**: Find specific ideas or users quickly with an integrated search feature.

---

## 🤔 Why I Built This Project

This project is more than just a platform; it's a learning journey. I built Founders Hub to gain hands-on experience with **Next.js 15** and explore its latest features beyond theoretical knowledge. A big thanks to **JavaScriptMastery** for guiding my learning process through insightful tutorials.

---

## 🛠️ Technology Stack

### 🔑 Authentication
- **Next Auth v5 (beta)** with OAuth
- Google & GitHub Login Integration

### 🗄️ Database
- **Sanity**: Schema creation, GROQ queries, and visual CRUD operations.

### 🖥️ Next.js & Frontend
- **Next.js 15.0.3** (Canary version):
  - **Partial Pre-Rendering (PPR)**: Combines static and dynamic rendering for optimal speed.
  - **`After` API**: Runs non-UI-dependent tasks post-render.
  - **Parallel & Sequential Data Fetching**: Utilizes Promise.all for parallel fetching when APIs aren't interdependent.
  - **Dynamic URLs with Static Params**: Pre-generates pages for faster loading.
- **Shadcn UI**: Responsive and clean UI components.
- **Zod**: Schema validation.
- **TypeScript**: Comprehensive type support across the app.
- **Markdown-It**: Rich text formatting for startup descriptions.

### 🧰 Additional Tools
- **Sentry**: Error handling, bug reporting, and user feedback.
- **Vercel Analytics**: Tracks user engagement and performance metrics.

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/founders-hub.git
   cd founders-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - Add necessary environment variables for **Next Auth** and **Sanity**.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

## 📸 Screenshots

| Home Page                                | Startup Details Page                       |
| ---------------------------------------- | ------------------------------------------ |
| ![Home Page](./screenshots/homepage.png) | ![Details Page](./screenshots/details.png) |

*(Add relevant screenshots in the `screenshots` folder to make the README visually appealing)*

---

## 🎉 Contributions

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

---

**Enjoy exploring Founders Hub and let's bring startup ideas to life together!**
