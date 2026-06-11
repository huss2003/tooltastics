# RulerKit — Backlink Strategy

> **Domain:** rulerkit.pages.dev
> **Niche:** Online measurement tools
> **Goal:** 200+ referring domains in 12 months
> **Tactic:** No spam. Pure value creation.

---

## 1. Platform-Specific Strategy

### 1.1 Reddit

**Target Subreddits:**
| Subreddit | Subs | Post Type | Frequency |
|---|---|---|---|
| r/DIY | 22M | Tool mention in solutions, comment | 2x/week |
| r/woodworking | 5M | Angle measurement, printable ruler | 1x/week |
| r/webdev | 2M | Pixel ruler, UI measurement | 2x/week |
| r/web_design | 1.5M | Design tools, pixel measurement | 1x/week |
| r/SideProject | 1M | "Built this in a weekend" posts | 1x/month |
| r/InternetIsBeautiful | 2M | Novel tool showcase | 1x (viral opportunity) |
| r/BuyItForLife | 1.5M | Ring sizer before buying rings | As relevant |
| r/smallbusiness | 1M | Shipping measurement, packaging | As relevant |
| r/iphone | 5M | Screen size comparison, PPI | As relevant |
| r/android | 3M | Screen specs, phone measurements | As relevant |
| r/Frontend | 500K | Pixel ruler for devs | 1x/week |
| r/css | 200K | Measurement in CSS, units | 1x/week |
| r/EDC | 1M | "What's in your pocket" (size ref) | As relevant |
| r/sewing | 2M | Printable measuring tape | 1x/month |
| r/3Dprinting | 2M | Calibration, measurement refs | 1x/month |

**Posting Strategy:**

*Value-First Comments (Daily, 10 min)*
- Search Reddit for "how to measure", "online ruler", "screen size", "ring size"
- Answer genuinely with specific advice
- Reference the tool only when it's the best solution for their exact problem
- Never lead with the link — lead with the answer

*Showcase Posts (Bi-Weekly)*
```
Title: I built a free online ruler that uses your credit card for calibration
Subreddit: r/InternetIsBeautiful
Body: Show the tool, explain the credit card trick, ask for feedback.
[Link to /en/ruler]

Title: Found a way to measure UI elements without installing anything
Subreddit: r/webdev
Body: Screenshot of pixel ruler in action, share dev workflow tips.
[Link to /en/pixel-ruler]
```

*Help Posts (Weekly)*
```
Title: PSA: You can use a standard credit card to calibrate any online ruler
Subreddit: r/DIY
Body: Explain how credit card dimensions (85.60mm × 53.98mm) work as a universal reference.
[Link to /en/how-to-calibrate]

Title: Pro tip for measuring furniture from photos before buying
Subreddit: r/malelivingspace
Body: Upload a photo, calibrate with a known object, measure dimensions.
[Link to /en/measure-image]
```

### 1.2 Quora

**Target Spaces:**
- Web Development
- Graphic Design
- DIY Home Improvement
- Woodworking
- Jewelry & Rings
- iPhone & Android

**Posting Strategy:**

*Answer 3 questions per week.* Target questions like:
```
- How can I measure something on my screen accurately?
- What's the best online ruler?
- How do I find my ring size at home?
- How do web designers measure pixel distances?
- Is there a way to measure objects in photos?
- How do I calibrate my screen for accurate measurements?
- What's the difference between PPI and DPI?
- How to measure screen size of a laptop?
```

**Template Answers:**
```
[Question]: How can I measure something on my screen accurately?
[Answer]:
Great question — this is actually trickier than it seems because screens have different pixel densities (PPI).

The key is calibration. Here's the process:

1. Visit a tool like RulerKit's online ruler [link]
2. Choose your calibration method:
   - Auto-detect (looks up your device PPI)
   - Credit card (place a card on screen, adjust slider)
   - Diagonal (enter your screen size)

3. Once calibrated, you can measure in cm, inches, or mm

The credit card method is the most accurate (±0.5mm) because ISO 7810 specifies card dimensions precisely.

Hope this helps!
```

### 1.3 GitHub

**Target Repositories:**
- `awesome-web-dev-tools` — Submit as a tool
- `awesome-design-tools` — For pixel ruler
- `awesome-online-tools` — General submission
- `awesome-list` — Generic tools
- Frontend framework repos (discussions)
- Design system repos (pixel measurement)

**Strategy:**

*Open Source the Tool*
```
Create /RulerKit/rulerkit — the project is already on GitHub
Add a README with:
  - Demo GIF of each tool
  - "Built with Astro + Tailwind + TypeScript" badges
  - 100% client-side badge
  - Link to live site (rulerkit.pages.dev)
  - Contribution guide
```

*GitHub Discussion Posts*
- Post in frontend framework discussions about measuring UI during development
- Share architecture patterns (canvas rendering, PWA, i18n in Astro)
- Post in "Show and tell" categories

*README Backlinks*
Add to relevant awesome-list READMEs via PRs.

### 1.4 Product Hunt

**Launch Strategy (Day 1-7):**

*Pre-Launch (Week Before)*
```
- Update GitHub README with screenshots
- Prepare 3 GIF demos (ruler calibration, image measure, ring sizer)
- Write first comment about the build story
- Prepare social posts for launch day
- Reach out to 10 PH makers for support
```

*Launch Day*
```
Title: RulerKit — The best online ruler and screen measurement suite
Tagline: Measure anything on your screen. No install. Free forever.
Topics: Web App, Developer Tools, Design Tools

First Comment:
"I built RulerKit because every online ruler I tried was either
inaccurate, ugly, or full of ads. This runs 100% in your browser
as a PWA — works offline, supports dark mode, and auto-calibrates
to your screen using your device's PPI. There are 8 tools total,
from a pixel ruler for designers to an image measurement tool
for DIY projects. Built with Astro 5 and TypeScript."

Maker Reply: Respond to every comment within 1 hour for first 24h
```

*Post-Launch (Day 2-7)*
```
- Update listing with user feedback
- Post update: "We added X feature based on feedback"
- Share launch metrics on Twitter/X
```

### 1.5 Indie Hackers

**Strategy:**

*Build in Public Posts (Weekly)*
```
Title: I built a free online ruler suite that works offline — here's how
Series: "Building RulerKit" (12 posts)

Post Topics:
1. Why I built another online ruler (and why this one is different)
2. The calibration problem — how I solved screen PPI detection
3. Canvas rendering for pixel-perfect rulers
4. 10 languages from day one without a translation service
5. PWA + offline support for a measurement tool
6. Zero-backend architecture with Cloudflare Pages
7. SEO strategy for a tool site (what's working)
8. First 30 days of traffic — numbers and lessons
9. How I handle 10 locales without a CMS
10. Monetization plans for a free tool suite
11. Technical SEO for programmatic pages
12. One year retrospective
```

*Comment on other IH posts*
- Find posts about SEO, side projects, SaaS, tool building
- Share relevant experience
- Natural link in signature or "I wrote about this here"

### 1.6 YouTube

**Strategy (Not link-building directly, but referral traffic):**

*Tutorial Videos (1 per week for 8 weeks)*
```
1. "How to Measure Anything on Your Screen — Online Ruler Tutorial" (5 min)
2. "Find Your Ring Size at Home Without Leaving the House" (4 min)
3. "Pixel Ruler for Web Designers — Measure UI Elements Accurately" (6 min)
4. "How to Calibrate Your Online Ruler for Perfect Accuracy" (3 min)
5. "How to Measure Objects in Photos — DIY Guide" (5 min)
6. "Screen Size Explained — How to Measure Any Display" (5 min)
7. "Unit Conversion Hack — Convert cm, Inches, mm, and Pixels Instantly" (3 min)
8. "Online Protractor — Measure Angles for Woodworking Projects" (4 min)

Each video description includes:
- Link to specific tool: https://rulerkit.pages.dev/en/[tool]
- Link to calibration guide: https://rulerkit.pages.dev/en/how-to-calibrate
- Timestamps for key sections
- "Subscribe for more measurement tips"
```

*Short-Form Content (Reels/Shorts)*
```
- 15-second calibration demo (credit card method) — TikTok, YT Shorts, IG Reels
- 15-second ring sizer demo
- "Did you know credit cards are exactly 85.60mm × 53.98mm?"
- "Your screen PPI determines ruler accuracy — here's how to check"
```

### 1.7 LinkedIn

**Strategy:**

*Founder/Dev Posts (2-3x/week)*
```
Post 1 — Build Story:
"I spent 3 months building a free online ruler. Here's why:
Every existing option had ads, required calibrating every visit,
or looked like it was designed in 2005.

So I built RulerKit — 8 tools, 10 languages, works offline.
The credit card calibration trick gets people every time. 🪪

Built with Astro + Tailwind + Cloudflare.
100% client-side. 0 backend. 0 cost to users.

[Link]

What free tool would you build if you had unlimited time?"

Post 2 — Technical:
"Did you know a canvas element can render a ruler accurate to
±0.5mm? Here's how PPI calibration works..."

Post 3 — Measurement Tips:
"5 things you can measure right now without a physical ruler:
1. Your screen size (diagonal measurement)
2. A ring for that proposal 🤫
3. Furniture dimensions from a photo
4. UI element spacing (pixel ruler)
5. Angles for your next woodworking project

All free at RulerKit. [Link]"
```

*LinkedIn Groups*
Join and participate in:
- Web Developers
- UI/UX Designers
- DIY Enthusiasts
- Small Business Owners

### 1.8 X (Twitter)

**Strategy:**

*Daily Posts*
```
Content Mix:
- 30% Measurement tips / facts
  "The average credit card is 85.60mm × 53.98mm.
   You can use this to calibrate any online ruler. 🪪"
  
- 30% Dev / Build in public
  "Just shipped image measurement to RulerKit.
   Upload a photo, set a reference, measure anything in it.
   0 backend calls. All canvas. 🎨"
  
- 20% Engagement / Questions
  "What's the most annoying thing about measuring things IRL?
   For me it's finding the ruler."
  
- 20% Tool features / demos
  "RulerKit now supports 10 languages 🌍
   Switch with one click. No reload needed."
```

*Threads (Bi-Weekly)*
```
Thread 1: "10 things you can measure with just your phone"
1/ Your screen size 📱
2/ A ring for that special moment 💍
3/ UI element spacing 🎨
4/ Furniture from a photo 🪑
...
10/ Angles for your next project 📐
(link to RulerKit)

Thread 2: "How I built a measurement tool that works offline"
1/ The problem: every online ruler is inaccurate
2/ The solution: device PPI database + credit card calibration
3/ The tech: Astro 5, Canvas 2D, PWA
4/ The result: ±0.5mm accuracy, works without internet
```

*Engage with:*
- @Fireship (dev audience overlap)
- @ThePracticalDev (dev community)
- @ProductHunt (tool launches)
- @MakeSomething (DIY/creation community)
- Design and dev thought leaders

---

## 2. Outreach Strategy

### 2.1 Tier 1 Targets (High Authority)

| Type | Examples | Approach | Timeline |
|---|---|---|---|
| Design blogs | Smashing Magazine, CSS-Tricks, A List Apart | Guest post: "Pixels, Points, and PPI — A Frontend Guide to Screen Measurement" | Month 4-6 |
| Dev blogs | dev.to, freeCodeCamp, Hackernoon | Tutorial: "Build a Canvas-Based Ruler Tool in Astro" | Month 3-5 |
| DIY blogs | Instructables, Man Made DIY | Feature: "The Ultimate Guide to Measuring Without Tools" | Month 2-4 |
| Tech publications | The Verge, TechCrunch, WIRED | Pitch: "Privacy-first measurement tools that work offline" | Month 6-8 |

**Templates:**

```
Subject: Online measurement tools that actually respect privacy

Hi [Name],

I built RulerKit — a free suite of online measurement tools
(ruler, pixel ruler, protractor, ring sizer, image measure,
unit converter) that runs entirely in your browser.

What makes it different:
- 100% client-side. Zero data leaves your device.
- PWA with full offline support.
- Accurate to ±0.5mm using credit card calibration.
- 10 languages, dark mode, no ads.

I think your readers at [Publication] would find it useful,
especially [specific angle].

Would you be interested in a guest post or tool feature?

Thanks,
[Name]
[Link to RulerKit]
```

### 2.2 Tier 2 Targets (Niche Authority)

| Type | Examples | Outreach Method |
|---|---|---|
| Resource pages | "Best online tools" lists, "Free design resources" | Direct submission (find the "submit a tool" page) |
| University pages | .edu resource pages for design/engineering | Email department webmasters |
| Blog roundups | "10 best free online tools" posts | Comment on post, suggest inclusion |
| Forum threads | Recommendations on Reddit, Stack Exchange | Natural mentions in helpful answers |
| Newsletters | CSS Weekly, UI Dev Newsletter, Frontend Focus | Submit as "tool of the week" |

### 2.3 Linkable Assets (Outreach Magnets)

```
1. Device PPI Database — 500+ displays with exact specs
   → Pitch: "We maintain the largest public screen PPI database"

2. Screen Size Comparison Tool — Interactive visual comparison
   → Pitch: "Embed this comparison chart on your review site"

3. Printable Ruler PDF — High-resolution PDF templates
   → Pitch: "Free download for your readers — no email required"

4. Open Source Codebase — Clean Astro + TypeScript architecture
   → Pitch: "Reference implementation for PWA measurement tools"

5. Calibration Guide — Comprehensive accuracy methodology
   → Pitch: "Cite this in your display review methodology"
```

---

## 3. Natural Backlink Strategy (Zero Outreach)

### 3.1 Self-Generated Links

| Source | How | Frequency | Est. Links/mo |
|---|---|---|---|
| Wikipedia citations | Find measurement articles missing citations | 2/month | 0-1 (strict) |
| Stack Overflow answers | Answer measurement/unit questions | 5/week | 2-3 |
| GitHub awesome-lists | PR submissions to tool lists | 3/month | 2-3 |
| Crunchbase / ProductHunt listings | Maintain profiles | Monthly | 1-2 |
| Browser extension stores | Submit bookmarklet/tool | Once | 2-3 |
| Free directory submissions | DMOZ-style directories | Monthly | 3-5 |

### 3.2 Embedded Widget Strategy

Build an embeddable ruler widget:
```html
<iframe src="https://rulerkit.pages.dev/en/embed/ruler" 
        width="100%" height="100" frameborder="0"></iframe>
```

**Distribution:**
- Offer to DIY blogs ("Embed a ruler on your tutorial pages")
- Offer to craft blogs ("Let your readers measure patterns on screen")
- Offer to design blogs ("Pixel ruler for your design tutorials")
- Each embed = `<iframe>` with a `rulerkit.pages.dev` src = backlink

### 3.3 Data-Driven Link Bait

| Asset | Hook | Target |
|---|---|---|
| "Average Screen Size by Year" Chart | Data visualization of screen size trends | Tech blogs, display review sites |
| "Phone Size Comparison 2010-2026" | Interactive timeline | Mobile blogs, phone reviewers |
| "Most Common Ring Sizes by Country" | Data set | Jewelry blogs, proposal planning |
| "PPI Evolution Chart" | Resolution density over time | Design blogs, tech publications |
| "Measurement Unit Usage Worldwide" | Map visualization | Educational sites, geography blogs |

### 3.4 Broken Link Building

Process:
1. Find measurement/DIY/tool resource pages using Ahrefs or Check My Links
2. Find broken outbound links on those pages
3. Offer RulerKit as a replacement

Tools: Check My Links (Chrome extension), Ahrefs (paid)

---

## 4. 90-Day Growth Plan

### Week 1-30: Foundation

```
Week 1:
  ☐ Set up GitHub repository with proper README
  ☐ Add "Built with" badges to README
  ☐ Create demo GIFs of each tool
  ☐ Submit to Product Hunt (launch day)

Week 2:
  ☐ Create YouTube channel
  ☐ Publish first tutorial ("How to Measure Anything on Screen")
  ☐ Answer 3 Quora questions
  ☐ Submit to 5 awesome-list repos via PR

Week 3:
  ☐ Post first Reddit showcase (r/InternetIsBeautiful)
  ☐ Create Indie Hackers build-in-public post
  ☐ Submit to 10 free tool directories
  ☐ Start Twitter/X daily posting

Week 4:
  ☐ Record second YouTube tutorial (ring sizer)
  ☐ Respond to 10 Reddit comments (helpful answers)
  ☐ Answer 3 more Quora questions
  ☐ Submit to 5 more awesome-list repos
  ☐ Post first LinkedIn build story

Month 1 Review:
  Target: 15-20 referring domains
  Actual: ____
  Top performer: ____
  Adjust: ____
```

### Week 31-60: Scaling

```
Week 5-6:
  ☐ Publish 2 more YouTube tutorials
  ☐ Create first Twitter/X thread (measurement tips)
  ☐ Submit to Stack Overflow answers (5 answers)
  ☐ Launch embeddable ruler widget
  ☐ Pitch to 2 Tier 2 resource pages

Week 7-8:
  ☐ Publish 2 YouTube tutorials (complete the series)
  ☐ Weekly Reddit posting (r/webdev, r/DIY, r/woodworking)
  ☐ Reach out to 3 newsletter curators (CSS Weekly, etc.)
  ☐ Create first data-vis post (screen size trends)
  ☐ Respond to 5 HARO requests

Week 9-10:
  ☐ Build Phone Size Comparison data viz
  ☐ Launch broken link building campaign (20 targets)
  ☐ Pitch to 2 design blogs (Smashing Magazine, CSS-Tricks)
  ☐ Create measurement unit usage map visualization
  ☐ Post weekly on Indie Hackers (build in public)

Week 11-12:
  ☐ PPI Evolution data visualization
  ☐ Submit Wikipedia citation improvements (3 articles)
  ☐ Outreach to 3 DIY blogs (embed widget)
  ☐ Launch second Reddit showcase (r/SideProject)
  ☐ Compile monthly report

Month 2 Review:
  Target: 50-60 referring domains
  Actual: ____
  Top performer: ____
  Adjust: ____
```

### Week 61-90: Acceleration

```
Week 13-14:
  ☐ Submit to Product Hunt as update ("We've added 5 new tools")
  ☐ Guest post on 1 dev blog (dev.to)
  ☐ Record YouTube case study ("How to Measure Furniture in Photos")
  ☐ Twitter/X thread: "10 things you can measure with your phone"
  ☐ 1 Reddit post + 10 comment answers per week

Week 15-16:
  ☐ Broken link building (30 new targets)
  ☐ Email outreach to 5 .edu resource page managers
  ☐ LinkedIn post: technical architecture deep-dive
  ☐ New tool launch announcement (aspect ratio calculator)
  ☐ 1 more YouTube tutorial

Week 17-18:
  ☐ Guest post publication (dev.to or CSS-Tricks)
  ☐ Indie Hackers milestone post ("3 months of growth")
  ☐ Create infographic: "History of Measurement"
  ☐ Submit to 3 design newsletter roundups
  ☐ Twitter/X thread: "How to calibrate an online ruler perfectly"

Week 19-20:
  ☐ Weekly posting cadence (automated)
  ☐ Scale broken link building to 50 targets
  ☐ Contact 3 DIY/craft YouTube channels for collab
  ☐ Launch "RulerKit for Education" resource page
  ☐ Write case study about traffic growth for IH/Twitter

Week 21-22:
  ☐ HARO responses (10 total across 2 months)
  ☐ Outreach to 5 jewelry blogs (ring sizer tool)
  ☐ Post open source architecture breakdown
  ☐ Submit to 3 "best tools" roundups

Week 23-24:
  ☐ University outreach (.edu resource linking)
  ☐ Create comparison page: "RulerKit vs Other Online Rulers"
  ☐ Produce data sheet: "Screen Specs Database" as linkable asset
  ☐ Year 1 strategy preview post

Month 3 Review:
  Target: 100+ referring domains
  Actual: ____
  Top performer: ____
  Adjust: ____
```

### Weekly Time Allocation

```
Total: 10-12 hours/week on backlinks

Reddit:          2 hours (daily comments + 1 post/week)
Quora:           1 hour (3 answers/week)
Twitter/X:       1 hour (daily posts, engagement)
LinkedIn:        0.5 hours (2-3 posts/week)
Outreach:        2 hours (10-15 emails/week)
Content:         2 hours (1 video or 1 blog post/week)
YouTube:         1.5 hours (filming + editing)
Review & Plan:   1 hour (weekly metrics review)
```

---

## 5. Tools & Tracking

### Link Monitoring
```
- Ahrefs (paid) — backlink profile, competitor analysis
- Google Search Console — link report
- GitHub insights — repo stars, forks
- Product Hunt — upvotes, comments
- YouTube Studio — traffic sources, referrals
- Google Analytics — referral traffic by source
```

### Content Scheduling
```
- Buffer or Hootsuite — Twitter/X, LinkedIn scheduling
- Later — Pinterest scheduling
- Notion — content calendar (template provided)
```

### KPI Dashboard

| Source | Target (90 days) | Target (12 months) |
|---|---|---|
| Referring domains | 100+ | 200+ |
| Reddit referral visits | 5,000 | 30,000 |
| YouTube subscribers | 500 | 5,000 |
| Twitter/X followers | 1,000 | 5,000 |
| Product Hunt upvotes | 200+ | — |
| GitHub stars | 100 | 500 |
| LinkedIn followers | 500 | 2,000 |
| Quora answer views | 50,000 | 500,000 |
| Indie Hackers followers | 200 | 1,000 |
| HARO placements | 5 | 20 |
| Guest posts published | 2 | 8 |
| Embedded widgets live | 10 | 50 |

---

## 6. Anti-Patterns (What NOT to Do)

| Tactic | Why | Instead |
|---|---|---|
| Comment spam on blogs | Low quality, usually nofollow | Genuine comments with value |
| Forum signature links | Rarely followed, looks spammy | Contextual in-post links |
| Private blog networks | Google penalty risk | Natural, diverse link profile |
| Paid links | Against Google TOS | Sponsorships or donations (nofollow) |
| Link exchanges | Obvious pattern, devalued | Natural mentions through content |
| Article spinning | Penalized, no value | Original content per platform |
| Automated outreach | Low response rate, reputation damage | Personalized emails, research first |
| Footer/banner links en masse | Devalued by Google | Contextual inline links |

---

*Generated: June 2026 · Next Review: September 2026*
