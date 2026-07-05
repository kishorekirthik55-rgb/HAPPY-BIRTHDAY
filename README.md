# Malli & Kanjivaram — Photo Website

A one-page site: a full-screen hero photo, gently rising jasmine-white hearts drifting
upward in the background, and a 3-photo gallery below.

## 1. Add your photos

Put your **actual photo files** into the `images/` folder using these exact names:

| File | Used as |
|---|---|
| `images/main.jpg` | the big hero photo (temple steps, full saree shot) |
| `images/photo1.jpg` | the wall/trees photo |
| `images/photo2.jpg` | the path/gopuram photo |
| `images/photo3.jpg` | the close-up profile with jasmine in hair |

Any `.jpg`, `.jpeg`, `.png`, or `.webp` works — just keep these exact filenames
(or edit the `src="images/..."` paths in `index.html` to match your real filenames).

## 2. Preview locally (optional)

Just double-click `index.html` to open it in a browser, or run a tiny local server:

```bash
cd site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 3. Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `my-photo-site`).
2. Upload these files to the repo root: `index.html`, `style.css`, `script.js`,
   and the `images/` folder with your photos inside it.
   - Easiest way: on the repo page, click **Add file → Upload files**, drag
     everything in, and commit.
3. Go to the repo's **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. Wait about a minute, then your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

That's it — no build step, no dependencies, just static files.

## Notes

- Hearts are drawn on an HTML canvas (`script.js`) — smooth, lightweight, no images needed.
- Respects `prefers-reduced-motion` for accessibility.
- Fully responsive: gallery stacks to a single column on phones.
