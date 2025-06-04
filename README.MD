# BidVault - Auction Platform

Welcome to **BidVault**, an online auction site where users can add items for bidding and place bids on other users' items. The platform is designed to be user-friendly, ensuring seamless navigation and interactions for both registered and non-registered users.

🔗 **Live Demo**  
Access the application here: [BidVault](https://bidvault.netlify.app/welcome)

---

## ✨ Features

- **🎟️ User Registration and Credits**:  
  New users are provided with 1000 credits to start bidding and selling.
- **📝 Auction Listings**:  
  Users can list items for auction and bid on other users' listings.
- **👤 Guest Access**:  
  Non-registered users can browse auction listings but cannot place bids.
- **⚡ Dynamic Routing**:  
  Efficient page navigation using dynamic module imports.

---

## ⚙️ Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later)

---

## 🚧 Project Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AnnaAaBrekke/BidVault.git
   cd bidvault
   ```

2. **Install Dependencies:**:

   ```bash
   npm install
   ```

3. **Setup Husky Hooks:**  
   Husky is pre-configured for formatting code before commits:

   ```bash
   npm run prepare
   ```

4. **Environment Variables:**:
   Create a .env file in the root directory for any API keys or environment-specific configurations.

## 🛠️ Usage Instructions

### 💻 Development Server

Run the development server:

```bash
npm run dev
```

Access the app at http://localhost:5173.

#### 🚀 Build for Production

Build the project for production:

```bash
npm run build
```

The built files are available in the dist folder.

#### 🔍 Preview the Build

Serve the built files locally to ensure everything works as expected:

```bash
npm run preview
```

#### 🎨 Code Formatting

Format the codebase using Prettier:

```bash
npm run format
```

#### 🧹 Linting

Lint the codebase to ensure code quality:

```bash
npm run lint
```

## 🔑 Key Routes

| Path              | Description                  | Link                                                          |
| ----------------- | ---------------------------- | ------------------------------------------------------------- |
| `/`               | Home page                    | [Home](https://bidvault.netlify.app/)                         |
| `/welcome`        | Welcome page (login)         | [Welcome](https://bidvault.netlify.app/welcome)               |
| `/auth/register`  | User registration            | [Register](https://bidvault.netlify.app/auth/register)        |
| `/profile`        | User profile                 | [Profile](https://bidvault.netlify.app/profile)               |
| `/profile/update` | Update profile information   | [Update Profile](https://bidvault.netlify.app/profile/update) |
| `/listing/create` | Create a new auction listing | [Create Listing](https://bidvault.netlify.app/listing/create) |

## 🔧 Tools & Technologies

- **Frontend:** Vite, Tailwind CSS
- **Styling:** Tailwind CSS, Sass
- **Linting & Formatting:** ESLint, Prettier
- **Git Hooks:** Husky

## 📜 License

This project is licensed under the MIT License.
