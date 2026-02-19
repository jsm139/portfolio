# Jonathan Mendoza — Portfolio (Static Site)

A clean, responsive portfolio template tailored for a **Junior Mechanical Engineer**. It includes projects, experience, skills, and a contact form that opens your mail app.

## Quick start

1. **Open locally**: double-click `index.html` to preview in a browser.
2. **Replace content**:
   - Swap `assets/portrait_placeholder.svg` with your photo (same filename or update `index.html`).
   - Replace `assets/Jonathan_Mendoza_Resume.pdf` with your real resume.
   - Edit text in `index.html` (search for placeholders like `YOUR-LINKEDIN`).
   - Replace project images in `assets/projects/` and links in the Project cards.
3. **Toggle theme**: use the 🌗 button (saved in your browser).

## Deploy (pick one)

### GitHub Pages
1. Create a new repo, e.g., `portfolio`.
2. Upload all files (or push via Git).
3. In repo **Settings → Pages**, set **Branch** to `main` and **/root`**.
4. Your site will be available at `https://<your-username>.github.io/portfolio/`.

### Netlify (drag & drop)
1. Go to Netlify → **Add new site** → **Deploy manually**.
2. Drag the folder into the drop area.

### Vercel
1. Import your GitHub repo on Vercel and deploy.

## Customize
- **Colors & layout**: edit CSS variables in `styles.css`.
- **SEO**: update `<title>`, `<meta name=description>`, and Open Graph tags in `index.html`.
- **Analytics**: paste your script before `</head>` if you use one.
- **Contact**: the form composes a `mailto:`. If you prefer a hosted form, use services like Formspree or Netlify forms and change the form `action`.

## Structure
```
jonathan_mendoza_portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── favicon.svg
    ├── Jonathan_Mendoza_Resume.pdf
    ├── portrait_placeholder.svg
    └── projects/
        ├── project-1.svg
        ├── project-2.svg
        └── project-3.svg
```

## License
You own and may modify this template freely.
