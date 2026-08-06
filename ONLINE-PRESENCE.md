# Online presence — what's connected, what's next

House account: **pratik@anvilagos.com**. Use it for every service below so nothing is
ever stranded on a personal login.

> **Google Site Kit does not apply here.** It is a WordPress plugin, and this site is
> static HTML on Vercel. Everything Site Kit bundles — Search Console, Analytics,
> PageSpeed — connects directly, which is fewer moving parts, not more.

---

## Already live

| What | State |
|---|---|
| Domain — anvilagos.com | Vercel, modern edge IPs, ~1s from Lagos |
| Google Workspace mail | MX intact; info@ / pratik@ / social@ |
| Speed Insights | **Enabled**, collecting real-user data |
| Restaurant structured data | On the public page, matching the Business Profile fields |
| Share cards (WhatsApp / social) | 1200×630, verified loading |
| Instagram | @anvilagos, @anvisocial — linked from the site and in `sameAs` |
| Forms → inbox | Five forms, Web3Forms, inbox-verified |

---

## To connect — in this order

Each one needs a sign-in, so these are yours to click. **Where a step ends in a token or
an ID, paste it to me and I'll wire it in and redeploy.**

### 1. Google Search Console — DONE (6 Aug 2026)

Domain property `anvilagos.com`, owned by **pratik@anvilagos.com**. Auto-verified through
Namecheap as the domain provider, so there was no TXT record to add by hand.

- **Sitemap submitted** — status Success, 1 page discovered (correct for the tease)
- **Homepage indexed** — "URL is on Google", served over HTTPS
- **Re-crawl requested** after the structured data went live

Two things worth knowing for next time:

- On a **Domain** property the sitemap must be the **full URL** —
  `https://anvilagos.com/sitemap.xml`. A bare `sitemap.xml` is rejected as
  "Invalid sitemap address". (Only URL-prefix properties take the relative form.)
- The account matters. Chrome defaults to belani.pratik@gmail.com, which cannot see this
  property. Append `&authuser=pratik@anvilagos.com` to a Search Console URL to switch, or
  add the Gmail address as a second Owner under Settings → Users and permissions.

### 2. Google Analytics 4

Vercel Analytics already counts visitors, but GA4 is what Google Ads and the Business
Profile plug into later, and it's free and portable if we ever change host.

1. <https://analytics.google.com> → Admin → Create property → "ANVI"
2. Data stream → Web → `https://anvilagos.com`
3. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`) → **send it to me**
4. In GA4 Admin → Product links → link Search Console

### 3. Vercel Web Analytics — one toggle, still off

Vercel dashboard → the project → **Analytics** tab → **Enable**. Speed Insights is already
on; this is the other half and the code is already deployed.

### 4. Google Business Profile

The listing is created and set to go live in September. Before it does:

- **Name** exactly `ANVI` (not "Anvi Lagos", not "ANVI Restaurant")
- **Address** exactly `1613B Adewunmi Ogunsanya Avenue, Victoria Island, Lagos` —
  write **"Avenue"** in full, matching the site's structured data
- **Phone** the same number the site shows; swap to the dedicated reservations line the day it exists
- **Website** `https://anvilagos.com`
- **Category** primary: *Indian restaurant*. Secondary: *Asian restaurant*, *Bar*, *Event venue*
- **Opening date** 15 September 2026 — Google will show "Opening soon" until then
- **Hours** Mon–Sun 12:00–23:00
- **Attributes** reservations ✓ · takeaway (once the line exists) · wheelchair access · parking — set what's true
- **Photos** at least 720×720. Logo, the facade, and two or three interiors
- Once it's live, **send me the Maps URL** and I'll add it to the site's structured data —
  that link is what binds the listing and the site into one entity for Google

### 5. Bing Webmaster Tools — two minutes

<https://www.bing.com/webmasters> → sign in → **Import from Google Search Console**.
Everything carries over. Bing also feeds ChatGPT and Copilot search results.

### 6. Instagram

- Put `anvilagos.com` in the bio of **both** @anvilagos and @anvisocial
- Switch both to a **Business** account and connect them to the Business Profile
- The site already links out to both, so the connection becomes mutual

---

## Later, deliberately

- **Google Ads / Meta Ads** — not before the menu and photography are final
- **TripAdvisor, Yelp, Nigerian directories** — after the Business Profile is verified,
  so the address and phone propagate consistently from one source
- **Reservation platforms** (OpenTable and similar) — only if the forms outgrow the inbox

---

## The rule that keeps this clean

Name, address and phone must read **identically** everywhere — site, Business Profile,
Instagram, directories. Google treats a mismatch as two different businesses and splits
your reputation between them. When any of the three changes, change it everywhere the
same day.
