# My Learning Notes

Mobile-responsive notes app for System Design + DSA. Navy & white theme, 3 pages.

## Run it

```
npm install
npm run dev
```

Open the printed localhost URL (works on your phone too, on the same wifi,
using your computer's local IP instead of localhost).

## Build for hosting (optional)

```
npm run build
```
Outputs static files to `dist/` — drag that folder into any static host
(Vercel, Netlify, GitHub Pages) if you want it on your phone as a link.

## Pages

1. **Home** (`/`) — pick System Design or DSA, shows how many notes you've marked learned
2. **Category list** (`/category/:id`) — search + filter by difficulty (Beginner/Intermediate/Advanced)
3. **Note detail** (`/topic/:id`) — full note, a "Mark as learned" toggle, and Prev/Next buttons to
   move through the notes in order

"Learned" status is saved in the browser's local storage — it's per-device and doesn't need an account.

## Install it on your phone

The app now has an icon, manifest, and service worker, so Chrome/Safari can offer
"Add to Home Screen" / "Install app" — it then opens full-screen, like a native app.

**This only works once it's served over HTTPS** (or on `localhost` while testing).
Deploy the `dist/` folder from `npm run build` to Vercel/Netlify/GitHub Pages,
open the link on your phone, then use the browser's "Add to Home Screen" /
install option. Editing your notes stays the same weekly workflow — the app
fetches fresh content over the network first and only uses the offline copy
when there's no connection.

## Adding / editing notes weekly

Two data files, same shape:
- `src/data/systemDesignTopics.js`
- `src/data/dsaTopics.js`

Copy one topic block, change the fields, paste it into the array. Fields:

| field | what it is |
|---|---|
| `id` | unique, lowercase_with_underscores |
| `title`, `subtitle`, `emoji` | shown on the card and detail header |
| `tagColor` | pick any `tagColors[0..9]` from `src/theme/appTheme.js` |
| `category` | `'systemDesign'` or `'dsa'` |
| `tier` | `'beginner'` \| `'intermediate'` \| `'advanced'` — controls the badge color |
| `orderIndex` | controls sort order in the list |
| `explanation` | main "what is it" text |
| `diagram` | plain-text ASCII diagram (optional) |
| `keyPoints` | array of short bullet strings |
| `whenToUse`, `whatToUse` | the two bottom info boxes |

No rebuild step needed while editing — `npm run dev` hot-reloads on save.

## Theme

Colors live in one place: `src/theme/appTheme.js` (JS values) and
`src/styles/global.css` (`:root` CSS variables). Change both if you retheme.
