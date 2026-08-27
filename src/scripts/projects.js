/* Ported from "Adnan Main Portfolio.html" lines 7743-10415.
 *
 * CHANGED (three surgical edits, all inside renderProjects / the card loop):
 *   1. each card gets data-flip-id="<project id>", so Flip can match a card
 *      across the rebuild -- renderProjects does grid.innerHTML = "", which
 *      destroys the nodes, and without an id Flip has nothing to pair up.
 *   2. renderProjects captures Flip state before the rebuild and plays
 *      Flip.from after it. Wrapping the function body rather than its seven
 *      call sites means filters, sub-filters, pagination, Load More and Reset
 *      all animate through the same path.
 *   3. the first render (no previous cards) falls through to the staggered
 *      fade-up in stagger.js instead of a Flip, since there is no "from"
 *      layout to flip out of.
 * The project data, filtering logic and markup are otherwise untouched.
 */
import { gsap, Flip } from './gsap';
import { staggerProjectCards } from './stagger';
import { withBase } from '../lib/base';

export function initProjects(){
  /*
   * DATA ARCHITECTURE
   * Real projects known from Mohammed Adnan's portfolio/work context are used.
   * Performance metrics are intentionally not fabricated where source evidence
   * is not available in this section.
   */
      const projects = [
  {
    "id": "amp-ranking",
    "title": "Ampconnect — Ranking Keywords",
    "service": "SEO",
    "industry": "B2B / Technology",
    "platform": "Google Search",
    "year": "2026",
    "role": "SEO",
    "description": "Keyword visibility and ranking evidence for Ampconnect's technology distribution presence.",
    "objective": "Track and improve organic visibility around commercially relevant technology-distribution searches.",
    "execution": "Keyword research, on-page optimization, ranking monitoring and SEO implementation across priority pages.",
    "result": "Ranking",
    "resultLabel": "Keyword visibility",
    "art": "art-seo",
    "label": "SEO / Rankings",
    "gallery": [
      {
        "src": "/assets/projects/592526898e12.webp",
        "label": "Arcserve — AI Overview",
        "caption": "Google's AI Overview for “Arcserve Distributor in Dubai” names Ampconnect as the authorised value-added distributor for Arcserve data protection across the UAE, and lists it first under Authorized Distributors and Regional Partners. The same query also returns ampconnectme.com/arcserve as the #1 organic result below the AI panel — the brand holds both the AI answer layer and classic search for one query.",
        "metrics": [
          {
            "value": "Cited",
            "label": "In AI Overview"
          },
          {
            "value": "#1",
            "label": "Organic result"
          },
          {
            "value": "2",
            "label": "Google surfaces held"
          }
        ]
      },
      {
        "src": "/assets/projects/a3a6f6223699.webp",
        "label": "Rittal — SERP position",
        "caption": "The Rittal landing page ranks on page one for “Rittal Distributor in Dubai”, holding position against Ultra Stream Technologies, ReachUAE and Rittal's own corporate site. The result carries a full product-led description — 19″ server racks, data centre cooling, power, monitoring and RiMatrix container solutions.",
        "metrics": [
          {
            "value": "Page 1",
            "label": "Rittal Distributor in Dubai"
          },
          {
            "value": "+1,120%",
            "label": "Clicks growth on this page"
          },
          {
            "value": "61",
            "label": "Clicks, last 3 months"
          }
        ]
      },
      {
        "src": "/assets/projects/0e2f190b246b.webp",
        "label": "Leviton — SERP position",
        "caption": "For “Leviton Distributor in UAE”, ampconnectme.com/leviton holds position 3 — ahead of Leviton's own corporate locations page at position 4, and above Microsys Networks. Only Topnet Distribution and the Atninfo directory sit above it.",
        "metrics": [
          {
            "value": "#3",
            "label": "Organic position"
          },
          {
            "value": "Above",
            "label": "Leviton's own site"
          },
          {
            "value": "5",
            "label": "Competing results ranked against"
          }
        ]
      },
      {
        "src": "/assets/projects/c322cdb008e4.webp",
        "label": "CommScope — SERP position",
        "caption": "“CommScope Distributor in UAE” places ampconnectme.com/commscope at position 2, directly beneath CommScope's official Partner Locator and above every competing distributor in the result set — ustech.ae, Atninfo and Microsys Networks. The snippet leads on fiber cabling, NETCONNECT and data centre networking.",
        "metrics": [
          {
            "value": "#2",
            "label": "Organic position"
          },
          {
            "value": "+218%",
            "label": "Clicks growth on this page"
          },
          {
            "value": "70",
            "label": "Clicks, last 3 months"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/592526898e12.webp"
  },
  {
    "id": "amp-analytics",
    "title": "Ampconnect — Web Analytics",
    "service": "SEO",
    "industry": "B2B / Technology",
    "platform": "GA4 / Search Console",
    "year": "2026",
    "role": "SEO · Analytics",
    "description": "Search Console and GA4 evidence used to understand organic visibility, acquisition and website behavior.",
    "objective": "Build a measurable SEO feedback loop from search visibility through on-site engagement.",
    "execution": "Google Search Console, GA4 measurement, traffic analysis, query analysis and SEO reporting.",
    "result": "GA4 + GSC",
    "resultLabel": "Web analytics",
    "art": "art-seo",
    "label": "SEO / Analytics",
    "gallery": [
      {
        "src": "/assets/projects/cf636f5ca463.webp",
        "label": "Search Console — performance",
        "caption": "Search Console performance for ampconnectme.com, last three months compared against the previous three. Clicks more than doubled and impressions grew faster still, while average position improved from 12.8 to 11.2. CTR eased from 5.6% to 5.1% — the expected shape when the impression base grows 150% and the site begins surfacing for a wider, colder set of queries.",
        "metrics": [
          {
            "value": "535",
            "label": "Clicks, from 237"
          },
          {
            "value": "10.6K",
            "label": "Impressions, from 4.24K"
          },
          {
            "value": "11.2",
            "label": "Avg position, from 12.8"
          }
        ]
      },
      {
        "src": "/assets/projects/1dcb2e40e7c0.webp",
        "label": "Insights — click growth by page",
        "caption": "Click growth broken out by page. The homepage leads on 291 clicks, but the vendor landing pages carry the momentum: CommScope up 218%, Rittal up 1,120%, Fujitsu up 1,550% — the same pages visible in the ranking screenshots. Contact-us moved from zero to 18 clicks, showing search traffic reaching a commercial-intent page.",
        "metrics": [
          {
            "value": "+126%",
            "label": "Clicks period over period"
          },
          {
            "value": "+150%",
            "label": "Impressions"
          },
          {
            "value": "291",
            "label": "Homepage clicks"
          }
        ]
      },
      {
        "src": "/assets/projects/6aa99f181c94.webp",
        "label": "Generative AI features",
        "caption": "Search Console's Generative AI features report tracks impressions inside AI Overviews and AI Mode. The site moved from 26 impressions in the previous three months to 1.44K — this is the measurement behind the Arcserve AI Overview citation shown in the ranking archive.",
        "metrics": [
          {
            "value": "1.44K",
            "label": "AI impressions, from 26"
          },
          {
            "value": "~55x",
            "label": "Period over period"
          }
        ]
      },
      {
        "src": "/assets/projects/da84c17c0d3c.webp",
        "label": "GA4 — traffic acquisition",
        "caption": "GA4 channel breakdown, 17 Jul – 13 Aug. Direct carries session volume at 877, but organic search is the quality channel: 332 sessions at a 58.13% engagement rate and 1m 03s average engagement, against direct's 18.59% and 15s. GA4's AI Assistant channel also registers 39 sessions at 58.97% engagement.",
        "metrics": [
          {
            "value": "1,312",
            "label": "Sessions"
          },
          {
            "value": "58.13%",
            "label": "Organic engagement rate"
          },
          {
            "value": "1m 03s",
            "label": "Organic avg engagement"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/cf636f5ca463.webp"
  },
  {
    "id": "simal-ranking",
    "title": "Simal Technologies — Ranking Keywords",
    "service": "SEO",
    "industry": "B2B / Technology",
    "platform": "Google Search / AI Overview",
    "year": "2025",
    "role": "SEO",
    "description": "Organic keyword visibility for Simal Technologies across vendor-led IT distribution searches — memory, storage, networking and technology accessories.",
    "objective": "Strengthen search visibility around relevant commercial and product-led queries.",
    "execution": "Keyword research, page optimization, metadata, content alignment and ranking monitoring.",
    "result": "Ranking",
    "resultLabel": "Keyword visibility",
    "art": "art-seo",
    "label": "SEO / Rankings",
    "gallery": [
      {
        "src": "/assets/projects/76e7aa5608d0.webp",
        "label": "Best IT Distributor — SERP",
        "caption": "“Best IT Distributor” is a broad head term normally dominated by directories and listicles. simalme.com/about-it-distributor-in-uae holds a page-one position above YellowPages-UAE and ITP.net's “Top 25 IT Distributors” roundup, competing directly with Infome Technologies, Syscom Distribution and Cyber Legend Technologies. The title carries a trust signal — 20+ years of trusted IT solutions — rather than a keyword string alone.",
        "metrics": [
          {
            "value": "Page 1",
            "label": "Best IT Distributor"
          },
          {
            "value": "Above",
            "label": "YellowPages & ITP listicles"
          },
          {
            "value": "6",
            "label": "Competing results ranked against"
          }
        ]
      },
      {
        "src": "/assets/projects/f41fe2ccd12b.webp",
        "label": "Crucial — SERP + review snippet",
        "caption": "For “Crucial Distributor in UAE”, the Crucial and Micron landing page ranks at position 2 — above Crucial's own “Buying made easy with Crucial partners” page, and above Lucky Falcon, ICTECH Distribution and Techno Track Trading. The result also renders a 4.9-star review rich snippet, giving it visual weight no competing result in the set carries.",
        "metrics": [
          {
            "value": "#2",
            "label": "Organic position"
          },
          {
            "value": "4.9★",
            "label": "Review rich snippet"
          },
          {
            "value": "Above",
            "label": "Crucial's own partner page"
          }
        ]
      },
      {
        "src": "/assets/projects/00586228482c.webp",
        "label": "Ugreen — AI Overview citation",
        "caption": "Google's AI Overview for “Ugreen Distributor in UAE” names Simal Technologies first among the UAE trade partners it identifies, ahead of SFT Trading LLC and Assr Al Jawal, and describes it under Authorized Distributors and Suppliers as an exclusive authorized distributor offering wholesale pricing and direct stock. Notably the brand wins the AI answer layer on this query without appearing in the organic results beneath it.",
        "metrics": [
          {
            "value": "Named 1st",
            "label": "In AI Overview"
          },
          {
            "value": "Exclusive",
            "label": "Distributor status cited"
          },
          {
            "value": "3",
            "label": "Partners listed, Simal first"
          }
        ]
      },
      {
        "src": "/assets/projects/c1ccbd3911e3.webp",
        "label": "TeamGroup — SERP position",
        "caption": "“Teamgroup Distributor in UAE” places simalme.com/teamgroup-distributor at position 2, directly beneath TeamGroup's official Where to Buy page — which itself names SIMAL in its snippet alongside Unitek, Ashtel, MBUZZ and Golden Systems. The brand appears twice on the same result page, once through its own ranking and once through the vendor's, and sits above Google's local pack.",
        "metrics": [
          {
            "value": "#2",
            "label": "Organic position"
          },
          {
            "value": "Named",
            "label": "Inside TeamGroup's own listing"
          },
          {
            "value": "Above",
            "label": "Google local pack"
          }
        ]
      },
      {
        "src": "/assets/projects/19860142e984.webp",
        "label": "Crucial wholesale — #1 organic",
        "caption": "The same Crucial landing page takes the #1 organic result for “crucial wholesale in dubai”, ahead of Zen Interactive Technologies and ICTECH Distribution and above the local pack, again carrying the 4.9-star review snippet. One page ranking across two distinct commercial queries — branded distributor intent and wholesale purchase intent.",
        "metrics": [
          {
            "value": "#1",
            "label": "Organic position"
          },
          {
            "value": "4.9★",
            "label": "Review rich snippet"
          },
          {
            "value": "2",
            "label": "Queries, one landing page"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/76e7aa5608d0.webp"
  },
  {
    "id": "gerab-analytics",
    "title": "Gerab System Solutions — Web Analytics",
    "service": "SEO",
    "industry": "B2B / Technology",
    "platform": "GA4 / Search Console",
    "year": "2026",
    "role": "SEO · Analytics",
    "description": "Search Console and GA4 analysis supporting SEO decisions and website performance monitoring.",
    "objective": "Connect organic search behavior with website engagement and conversion opportunities.",
    "execution": "Search Console query analysis, GA4 traffic analysis, landing-page review and reporting.",
    "result": "GA4 + GSC",
    "resultLabel": "Web analytics",
    "art": "art-seo",
    "label": "SEO / Analytics",
    "gallery": [
      {
        "src": "/assets/projects/9c22624b3b04.webp",
        "label": "Search Console — performance",
        "caption": "Search Console for gerabsys.com, last 28 days against the previous 28. Clicks and impressions both more than doubled while average position held near 9.5. CTR moved from 7.7% to 6% as the impression base nearly tripled — reach expanded faster than click capture, which is the normal shape of an early visibility push.",
        "metrics": [
          {
            "value": "245",
            "label": "Clicks, from 113"
          },
          {
            "value": "4.11K",
            "label": "Impressions, from 1.46K"
          },
          {
            "value": "9.5",
            "label": "Avg position"
          }
        ]
      },
      {
        "src": "/assets/projects/4f00b3772327.webp",
        "label": "Insights — content performance",
        "caption": "Click distribution across pages. The homepage takes 221 of 245 clicks, but four pages moved off zero in this window — About, Contact, and two technical articles covering sovereign cloud and business continuity versus disaster recovery. Early evidence that content beyond the homepage is starting to earn search traffic.",
        "metrics": [
          {
            "value": "+117%",
            "label": "Clicks period over period"
          },
          {
            "value": "+181%",
            "label": "Impressions"
          },
          {
            "value": "4",
            "label": "Pages moved off zero"
          }
        ]
      },
      {
        "src": "/assets/projects/a7eb4bd8752d.webp",
        "label": "Generative AI features",
        "caption": "Generative AI features impressions for gerabsys.com — 1.15K across three months against 120 in the prior period. The daily curve dips through the middle of the window and climbs sharply across the final fortnight.",
        "metrics": [
          {
            "value": "1.15K",
            "label": "AI impressions, from 120"
          },
          {
            "value": "~9.6x",
            "label": "Period over period"
          }
        ]
      },
      {
        "src": "/assets/projects/db6dc2495ddd.webp",
        "label": "GA4 — traffic acquisition",
        "caption": "GA4 channels, 26 Jul – 22 Aug 2026. Direct dominates volume with 1,051 sessions, but organic search converts attention better: 28.12% of sessions producing 37.66% of engaged sessions, at a 59.87% engagement rate and 41s average against direct's 39.11% and 18s.",
        "metrics": [
          {
            "value": "1,604",
            "label": "Sessions"
          },
          {
            "value": "1,390",
            "label": "Total users"
          },
          {
            "value": "59.87%",
            "label": "Organic engagement rate"
          }
        ]
      },
      {
        "src": "/assets/projects/e90f34c55005.webp",
        "label": "GA4 — engagement & events",
        "caption": "Engagement and event tracking measured against the Enterprise Technology peer benchmark. 2.3K views and 7.1K events, with scroll depth and form_start both firing as configured events. The report also surfaced a diagnostic worth acting on — “Page not found” is the third most-viewed page title at 266 views, roughly 11% of all page views.",
        "metrics": [
          {
            "value": "2.3K",
            "label": "Views"
          },
          {
            "value": "7.1K",
            "label": "Events"
          },
          {
            "value": "266",
            "label": "404 views flagged"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/9c22624b3b04.webp"
  },
  {
    "id": "gulfnet-ranking",
    "title": "Gulfnet Emirates — Ranking Keywords",
    "service": "SEO",
    "industry": "Technology",
    "platform": "Google Search",
    "year": "2026",
    "role": "SEO",
    "description": "Ranking and keyword visibility work for Gulfnet Emirates Drones & Robotics Solutions.",
    "objective": "Build search visibility around drones, robotics and related technology solutions.",
    "execution": "Keyword research, content/page alignment, on-page SEO and ranking monitoring.",
    "result": "Ranking",
    "resultLabel": "Keyword visibility",
    "art": "art-seo",
    "label": "SEO / Rankings",
    "gallery": [
      {
        "src": "/assets/projects/c7cd6fff7026.webp",
        "label": "Aerial inspection — #1 organic",
        "caption": "gulfnetemirates.com holds the #1 organic result for “Aerial Inspection Solutions In UAE”, placed above Google's local pack. The ranking page covers drone aerial survey, UAV survey and aerial LiDAR — matched to the commercial intent behind the query, while local competitors appear only in the Places block below.",
        "metrics": [
          {
            "value": "#1",
            "label": "Organic position"
          },
          {
            "value": "Above",
            "label": "Google local pack"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/c7cd6fff7026.webp"
  },
  {
    "id": "gulfnet-analytics",
    "title": "Gulfnet Emirates — Web Analytics",
    "service": "SEO",
    "industry": "Technology",
    "platform": "GA4 / Search Console",
    "year": "2026",
    "role": "SEO · Analytics",
    "description": "Search Console and GA4 evidence for Gulfnet's organic search and website behavior.",
    "objective": "Measure search discovery, landing-page performance and audience behavior.",
    "execution": "Search Console and GA4 analysis, query/landing-page review and reporting.",
    "result": "GA4 + GSC",
    "resultLabel": "Web analytics",
    "art": "art-seo",
    "label": "SEO / Analytics",
    "gallery": [
      {
        "src": "/assets/projects/dadace95d27b.webp",
        "label": "GA4 — traffic acquisition",
        "caption": "GA4 channels, 17 Jul – 13 Aug 2026. Paid search drives 1,093 sessions and 65.44% of key events, but organic search shows the strongest engagement of the major channels — 63.91% and 1m 09s, against paid search's 51.42% and 42s. Organic delivered 13.24% of key events with no media cost attached.",
        "metrics": [
          {
            "value": "2,232",
            "label": "Sessions"
          },
          {
            "value": "136",
            "label": "Key events"
          },
          {
            "value": "63.91%",
            "label": "Organic engagement rate"
          }
        ]
      },
      {
        "src": "/assets/projects/1c2d592935d2.webp",
        "label": "GA4 — landing page performance",
        "caption": "Landing page performance across 207 pages. Two pages carry the campaign: enterprise-drones and drs-africa take 28.9% of sessions and 55.9% of all key events between them, with drs-africa converting best at a 10.61% session key event rate. The /drs hub holds attention longest at 1m 43s but converts at 0.66% — depth without action.",
        "metrics": [
          {
            "value": "207",
            "label": "Landing pages tracked"
          },
          {
            "value": "10.61%",
            "label": "Best key event rate"
          },
          {
            "value": "55.9%",
            "label": "Key events from top 2 pages"
          }
        ]
      },
      {
        "src": "/assets/projects/ef271e6f5b90.webp",
        "label": "GA4 — key event tracking",
        "caption": "Five key events configured and measured across all channels — contact form submission, WhatsApp chat, email click, phone click and purchase. Paid search accounts for 88 of 136 key events; organic search contributes 18 and direct 20, both with no media cost attached.",
        "metrics": [
          {
            "value": "5",
            "label": "Key events configured"
          },
          {
            "value": "136",
            "label": "Total key events"
          },
          {
            "value": "88",
            "label": "From paid search"
          }
        ]
      },
      {
        "src": "/assets/projects/f79152a495da.webp",
        "label": "GA4 — attribution paths",
        "caption": "Attribution path analysis. 96.57% of conversion credit sits in late touchpoints, and the average path runs 1.10 touchpoints across 0.85 days — a short, decisive consideration cycle. Organic search is the exception at an average 4.81 days to key event, indicating a research-led path rather than an immediate one.",
        "metrics": [
          {
            "value": "96.57%",
            "label": "Late touchpoints"
          },
          {
            "value": "1.10",
            "label": "Touchpoints to key event"
          },
          {
            "value": "4.81d",
            "label": "Organic path length"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/dadace95d27b.webp"
  },
  {
    "id": "simal-meta",
    "title": "Simal Technologies — Meta Ads",
    "service": "PAID ADS",
    "industry": "B2B / Technology",
    "platform": "Meta Ads Manager",
    "year": "2025",
    "role": "Paid Media",
    "description": "Product-led Meta advertising for an IT distributor, built around the Crucial memory and storage portfolio across awareness and messaging objectives.",
    "objective": "Generate product awareness and demand across relevant technology audiences.",
    "execution": "Campaign setup, creative testing, audience targeting, budget management and performance optimization.",
    "result": "Meta",
    "resultLabel": "Product advertising",
    "art": "art-ads",
    "label": "Meta Ads",
    "gallery": [
      {
        "src": "/assets/projects/e021f6e6171a.webp",
        "label": "Campaign overview",
        "caption": "Meta Ads Manager campaign view across the Crucial product portfolio. Two awareness campaigns carry the reach — the P310 SSD campaign across UAE and Egypt reached 1,183,700 people from 1,190,013 impressions at AED 0.17 per 1,000 reached, and the E-100 campaign reached 696,112 at AED 0.35. Beneath them sit the conversation-objective campaigns, where the same audience pool is worked for messaging conversations rather than raw reach.",
        "metrics": [
          {
            "value": "1.18M",
            "label": "P310 campaign reach"
          },
          {
            "value": "AED 0.17",
            "label": "Cost per 1,000 reached"
          },
          {
            "value": "566",
            "label": "Conversations, top campaign"
          }
        ]
      },
      {
        "src": "/assets/projects/f542516621d9.webp",
        "label": "Product-line breakdown",
        "caption": "Campaign performance broken out by Crucial product line, drawn from an account running 129 campaigns. The BX500 SATA SSD leads on volume with 205 messaging conversations at AED 1.02 each, while the DDR4 3200MHz laptop campaign is the most efficient at AED 0.99 from 153,661 impressions. Cost per conversation holds inside a tight AED 0.99–AED 1.54 band across six product campaigns — consistency rather than one outlier carrying the set.",
        "metrics": [
          {
            "value": "129",
            "label": "Campaigns in account"
          },
          {
            "value": "205",
            "label": "Best campaign conversations"
          },
          {
            "value": "AED 0.99",
            "label": "Lowest cost per conversation"
          }
        ]
      },
      {
        "src": "/assets/projects/75b96fc09dad.webp",
        "label": "Single campaign — ad set detail",
        "caption": "Campaign-level view of the June–August Crucial push, structured across three ad sets — T705, T710 and P510. 557 messaging conversations started from 299,214 impressions at AED 1.71 each between 7 June and 7 July 2025. The weekly curve climbs steadily from launch to a 21 June peak, then tapers through early July as frequency builds against the same audience.",
        "metrics": [
          {
            "value": "557",
            "label": "Messaging conversations"
          },
          {
            "value": "299,214",
            "label": "Impressions"
          },
          {
            "value": "3",
            "label": "Ad sets tested"
          }
        ]
      }
    ],
    "subService": "META ADS",
    "thumbnail": "/assets/projects/e021f6e6171a.webp"
  },
  {
    "id": "simal-linkedin",
    "title": "Simal Technologies — LinkedIn Lead Generation",
    "service": "PAID ADS",
    "industry": "B2B / Technology",
    "platform": "LinkedIn Campaign Manager",
    "year": "2025",
    "role": "Paid Media · B2B",
    "description": "LinkedIn advertising across brand awareness, engagement and lead-generation objectives for Crucial memory and storage products.",
    "objective": "Reach relevant B2B audiences and generate qualified interest for technology products and solutions.",
    "execution": "Audience segmentation, job-title targeting, creative, campaign setup and lead-generation optimization.",
    "result": "Lead Gen",
    "resultLabel": "B2B acquisition",
    "art": "art-linkedin",
    "label": "LinkedIn Ads",
    "gallery": [
      {
        "src": "/assets/projects/77047b43aefc.webp",
        "label": "Campaign group — objectives",
        "caption": "LinkedIn Campaign Manager view of the Accelerate campaign group, running six campaigns across three objectives — brand awareness, engagement and lead generation. CRUCIAL X9 PRO returns the strongest click-through at 1.5%, roughly four times the 0.39% and 0.16% the awareness campaigns deliver, while DDR5 Pro Memory produces the most clicks at 361 and the lowest cost per click in the group at AED 0.69.",
        "metrics": [
          {
            "value": "6",
            "label": "Campaigns, 3 objectives"
          },
          {
            "value": "1.5%",
            "label": "Best campaign CTR"
          },
          {
            "value": "AED 0.69",
            "label": "Lowest cost per click"
          }
        ]
      },
      {
        "src": "/assets/projects/6e347da54670.webp",
        "label": "Ad delivery curve",
        "caption": "Impression delivery for a single aggregated ad across 10–18 June 2025, totalling 97,923 impressions. Delivery ramps from near zero at launch to a sharp peak above 43,000 on 15 June before settling into a steady tail — the shape of a front-loaded flight pacing down once the auction stabilises.",
        "metrics": [
          {
            "value": "97,923",
            "label": "Total impressions"
          },
          {
            "value": "43K+",
            "label": "Peak day delivery"
          },
          {
            "value": "9 days",
            "label": "Flight length"
          }
        ]
      }
    ],
    "subService": "LINKEDIN ADS",
    "thumbnail": "/assets/projects/77047b43aefc.webp"
  },
  {
    "id": "gerab-google",
    "title": "Gerab — Google Search Ads",
    "service": "PAID ADS",
    "industry": "B2B / Technology",
    "platform": "Google Ads",
    "year": "2026",
    "role": "Paid Media · Search",
    "description": "Google Search advertising focused on high-intent IT service keywords.",
    "objective": "Capture active demand from users searching for IT AMC and related services.",
    "execution": "Keyword research, campaign structure, search ads, landing-page alignment, location targeting and optimization.",
    "result": "Search",
    "resultLabel": "High-intent keywords",
    "art": "art-ads",
    "label": "Google Ads",
    "gallery": [
      "Campaign overview",
      "Creative / ad set",
      "Audience targeting",
      "Budget / spend",
      "Performance evidence",
      "Optimization notes"
    ],
    "subService": "GOOGLE ADS",
    "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "gulfnet-google",
    "title": "Gulfnet Emirates — Google Search Ads",
    "service": "PAID ADS",
    "industry": "Technology",
    "platform": "Google Ads",
    "year": "2026",
    "role": "Paid Media · Search",
    "description": "Google Search and dynamic search advertising for Gulfnet's drone and robotics solutions across UAE and Africa campaigns.",
    "objective": "Capture relevant search demand around drones, robotics and technology solutions.",
    "execution": "Keyword planning, search campaign structure, ad copy, targeting and landing-page alignment.",
    "result": "Search",
    "resultLabel": "Keyword acquisition",
    "art": "art-ads",
    "label": "Google Ads",
    "gallery": [
      {
        "src": "/assets/projects/01b18383dbd0.webp",
        "label": "Account summary — conversions",
        "caption": "Google Ads account summary, 15 July to 13 August 2026. 146.15 conversions including projected, from 13,480 impressions with impressions up 7,815 period on period. Conversion tracking is split across distinct actions rather than pooled — WhatsApp chat on the Drones & Robotics site, form submissions on the DRS Shop site, and conversations started — so each channel's contribution stays separable.",
        "metrics": [
          {
            "value": "146.15",
            "label": "Conversions incl. projected"
          },
          {
            "value": "13,480",
            "label": "Impressions"
          },
          {
            "value": "+7,815",
            "label": "Impression growth"
          }
        ]
      },
      {
        "src": "/assets/projects/678afa54f498.webp",
        "label": "Keyword performance",
        "caption": "Keyword-level performance across five campaigns. “drone agriculture” leads on volume with 132 clicks at a 16.20% CTR and 15.50 conversions, while “dji authorized dealers” converts hardest at 18.44% from 61 clicks. The most efficient term in the set is “enterprise drone” — a 27.78% conversion rate at AED 14.40 per conversion. Agriculture and DJI Enterprise ad groups carry the account.",
        "metrics": [
          {
            "value": "16.20%",
            "label": "Top keyword CTR"
          },
          {
            "value": "27.78%",
            "label": "Best conversion rate"
          },
          {
            "value": "AED 14.40",
            "label": "Lowest cost per conversion"
          }
        ]
      },
      {
        "src": "/assets/projects/31a36a229624.webp",
        "label": "Search terms — query intent",
        "caption": "The search terms report shows what people actually typed, against 740 clicks, 8,648 impressions, an 8.56% CTR and a 10.78% conversion rate at AED 3.28 average CPC. Price-qualified long-tail beats the broad head terms sitting above it: “dji matrice 350 rtk price” returns a 27.78% CTR and 40% conversion rate, and “20 litre agriculture spraying drone price” a 25% CTR — against 5.71% and 2.56% for the generic “dji”. Terms are being actively added or excluded as the report is worked.",
        "metrics": [
          {
            "value": "8.56%",
            "label": "Overall CTR"
          },
          {
            "value": "10.78%",
            "label": "Conversion rate"
          },
          {
            "value": "40%",
            "label": "Best term conversion rate"
          }
        ]
      },
      {
        "src": "/assets/projects/df602487b08a.webp",
        "label": "Ad performance & strength",
        "caption": "Ad-level performance mixing responsive search ads with dynamic search ads. The agriculture drone mapping RSA rates Excellent on ad strength and pulls a 14.85% CTR from 2,135 impressions; the DJI Enterprise supplier RSA converts harder at 13.38% for 41.75 conversions. Dynamic search ads fill coverage beneath them at lower CTR but competitive efficiency — AED 22.49 per conversion on the strongest.",
        "metrics": [
          {
            "value": "14.85%",
            "label": "Best ad CTR"
          },
          {
            "value": "Excellent",
            "label": "Ad strength rating"
          },
          {
            "value": "41.75",
            "label": "Top ad conversions"
          }
        ]
      }
    ],
    "subService": "GOOGLE ADS",
    "thumbnail": "/assets/projects/01b18383dbd0.webp"
  },
  {
    "id": "simal-web",
    "title": "Simal Technologies — Website Development",
    "service": "WEB DEVELOPMENT",
    "industry": "B2B / Technology",
    "platform": "WordPress / Elementor",
    "year": "2025",
    "role": "Web Development",
    "description": "Corporate website development for an IT distribution business.",
    "objective": "Build a professional technology-distribution website supporting products, brands, solutions and lead generation.",
    "execution": "WordPress, Elementor, responsive layouts, SEO implementation, performance optimization and content structure.",
    "result": "WordPress",
    "resultLabel": "Corporate website",
    "art": "art-web",
    "label": "Web Development",
    "gallery": [
      {
        "src": "/assets/projects/c62901c15b46.webp",
        "label": "Brand merchandising",
        "caption": "Homepage brand merchandising on simalme.com — a colour-coded tile grid routing visitors straight into Crucial, Arktek, Adata and TeamGroup product lines, with secondary tiles for docking solutions, surge protection and gaming monitors. Each tile carries its own shop or browse action rather than funnelling everything through one generic call to action, so vendor-driven traffic lands on the right catalogue in a single click.",
        "metrics": [
          {
            "value": "7",
            "label": "Merchandising tiles"
          },
          {
            "value": "4",
            "label": "Vendor brands featured"
          },
          {
            "value": "1 click",
            "label": "To category from home"
          }
        ]
      },
      {
        "src": "/assets/projects/1aefe5471382.webp",
        "label": "Vendor credibility section",
        "caption": "An awards and partnership section built to carry vendor credibility — a rotating gallery of HikVision recognition including Best Distributor Partner and the 2025 MEA National Distributor Summit, followed by team and culture imagery. For a distributor, vendor endorsement is the trust signal channel buyers weigh most, so it sits in the main journey rather than being buried in a press page.",
        "metrics": [
          {
            "value": "5",
            "label": "Carousel slides"
          },
          {
            "value": "HikVision",
            "label": "Featured vendor award"
          },
          {
            "value": "2025",
            "label": "MEA Distributor Summit"
          }
        ]
      },
      {
        "src": "/assets/projects/f3d5038172e9.webp",
        "label": "Shop & faceted filtering",
        "caption": "E-commerce catalogue with faceted filtering by category and brand — 76 products spanning Computer Components (35), Computer Accessories (30), Gaming (9), Monitors (6) and laptops (3), narrowable by Crucial, ARKTEK, Aiwa and others. Every product card uses a WhatsApp order action rather than a standard cart checkout, matching how B2B buyers in the region actually transact.",
        "metrics": [
          {
            "value": "76",
            "label": "Products listed"
          },
          {
            "value": "5",
            "label": "Filterable categories"
          },
          {
            "value": "WhatsApp",
            "label": "Primary order action"
          }
        ]
      }
    ],
    "live": "https://www.simalme.com/",
    "thumbnail": "/assets/projects/c62901c15b46.webp"
  },
  {
    "id": "amp-web",
    "title": "Ampconnect — Website Development",
    "service": "WEB DEVELOPMENT",
    "industry": "B2B / Technology",
    "platform": "WordPress",
    "year": "2026",
    "role": "Web Development · SEO",
    "description": "Website development and optimization for a value-added IT distribution brand.",
    "objective": "Create a scalable B2B website that communicates vendors, solutions and distribution capabilities.",
    "execution": "WordPress implementation, page architecture, responsive UI, SEO setup and content integration.",
    "result": "B2B Web",
    "resultLabel": "Website development",
    "art": "art-web",
    "label": "Web Development",
    "gallery": [
      {
        "src": "/assets/projects/97a0ba272a25.webp",
        "label": "Homepage & positioning",
        "caption": "Ampconnect homepage. The hero positions the business specifically rather than generically — value-added IT distribution built for the Middle East, with a Sharafi Holding Group attribution and 30+ years of distribution behind it. The utility bar states territory coverage across UAE, GCC and Africa, and the navigation separates Become a Partner from Shop so channel partners and end buyers take different routes from the first screen.",
        "metrics": [
          {
            "value": "2",
            "label": "Distinct CTA paths"
          },
          {
            "value": "3",
            "label": "Regions stated up front"
          },
          {
            "value": "30+ yrs",
            "label": "Credibility signal"
          }
        ]
      },
      {
        "src": "/assets/projects/8ae48a97d6f8.webp",
        "label": "Interactive solutions selector",
        "caption": "An interactive solution selector rather than a static list — seven numbered layers running from datacenter solutions up to safety, identification and monitoring, each revealing its own capability tags and the vendors distributed beneath it. Enterprise Cabling, shown active here, surfaces CommScope, Datacom, Leviton and Optronics against copper and fibre, patch panels, connectivity and cable management, with a route through to the full page.",
        "metrics": [
          {
            "value": "7",
            "label": "Solution layers"
          },
          {
            "value": "4",
            "label": "Vendors surfaced per layer"
          },
          {
            "value": "Interactive",
            "label": "Not a static list"
          }
        ]
      },
      {
        "src": "/assets/projects/2526fbd6fb3e.webp",
        "label": "Insights content hub",
        "caption": "A content hub structured for discovery and search at once — blogs, news and events unified in one library, filterable by datacenter, cabling, network and security. The articles are written to practitioner problems rather than product pitches: rack, power and cooling capacity planning; cabling decisions that reduce future rework; stock and design clarity for Wi-Fi and switching projects. This is the publishing layer sitting behind the organic growth shown in the Ampconnect analytics archive.",
        "metrics": [
          {
            "value": "3",
            "label": "Content types unified"
          },
          {
            "value": "4",
            "label": "Topic filters"
          },
          {
            "value": "Aug 2026",
            "label": "Latest publication"
          }
        ]
      }
    ],
    "live": "https://www.ampconnectme.com/",
    "thumbnail": "/assets/projects/97a0ba272a25.webp"
  },
  {
    "id": "darwin-web",
    "title": "Darwin Architect — Website Development",
    "service": "WEB DEVELOPMENT",
    "industry": "Architecture",
    "platform": "WordPress",
    "year": "2025",
    "role": "Web Development",
    "description": "Website development for an architecture-focused digital presence.",
    "objective": "Translate a visual architecture brand into a responsive and structured web experience.",
    "execution": "Responsive page development, layout implementation, content presentation and front-end refinement.",
    "result": "Web",
    "resultLabel": "Website development",
    "art": "art-web",
    "label": "Web Development",
    "gallery": [
      {
        "src": "/assets/projects/f43103a19765.webp",
        "label": "Homepage hero",
        "caption": "Darwin Architects homepage — a full-bleed architectural hero carrying the studio positioning line in a serif and italic pairing, split across two calls to action for browsing work versus reviewing services. The treatment is deliberately editorial rather than corporate, matching how architecture practices present a portfolio.",
        "metrics": [
          {
            "value": "2",
            "label": "Primary CTAs"
          },
          {
            "value": "6",
            "label": "Navigation sections"
          },
          {
            "value": "Editorial",
            "label": "Design direction"
          }
        ]
      },
      {
        "src": "/assets/projects/6ef356396d51.webp",
        "label": "About & studio credentials",
        "caption": "About page built on an overlapping image composition with a founding-year badge, closing on a three-figure credibility strip — 120+ projects delivered, 15+ years of experience and 5 disciplines. The layered image treatment gives the section depth without needing extra copy to fill the space.",
        "metrics": [
          {
            "value": "120+",
            "label": "Projects delivered"
          },
          {
            "value": "15+",
            "label": "Years experience"
          },
          {
            "value": "5",
            "label": "Disciplines"
          }
        ]
      },
      {
        "src": "/assets/projects/48d2ba8f3e6e.webp",
        "label": "Filterable project archive",
        "caption": "Project archive filterable across commercial, institutional, interior and residential, with a live project count and cards carrying discipline, location and year — Studio Vetro in Bangalore, The Horizon Learning Hub in Chennai, The Meridian Tower in Pune, Villa Serene in Goa and Casa Lumière in Mumbai. The dark treatment lets the project photography carry the page.",
        "metrics": [
          {
            "value": "5",
            "label": "Projects catalogued"
          },
          {
            "value": "4",
            "label": "Category filters"
          },
          {
            "value": "5",
            "label": "Cities covered"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/f43103a19765.webp"
  },
  {
    "id": "alittlepotent-web",
    "title": "A Little Potent — E-commerce Website",
    "service": "WEB DEVELOPMENT",
    "industry": "E-commerce",
    "platform": "WordPress",
    "year": "2025",
    "role": "Web Development",
    "description": "E-commerce website work for a baby clothing brand.",
    "objective": "Create a polished shopping experience that supports product discovery and conversion.",
    "execution": "WordPress implementation, responsive layouts, product presentation and conversion-focused page structure.",
    "result": "E-commerce",
    "resultLabel": "Website development",
    "art": "art-web",
    "label": "Web Development",
    "gallery": [
      {
        "src": "/assets/projects/043ce0fc884c.webp",
        "label": "Storefront homepage",
        "caption": "A Little Potent storefront — a baby apparel brand built around parody luxury slogans. The homepage leads with lifestyle product photography shot on a consistent warm backdrop, priced between AED 130 and AED 135. The utility bar carries currency and language switchers alongside direct WhatsApp contact, so a Gulf shopper can change context or open a conversation without leaving the page.",
        "metrics": [
          {
            "value": "AED / EN",
            "label": "Currency & language switchers"
          },
          {
            "value": "WhatsApp",
            "label": "Direct contact channel"
          },
          {
            "value": "5",
            "label": "Products above the fold"
          }
        ]
      },
      {
        "src": "/assets/projects/05a5cda82c12.webp",
        "label": "Shop & filtering",
        "caption": "Shop page with a live faceted sidebar — 18 products across sweaters (13) and polos (5), with search, sort and collection controls. Every product is photographed against the same neutral background, which keeps the grid visually coherent as the catalogue grows and removes the need for per-image retouching later.",
        "metrics": [
          {
            "value": "18",
            "label": "Products in catalogue"
          },
          {
            "value": "13 / 5",
            "label": "Sweaters / polos"
          },
          {
            "value": "AED 105",
            "label": "Entry price point"
          }
        ]
      }
    ],
    "live": "https://alittlepotent.com/",
    "thumbnail": "/assets/projects/043ce0fc884c.webp"
  },
  {
    "id": "menanza-web",
    "title": "Menanza — Website Development",
    "service": "WEB DEVELOPMENT",
    "industry": "E-commerce",
    "platform": "WordPress",
    "year": "2025",
    "role": "Web Development",
    "description": "Website development and front-end implementation for a consumer-facing brand.",
    "objective": "Build a responsive digital storefront/presence with a clean user experience.",
    "execution": "WordPress development, responsive UI, content structure and front-end implementation.",
    "result": "Web",
    "resultLabel": "Website development",
    "art": "art-web",
    "label": "Web Development",
    "gallery": [
      {
        "src": "/assets/projects/8cf5e5ae9101.webp",
        "label": "Homepage hero",
        "caption": "Menanza homepage — a Gen Z streetwear storefront leaning into a neon night-city hero with a rotating banner carousel. Header utilities cover search, wishlist and cart counters plus an account entry, putting the full commerce toolkit on screen from the first view.",
        "metrics": [
          {
            "value": "Carousel",
            "label": "Rotating hero banners"
          },
          {
            "value": "3",
            "label": "Header utilities"
          },
          {
            "value": "Dark UI",
            "label": "Design direction"
          }
        ]
      },
      {
        "src": "/assets/projects/f7c72b9aa062.webp",
        "label": "Shop & multi-filter",
        "caption": "Shop page running four filter dimensions simultaneously — size, colour, category and a price range slider from AED 20 to AED 450 — across 20 products. Discount badges sit on the cards, with a black t-shirt at 44% off and sneakers at 38%, and star ratings render inline to support the decision without an extra click.",
        "metrics": [
          {
            "value": "20",
            "label": "Products listed"
          },
          {
            "value": "4",
            "label": "Filter dimensions"
          },
          {
            "value": "-44%",
            "label": "Deepest discount shown"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/8cf5e5ae9101.webp"
  },
  {
    "id": "gulfnet-web",
    "title": "Gulfnet Emirates — Web Contribution",
    "service": "WEB DEVELOPMENT",
    "industry": "Technology",
    "platform": "WordPress",
    "year": "2026",
    "role": "Web Development",
    "description": "Web development contribution supporting a drones and robotics technology website.",
    "objective": "Support the digital presentation of technology solutions through structured, responsive web experiences.",
    "execution": "Front-end/page contributions, responsive implementation, content presentation and SEO-aware structure.",
    "result": "Web",
    "resultLabel": "Development contribution",
    "art": "art-web",
    "label": "Web Contribution",
    "gallery": [
      {
        "src": "/assets/projects/a1c8654c5de6.webp",
        "label": "Homepage hero",
        "caption": "Gulfnet Emirates DRS homepage. The hero states category and buyer plainly — enterprise drones, robotics and AI-powered solutions for critical operations across government, infrastructure and private sectors. The DJI Enterprise Authorized Dealer badge sits inside the hero rather than the footer, because authorised-dealer status is the qualifying signal for this buyer. Request a Demo carries the primary action, matched to a considered enterprise purchase rather than a cart.",
        "metrics": [
          {
            "value": "DJI",
            "label": "Dealer badge in hero"
          },
          {
            "value": "Request a Demo",
            "label": "Primary CTA"
          },
          {
            "value": "3",
            "label": "Sectors named"
          }
        ]
      },
      {
        "src": "/assets/projects/5fb140ce970a.webp",
        "label": "Industries carousel",
        "caption": "The industries section is built as a carousel rather than a flat list, letting one page speak to distinct verticals with separate framing — oil and gas and marine, power and utilities, and infrastructure. The oil and gas panel leads on risk and downtime reduction for refineries, pipelines and offshore platforms across the GCC: language written to the operational concern rather than the technology.",
        "metrics": [
          {
            "value": "3",
            "label": "Industry verticals"
          },
          {
            "value": "Carousel",
            "label": "Vertical-specific messaging"
          },
          {
            "value": "GCC",
            "label": "Stated coverage"
          }
        ]
      },
      {
        "src": "/assets/projects/9668d50e235c.webp",
        "label": "Differentiation section",
        "caption": "A differentiation block built as four claim cards — drone surveying, inspection and geospatial intelligence; enterprise trust; certified pilots with aviation-grade safety standards; and autonomous robotics spanning UAV, UGV, USV, humanoids and robotic arms. The supporting copy extends coverage past the UAE to GCC, Africa and CIS, widening the addressable market on the page itself.",
        "metrics": [
          {
            "value": "4",
            "label": "Differentiator cards"
          },
          {
            "value": "5",
            "label": "Robotics platform types"
          },
          {
            "value": "4",
            "label": "Regions covered"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/a1c8654c5de6.webp"
  },
  {
    "id": "gerab-web",
    "title": "Gerab System Solutions — Web Contribution",
    "service": "WEB DEVELOPMENT",
    "industry": "B2B / Technology",
    "platform": "WordPress",
    "year": "2026",
    "role": "Web Development · SEO",
    "description": "Website development and SEO-aware implementation supporting Gerab's technology services.",
    "objective": "Improve presentation, usability and discoverability of B2B technology solutions.",
    "execution": "Page development, responsive implementation, landing-page work, SEO structure and content integration.",
    "result": "Web",
    "resultLabel": "Development contribution",
    "art": "art-web",
    "label": "Web Contribution",
    "gallery": [
      {
        "src": "/assets/projects/4d09725e1cf0.webp",
        "label": "Homepage & positioning",
        "caption": "Gerab System Solutions homepage. The hero frames enterprise IT as a strategic asset rather than opening with a service list, and the supporting copy names the actual pressures — technical complexity, resilience, AI, data sovereignty. Book a Free Consultation carries the primary action, with a trusted-by-industry-leaders strip immediately beneath it so proof sits directly under the claim.",
        "metrics": [
          {
            "value": "Consultation",
            "label": "Primary CTA"
          },
          {
            "value": "5",
            "label": "Navigation sections"
          },
          {
            "value": "Serif",
            "label": "Type direction"
          }
        ]
      },
      {
        "src": "/assets/projects/81e76478c70f.webp",
        "label": "Services architecture",
        "caption": "Services laid out as six distinct routes — managed IT, cloud computing, cybersecurity, IT consulting, enterprise IT, and RPA, AI and ML — each with its own icon, description and dedicated page rather than being stacked into a single combined page. That structure is what lets each service rank independently, which is what the Gerab search analytics archive shows happening.",
        "metrics": [
          {
            "value": "6",
            "label": "Service pages"
          },
          {
            "value": "1",
            "label": "Dedicated URL each"
          },
          {
            "value": "Indexable",
            "label": "Structured for search"
          }
        ]
      }
    ],
    "live": "https://www.gerabsys.com/",
    "thumbnail": "/assets/projects/4d09725e1cf0.webp"
  },
  {
    "id": "portfolio-web",
    "title": "Mohammed Adnan — Interactive Portfolio",
    "service": "WEB DEVELOPMENT",
    "industry": "Other",
    "platform": "HTML / CSS / JavaScript",
    "year": "2026",
    "role": "Design · Development",
    "description": "Custom personal portfolio combining digital marketing storytelling with front-end engineering.",
    "objective": "Build an interactive professional archive that proves marketing capability and technical execution.",
    "execution": "Semantic HTML, responsive CSS, JavaScript, GSAP motion, interactive orbit system and art-directed UI.",
    "result": "Custom",
    "resultLabel": "Personal project",
    "art": "art-web",
    "label": "HTML / CSS / JS",
    "gallery": [
      "Desktop homepage",
      "Mobile experience",
      "Internal page",
      "UI / layout",
      "SEO implementation",
      "Performance / build"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "github-projects",
    "title": "GitHub — Front-End Projects",
    "service": "WEB DEVELOPMENT",
    "industry": "Other",
    "platform": "JavaScript / GitHub",
    "year": "2024–2026",
    "role": "Developer",
    "description": "Personal web-development experiments and front-end projects hosted through GitHub.",
    "objective": "Continuously develop practical front-end and interactive web-development skills.",
    "execution": "HTML, CSS, JavaScript and component-oriented front-end experiments.",
    "result": "GitHub",
    "resultLabel": "Personal projects",
    "art": "art-web",
    "label": "GitHub / Web",
    "gallery": [
      "Desktop homepage",
      "Mobile experience",
      "Internal page",
      "UI / layout",
      "SEO implementation",
      "Performance / build"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "ai-agents",
    "title": "AI Agents & Automation Experiments",
    "service": "WEB DEVELOPMENT",
    "industry": "Other",
    "platform": "AI / JavaScript",
    "year": "2026",
    "role": "AI · Development",
    "description": "Personal experiments exploring AI agents, automation and intelligent digital workflows.",
    "objective": "Extend marketing workflows with practical AI-assisted automation and agentic systems.",
    "execution": "Prompt architecture, workflow design, API-oriented experimentation and web integration concepts.",
    "result": "AI",
    "resultLabel": "Personal experiments",
    "art": "art-web",
    "label": "AI Agents",
    "gallery": [
      "Desktop homepage",
      "Mobile experience",
      "Internal page",
      "UI / layout",
      "SEO implementation",
      "Performance / build"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "simal-linkedin-social",
    "title": "Simal Technologies — LinkedIn Marketing",
    "service": "SOCIAL MEDIA",
    "industry": "B2B / Technology",
    "platform": "LinkedIn",
    "year": "2025",
    "role": "Social Media",
    "description": "LinkedIn marketing for an IT distributor across products, brands and technology solutions.",
    "objective": "Build B2B awareness and communicate technology products to relevant professional audiences.",
    "execution": "Content planning, product posts, campaign creatives, partner content and audience-focused messaging.",
    "result": "LinkedIn",
    "resultLabel": "B2B marketing",
    "art": "art-linkedin",
    "label": "LinkedIn Marketing",
    "gallery": [
      {
        "src": "/assets/projects/d2cbac82679b.webp",
        "label": "Content performance",
        "caption": "LinkedIn page analytics for Simal Technologies Middle East, 22 July 2024 to 21 July 2025. 573,206 impressions across the year, with 684 reactions, 47 comments and 20 reposts. The split is the story: 539,867 of those impressions came from sponsored delivery against 33,339 organic — a paid-led page where campaign reach rather than the content feed drives the volume.",
        "metrics": [
          {
            "value": "573,206",
            "label": "Impressions"
          },
          {
            "value": "94%",
            "label": "Sponsored share of reach"
          },
          {
            "value": "684",
            "label": "Reactions"
          }
        ]
      },
      {
        "src": "/assets/projects/2ebce281830d.webp",
        "label": "Follower growth",
        "caption": "Follower growth across 23 April to 21 July 2025 — 575 new followers in 90 days against a 1,425 base, a 57.5% increase. Every one arrived organically, with sponsored contributing zero. Paid was carrying impressions on this page while audience growth ran entirely on page activity and content.",
        "metrics": [
          {
            "value": "575",
            "label": "New followers in 90 days"
          },
          {
            "value": "+57.5%",
            "label": "Growth over base"
          },
          {
            "value": "100%",
            "label": "Organically sourced"
          }
        ]
      }
    ],
    "subService": "LINKEDIN MARKETING",
    "thumbnail": "/assets/projects/d2cbac82679b.webp"
  },
  {
    "id": "simal-meta-social",
    "title": "Simal Technologies — Meta (Facebook & Instagram)",
    "service": "SOCIAL MEDIA",
    "industry": "B2B / Technology",
    "platform": "Facebook / Instagram",
    "year": "2025",
    "role": "Social Media",
    "description": "Organic Meta management for an IT distributor, running Facebook and Instagram as a linked pair from Meta Business Suite.",
    "objective": "Grow qualified traffic and engagement across both platforms while matching effort to where a B2B audience actually converts.",
    "execution": "Content planning across both platforms, publishing and scheduling through Business Suite, performance tracking and platform-level prioritisation.",
    "result": "Meta",
    "resultLabel": "Organic social",
    "art": "art-social",
    "label": "Meta Marketing",
    "subService": "META",
    "gallery": [
      {
        "src": "/assets/projects/26de5937b61b.webp",
        "label": "Connected accounts",
        "caption": "Meta Business Suite view for Simal Technologies, running Facebook and Instagram as a linked pair from a single workspace — 3K followers on Facebook against 358 on Instagram. The two platforms sit at very different stages of maturity, so they are managed to different expectations rather than to one shared benchmark.",
        "metrics": [
          {
            "value": "3K",
            "label": "Facebook followers"
          },
          {
            "value": "358",
            "label": "Instagram followers"
          },
          {
            "value": "2",
            "label": "Platforms managed"
          }
        ]
      },
      {
        "src": "/assets/projects/285078b2c191.webp",
        "label": "Facebook performance",
        "caption": "Facebook results for 25 June to 22 July 2025. Views fell 29.5% to 127,938 and reach fell 16.7% to 57,666 — but content interactions rose 45.1% to 235 and link clicks rose 130.1% to 2,105. Reach contracted while the traffic it produced more than doubled, which is the trade a B2B page should want: a smaller, better-qualified audience clicking through at 3.65% of everyone reached.",
        "metrics": [
          {
            "value": "2,105",
            "label": "Link clicks, +130.1%"
          },
          {
            "value": "3.65%",
            "label": "Click rate on reach"
          },
          {
            "value": "+45.1%",
            "label": "Content interactions"
          }
        ]
      },
      {
        "src": "/assets/projects/23febc1cdfe8.webp",
        "label": "Instagram performance",
        "caption": "Instagram results over the same window, growing from a much smaller base — views up 419.1% to 16,948, reach up 393.8% to 11,312, content interactions up 300% and link clicks up 400% to 55. The growth rates are steep because the starting point was low; in absolute terms Facebook still delivers roughly 38 times the link clicks, which is why budget and effort stay weighted there for a B2B distribution audience.",
        "metrics": [
          {
            "value": "16,948",
            "label": "Views, +419.1%"
          },
          {
            "value": "11,312",
            "label": "Reach, +393.8%"
          },
          {
            "value": "+400%",
            "label": "Link clicks"
          }
        ]
      }
    ],
    "thumbnail": "/assets/projects/26de5937b61b.webp"
  },
  {
    "id": "amp-linkedin-social",
    "title": "Ampconnect — LinkedIn Marketing",
    "service": "SOCIAL MEDIA",
    "industry": "B2B / Technology",
    "platform": "LinkedIn",
    "year": "2026",
    "role": "Social Media · B2B",
    "description": "B2B LinkedIn marketing for vendor partnerships, enterprise solutions and IT distribution.",
    "objective": "Position Ampconnect as a credible value-added technology distribution partner.",
    "execution": "Content calendars, vendor posts, solution messaging, carousels, polls and partner communications.",
    "result": "LinkedIn",
    "resultLabel": "B2B marketing",
    "art": "art-linkedin",
    "label": "LinkedIn Marketing",
    "gallery": [
      {
        "src": "/assets/projects/567ed5a4e301.webp",
        "label": "Content performance",
        "caption": "Ampconnect page analytics, 22 August 2025 to 21 August 2026. 201,934 impressions with 4,910 reactions, 43 comments and 27 reposts. The paid-organic balance inverts against the Simal page — 178,976 impressions are organic and only 22,958 sponsored, so 89% of reach is earned rather than bought. Reactions land at 2.4% of impressions, roughly twenty times the rate a paid-led page returns, because engagement follows earned reach rather than volume.",
        "metrics": [
          {
            "value": "201,934",
            "label": "Impressions"
          },
          {
            "value": "89%",
            "label": "Organic share of reach"
          },
          {
            "value": "2.4%",
            "label": "Reaction rate"
          }
        ]
      },
      {
        "src": "/assets/projects/a1e48285f529.webp",
        "label": "Follower growth",
        "caption": "Follower growth across the full year to 21 August 2026 — 1,194 new followers on a 4,364-follower page. Sources break down as 1,129 organic, 60 auto-invited through Premium and 5 sponsored, putting organic at 95% of intake. The June spike above 40 followers in a single day marks the strongest content moment of the twelve-month window.",
        "metrics": [
          {
            "value": "4,364",
            "label": "Total followers"
          },
          {
            "value": "1,194",
            "label": "New in 365 days"
          },
          {
            "value": "95%",
            "label": "Organically sourced"
          }
        ]
      }
    ],
    "subService": "LINKEDIN MARKETING",
    "thumbnail": "/assets/projects/567ed5a4e301.webp"
  },
  {
    "id": "gerab-linkedin-social",
    "title": "Gerab — LinkedIn Marketing",
    "service": "SOCIAL MEDIA",
    "industry": "B2B / Technology",
    "platform": "LinkedIn",
    "year": "2026",
    "role": "Social Media · Content",
    "description": "LinkedIn marketing for IT services, infrastructure, cybersecurity and technology partners.",
    "objective": "Build consistent B2B communication around solutions, vendors and technology expertise.",
    "execution": "Content calendar, posts, partner campaigns, carousels, polls and campaign support.",
    "result": "LinkedIn",
    "resultLabel": "B2B marketing",
    "art": "art-linkedin",
    "label": "LinkedIn Marketing",
    "gallery": [
      {
        "src": "/assets/projects/b9a0cc98e578.webp",
        "label": "Content performance",
        "caption": "Gerab System Solutions page analytics, 22 August 2025 to 21 August 2026. 111,540 impressions, 2,706 reactions, 32 comments and 7 reposts — with sponsored at zero, so the entire figure is earned reach with no media behind it. The reaction rate of 2.4% matches the Ampconnect page almost exactly, a consistent return across two separately managed organic pages. Impressions peak in early February before settling to a steadier baseline.",
        "metrics": [
          {
            "value": "111,540",
            "label": "Impressions, all organic"
          },
          {
            "value": "2,706",
            "label": "Reactions"
          },
          {
            "value": "0",
            "label": "Sponsored impressions"
          }
        ]
      },
      {
        "src": "/assets/projects/a4766eb837ba.webp",
        "label": "Follower growth",
        "caption": "Follower growth to 21 August 2026 — 1,548 new followers on a 6,246 base, of which 1,540 arrived organically and 8 through Premium auto-invite, with no sponsored follower acquisition at all. The mid-June spike above 100 in a single day is the largest movement across the twelve months.",
        "metrics": [
          {
            "value": "6,246",
            "label": "Total followers"
          },
          {
            "value": "1,548",
            "label": "New in 365 days"
          },
          {
            "value": "99.5%",
            "label": "Organically sourced"
          }
        ]
      }
    ],
    "subService": "LINKEDIN MARKETING",
    "thumbnail": "/assets/projects/b9a0cc98e578.webp"
  },
  {
    "id": "alittlepotent-meta",
    "title": "A Little Potent — Instagram Management",
    "service": "SOCIAL MEDIA",
    "industry": "E-commerce",
    "platform": "Instagram",
    "year": "2025",
    "role": "Social Media · Content",
    "description": "Instagram management and visual content for a baby clothing brand.",
    "objective": "Create a consistent product-led social presence with a clear visual identity.",
    "execution": "Content planning, creative direction, captions, product content and social publishing support.",
    "result": "Instagram",
    "resultLabel": "Brand management",
    "art": "art-social",
    "label": "Meta / Instagram",
    "gallery": [
      {
        "src": "/assets/projects/137224cbbc33.webp",
        "label": "Profile & content grid",
        "caption": "Instagram profile view for the A Little Potent baby-apparel brand, showing 13.1K views across the last 30 days. The content grid makes the reel distribution plain: the top three pieces pull 10.9K, 9,421 and 6,141 views while the weakest sit at 153, 119 and 76 — a spread of roughly 140x between best and worst. A small number of reels carry the account, which is how the format behaves and why volume of output matters more than polish on every post.",
        "metrics": [
          {
            "value": "13.1K",
            "label": "Views, last 30 days"
          },
          {
            "value": "10.9K",
            "label": "Top reel views"
          },
          {
            "value": "140x",
            "label": "Best-to-worst spread"
          }
        ]
      },
      {
        "src": "/assets/projects/e014d1bdb644.webp",
        "label": "Reach & content mix",
        "caption": "Reach breakdown for 23 June to 22 July. 11,054 accounts reached, of which 96.9% were non-followers — the account is being served to cold audiences rather than recycling an existing following, which is what a new brand needs. Reels drive 93.4% of views against 6.6% from stories, making this an almost entirely reel-led account.",
        "metrics": [
          {
            "value": "11,054",
            "label": "Accounts reached"
          },
          {
            "value": "96.9%",
            "label": "Non-follower reach"
          },
          {
            "value": "93.4%",
            "label": "Views from reels"
          }
        ]
      }
    ],
    "subService": "META",
    "live": "https://alittlepotent.com/",
    "thumbnail": "/assets/projects/137224cbbc33.webp"
  },
  {
    "id": "sheep-meta",
    "title": "Sheep Farming — Instagram Management",
    "service": "SOCIAL MEDIA",
    "industry": "Other",
    "platform": "Instagram",
    "year": "2025",
    "role": "Social Media",
    "description": "Instagram management and content support for a livestock/sheep-farming presence.",
    "objective": "Build consistent social communication around livestock, farming and audience engagement.",
    "execution": "Content planning, creative publishing and social media management.",
    "result": "Instagram",
    "resultLabel": "Social management",
    "art": "art-social",
    "label": "Meta / Instagram",
    "gallery": [
      {
        "src": "/assets/projects/5e496050266e.webp",
        "label": "Profile & content grid",
        "caption": "Instagram profile for Sultan Sheeps Mysore, showing 95.8K views across the last 30 days alongside an organised story-highlight structure — batch listings, featured stock and enquiry highlights that work as a permanent catalogue for buyers landing on the profile. Top-performing reels reach 50.5K, 21.2K and 17.6K views.",
        "metrics": [
          {
            "value": "95.8K",
            "label": "Views, last 30 days"
          },
          {
            "value": "50.5K",
            "label": "Top reel views"
          },
          {
            "value": "4",
            "label": "Story highlight categories"
          }
        ]
      },
      {
        "src": "/assets/projects/1e5b677256d3.webp",
        "label": "Reach & content mix",
        "caption": "Reach for 23 June to 22 July — 74,948 accounts reached with 96% coming from non-followers. The content mix is more balanced than a pure reels account: 72.3% of views from reels, 17.7% from stories and 10% from posts, with stories carrying the day-to-day availability updates that a livestock sales account depends on.",
        "metrics": [
          {
            "value": "74,948",
            "label": "Accounts reached"
          },
          {
            "value": "96%",
            "label": "Non-follower reach"
          },
          {
            "value": "3",
            "label": "Content formats in rotation"
          }
        ]
      },
      {
        "src": "/assets/projects/0cab78bb58f8.webp",
        "label": "Top content performance",
        "caption": "The content grid ranked by views. Two pinned reels anchor the profile at 50.5K and 17.6K, with 21.2K, 14.2K and 6,974 following behind. Listings carry status overlays directly on the thumbnail — for sale, not for sale, sold with location — so the grid itself functions as a live inventory board rather than a passive feed.",
        "metrics": [
          {
            "value": "50.5K",
            "label": "Top reel views"
          },
          {
            "value": "2",
            "label": "Pinned reels"
          },
          {
            "value": "6",
            "label": "Reels above 3K views"
          }
        ]
      }
    ],
    "subService": "META",
    "thumbnail": "/assets/projects/5e496050266e.webp"
  },
  {
    "id": "vendor-webinars",
    "title": "Vendor Events & Virtual Webinars",
    "service": "EVENT MANAGEMENT",
    "industry": "B2B / Technology",
    "platform": "Webinar / Social",
    "year": "2025–2026",
    "role": "Event Marketing",
    "description": "Vendor-facing events and virtual webinars supporting technology partners and audience engagement.",
    "objective": "Support partner visibility, registration and digital promotion around vendor-led sessions.",
    "execution": "Campaign promotion, registration support, guest coordination, digital assets and post-event follow-up.",
    "result": "Webinars",
    "resultLabel": "Vendor support",
    "art": "art-event",
    "label": "Vendor Events",
    "gallery": [
      "Event overview",
      "Promotion",
      "Registration / guest list",
      "Event-day support",
      "Digital assets",
      "Post-event follow-up"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "gitex-2025",
    "title": "GITEX 2025 — Vendor Support",
    "service": "EVENT MANAGEMENT",
    "industry": "B2B / Technology",
    "platform": "Event / Social",
    "year": "2025",
    "role": "Event Marketing",
    "description": "Marketing and digital support around GITEX 2025 for technology vendor activity.",
    "objective": "Support vendor presence and event communications before and during the exhibition.",
    "execution": "Digital campaigns, promotional content, coordination and on-event support.",
    "result": "GITEX 2025",
    "resultLabel": "Vendor support",
    "art": "art-event",
    "label": "GITEX 2025",
    "gallery": [
      "Event overview",
      "Promotion",
      "Registration / guest list",
      "Event-day support",
      "Digital assets",
      "Post-event follow-up"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "tplink-event",
    "title": "TP-Link — Vendor & End-Customer Event",
    "service": "EVENT MANAGEMENT",
    "industry": "B2B / Technology",
    "platform": "Event / Social",
    "year": "2025",
    "role": "Event Marketing",
    "description": "Event support connecting a technology vendor with end customers.",
    "objective": "Support event promotion, attendee coordination and partner/customer engagement.",
    "execution": "Digital promotion, registrations, coordination, event-day support and follow-up.",
    "result": "TP-Link",
    "resultLabel": "Vendor + customer event",
    "art": "art-event",
    "label": "Vendor Event",
    "gallery": [
      "Event overview",
      "Promotion",
      "Registration / guest list",
      "Event-day support",
      "Digital assets",
      "Post-event follow-up"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "avast-webinars",
    "title": "Avast — Webinar Campaigns",
    "service": "EVENT MANAGEMENT",
    "industry": "B2B / Technology",
    "platform": "Webinar / LinkedIn",
    "year": "2025",
    "role": "Event Marketing",
    "description": "Digital support for Avast webinars and technology-focused virtual events.",
    "objective": "Drive awareness and registrations for vendor webinar initiatives.",
    "execution": "Promotional campaigns, social content, registration support and post-event communications.",
    "result": "Webinars",
    "resultLabel": "Vendor support",
    "art": "art-event",
    "label": "Avast Webinars",
    "gallery": [
      "Event overview",
      "Promotion",
      "Registration / guest list",
      "Event-day support",
      "Digital assets",
      "Post-event follow-up"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "gerab-internal-events",
    "title": "Gerab — Internal Events & Conferences",
    "service": "EVENT MANAGEMENT",
    "industry": "B2B / Technology",
    "platform": "Event / Internal",
    "year": "2026",
    "role": "Event Support",
    "description": "Support across internal conferences, meetings and company events.",
    "objective": "Help deliver organized event experiences through reliable digital and operational support.",
    "execution": "Guest-list coordination, registrations, digital support, campaigns, on-event assistance and post-event follow-up.",
    "result": "Event Ops",
    "resultLabel": "End-to-end support",
    "art": "art-event",
    "label": "Internal Events",
    "gallery": [
      "Event overview",
      "Promotion",
      "Registration / guest list",
      "Event-day support",
      "Digital assets",
      "Post-event follow-up"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "simal-b2b",
    "title": "Simal Technologies — Channel Marketing",
    "service": "B2B / CHANNEL MARKETING",
    "industry": "B2B / Technology",
    "platform": "Multi-channel",
    "year": "2025",
    "role": "B2B · Channel Marketing",
    "description": "B2B and channel marketing across IT distribution, vendors, resellers and technology products.",
    "objective": "Support vendor-to-channel communication and demand generation within an IT distribution environment.",
    "execution": "Vendor campaigns, reseller-facing content, product marketing, paid media, email, social and marketplace support.",
    "result": "Channel",
    "resultLabel": "IT distribution marketing",
    "art": "art-b2b",
    "label": "B2B / Channel",
    "gallery": [
      "Campaign overview",
      "Vendor / partner",
      "Audience",
      "Content / creative",
      "Lead generation",
      "Channel execution"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "amp-b2b",
    "title": "Ampconnect — Channel & Partner Marketing",
    "service": "B2B / CHANNEL MARKETING",
    "industry": "B2B / Technology",
    "platform": "Multi-channel",
    "year": "2026",
    "role": "B2B · Partner Marketing",
    "description": "Partner and vendor marketing for a value-added IT distributor.",
    "objective": "Turn vendor capabilities into clear partner-facing narratives and demand-generation content.",
    "execution": "Vendor campaigns, partner communications, LinkedIn marketing, solution messaging, lead-generation support and content.",
    "result": "Partner",
    "resultLabel": "Channel marketing",
    "art": "art-b2b",
    "label": "B2B / Channel",
    "gallery": [
      "Campaign overview",
      "Vendor / partner",
      "Audience",
      "Content / creative",
      "Lead generation",
      "Channel execution"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "b2b-demand",
    "title": "B2B Demand Generation System",
    "service": "B2B / CHANNEL MARKETING",
    "industry": "B2B / Technology",
    "platform": "Multi-channel",
    "year": "2025–2026",
    "role": "Strategy · Execution",
    "description": "Cross-channel B2B marketing spanning content, paid media, SEO, email and partner communications.",
    "objective": "Create a connected path from vendor/product awareness to qualified business interest.",
    "execution": "Audience definition, campaign planning, content, paid acquisition, SEO, landing pages, email and measurement.",
    "result": "360°",
    "resultLabel": "B2B marketing system",
    "art": "art-b2b",
    "label": "B2B / Strategy",
    "gallery": [
      "Campaign overview",
      "Vendor / partner",
      "Audience",
      "Content / creative",
      "Lead generation",
      "Channel execution"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "simal-design-creatives",
    "title": "Simal Technologies",
    "service": "DESIGN & CREATIVES",
    "industry": "B2B / Technology",
    "platform": "Social · Paid · Brand",
    "year": "2025",
    "role": "Creative · Marketing",
    "description": "A visual archive of social media, LinkedIn, advertising and campaign creative work developed for Simal Technologies.",
    "objective": "Build a consistent visual system for technology products, campaigns and B2B communications across digital channels.",
    "execution": "LinkedIn posts, paid-ad creatives, social media designs, product campaigns, promotional assets and marketing collateral.",
    "result": "Creative",
    "resultLabel": "Marketing design archive",
    "art": "art-social",
    "label": "Simal / Creative",
    "gallery": [
      "LinkedIn Posts",
      "Ads Creatives",
      "Social Designs",
      "Product Campaigns",
      "Promotional Creatives",
      "Marketing Assets"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "gerab-design-creatives",
    "title": "Gerab System Solutions",
    "service": "DESIGN & CREATIVES",
    "industry": "B2B / Technology",
    "platform": "Social · Paid · Brand",
    "year": "2026",
    "role": "Creative · Marketing",
    "description": "Creative marketing work supporting Gerab's technology solutions, campaigns, partner communications and digital presence.",
    "objective": "Translate complex IT solutions into clear, professional and conversion-oriented visual communication.",
    "execution": "LinkedIn content, advertising creatives, social designs, solution-led campaign assets, partner creatives and promotional graphics.",
    "result": "Creative",
    "resultLabel": "B2B design archive",
    "art": "art-b2b",
    "label": "Gerab / Creative",
    "gallery": [
      "LinkedIn Posts",
      "Ads Creatives",
      "Social Designs",
      "Solution Campaigns",
      "Partner Creatives",
      "Marketing Assets"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
    ]
  },
  {
    "id": "ampconnect-design-creatives",
    "title": "Ampconnect",
    "service": "DESIGN & CREATIVES",
    "industry": "B2B / Technology",
    "platform": "LinkedIn · Social · Campaigns",
    "year": "2026",
    "role": "Creative · Marketing",
    "description": "A creative archive covering Ampconnect's technology-distribution content, partner campaigns and social media communication.",
    "objective": "Create a consistent visual language for technology, vendor and value-added distribution messaging.",
    "execution": "LinkedIn posts, vendor creatives, campaign graphics, social designs, event assets and B2B marketing collateral.",
    "result": "Creative",
    "resultLabel": "Brand & campaign archive",
    "art": "art-linkedin",
    "label": "Ampconnect / Creative",
    "gallery": [
      "LinkedIn Posts",
      "Ads Creatives",
      "Social Designs",
      "Vendor Campaigns",
      "Event Creatives",
      "Marketing Assets"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85"
    ]
  }
];

  /* BASE PATH — the site is served from /PortfolioV2/, but every image extracted
     out of the original single-file portfolio is referenced here as
     "/assets/projects/<hash>.webp". Those strings are invisible to Astro's build,
     so without this they resolve to mxdadnan.github.io/assets/... and 404 in
     production while working perfectly in dev.
     Walked once, in place, at init. withBase() only rewrites "/assets/..." --
     the Unsplash and other remote thumbnails pass through untouched. */
  (function applyBasePath(nodes){
    nodes.forEach(function(node){
      if(Array.isArray(node)) return applyBasePath(node);
      if(!node || typeof node !== "object") return;
      Object.keys(node).forEach(function(key){
        const v = node[key];
        if(typeof v === "string") node[key] = withBase(v);
        else if(v && typeof v === "object") applyBasePath([v]);
      });
    });
  })(projects);

  const state = {
    service:"ALL",
    subService:"ALL",
    activeProject:null,
    page:1,
    pageSize:6,
    visibleLimit:6
  };

  let lastProjectTrigger = null;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  
  const serviceOrder = ["SEO","PAID ADS","SOCIAL MEDIA","WEB DEVELOPMENT","EVENT MANAGEMENT","B2B / CHANNEL MARKETING","DESIGN & CREATIVES"];

  const pretty = v => v === "ALL" ? "All" : v.replace(/ /g," ").replace(/\b\w/g,c=>c.toUpperCase());

  function filteredProjects(){
    return projects.filter(p =>
      (state.service==="ALL" || p.service===state.service) &&
      (state.subService==="ALL" || p.subService===state.subService)
    );
  }

  function escapeHtml(value){
    return String(value ?? "").replace(/[&<>'"]/g, ch => ({
      "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"
    }[ch]));
  }

  function artMarkup(project){
    const artClass = project.art || "art-seo";
    return `
      <div class="project-art ${escapeHtml(artClass)}">
        <span class="art-label">${escapeHtml(project.label || project.service || "Project")}</span>
        <div class="project-art__window" aria-hidden="true">
          <div class="window-bar"><i></i><i></i><i></i></div>
          <div class="window-line"></div>
          <div class="window-line short"></div>
          <div class="window-block"></div>
        </div>
      </div>`;
  }

  function isPlaceholder(src){
    return typeof src === "string" && src.indexOf("unsplash.com") !== -1;
  }

  /* Accepts both gallery formats:
     - rich:   [{src, label, caption, metrics:[{value,label}]}, ...]
     - legacy: gallery:["Label", ...] paired with galleryImages:[url, ...]
     Gallery length drives the strip — no empty slots, no padding. */
  function normalizeGallery(project){
    const raw = Array.isArray(project.gallery) ? project.gallery : [];
    if(raw.length && typeof raw[0] === "object"){
      return raw.map(shot => ({
        src: shot.src || "",
        label: shot.label || "Evidence",
        caption: shot.caption || "",
        metrics: Array.isArray(shot.metrics) ? shot.metrics : []
      }));
    }
    const images = Array.isArray(project.galleryImages) ? project.galleryImages : [];
    return raw.map((label, i) => ({
      src: images[i] || "",
      label: label,
      caption: "",
      metrics: []
    }));
  }

  function renderProjects(){
    const grid = $("#projectsGrid");
    const count = $("#projectCount");
    const sidebarCount = $("#sidebarCount");
    const pagination = $("#archivePagination");
    const loadMore = $("#loadMore");
    const empty = $("#emptyState");

    if(!grid) return;

    /* FLIP — capture the current card layout before the grid is torn down.
       Skipped under reduced motion, and skipped on the very first render when
       there is nothing on screen to animate from. */
    const flipReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const priorCards  = grid.querySelectorAll(".project-card");
    const priorIds    = new Set(Array.prototype.map.call(priorCards, c => c.dataset.flipId));
    const flipState   = (!flipReduced && typeof Flip !== "undefined" && priorCards.length)
      ? Flip.getState(priorCards)
      : null;

    const list = filteredProjects();
    const total = list.length;
    const visible = list.slice(0, Math.min(state.visibleLimit, total));

    grid.innerHTML = "";
    grid.setAttribute("aria-busy", "true");

    if(sidebarCount){
      sidebarCount.textContent = `${total} project${total === 1 ? "" : "s"}`;
    }

    if(count){
      count.innerHTML = total
        ? `Showing <strong>${visible.length}</strong> of <strong>${total}</strong> projects`
        : `Showing <strong>0</strong> projects`;
    }

    if(empty){
      empty.classList.toggle("is-visible", total === 0);
    }

    visible.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.flipId = project.id;      // lets Flip match this card across the rebuild
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Open project: ${project.title}`);

      const hasImage = !!(project.thumbnail);
      const visual = document.createElement("div");
      visual.className = `project-visual${hasImage ? " has-real-image" : ""}`;
      visual.innerHTML = hasImage
        ? `${artMarkup(project)}<img class="project-evidence-image" src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} project preview" loading="lazy" decoding="async">`
        : artMarkup(project);

      const image = visual.querySelector(".project-evidence-image");
      if(image){
        image.addEventListener("error", () => {
          image.remove();
          visual.classList.remove("has-real-image");
        }, {once:true});
      }

      const hover = document.createElement("div");
      hover.className = "project-hover-report";
      hover.innerHTML = `<strong>${escapeHtml(project.result || "Project")}</strong><span>${escapeHtml(project.resultLabel || project.service || "Work")}</span>`;
      visual.appendChild(hover);

      const body = document.createElement("div");
      body.className = "project-body";
      body.innerHTML = `
        <div class="project-meta">
          <span>${escapeHtml(pretty(project.service))}</span>
          <span>${escapeHtml(project.year || "")}</span>
        </div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <div class="project-foot">
          <div class="project-result">
            <b>${escapeHtml(project.result || "—")}</b>
            <span>${escapeHtml(project.resultLabel || "Project outcome")}</span>
          </div>
          <button class="open-project" type="button" aria-label="Open ${escapeHtml(project.title)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9"/>
            </svg>
          </button>
        </div>`;

      card.appendChild(visual);
      card.appendChild(body);

      const open = () => openProject(project);
      card.addEventListener("click", e => {
        if(e.target.closest("button")) return;
        open();
      });
      card.addEventListener("keydown", e => {
        if((e.key === "Enter" || e.key === " ") && !e.target.closest("button")){
          e.preventDefault();
          open();
        }
      });
      body.querySelector(".open-project").addEventListener("click", e => {
        e.stopPropagation();
        open();
      });

      grid.appendChild(card);
    });

    grid.setAttribute("aria-busy", "false");

    /* FLIP — play the layout change.
       Flip is given ONLY the surviving cards as targets. Letting it also own the
       brand-new cards is unreliable: when a filter replaces the entire result set
       there is nothing in the captured state to pair them with, and they were
       left stranded at opacity:0 with the absolute:true positioning still applied.
       Splitting the two cases makes each one deterministic:
         survivors  -> Flip glides them from their old box to the new one
         new cards  -> a plain staggered fade-up, fully under our control
       absolute:true stays on, because the grid reflows underneath the tween and
       without it the surviving cards snap to their final slot before animating. */
    if(flipState && !flipReduced){
      const nowCards  = Array.prototype.slice.call(grid.querySelectorAll(".project-card"));
      const survivors = nowCards.filter(c => priorIds.has(c.dataset.flipId));
      const fresh     = nowCards.filter(c => !priorIds.has(c.dataset.flipId));

      if(survivors.length){
        /* The rebuilt nodes inherit the CSS base state (opacity:0, translated).
           Survivors were already on screen, so they start visible and Flip only
           animates position. */
        gsap.set(survivors, { opacity:1, y:0, scale:1, clearProps:"animation" });
        Flip.from(flipState, {
          duration: .5,
          ease: "power2.inOut",
          absolute: true,
          targets: survivors
        });
      }

      if(fresh.length){
        fresh.forEach(c => { c.style.animation = "none"; });
        gsap.fromTo(fresh,
          { opacity:0, y:22, scale:.985 },
          { opacity:1, y:0, scale:1, duration:.45, stagger:.05,
            ease:"easeSoft", overwrite:"auto", clearProps:"position" });
      }
    }else{
      /* First paint (or reduced motion): no previous layout to flip from, so the
         cards use the scroll-triggered staggered fade-up instead. */
      staggerProjectCards();
    }

    if(pagination){
      pagination.innerHTML = "";
      const pageCount = Math.ceil(total / state.pageSize);
      const currentPage = Math.min(Math.ceil(Math.max(state.visibleLimit, 1) / state.pageSize), Math.max(pageCount, 1));

      if(pageCount > 1){
        for(let page = 1; page <= pageCount; page++){
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "page-btn" + (page === currentPage ? " is-active" : "");
          btn.textContent = page;
          btn.setAttribute("aria-label", `Show page ${page}`);
          btn.setAttribute("aria-current", page === currentPage ? "page" : "false");
          btn.addEventListener("click", () => {
            state.page = page;
            state.visibleLimit = Math.min(page * state.pageSize, total);
            renderProjects();
            grid.scrollIntoView({behavior:"smooth", block:"start"});
          });
          pagination.appendChild(btn);
        }
      }
    }

    if(loadMore){
      loadMore.hidden = total === 0 || visible.length >= total;
      loadMore.disabled = visible.length >= total;
    }
  }

  function renderServiceFilters(){
    const container=$("#serviceFilters");
    if(!container) return;
    container.innerHTML="";

    const services=[
      "ALL",
      "SEO",
      "PAID ADS",
      "SOCIAL MEDIA",
      "WEB DEVELOPMENT",
      "EVENT MANAGEMENT",
      "B2B / CHANNEL MARKETING",
      "DESIGN & CREATIVES"
    ];

    services.forEach(value=>{
      const item=document.createElement("div");
      item.className="service-filter-item";

      const btn=document.createElement("button");
      btn.type="button";
      btn.className="filter-btn filter-option"+(state.service===value?" is-active":"");
      btn.setAttribute("aria-pressed",state.service===value?"true":"false");
      btn.textContent=pretty(value);

      btn.addEventListener("click",()=>{
        state.service=value;
        state.subService="ALL";
        state.page=1;
        state.visibleLimit=state.pageSize;
        renderAll();
      });

      item.appendChild(btn);

      let subValues=[];
      if(value==="PAID ADS"){
        subValues=["META ADS","GOOGLE ADS","LINKEDIN ADS"];
      }else if(value==="SOCIAL MEDIA"){
        subValues=["LINKEDIN MARKETING","META"];
      }

      // Only the currently selected parent gets its children directly below it.
      if(state.service===value && subValues.length){
        const subWrap=document.createElement("div");
        subWrap.className="service-subfilters";

        subValues.forEach(subValue=>{
          const subBtn=document.createElement("button");
          subBtn.type="button";
          subBtn.className="subfilter"+(state.subService===subValue?" is-active":"");
          subBtn.setAttribute("aria-pressed",state.subService===subValue?"true":"false");
          subBtn.textContent=pretty(subValue);

          subBtn.addEventListener("click",e=>{
            e.stopPropagation();
            state.service=value;
            state.subService=subValue;
            state.page=1;
            state.visibleLimit=state.pageSize;
            renderAll();
          });

          subWrap.appendChild(subBtn);
        });

        item.appendChild(subWrap);
      }

      container.appendChild(item);
    });
  }


  function renderSubFilters(){
    const container = $("#mobileServiceFilters");
    if(!container) return;
    container.innerHTML = "";

    const services = [
      "ALL",
      "SEO",
      "PAID ADS",
      "SOCIAL MEDIA",
      "WEB DEVELOPMENT",
      "EVENT MANAGEMENT",
      "B2B / CHANNEL MARKETING",
      "DESIGN & CREATIVES"
    ];

    services.forEach(value => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn filter-option" + (state.service === value ? " is-active" : "");
      btn.setAttribute("aria-pressed", state.service === value ? "true" : "false");
      btn.textContent = pretty(value);
      btn.addEventListener("click", () => {
        state.service = value;
        state.subService = "ALL";
        state.page = 1;
        state.visibleLimit = state.pageSize;
        renderAll();
      });
      container.appendChild(btn);

      let subValues = [];
      if(value === "PAID ADS") subValues = ["META ADS","GOOGLE ADS","LINKEDIN ADS"];
      if(value === "SOCIAL MEDIA") subValues = ["LINKEDIN MARKETING","META"];

      if(state.service === value && subValues.length){
        const subWrap = document.createElement("div");
        subWrap.className = "service-subfilters";
        subValues.forEach(subValue => {
          const subBtn = document.createElement("button");
          subBtn.type = "button";
          subBtn.className = "subfilter" + (state.subService === subValue ? " is-active" : "");
          subBtn.textContent = pretty(subValue);
          subBtn.setAttribute("aria-pressed", state.subService === subValue ? "true" : "false");
          subBtn.addEventListener("click", () => {
            state.service = value;
            state.subService = subValue;
            state.page = 1;
            state.visibleLimit = state.pageSize;
            renderAll();
            closeSheet();
          });
          subWrap.appendChild(subBtn);
        });
        container.appendChild(subWrap);
      }
    });
  }


  function resetFilters(){
    state.service="ALL";
    state.subService="ALL";
    state.page=1;
    state.visibleLimit=state.pageSize;
    renderAll();
  }

  const clearFiltersBtn=$("#clearFilters");
  if(clearFiltersBtn) clearFiltersBtn.addEventListener("click",resetFilters);

  const emptyReset=$("#emptyReset");
  if(emptyReset) emptyReset.addEventListener("click",resetFilters);

  const mobileReset=$("#mobileReset");
  if(mobileReset) mobileReset.addEventListener("click",resetFilters);

  const loadMoreBtn=$("#loadMore");
  if(loadMoreBtn) loadMoreBtn.addEventListener("click",()=>{
    const list=filteredProjects();
    const nextLimit=Math.min(
      state.visibleLimit + state.pageSize,
      list.length
    );

    if(nextLimit > state.visibleLimit){
      state.visibleLimit=nextLimit;
      state.page=Math.ceil(state.visibleLimit/state.pageSize);
      renderProjects();
    }
  });

  const mobileOpen=$("#mobileFilterOpen");
  if(mobileOpen) mobileOpen.addEventListener("click",openSheet);
  const mobileClose=$("#sheetClose");
  if(mobileClose) mobileClose.addEventListener("click",closeSheet);
  const sheetScrim=$("#sheetScrim");
  if(sheetScrim) sheetScrim.addEventListener("click",closeSheet);

  function renderAll(){
    renderServiceFilters();
    renderSubFilters();
    renderProjects();
  }

  function openProject(project){
    lastProjectTrigger = document.activeElement;
    state.activeProject=project;
    $("#overlayIndex").textContent=`Project ${String(projects.indexOf(project)+1).padStart(2,"0")}`;
    $("#overlayCategory").textContent=pretty(project.service);
    $("#overlayTitle").textContent=project.title;
    $("#overlayDescription").textContent=project.description;
    $("#overlayIndustry").textContent=project.industry;
    $("#overlayPlatform").textContent=project.platform;
    $("#overlayYear").textContent=project.year;
    $("#overlayRole").textContent=project.role;
    $("#overlayObjective").textContent=project.objective;
    $("#overlayExecution").textContent=project.execution;
    const shots = normalizeGallery(project);
    const galleryStrip = $("#galleryStrip");

    const showShot = index => {
      const shot = shots[index];
      if(!shot) return;
      const main = $("#galleryMain");
      main.innerHTML = shot.src
        ? `<img class="gallery-evidence-image" src="${escapeHtml(shot.src)}" alt="${escapeHtml(project.title)} — ${escapeHtml(shot.label)}" decoding="async">`
        : artMarkup(project);
      main.classList.toggle("has-real-image", !!shot.src);

      /* A missing file must not render as a black void — fall back to the
         gradient art and say plainly that the asset path did not resolve. */
      const liveImg = main.querySelector(".gallery-evidence-image");
      if(liveImg){
        liveImg.addEventListener("error", () => {
          main.innerHTML = artMarkup(project);
          main.classList.remove("has-real-image");
          $("#galleryCaption").textContent =
            `Image not found: ${shot.src} — check that the assets folder sits beside this HTML file.`;
        }, {once:true});
      }

      $("#galleryCaption").textContent = shot.caption || shot.label;

      const metrics = $("#galleryMetrics");
      metrics.innerHTML = shot.metrics.map(m =>
        `<div class="gallery-metric"><b>${escapeHtml(m.value)}</b><span>${escapeHtml(m.label)}</span></div>`
      ).join("");
      metrics.hidden = shot.metrics.length === 0;

      $("#unsplashNote").hidden = !isPlaceholder(shot.src);
      $$(".gallery-thumb").forEach((x, i) => x.classList.toggle("is-active", i === index));
    };

    galleryStrip.innerHTML = "";
    galleryStrip.hidden = shots.length < 2;
    shots.forEach((shot, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "gallery-thumb";
      item.setAttribute("aria-label", shot.label);
      item.innerHTML = `<span>${String(index+1).padStart(2,"0")}</span><small>${escapeHtml(shot.label)}</small>`;
      item.addEventListener("click", () => showShot(index));
      galleryStrip.appendChild(item);
    });
    showShot(0);

    // Only real website projects and social-media projects get a live-project CTA.
    // SEO, Paid Ads, Event Management and B2B / Channel Marketing must not show it.
    const live=$("#overlayLive");
    const liveCtaServices = new Set(["WEB DEVELOPMENT", "SOCIAL MEDIA"]);
    if(project.live && liveCtaServices.has(project.service)){
      live.hidden=false;
      live.href=project.live;
    }else{
      live.hidden=true;
      live.removeAttribute("href");
    }

    $("#projectOverlay").classList.add("is-open");
    $("#projectOverlay").setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    $("#overlayClose").focus();
  }

  function closeProject(){
    const overlay=$("#projectOverlay");
    if(!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    state.activeProject=null;
    if(lastProjectTrigger && document.contains(lastProjectTrigger)){
      lastProjectTrigger.focus();
    }
    lastProjectTrigger=null;
  }

  // Wire the close controls after closeProject() exists.
  const overlayClose=$("#overlayClose");
  if(overlayClose) overlayClose.addEventListener("click", closeProject);

  // Clicking the dark area outside the project shell also closes the overlay.
  const projectOverlay=$("#projectOverlay");
  if(projectOverlay){
    projectOverlay.addEventListener("click", e=>{
      if(e.target === projectOverlay) closeProject();
    });
  }

  function openSheet(){
    const sheet=$("#mobileSheet");
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    $("#sheetClose").focus();
  }
  function closeSheet(){
    const sheet=$("#mobileSheet");
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }

  document.addEventListener("keydown",e=>{
    const overlay = $("#projectOverlay");
    if(e.key==="Tab" && overlay && overlay.classList.contains("is-open")){
      const focusables = [...overlay.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el => el.offsetParent !== null);
      if(focusables.length){
        const first = focusables[0];
        const last = focusables[focusables.length-1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
      return;
    }
    if(e.key==="Escape"){
      if($("#projectOverlay").classList.contains("is-open")) closeProject();
      else if($("#mobileSheet").classList.contains("is-open")) closeSheet();
    }
  });

  /* section reveal now handled by the shared IntersectionObserver (data-io) */


  // Initialize the archive after all project data and functions are defined.
  // This is intentionally inside the IIFE so renderAll() is in scope.
  renderAll();
}

