# -*- coding: utf-8 -*-
import os

TEMPLATE = open("/home/user/portfolio/blog/why-i-build-for-real-people.html", encoding="utf-8").read()

def make_post(slug, title, desc, eyebrow, read_time, cover_img, cover_alt, body_html, share_title):
    html = TEMPLATE
    html = html.replace("Why I Build for Real People, Not Just Résumés — Abhishek Kumar", f"{title} — Abhishek Kumar")
    html = html.replace('content="What building Dudh Wala and Dukan Wala for actual shopkeepers taught me about designing software that matters."', f'content="{desc}"')
    html = html.replace("https://erabhi.in/blog/why-i-build-for-real-people.html", f"https://erabhi.in/blog/{slug}.html")
    html = html.replace('content="Why I Build for Real People, Not Just Résumés"', f'content="{title}"')
    html = html.replace(">Reflections</span> <span>/</span>", f">{eyebrow}</span> <span>/</span>")
    html = html.replace(">Why I Build for Real People, Not Just Résumés</h1>", f">{title}</h1>")
    html = html.replace(">Reflections</span>\n        <h1", f">{eyebrow}</span>\n        <h1")
    html = html.replace("5 min read", read_time)
    html = html.replace('src="../assets/images/projects/dukan.png" alt="Dukan Wala interface"', f'src="../assets/images/projects/{cover_img}" alt="{cover_alt}"')
    # Replace body content between <article class="post-content" ...> and </article>
    start = html.index('<article class="post-content"')
    start_tag_end = html.index(">", start) + 1
    end = html.index("</article>")
    html = html[:start_tag_end] + "\n" + body_html + "\n    " + html[end:]
    html = html.replace('data-share-title="Why I Build for Real People, Not Just Résumés"', f'data-share-title="{share_title}"')
    out_path = f"/home/user/portfolio/blog/{slug}.html"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out_path)


make_post(
    slug="offline-first-lessons",
    title="What Building Offline-First Apps Taught Me About Empathy",
    desc="Lessons from Study Hub and Dudh Wala on designing for patchy connections and low-end devices.",
    eyebrow="Engineering",
    read_time="7 min read",
    cover_img="sh.png",
    cover_alt="Study Hub interface",
    share_title="What Building Offline-First Apps Taught Me About Empathy",
    body_html="""
      <p>The first time Study Hub failed for a real user, it wasn't a bug in my code — it was the college Wi-Fi dropping mid-session while someone tried to load a video lecture before an exam. That single failure taught me more about good engineering than any tutorial had.</p>

      <p>Most of my early projects assumed a stable connection because, frankly, mine usually was stable. But the people actually using these apps — classmates on hostel Wi-Fi, milk vendors in villages with patchy mobile networks — didn't have that luxury. Building for them meant unlearning a lot of assumptions.</p>

      <h2>Offline isn't a feature, it's a mindset</h2>
      <p>It's tempting to treat "offline support" as a checkbox — add a service worker, cache a few assets, done. But real offline-first design means asking, at every decision point, "what happens when this request never returns?" That question changes how you structure data, how you handle forms, and how you communicate state to the user.</p>

      <ul>
        <li>Study Hub caches viewed notes and videos automatically, so revisiting material never depends on a live connection.</li>
        <li>Dudh Wala stores every ledger entry locally first, syncing only when a connection happens to be available.</li>
        <li>Both apps show clear, honest status indicators — never a silent failure that leaves the user guessing.</li>
      </ul>

      <blockquote>Designing for bad connectivity is really just designing for honesty about what your app can and can't guarantee.</blockquote>

      <h2>Low-end devices changed my CSS too</h2>
      <p>Heavy animations and large unoptimised images look great on a development machine and terrible on a three-year-old budget phone. Once I started testing on the actual devices my target users own, I cut animation complexity, compressed every image aggressively, and rebuilt several layouts around simpler CSS that renders fast even on weaker GPUs.</p>

      <h2>The empathy part</h2>
      <p>None of this is really about technology. It's about taking seriously the fact that the person using your app might not have what you have — fast internet, a new phone, unlimited data. Offline-first development, done properly, is an exercise in empathy disguised as an engineering pattern.</p>
"""
)

make_post(
    slug="first-freelance-client",
    title="What My First Freelance Client Taught Me",
    desc="Everything I got wrong (and eventually right) while building JavaSourceCode as a first-year student.",
    eyebrow="Career",
    read_time="6 min read",
    cover_img="jsc.png",
    cover_alt="JavaSourceCode interface",
    share_title="What My First Freelance Client Taught Me",
    body_html="""
      <p>My first paid client project was JavaSourceCode — a study resource website — and I said yes to it before I'd really thought through what "client work" actually meant. I assumed it would be like my personal projects, just with someone else's name on it. I was wrong in almost every useful way.</p>

      <h2>Scope creep is real, and it's nobody's fault</h2>
      <p>The original brief was simple: a study site with notes, videos, and past papers, no login required. Within two weeks it had grown to include category filters, a search function, and a request for "maybe some sort of admin panel eventually." None of these requests were unreasonable — they were just undocumented. I learned quickly that the fix isn't refusing new ideas, it's writing everything down and being upfront about what fits in the current phase versus a future one.</p>

      <h2>Communication is the actual job</h2>
      <p>I used to think freelancing was 90% code and 10% talking to the client. It's closer to the reverse. Most of the friction in that first project came from assumptions I hadn't checked — I assumed "professional" meant one thing, the client meant another. A five-minute clarifying call would have saved hours of rework.</p>

      <blockquote>The client isn't rejecting your code. They're telling you what you didn't ask about earlier.</blockquote>

      <h2>What I do differently now</h2>
      <ul>
        <li>I confirm scope and structure in writing before opening my code editor.</li>
        <li>I share progress in small increments rather than disappearing for a week and delivering a "surprise."</li>
        <li>I ask about the non-obvious constraints early — who else needs to update this content, and how technical are they?</li>
      </ul>

      <p>JavaSourceCode is still live today, and it remains one of the projects I'm proudest of — not because the code was perfect, but because it's where I actually learned how to work with another person's expectations instead of just my own.</p>
"""
)
