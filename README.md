
# whatsAura.com — MVP Website Starter (No Backend)

This is a ready-to-deploy demo website for **whatsaura.com**. It shows your Aura dashboard UI with demo data (you can swap later). No coding knowledge required.

---

## 0) What you will do (simple)
1. **Create a GitHub account** (if you don't have one).
2. **Upload** this folder to GitHub.
3. **Connect to Vercel** to deploy the site.
4. **Point your domain** `whatsaura.com` at Vercel (copy-paste DNS values).

That's it. You get a live website.

---

## 1) How to open this project
- Unzip the file you downloaded so you see a folder named `whatsaura-starter` with files inside (package.json, app/, components/, etc.).

---

## 2) Put it on GitHub (the easy way)
1. Go to https://github.com and **Sign up / Log in**.
2. Click the **+** (top right) → **New repository**.
3. Name it **whatsaura** → Keep it **Public** → Click **Create repository**.
4. On the new repo page, click **"uploading an existing file"**.
5. Drag all the files from your `whatsaura-starter` folder into the GitHub upload area (TIP: Select all files and folders inside `whatsaura-starter`, not the zip itself).
6. Scroll down and click **Commit changes**.

You now have your code on GitHub.

> Optional: If dragging folders is tricky, install **GitHub Desktop** (https://desktop.github.com), then: File → New repository from existing files → choose `whatsaura-starter` → Publish repository.

---

## 3) Deploy to the web with Vercel
1. Go to https://vercel.com and **Sign up** (with GitHub).
2. Click **Add New… → Project**.
3. Select the **whatsaura** repository you just created and click **Import**.
4. Accept the defaults and click **Deploy**.
5. Wait for the green check — you'll get a temporary URL like `https://whatsaura.vercel.app`.

Congrats, your site is live (on a temporary URL).

---

## 4) Connect your domain whatsAura.com
> You must own the domain. If you haven't bought it yet, buy it from your registrar (e.g., Namecheap or Google Domains).

**In Vercel:**
1. In your project → **Settings** → **Domains** → **Add** → type `whatsaura.com` (and also add `www.whatsaura.com`).
2. Vercel will show the exact **DNS records** you need. Keep this tab open.

**At your domain registrar (where you bought whatsAura.com):**
1. Find the DNS or “Manage Domain” area.
2. Create the records Vercel asks for. Typically it's:
   - **A record** for the root `whatsaura.com` → Value: **76.76.21.21** (Vercel’s IPv4).
   - **CNAME record** for `www` → Value: **cname.vercel-dns.com**

> If Vercel asks for different values, **use exactly what Vercel shows**. That page is the source of truth.

**Back on Vercel:**
- Click **Verify**. Once DNS updates, Vercel will show a green check. Your site will be live at `https://whatsaura.com`.

---

## 5) How to edit the homepage text
- In GitHub, open `components/TrendDashboard.jsx` and click the pencil ✏️ to edit.
- Change any text (like the top title) and click **Commit changes**.
- Vercel automatically redeploys — refresh your site to see the changes.

---

## 6) Local preview (optional)
Only if you want to see it on your laptop before deploying.

1. Install **Node.js LTS** from https://nodejs.org (one-time install).
2. Open a terminal, go into the project folder.
3. Run:

```
npm install
npm run dev
```
4. Open http://localhost:3000 — you’ll see the site.

---

## 7) Where to put real data later
Right now the cards use demo data inside `components/TrendDashboard.jsx`. Later, you (or a dev) can:
- Replace that with a **Google Sheets** fetch, or
- Hook to a small **API** (Supabase/Render), or
- Paste a static `data/trends.json` and fetch it.

For a PoC, the current demo is perfect to show UX and flow.

---

## 8) Troubleshooting
- **Build failed on Vercel**: Try redeploy. If it persists, ensure the repo has all files (especially `package.json`, `app/`, `components/`).
- **Domain not working**: DNS can take time. In Vercel → Domains, check the status and apply exactly the records it lists.

---

## 9) Brand polish
- Replace the favicon in `/public` (you can add your own `favicon.ico`).
- Edit the top-left square logo block in `TrendDashboard.jsx` to your logomark or text.
- Change the page title/description in `app/layout.jsx`.

You’re done. You now have a real website for **whatsaura.com** with your Aura dashboard ready to show investors and early users.
