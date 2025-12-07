# SEO Documentation

## Site Purpose

Static HTML template for local service business websites optimized for:

- Local SEO ranking
- Google Business Profile integration
- Rich snippet eligibility via structured data
- Mobile-first responsive design
- Fast page load speeds (no external dependencies)

## File Structure

```
/
├── index.html
└── /assets/
    ├── /css/
    │   └── style.css
    ├── /js/
    │   └── scripts.js
    ├── /img/
    │   └── placeholder.png
    ├── /schema/
    │   └── schema.json
    └── /docs/
        └── seo.md
```

## Schema Markup

Located at: `assets/schema/schema.json`

Types implemented:

1. LocalBusiness - NAP, hours, ratings
2. WebSite - Site identity
3. BreadcrumbList - Navigation hierarchy
4. FAQPage - 6 common questions for rich snippets

## Customization Checklist

Replace these placeholders:

- [ ] [Your Business Name]
- [ ] [Service Area]
- [ ] [Service Type]
- [ ] [Street Address]
- [ ] [City, State ZIP]
- [ ] +1-XXX-XXX-XXXX
- [ ] yourdomain.com
- [ ] Brand names
- [ ] Service names
- [ ] Area names
- [ ] Lat/Long coordinates

## Deployment

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch: main
4. Select folder: / (root)
5. Save

Site live at: https://[username].github.io/[repo-name]/
