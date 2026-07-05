# -*- coding: utf-8 -*-
"""
Generates /portfolio/projects/<id>.html case-study pages for all 16 projects,
using the shared PROJECTS metadata (mirrored here) + rich narrative content
from case_study_content.py.
"""
import os
from case_study_content import CASE_STUDIES

OUT_DIR = "/home/user/portfolio/projects"
os.makedirs(OUT_DIR, exist_ok=True)

# Mirrors assets/js/data/projects-data.js (kept in sync manually)
PROJECTS = [
    dict(id="study-hub", order=1, title="Study Hub", tagline="Offline-first study companion for engineering students",
         image="sh.png", badge="Featured", year="2024", role="Solo Developer & Designer",
         client="Personal / Student Community", tags=["PWA", "Web App", "Education"],
         stack=["HTML5", "CSS3", "JavaScript", "LocalStorage", "Service Workers"],
         liveUrl="https://erabhishek12.github.io/study-hub-promo", githubUrl="https://github.com/erabhishek12"),
    dict(id="javasourcecode", order=2, title="JavaSourceCode", tagline="My first-ever paid client build — a friction-free study portal",
         image="jsc.png", badge="1st Client", year="2024", role="Freelance Web Developer",
         client="JavaSourceCode", tags=["PWA", "Study Platform", "Client Work"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://ranvircmd.github.io/javasourcecode/", githubUrl="https://github.com/erabhishek12"),
    dict(id="ub-institute", order=3, title="UB Institute", tagline="A professional web presence for a growing coaching institute",
         image="ub.png", badge="2nd Client", year="2024", role="Freelance Web Developer",
         client="UB Institute", tags=["Website", "Education", "Client Work"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://ubitdumka.com", githubUrl="https://github.com/erabhishek12"),
    dict(id="nazrana-enterprises", order=4, title="Nazrana Enterprises", tagline="A polished storefront website for a local business",
         image="nz.png", badge="3rd Client", year="2024", role="Freelance Web Developer",
         client="Nazrana Enterprises", tags=["Website", "Business", "Client Work"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://erabhishek12.github.io/NAZRANA-INTERPRISES/", githubUrl="https://github.com/erabhishek12"),
    dict(id="amit-shivdham", order=5, title="A.M.I.T Shivdham", tagline="A modern redesign of my own college's website",
         image="clg.png", badge="Featured", year="2024", role="Solo Developer & Designer",
         client="A.M.I.T Shivdham (Self-Initiated)", tags=["Website", "Education", "Redesign"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://erabhishek12.github.io/amit-shivdham/", githubUrl="https://github.com/erabhishek12"),
    dict(id="mehandi-kala", order=6, title="Mehandi Kala", tagline="An elegant portfolio site for a mehandi artist",
         image="vd.png", badge="Featured", year="2024", role="Freelance Web Developer",
         client="Vedika Mehandi Design", tags=["Website", "Portfolio", "Client Work"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://erabhishek12.github.io/mehendi-desigen-/", githubUrl="https://github.com/erabhishek12"),
    dict(id="virtual-gf", order=7, title="Virtual GF", tagline="An experimental conversational AI companion",
         image="aigf.png", badge="AI Powered", year="2025", role="Solo Developer",
         client="Personal / R&D", tags=["AI", "Chatbot", "Experiment"],
         stack=["JavaScript", "AI/LLM APIs"],
         liveUrl="https://erabhishek12.github.io/AI-GF/", githubUrl="https://github.com/erabhishek12"),
    dict(id="abhik-compiler", order=8, title="ABHI&K Compiler", tagline="A browser-based multi-language code compiler",
         image="cmp.png", badge="Developer Tool", year="2025", role="Solo Developer",
         client="Personal Tool", tags=["Tools", "Compiler", "Developer Utility"],
         stack=["JavaScript", "Piston API", "Vercel"],
         liveUrl="https://abhi-k-abhis-projects-bdfcc8f7.vercel.app/", githubUrl="https://github.com/erabhishek12"),
    dict(id="calculator-vault", order=9, title="Calculator with Vault", tagline="A working calculator hiding a private media vault",
         image="dip.png", badge="Secret Feature", year="2025", role="Solo Developer",
         client="Personal Project", tags=["Utility", "Privacy", "Experiment"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://dip-calculator.vercel.app/", githubUrl="https://github.com/erabhishek12"),
    dict(id="study-helper-ai", order=10, title="A&K Study Helper AI", tagline="An AI study assistant for everyday academic tasks",
         image="aistudy.png", badge="AI Powered", year="2025", role="Solo Developer",
         client="Personal / Student Community", tags=["AI", "Education", "Productivity"],
         stack=["JavaScript", "AI/LLM APIs"],
         liveUrl="https://erabhishek12.github.io/akstudyai/", githubUrl="https://github.com/erabhishek12"),
    dict(id="multi-tool-box", order=11, title="Multi Tool Box", tagline="35+ everyday utilities in a single, fast web app",
         image="akt.png", badge="35+ Tools", year="2025", role="Solo Developer",
         client="Personal Project", tags=["Tools", "Utility", "Productivity"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://abhi-k-multi-tool-box.vercel.app/", githubUrl="https://github.com/erabhishek12"),
    dict(id="see-your-future", order=12, title="See Your Future", tagline="A playful AI-powered fortune-telling web experience",
         image="fr.png", badge="Fun App", year="2025", role="Solo Developer",
         client="Personal Project", tags=["Fun", "AI", "Entertainment"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://erabhishek12.github.io/see-your-future/", githubUrl="https://github.com/erabhishek12"),
    dict(id="naam-jaap-counter", order=13, title="Naam Jaap Counter", tagline="A minimal, focused spiritual counting app",
         image="radha.png", badge="Spiritual", year="2025", role="Solo Developer",
         client="Personal Project", tags=["Personal", "Spiritual", "Minimal UI"],
         stack=["HTML5", "CSS3", "JavaScript"],
         liveUrl="https://erabhishek12.github.io/radha-radha-naam-jaap-promo/", githubUrl="https://github.com/erabhishek12"),
    dict(id="dudh-wala", order=14, title="Dudh Wala", tagline="A digital ledger for village milk vendors",
         image="dudhwala.png", badge="Small Business", year="2025", role="Solo Developer & Designer",
         client="Personal Project", tags=["Personal", "Small Business", "Utility"],
         stack=["HTML5", "CSS3", "JavaScript", "LocalStorage"],
         liveUrl="https://erabhishek12.github.io/-/", githubUrl="https://github.com/erabhishek12"),
    dict(id="dukan-wala", order=15, title="Dukan Wala", tagline="A smart digital assistant for neighbourhood shopkeepers",
         image="dukan.png", badge="Small Business", year="2025", role="Solo Developer & Designer",
         client="Personal Project", tags=["Personal", "Small Business", "AI"],
         stack=["HTML5", "CSS3", "JavaScript", "AI/LLM APIs"],
         liveUrl="http://erabhi.in/dukaan-wala-promo/", githubUrl="https://github.com/erabhishek12"),
    dict(id="khushi-jewellers", order=16, title="Khushi Jewellers", tagline="A full-stack luxury e-commerce experience for a jewellery house",
         image="kj.jpg", badge="Flagship", year="2025", role="Full-Stack Developer & Designer",
         client="Khushi Jewellers", tags=["Full-Stack", "E-Commerce", "Client Work"],
         stack=["HTML5", "CSS3", "JavaScript", "Node.js", "Authentication", "Admin Dashboard"],
         liveUrl="https://kjpromo.netlify.app/", githubUrl="https://github.com/erabhishek12"),
]

PROJECTS_BY_ID = {p["id"]: p for p in PROJECTS}


def chip_list(items):
    return "".join(f'<span class="chip">{t}</span>' for t in items)


def tag_pill_list(items):
    return "".join(f'<span class="chip chip-accent">{t}</span>' for t in items)


def bullet_list(items):
    return "".join(f"<li>{i}</li>" for i in items)


def nav_link(p, label):
    if not p:
        return ""
    return f'''
        <a href="{p["id"]}.html">
          <span class="nav-label">{label}</span>
          <span class="nav-title">{p["title"]}</span>
        </a>'''


PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <script>
    (function () {{
      try {{
        var t = localStorage.getItem("ak-theme");
        if (t) document.documentElement.setAttribute("data-theme", t);
        else if (window.matchMedia("(prefers-color-scheme: light)").matches)
          document.documentElement.setAttribute("data-theme", "light");
      }} catch (e) {{}}
    }})();
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — Case Study | Abhishek Kumar</title>
  <meta name="description" content="{tagline}" />
  <link rel="canonical" href="https://erabhi.in/projects/{id}.html" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="{title} — Case Study | Abhishek Kumar" />
  <meta property="og:description" content="{tagline}" />
  <meta property="og:image" content="https://erabhi.in/assets/images/projects/{image}" />
  <meta property="og:url" content="https://erabhi.in/projects/{id}.html" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title} — Case Study" />
  <meta name="twitter:description" content="{tagline}" />
  <meta name="twitter:image" content="https://erabhi.in/assets/images/projects/{image}" />

  <link rel="icon" type="image/png" href="../assets/icons/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="../assets/css/tokens.css" />
  <link rel="stylesheet" href="../assets/css/base.css" />
  <link rel="stylesheet" href="../assets/css/components.css" />
  <link rel="stylesheet" href="../assets/css/animations.css" />
  <link rel="stylesheet" href="../assets/css/inner-pages.css" />
  <link rel="stylesheet" href="../assets/css/case-study.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="noise-overlay" aria-hidden="true"></div>
  <div class="scroll-progress" data-scroll-progress></div>

  <header class="site-header" data-header>
    <div class="container nav-inner">
      <a href="../index.html" class="logo">AK<span class="logo-dot">.</span></a>
      <nav class="nav-links">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <a href="../projects.html" class="active">Projects</a>
        <a href="../services.html">Services</a>
        <a href="../blog.html">Blog</a>
        <a href="../contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">
          <i class="fa-solid fa-sun icon-sun" aria-hidden="true"></i>
          <i class="fa-solid fa-moon icon-moon" aria-hidden="true"></i>
        </button>
        <a href="../contact.html" class="btn btn-primary" data-magnetic><span>Let's Talk</span></a>
        <button class="nav-toggle" data-nav-toggle aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" data-mobile-nav>
    <button class="mobile-nav-close" data-mobile-nav-close aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
    <nav class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../projects.html">Projects</a>
      <a href="../services.html">Services</a>
      <a href="../blog.html">Blog</a>
      <a href="../contact.html">Contact</a>
    </nav>
  </div>

  <main id="main">
    <section class="cs-hero">
      <div class="container">
        <div class="breadcrumbs" data-reveal>
          <a href="../projects.html">Projects</a> <span>/</span> <span>{title}</span>
        </div>
        <div class="cs-hero-top">
          <div class="cs-title-block" data-reveal>
            <span class="eyebrow">{badge}</span>
            <h1>{title}</h1>
            <p class="lead">{tagline}</p>
            <div class="cs-tags">{tags_html}</div>
            <div class="cs-actions">
              <a href="{live_url}" target="_blank" rel="noopener" class="btn btn-primary" data-magnetic><span>View Live Site</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
              <a href="{github_url}" target="_blank" rel="noopener" class="btn btn-secondary" data-magnetic><i class="fa-brands fa-github" aria-hidden="true"></i><span>Source</span></a>
              <button type="button" class="btn-icon-circle" data-share="native" data-share-title="{title} — Case Study by Abhishek Kumar" data-share-text="{tagline}" aria-label="Share this case study"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i></button>
            </div>
            <div class="share-row" style="margin-top:var(--space-md)">
              <button class="share-btn-icon whatsapp" data-share="whatsapp" data-share-title="{title} — Abhishek Kumar" aria-label="Share on WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></button>
              <button class="share-btn-icon twitter" data-share="twitter" data-share-title="{title} — Abhishek Kumar" aria-label="Share on Twitter"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></button>
              <button class="share-btn-icon linkedin" data-share="linkedin" data-share-title="{title} — Abhishek Kumar" aria-label="Share on LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></button>
              <button class="share-btn-icon copy" data-share="copy" aria-label="Copy link"><i class="fa-solid fa-link" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="cs-meta-list" data-reveal="right">
            <div class="cs-meta-item"><span>Client</span><span>{client}</span></div>
            <div class="cs-meta-item"><span>Role</span><span>{role}</span></div>
            <div class="cs-meta-item"><span>Year</span><span>{year}</span></div>
          </div>
        </div>
        <div class="cs-hero-image" data-reveal="scale" data-delay="150">
          <img src="../assets/images/projects/{image}" alt="{title} project preview" loading="eager" />
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container cs-body">
        <div class="cs-content" data-reveal>
          <h2>Overview</h2>
          <p>{overview}</p>

          <h2>The Challenge</h2>
          <p>{challenge}</p>

          <h2>Approach</h2>
          <ul>{approach_html}</ul>

          <h2>The Solution</h2>
          <p>{solution}</p>

          <div class="cs-outcome-block">
            <h2>Outcome</h2>
            <p>{outcome}</p>
          </div>
        </div>

        <aside class="cs-sidebar" data-reveal="right">
          <div class="cs-sidebar-card">
            <h4>Tech Stack</h4>
            <div class="cs-stack-list">{stack_html}</div>
          </div>
          <div class="cs-sidebar-card">
            <h4>My Role</h4>
            <p style="font-size:var(--fs-small); color:var(--text-secondary)">{role_detail}</p>
          </div>
          <div class="cs-sidebar-card">
            <h4>Links</h4>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a class="view-link" href="{live_url}" target="_blank" rel="noopener">Live Site <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
              <a class="view-link" href="{github_url}" target="_blank" rel="noopener">GitHub <i class="fa-brands fa-github" aria-hidden="true"></i></a>
            </div>
          </div>
        </aside>
      </div>

      <div class="container">
        <div class="cs-nav">{prev_link}{next_link}</div>
      </div>
    </section>

    <section class="section related-section">
      <div class="container">
        <div class="section-header" data-reveal>
          <span class="eyebrow">Keep Exploring</span>
          <h2>More <span class="gradient-text">Projects</span></h2>
        </div>
        <div class="grid related-projects" data-related-projects data-current-id="{id}" data-base-path="../"></div>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container cta-banner-inner" data-reveal="scale">
        <span class="eyebrow" style="color:var(--accent-2)">Like this project?</span>
        <h2>Let's build yours<br />next.</h2>
        <a href="../contact.html" class="btn btn-primary" data-magnetic><span>Start a project</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <h3>Let's build something together.</h3>
          <p>Open to freelance projects, internships, and interesting collaborations.</p>
          <a href="mailto:abhishekyadav954698@gmail.com" class="footer-email">abhishekyadav954698@gmail.com</a>
        </div>
        <div class="footer-col">
          <h4>Site</h4>
          <ul><li><a href="../index.html">Home</a></li><li><a href="../about.html">About</a></li><li><a href="../projects.html">Projects</a></li><li><a href="../services.html">Services</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>More</h4>
          <ul><li><a href="../blog.html">Blog</a></li><li><a href="../contact.html">Contact</a></li><li><a href="../support.html">Support / Buy Me a Coffee</a></li><li><a href="https://drive.google.com/file/d/1pputGGvQ60Wy90YSBqdvdCiQUCj5w7Pl/view?usp=sharing" target="_blank" rel="noopener">Resume</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul><li><a href="https://github.com/erabhishek12" target="_blank" rel="noopener">GitHub</a></li><li><a href="https://www.instagram.com/naturelensbyabhi" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://wa.me/919546983729" target="_blank" rel="noopener">WhatsApp</a></li></ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year></span> Abhishek Kumar. All rights reserved.</span>
        <div class="footer-socials">
          <a href="https://github.com/erabhishek12" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
          <a href="https://www.instagram.com/naturelensbyabhi" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
          <a href="https://wa.me/919546983729" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          <a href="mailto:abhishekyadav954698@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </footer>

  <button class="back-to-top" data-back-to-top aria-label="Back to top"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
  <div class="toast-container"></div>

  <script src="../assets/js/data/projects-data.js"></script>
  <script src="../assets/js/theme.js"></script>
  <script src="../assets/js/cursor.js"></script>
  <script src="../assets/js/nav.js"></script>
  <script src="../assets/js/reveal.js"></script>
  <script src="../assets/js/magnetic.js"></script>
  <script src="../assets/js/share.js"></script>
  <script src="../assets/js/misc.js"></script>
  <script src="../assets/js/projects-render.js"></script>
</body>
</html>
"""

sorted_projects = sorted(PROJECTS, key=lambda p: p["order"])

for idx, p in enumerate(sorted_projects):
    content = CASE_STUDIES[p["id"]]
    prev_p = sorted_projects[idx - 1] if idx > 0 else sorted_projects[-1]
    next_p = sorted_projects[idx + 1] if idx < len(sorted_projects) - 1 else sorted_projects[0]

    html = PAGE_TEMPLATE.format(
        id=p["id"],
        title=p["title"],
        tagline=p["tagline"],
        image=p["image"],
        badge=p["badge"],
        year=p["year"],
        role=p["role"],
        client=p["client"],
        tags_html=tag_pill_list(p["tags"]),
        stack_html=chip_list(p["stack"]),
        live_url=p["liveUrl"],
        github_url=p["githubUrl"],
        overview=content["overview"],
        challenge=content["challenge"],
        approach_html=bullet_list(content["approach"]),
        solution=content["solution"],
        outcome=content["outcome"],
        role_detail=content["role_detail"],
        prev_link=nav_link(prev_p, "Previous"),
        next_link=nav_link(next_p, "Next"),
    )

    out_path = os.path.join(OUT_DIR, f"{p['id']}.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out_path)

print(f"\nGenerated {len(sorted_projects)} case study pages.")
