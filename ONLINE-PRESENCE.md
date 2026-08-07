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
| Google Workspace mail | MX intact; info@ / social@ are aliases into the pratik@ inbox |
| Search Console | Verified (domain property), sitemap submitted, homepage indexed |
| Google Analytics 4 | `G-DDBRX91YCR` live on all pages + `generate_lead` on form submits |
| Vercel Analytics + Speed Insights | Both **enabled**, collecting real-user data |
| Google Business Profile | Live + verified; address/description/categories/opening-date fixed |
| Restaurant structured data | On the public page, matching the Business Profile fields |
| Share cards (WhatsApp / social) | 1200×630, verified loading |
| Instagram | @anvilagos, @anvisocial — linked from the site and in `sameAs` |
| Forms → inbox | Five forms, Web3Forms, inbox-verified |

---

## Connected (all 6 Aug 2026)

Search Console, GA4, Vercel Web Analytics and the Business Profile are all live.
The only things left to click are Bing and the Instagram bios (sections 5–6).

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

### 2. Google Analytics 4 — DONE (6 Aug 2026)

Account "Anvi Hospitality" → property "ANVI" → web stream anvilagos.com.
**Measurement ID `G-DDBRX91YCR`**, tag live in the head of all 8 pages. Successful form
submits fire a `generate_lead` event (this is the real conversion tracking — Vercel's
Hobby tier drops custom events). Linked to Search Console; both the Search Console and
Life-cycle report collections are published.

Two things worth knowing: GA4 sets cookies (the Vercel scripts don't), and it counts
your own visits — **add an internal-traffic filter once real traffic starts** so family
and agency browsing don't skew the numbers.

### 3. Vercel Web Analytics — DONE (6 Aug 2026)

Enabled on the `anvi-website-keu4` project and redeployed; `/_vercel/insights/script.js`
verified serving. Speed Insights was already on. Note the Hobby tier records pageviews but
**not** custom events — that's why GA4 carries the conversion tracking.

### 4. Google Business Profile — LIVE + fixed (6 Aug 2026)

The listing was already live and verified (not "about to be") — and was in poor shape, now
repaired:

- **Name** `ANVI` ✓ · **Address** cleaned to `1613B Adewunmi Ogunsanya Avenue, Victoria
  Island, Lagos 101241` ✓ (it had been duplicated garbage) · **Phone** the site's number ✓
- **Description** 501-char, all three floors, opening date ✓
- **Categories** Indian restaurant (primary) + Asian restaurant + Cocktail bar + Event venue ✓
- **Opening date** 15 September 2026 ✓ — Google shows "Opening soon" until then

**Deliberately deferred to early September** (do NOT add sooner):
- **Hours** — left as "no main hours" on purpose, so Google can't show "Open now" for a
  closed building. Add Mon–Sun 12:00–23:00 in the week before launch.
- **Photos** (≥720×720: logo, facade, 2–3 interiors) — the biggest driver of discovery, so
  saved for closer to opening.
- Once you'd like it bound tighter, **send me the Maps URL** and I'll add it to the site's
  structured data.
- **Watch for pre-opening reviews** — a review without a real visit violates Google policy
  and can be flagged; a 1-star on a building site would be real damage.

### 5. Bing Webmaster Tools — two minutes (still to do)

<https://www.bing.com/webmasters> → sign in → **Import from Google Search Console**.
Everything carries over. Bing also feeds ChatGPT and Copilot search results.

### 6. Instagram — still to do

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
