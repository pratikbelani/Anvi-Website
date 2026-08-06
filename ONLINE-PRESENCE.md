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

### 1. Google Search Console — do this first

It's how you learn what Lagos actually searches to find you, and it feeds everything else.

1. <https://search.google.com/search-console> → sign in as **pratik@anvilagos.com**
2. Choose **Domain** (the left-hand option), enter `anvilagos.com`
3. Google shows a **TXT record**. Add it at Namecheap → Domain List → Manage →
   Advanced DNS → Add New Record → type `TXT Record`, host `@`, value = the string Google gave.
   **Do not touch the MX, SPF or DKIM rows — those are the company's email.**
4. Wait a few minutes, click **Verify**
5. Then → **Sitemaps** → submit `sitemap.xml`

Pick **Domain** rather than URL-prefix: it covers apex, www, http and https in one, and it
survives launch day. (If you'd rather not touch DNS, the fallback is an HTML meta tag —
send it to me and note that it has to go on `coming-soon.html`, since that's what serves
at `/` during the tease. Putting it on `index.html` would fail verification.)

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
