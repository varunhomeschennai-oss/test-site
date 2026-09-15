from pathlib import Path
import re

root = Path(r"E:\varun homes offcial website")
domain = "https://www.varunhomes.com"

for path in sorted(root.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    title_match = re.search(r"<title>(.*?)</title>", text, re.I | re.S)
    if not title_match:
        continue

    title = re.sub(r"\s+", " ", title_match.group(1)).strip()
    desc_match = re.search(r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']\s*/?>", text, re.I | re.S)
    description = desc_match.group(1).strip() if desc_match else "Varun Homes builds premium villas, interiors, renovation, and commercial spaces in Chennai."
    description = re.sub(r"\s+", " ", description)

    text = re.sub(r'\s*<meta\s+name=["\']robots["\']\s+content=["\'][^"\']*["\']\s*/?>\s*', "", text, flags=re.I)
    text = re.sub(r'\s*<meta\s+name=["\']googlebot["\']\s+content=["\'][^"\']*["\']\s*/?>\s*', "", text, flags=re.I)
    text = re.sub(r'\s*<link\s+rel=["\']canonical["\']\s+href=["\'][^"\']*["\']\s*/?>\s*', "", text, flags=re.I)
    text = re.sub(r'\s*<meta\s+property=["\']og:[^"\']+["\']\s+content=["\'][^"\']*["\']\s*/?>\s*', "", text, flags=re.I)
    text = re.sub(r'\s*<meta\s+name=["\']twitter:[^"\']+["\']\s+content=["\'][^"\']*["\']\s*/?>\s*', "", text, flags=re.I)

    canonical_url = domain + ("/" if path.name == "index.html" else "/" + path.name)
    seo_block = (
        '  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n'
        '  <meta name="googlebot" content="index, follow">\n'
        '  <meta name="author" content="Varun Homes">\n'
        '  <meta name="theme-color" content="#0b0f14">\n'
        '  <meta property="og:type" content="website">\n'
        f'  <meta property="og:title" content="{title}">\n'
        f'  <meta property="og:description" content="{description}">\n'
        f'  <meta property="og:url" content="{canonical_url}">\n'
        '  <meta property="og:image" content="https://www.varunhomes.com/images/varunhomes-logo.png">\n'
        '  <meta property="og:site_name" content="Varun Homes">\n'
        '  <meta property="og:locale" content="en_IN">\n'
        '  <meta name="twitter:card" content="summary_large_image">\n'
        f'  <meta name="twitter:title" content="{title}">\n'
        f'  <meta name="twitter:description" content="{description}">\n'
        '  <meta name="twitter:image" content="https://www.varunhomes.com/images/varunhomes-logo.png">\n'
        f'  <link rel="canonical" href="{canonical_url}">\n'
    )

    text = re.sub(r"(?is)(</title>)", r"\1\n" + seo_block, text, count=1)
    path.write_text(text, encoding="utf-8")

root.joinpath("robots.txt").write_text(
    "User-agent: *\nAllow: /\n\nSitemap: https://www.varunhomes.com/sitemap.xml\n",
    encoding="utf-8",
)

root.joinpath("sitemap.xml").write_text(
    '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.varunhomes.com/</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/about.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/services.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/projects.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/gallery.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/contact.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/emi-calculator.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/monarch-apartment.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/redwood-residence.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/serene-luxury-residence.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/urban-prestige-villa.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/casagrand-holachennai.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/metro-business-block.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/northline-offices.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/heritage-home-renovation.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/villa-brochure.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.varunhomes.com/brochure.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
''',
    encoding="utf-8",
)

print("SEO update complete for all HTML pages.")
