# React Developer Portfolio

A responsive, modern developer portfolio built with **React 19**, **TypeScript**, and **Tailwind CSS**. Pre-configured for hosting directly on **GitHub Pages** with GitHub Actions or `gh-pages`.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

This project already contains `.github/workflows/deploy.yml` configured for automatic builds on push.

1. Create a new GitHub repository named `portfolio` on your account ([github.com/new](https://github.com/new)).
2. Push this codebase to your repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/etworkapp/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Your website will automatically build and go live at:
   `https://etworkapp.github.io/portfolio/`

> **Note on "404 There isn't a GitHub Pages site here" error**:
> If you see GitHub's 404 page:
> 1. Ensure step 3 above is done (Settings > Pages > Source = **GitHub Actions**).
> 2. Open the **Actions** tab on your repository to verify that the build workflow has finished (takes ~60s).
> 3. If the Action failed, check **Settings** > **Actions** > **General** > **Workflow permissions** and enable **"Read and write permissions"**.
> 4. If your repo is named `portfolio`, the URL is `https://etworkapp.github.io/portfolio/`. If named `etworkapp.github.io`, the URL is `https://etworkapp.github.io/`.

---

### Method 2: Deploy using `npm run deploy` (`gh-pages`)

If you prefer terminal-based deployment using the `gh-pages` branch:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run deploy:
   ```bash
   npm run deploy
   ```
3. In GitHub repository **Settings** > **Pages**:
   - Set **Source** to **Deploy from a branch**.
   - Select **gh-pages** branch and root `/`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Deployment**: GitHub Pages, GitHub Actions, gh-pages
