# Launch day — the runbook

Target: **Tuesday 15 September 2026** (provisional). Everything here is written to be
done in about fifteen minutes, in this order.

---

## 1. The flip

The whole tease phase is one file. Deleting it opens the site.

```bash
cd anvi-website
git rm vercel.json
git commit -m "Launch: open the full site"
```

Then push from GitHub Desktop. Vercel redeploys in under a minute.

**What changes the instant that lands:**
- `anvilagos.com` stops serving the peek page and serves the homepage
- every inner page (`/lagos.html`, `/menu.html`, …) stops redirecting and opens
- **`/sneak/` dies** — the preview corridor was part of the gate. Tell anyone who
  uses it to switch to the plain URLs.
- `coming-soon.html` still exists at its own address. Leave it; the storefront QR
  points at `/`, not at it.

**If something looks wrong:** `git revert` the commit and push. The gate comes
straight back. Nothing else needs undoing.

---

## 2. Before you flip — five checks

1. **The date is right** on the site. Four places must agree: `CLAUDE.md` and the three
   `data-count="2026-09-15"` attributes (index, reservations, coming-soon).
2. **Swap the sitemap.** Open `sitemap.xml`, delete the single tease-phase `<url>`, and
   uncomment the launch-day block underneath it. Otherwise Google only ever sees the homepage.
3. **Send a test through each form** from a real phone, not the desktop — reserve, host,
   guest list, and the peek form. All five must land in the inbox.
4. **Check the contact details** are the ones you want public on opening day: the phone
   number, and `info@anvilagos.com`. If the dedicated reservations line exists by then,
   swap it in first — it appears in `reservations.html` and every page footer.
5. **Confirm the hours** on the Visit page are the real ones, not the interim Mon–Sun 12–11.

---

## 3. After it's live — three checks

- Open `anvilagos.com` on **mobile data, not wifi** — that is how Lagos will see it.
- Submit the reservation form once for real and confirm the email arrives.
- Check Vercel → Analytics. Traffic should appear within a few minutes.

---

# The announcements

Nothing below has been sent. Copy, read it once in your own voice, then send.

## A. Email to the guest list

Send to everyone in `~/Documents/ANVI/ANVI Guest List.xlsx`. They were promised
they would hear it first — so send this **before** anything goes public.

> **Subject:** The doors open on 15 September.
>
> You asked to hear it first, so here it is before anyone else.
>
> ANVI opens on Tuesday 15 September at 1613B Adewunmi Ogunsanya Avenue, Victoria
> Island — modern Indo-Asian cuisine across three floors. The Dining Room on the
> ground. Bar One above it. The Social House at the top.
>
> The house is now open to see: **anvilagos.com**
>
> Reservations for opening season are open, and the guest list goes first. Book at
> anvilagos.com, or simply reply to this message and we'll arrange your table.
>
> See you in September.
>
> **ANVI**
> *Where cultures connect.*

## B. WhatsApp broadcast

Same list, same day, an hour or so after the email.

> ANVI opens **Tuesday 15 September** — 1613B Adewunmi Ogunsanya Ave, Victoria Island.
>
> You're on the guest list, so you're hearing first. The full site is live now:
> anvilagos.com
>
> Reservations for opening season are open — reply here and we'll hold you a table.

## C. Instagram — @anvilagos

> The doors open 15 September.
>
> Modern Indo-Asian cuisine. Restaurant, bar, Social House.
> 1613B Adewunmi Ogunsanya Avenue, Victoria Island.
>
> Reservations for opening season are open now — link in bio.
>
> *Where cultures connect.*

Put `anvilagos.com` in the bio the same morning. For @anvisocial, lead with the
Social House and its Sound Sessions rather than the dining room.

---

## One thing to decide

**15 September is a Tuesday.** The date it replaced, 28 August, was a Friday. For a soft
launch a Friday fills itself and a Tuesday has to be filled — worth a thought before the
date is printed anywhere. If it moves, change the four places in check 1 above and grep
the pages for month copy.
