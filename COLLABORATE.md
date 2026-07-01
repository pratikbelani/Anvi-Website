# Collaborating on the ANVI website (with a friend + Claude)

**The idea:** you and your friend don't share one Claude chat. You share the
**website files** through GitHub, and each of you runs your **own** Claude on them.
GitHub keeps everyone's copy in sync and remembers every change.

> The folder is already a Git repository with your first commit saved. ✅
> You just need to publish it to GitHub. The easiest way (no passwords/tokens) is
> **GitHub Desktop**, below.

---

## Part 1 — Publish it to GitHub (you, ~10 min)

1. **Create a free GitHub account** → https://github.com/signup
   (Your friend should make one too — you'll need their username in Part 3.)
2. **Install GitHub Desktop** → https://desktop.github.com → open it → **Sign in**
   with your new GitHub account.
3. In GitHub Desktop: **File → Add Local Repository…**
   Choose this folder:
   `/Users/pratikbelani/Claude/anvi-website`
   (It's already a repo, so it'll be added instantly.)
4. Click **Publish repository** (top bar).
   - Name: `anvi-website`
   - **Uncheck** “Keep this code private” — this lets you use the free live link in Part 2.
     *(If you'd rather keep it private, that's fine — you'll use Netlify for the link instead; see “Live link — private option” below.)*
   - Click **Publish repository**.

Done — your site now lives on GitHub.

---

## Part 2 — Turn on the free live link (you, ~2 min)

1. Go to your repo on **github.com** → **Settings** → **Pages** (left sidebar).
2. Under **Source**, choose **Deploy from a branch** → Branch: **main** → Folder: **/ (root)** → **Save**.
3. Wait ~1 minute, refresh. Your permanent link appears:
   `https://<your-username>.github.io/anvi-website/`

That link works on any device, updates automatically whenever you push changes,
and is perfect for sharing with your friend, partners or investors.
*(For the coming-soon teaser instead, share `…/anvi-website/coming-soon.html`.)*

**Live link — private option (Netlify):** if you kept the repo private, go to
https://netlify.com → “Add new site” → “Import from GitHub” → pick `anvi-website`.
Leave build settings empty (it's a static site) → Deploy. Netlify gives you a free URL.

---

## Part 3 — Add your friend (you, ~1 min)

On your repo → **Settings → Collaborators → Add people** → enter your friend's
GitHub username → send invite. They accept via email/GitHub.

---

## Part 4 — Your friend joins and uses Claude

Your friend needs their **own Claude access** (Claude Code). Then, either:

- **On their computer:** install **GitHub Desktop** → **File → Clone Repository** →
  pick `anvi-website` → it downloads to their Mac/PC. They open that folder in
  **Claude Code** (desktop app or terminal) and start working.
- **In a browser (no install):** go to **https://claude.ai/code**, connect their
  GitHub, and open the `anvi-website` repo. They can edit and preview entirely online.

---

## Part 5 — The daily rhythm (both of you)

To avoid stepping on each other:

1. **Before you start:** in GitHub Desktop click **Fetch/Pull origin** (gets the
   latest changes the other person made).
2. **Work with Claude** — ask it to make changes, verify them.
3. **When done:** in GitHub Desktop, write a short summary in the box, click
   **Commit to main**, then **Push origin**.
4. **Tell each other** when you've pushed, and try not to both edit the *same file*
   at the *same time*.

That's it. Push = share your changes. Pull = get theirs. The live link updates on
every push (GitHub Pages) so you can both always see the current site.

---

### Tips
- Each collaborator needs their own Claude subscription/access.
- Point Claude at this folder and it already understands the project (see `README.md`).
- If you ever get a “conflict,” don't panic — ask your Claude to “resolve the git
  merge conflict,” and it'll walk you through it.
