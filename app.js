(function () {
  const data = window.PUSH_DATA;
  const themes = {
    food: {
      label: "Food & Drink",
      category: "Cafe / Restaurant",
      fit: "Cafes, bakeries, and fast-casual merchants",
      palette: "Primary #8F5E46 · Accent #C59A73",
      distinct: "Warm clay and matte copper tones with understated product depth.",
    },
    fashion: {
      label: "Fashion",
      category: "Apparel / Accessories",
      fit: "Streetwear labels, sneaker shops, and concept stores",
      palette: "Primary #57565B · Accent #A6A2A0",
      distinct: "Editorial graphite neutrals with soft shadowed contrast.",
    },
    beauty: {
      label: "Beauty",
      category: "Skincare / Salon",
      fit: "Skincare studios, salons, and cosmetic brands",
      palette: "Primary #A97F87 · Accent #D9C0C4",
      distinct: "Powdered rose and satin mineral tones with soft studio realism.",
    },
    fitness: {
      label: "Fitness",
      category: "Gym / Wellness",
      fit: "Gyms, pilates studios, and supplement brands",
      palette: "Primary #66725C · Accent #A8B090",
      distinct: "Muted olive performance tones with dense industrial contrast.",
    },
    travel: {
      label: "Travel",
      category: "Hotel / Experience",
      fit: "Boutique hotels, tours, and destination brands",
      palette: "Primary #6D8597 · Accent #B5C4CF",
      distinct: "Cool slate-blue atmosphere with airy horizon depth.",
    },
    lifestyle: {
      label: "Lifestyle",
      category: "Home / Living",
      fit: "Home decor, furniture, and everyday lifestyle goods",
      palette: "Primary #8D7A68 · Accent #C9B9A5",
      distinct: "Stone, linen, and oak tones with calm domestic realism.",
    },
  };

  const params = new URLSearchParams(window.location.search);
  const requestedTheme = params.get("theme");
  const defaultTheme = "food";
  const initialTheme = document.body.dataset.theme || defaultTheme;
  const activeThemeCandidates = [requestedTheme, initialTheme, defaultTheme];
  const activeTheme =
    activeThemeCandidates.find((themeKey) => Object.prototype.hasOwnProperty.call(themes, themeKey)) || defaultTheme;

  const state = {
    page: "dashboard",
    modalType: null,
    modalRecord: null,
    switchToken: 0,
    theme: activeTheme,
    menuFxTimer: null,
  };

  const pageMeta = {
    dashboard: { title: "Invoices", sub: "Overview of expenses, bank accounts, sales, and pipeline" },
    campaigns: { title: "Campaigns", sub: "Outcome-driven campaigns with verified traffic metrics" },
    applicants: { title: "Applicants", sub: "3D talent pipeline with score-based evaluation" },
    analytics: { title: "Analytics", sub: "Number-first conversion intelligence and trends" },
    qr: { title: "QR Codes", sub: "Scan quality, verification confidence, and fraud signals" },
    locations: { title: "Locations", sub: "Geo performance map and neighborhood conversion impact" },
    disputes: { title: "Disputes", sub: "Audit timeline with risk, owner, and resolution detail" },
    messages: { title: "Messages", sub: "Creator and operations communication center" },
    payments: { title: "Payments", sub: "Payout flow, pending balances, and spend transparency" },
    billing: { title: "Billing", sub: "Plan, usage, invoicing, and account billing visibility" },
    integrations: { title: "Integrations", sub: "Connected systems health and sync status" },
    notifications: { title: "Notifications", sub: "Event signals and alerts prioritized by severity" },
    settings: { title: "Settings", sub: "Account profile, alert policy, and workspace preferences" },
  };

  const pageSceneMeta = {
    dashboard: {
      material: "Porcelain ledger surface",
      mood: "Soft balance view with glossy invoice depth",
      marker: "Balance scene",
      detail: "Layered invoice forms and measured spacing",
    },
    campaigns: {
      material: "Studio launch board",
      mood: "Sharper concept framing with polished launch contrast",
      marker: "Launch scene",
      detail: "Offset product planes and campaign board rhythm",
    },
    applicants: {
      material: "Cast-glass profile trays",
      mood: "Talent review with cooler ranking depth",
      marker: "Profile scene",
      detail: "Stacked identity chips with ranking tray motion",
    },
    analytics: {
      material: "Tuned metric optics",
      mood: "Precision view with reflective chart atmosphere",
      marker: "Data optics",
      detail: "Optical discs and graph-grid focus",
    },
    qr: {
      material: "Printed code slab",
      mood: "Grid-clean verification stage with matte scan realism",
      marker: "Scan stage",
      detail: "Squared modules and scan-field geometry",
    },
    locations: {
      material: "Architectural map board",
      mood: "Open spatial cues with grounded location depth",
      marker: "Spatial board",
      detail: "Map planes with anchored route spacing",
    },
    disputes: {
      material: "Smoked audit panel",
      mood: "Darker oversight tone with controlled tension",
      marker: "Audit layer",
      detail: "Dense slabs and restrained forensic contrast",
    },
    messages: {
      material: "Paper-light conversation sheet",
      mood: "Calmer communication space with soft motion",
      marker: "Thread sheet",
      detail: "Rounded note layers and softer signal halos",
    },
    payments: {
      material: "Brushed finance plate",
      mood: "Dense settlement stage with warmer metallic realism",
      marker: "Settlement block",
      detail: "Coin-like stack forms and warm brass reflections",
    },
    billing: {
      material: "Ivory invoice deck",
      mood: "Formal account framing with quiet document texture",
      marker: "Invoice deck",
      detail: "Paper stacks and ledger column pacing",
    },
    integrations: {
      material: "Modular system block",
      mood: "Connected object language with engineered rhythm",
      marker: "System array",
      detail: "Interlocking modules and socket-like spacing",
    },
    notifications: {
      material: "Signal marker field",
      mood: "Alert hierarchy with restrained spotlight emphasis",
      marker: "Signal field",
      detail: "Beacon points and quiet urgency gradients",
    },
    settings: {
      material: "Stone utility panel",
      mood: "Stable controls with low-noise premium finish",
      marker: "Utility panel",
      detail: "Stable panel cuts and reduced control noise",
    },
  };

  const el = {
    sidebarNav: document.getElementById("sidebarNav"),
    mobileNav: document.getElementById("mobileNav"),
    pageContainer: document.getElementById("pageContainer"),
    pageTitle: document.getElementById("pageTitle"),
    pageSubtitle: document.getElementById("pageSubtitle"),
    viewingIndicator: document.getElementById("viewingIndicator"),
    topFilters: document.getElementById("topFilters"),
    themeSwitcher: document.getElementById("themeSwitcher"),
    themeNote: document.getElementById("themeNote"),
    menuToggle: document.getElementById("menuToggle"),
    mobileDrawer: document.getElementById("mobileDrawer"),
    closeDrawer: document.getElementById("closeDrawer"),
    mobileBackdrop: document.getElementById("mobileBackdrop"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    modalKicker: document.getElementById("modalKicker"),
    modalTitle: document.getElementById("modalTitle"),
    modalBody: document.getElementById("modalBody"),
    modalClose: document.getElementById("modalClose"),
    modalDismiss: document.getElementById("modalDismiss"),
    openFullDetail: document.getElementById("openFullDetail"),
    accountBtn: document.getElementById("accountBtn"),
    settingBtn: document.getElementById("settingBtn"),
  };

  function fmtNum(v) {
    return new Intl.NumberFormat("en-US").format(v);
  }

  function fmtUsd(v) {
    return `$${new Intl.NumberFormat("en-US").format(v)}`;
  }

  function renderThemeSwitcher() {
    if (!el.themeSwitcher) return;

    el.themeSwitcher.innerHTML = Object.entries(themes)
      .map(([key, value]) => {
        const active = state.theme === key ? "is-active" : "";
        return `
          <button class="theme-link ${active}" type="button" data-theme="${key}">
            <span class="theme-dot"></span>
            <span>${value.label}</span>
          </button>
        `;
      })
      .join("");

    if (el.themeNote) {
      const themeData = themes[state.theme];
      el.themeNote.textContent = `${themeData.category} · ${themeData.palette}`;
    }
  }

  function setTheme(themeKey) {
    if (!Object.prototype.hasOwnProperty.call(themes, themeKey)) return;
    state.theme = themeKey;
    document.body.dataset.theme = themeKey;
    renderThemeSwitcher();
    renderNav();
    renderPage(state.page);

    const url = new URL(window.location.href);
    url.searchParams.set("theme", themeKey);
    window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
  }

  function renderTopFilters() {
    if (!el.topFilters) return;
    const quickPages = ["dashboard", "campaigns", "analytics", "payments", "settings"];
    el.topFilters.innerHTML = quickPages
      .map((id) => {
        const page = data.nav.find((item) => item.id === id);
        if (!page) return "";
        const active = state.page === id ? "is-active" : "";
        return `<button class="top-filter ${active}" type="button" data-page="${id}">${page.label}</button>`;
      })
      .join("");
  }

  function summaryCardsHTML(page) {
    const unreadCount = data.messages.reduce((sum, thread) => sum + thread.unread, 0);
    const pageSummary = {
      dashboard: { label: "Business Spending", value: fmtUsd(data.payments.next_payout), hint: "Current cycle" },
      campaigns: { label: "Active Campaigns", value: data.kpi.active_campaigns, hint: "Live right now" },
      applicants: { label: "Applicants Today", value: data.kpi.applicants_today, hint: "Pending review" },
      analytics: { label: "QR Scans", value: fmtNum(data.analytics.qr_scans), hint: "Last 30 days" },
      qr: { label: "Scans Today", value: fmtNum(data.kpi.qr_scans_today), hint: "Attribution input" },
      locations: { label: "Locations", value: data.locations.length, hint: "Active branches" },
      disputes: { label: "Open Disputes", value: data.kpi.open_disputes, hint: "Needs resolution" },
      messages: { label: "Unread Messages", value: unreadCount, hint: "Action required" },
      payments: { label: "Next Payout", value: fmtUsd(data.payments.next_payout), hint: "This cycle" },
      billing: { label: "Monthly Plan", value: fmtUsd(data.billing.monthly_fee), hint: data.billing.plan },
      integrations: { label: "Connected Tools", value: data.integrations.length, hint: "Sync health" },
      notifications: { label: "Alerts", value: data.notifications.length, hint: "Current feed" },
      settings: { label: "Workspace", value: data.settings.profile_name, hint: data.settings.timezone },
    }[page];

    const sharedCards = [
      pageSummary,
      { label: "Verified Visits", value: fmtNum(data.kpi.verified_visits_today), hint: "Today" },
      { label: "Attributed Revenue", value: fmtUsd(data.kpi.attributed_revenue_today), hint: "Today" },
      { label: "Open Issues", value: data.kpi.open_disputes, hint: "Risk queue" },
    ];

    return sharedCards
      .map(
        (card) => `
          <article class="summary-card">
            <p>${card.label}</p>
            <h3>${card.value}</h3>
            <span>${card.hint}</span>
          </article>
        `,
      )
      .join("");
  }

  function quickChipsHTML(page) {
    const navIndex = data.nav.findIndex((item) => item.id === page);
    const fallback = ["dashboard", "analytics", "messages", "settings"];
    const dynamic = [data.nav[navIndex - 1]?.id, data.nav[navIndex + 1]?.id, ...fallback].filter(Boolean);
    const unique = [...new Set(dynamic)].slice(0, 4);
    return unique
      .map((id) => {
        const item = data.nav.find((entry) => entry.id === id);
        if (!item) return "";
        return `<button type="button" class="quick-chip" data-page="${id}">${item.label}</button>`;
      })
      .join("");
  }

  function getNavMetric(id) {
    const m = data.kpi;
    const map = {
      dashboard: "↗",
      campaigns: m.active_campaigns,
      applicants: m.applicants_today,
      analytics: m.verified_visits_today,
      qr: m.qr_scans_today,
      locations: data.locations.length,
      disputes: m.open_disputes,
      messages: data.messages.reduce((sum, t) => sum + t.unread, 0),
      payments: fmtUsd(data.payments.next_payout),
      billing: data.billing.plan,
      integrations: data.integrations.length,
      notifications: data.notifications.length,
      settings: "•",
    };
    return map[id] || "";
  }

  function groupedNav() {
    return data.nav.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    }, {});
  }

  function navHTML(mode) {
    const groups = groupedNav();
    return Object.keys(groups)
      .map((section) => {
        const items = groups[section]
          .map((item) => {
            const active = state.page === item.id ? "active" : "";
            return `
              <button class="nav-item ${active}" data-page="${item.id}" ${mode === "mobile" ? 'data-mobile-nav="1"' : ""}>
                <span class="nav-label">
                  <span class="nav-icon nav-emoji" aria-hidden="true">${item.emoji || "•"}</span>
                  <span>${item.label}</span>
                </span>
                <span class="nav-metric">${getNavMetric(item.id)}</span>
              </button>
            `;
          })
          .join("");
        return `
          <section class="nav-section">
            <p class="nav-section-title">${section}</p>
            ${items}
          </section>
        `;
      })
      .join("");
  }

  function navIcon(id) {
    const stroke = "currentColor";
    const common = `fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = {
      dashboard: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" ${common}></rect><rect x="14" y="4" width="6" height="6" ${common}></rect><rect x="4" y="14" width="6" height="6" ${common}></rect><rect x="14" y="14" width="6" height="6" ${common}></rect></svg>`,
      campaigns: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2.5" ${common}></rect><path d="M4 11h16" ${common}></path></svg>`,
      applicants: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" ${common}></circle><path d="M3.5 18c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4" ${common}></path><path d="M17 9h4M19 7v4" ${common}></path></svg>`,
      analytics: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16" ${common}></path><path d="M6 15l4-4 3 2 5-6" ${common}></path></svg>`,
      qr: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" ${common}></rect><rect x="14" y="4" width="6" height="6" ${common}></rect><rect x="4" y="14" width="6" height="6" ${common}></rect><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" fill="${stroke}"></path></svg>`,
      locations: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10z" ${common}></path><circle cx="12" cy="10" r="2.3" ${common}></circle></svg>`,
      disputes: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3.4 8-7 10-3.6-2-7-5-7-10V6l7-3z" ${common}></path><path d="M9.5 12.5l1.7 1.7 3.3-3.3" ${common}></path></svg>`,
      messages: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2.5" ${common}></rect><path d="M5 8l7 5 7-5" ${common}></path></svg>`,
      payments: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2.5" ${common}></rect><path d="M4 10h16" ${common}></path></svg>`,
      billing: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8v18l-2-1.4L12 21l-2-1.4L8 21z" ${common}></path><path d="M10 8h4M10 12h4" ${common}></path></svg>`,
      integrations: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="12" r="2.2" ${common}></circle><circle cx="17" cy="7" r="2.2" ${common}></circle><circle cx="17" cy="17" r="2.2" ${common}></circle><path d="M9.2 11l5.6-2.8M9.2 13l5.6 2.8" ${common}></path></svg>`,
      notifications: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 20z" ${common}></path><path d="M18 15V11a6 6 0 1 0-12 0v4l-2 2h16z" ${common}></path></svg>`,
      settings: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 1 0 12 8.4z" ${common}></path><path d="M4 13.3v-2.6l2.2-.7c.2-.5.4-.9.7-1.3L6.4 6.4l1.8-1.8 2.3.5c.4-.3.8-.5 1.3-.7l.7-2.2h2.6l.7 2.2c.5.2.9.4 1.3.7l2.3-.5 1.8 1.8-.5 2.3c.3.4.5.8.7 1.3l2.2.7v2.6l-2.2.7c-.2.5-.4.9-.7 1.3l.5 2.3-1.8 1.8-2.3-.5c-.4.3-.8.5-1.3.7l-.7 2.2h-2.6l-.7-2.2c-.5-.2-.9-.4-1.3-.7l-2.3.5-1.8-1.8.5-2.3c-.3-.4-.5-.8-.7-1.3z" ${common}></path></svg>`,
    };
    return icons[id] || icons.dashboard;
  }

  function setTopbar(page) {
    const m = pageMeta[page];
    document.body.setAttribute("data-page", page);
    el.pageTitle.textContent = m.title;
    el.pageSubtitle.textContent = m.sub;
    const current = data.nav.find((item) => item.id === page);
    if (el.viewingIndicator) {
      const topicIcon = current?.emoji || "•";
      const topicLabel = current?.label || m.title;
      el.viewingIndicator.textContent = `กำลังดูข้อมูล: ${topicIcon} ${topicLabel}`;
    }
  }

  function triggerTopicLinkEffect() {
    document.body.classList.remove("topic-linking");
    if (state.menuFxTimer) window.clearTimeout(state.menuFxTimer);
    requestAnimationFrame(() => {
      document.body.classList.add("topic-linking");
    });
    state.menuFxTimer = window.setTimeout(() => {
      document.body.classList.remove("topic-linking");
    }, 460);
  }

  function cardMoreButton(type, id) {
    return `<button class="more-btn" data-type="${type}" data-id="${id}">View details</button>`;
  }

  function dashboardPage() {
    const k = data.kpi;
    const rows = data.campaigns
      .map(
        (c) => `
        <tr>
          <td>${c.title}</td>
          <td><span class="stat-pill ${c.status === "Live" ? "pill-live" : "pill-draft"}">${c.status}</span></td>
          <td>${fmtNum(c.verified_visits)} / ${fmtNum(c.goal_visits)}</td>
          <td>${fmtUsd(c.spent)}</td>
          <td>${cardMoreButton("campaign", c.id)}</td>
        </tr>
      `,
      )
      .join("");

    const topCreatorBlocks = data.analytics.creators
      .map((c) => {
        const ratio = Math.min(100, Math.round((c.visits / 80) * 100));
        return `
          <article class="metric-item">
            <div class="metric-row">
              <h4>${c.name}</h4>
              <strong>${fmtUsd(c.revenue)}</strong>
            </div>
            <div class="bar"><span style="width:${ratio}%"></span></div>
            <p class="panel-sub">${fmtNum(c.visits)} verified visits · 7 days</p>
            <div class="card-actions">${cardMoreButton("creator_performance", c.name)}</div>
          </article>
        `;
      })
      .join("");

    return `
      <section class="kpi-grid">
        ${kpiCard("Verified Visits Today", fmtNum(k.verified_visits_today), "+11.8% vs yesterday")}
        ${kpiCard("Attributed Revenue", fmtUsd(k.attributed_revenue_today), "Live from verified redemptions")}
        ${kpiCard("QR Scans Today", fmtNum(k.qr_scans_today), "Scan -> visit quality 23.6%")}
        ${kpiCard("30D ROI", `${k.avg_roi_30d}x`, "Modeled with repeat-customer uplift")}
      </section>
      <section class="two-col">
        <article class="panel" style="padding:16px;">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Campaign Pulse</h2>
              <p class="panel-sub">Performance by live budget and verified traffic</p>
            </div>
            ${cardMoreButton("campaign_overview", "all")}
          </div>
          <table class="table-lite">
            <thead>
              <tr><th>Campaign</th><th>Status</th><th>Visits</th><th>Spend</th><th>Action</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </article>
        <article class="panel" style="padding:16px;">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Top Creator Impact</h2>
              <p class="panel-sub">Numbers first, text second</p>
            </div>
          </div>
          <div class="metric-stack">${topCreatorBlocks}</div>
        </article>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function campaignsPage() {
    const cards = data.campaigns
      .map((c) => {
        const progress = c.goal_visits ? Math.round((c.verified_visits / c.goal_visits) * 100) : 0;
        return `
          <article class="panel" style="padding:16px;">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${c.title}</h2>
                <p class="panel-sub">${c.start} → ${c.end} · Top creator: ${c.top_creator}</p>
              </div>
              <span class="stat-pill ${c.status === "Live" ? "pill-live" : "pill-draft"}">${c.status}</span>
            </div>
            <section class="finance-grid">
              ${miniMetric("Budget", fmtUsd(c.budget))}
              ${miniMetric("Spent", fmtUsd(c.spent))}
              ${miniMetric("Verified", fmtNum(c.verified_visits))}
              ${miniMetric("Conv. Rate", `${c.conversion_rate}%`)}
            </section>
            <div class="metric-item" style="margin-top:12px;">
              <div class="metric-row"><h4>Goal Completion</h4><strong>${progress}%</strong></div>
              <div class="bar"><span style="width:${progress}%"></span></div>
            </div>
            <div class="card-actions">${cardMoreButton("campaign", c.id)}</div>
          </article>
        `;
      })
      .join("");
    return `<section style="display:grid;gap:12px;">${cards}</section><div id="detailSlot"></div>`;
  }

  function applicantsPage() {
    const cards = data.applicants
      .map((a) => {
        const toneClass = `tone-${a.tone}`;
        return `
          <article class="applicant-card ${toneClass}">
            <div class="app-head">
              <div class="avatar-3d">${a.avatar}</div>
              <div>
                <h3>${a.name}</h3>
                <p>${a.role}</p>
                <p>${a.location} · ${a.tier}</p>
              </div>
            </div>
            <span class="badge">${a.badge}</span>
            <section class="app-metrics">
              ${miniData("Score", a.match_score)}
              ${miniData("Followers", fmtNum(a.followers))}
              ${miniData("Completion", `${a.completion}%`)}
              ${miniData("7D Visits", a.est_visits_7d)}
              ${miniData("7D Revenue", fmtUsd(a.est_revenue_7d))}
              ${miniData("Style", "3D UGC")}
            </section>
            <div class="card-actions">${cardMoreButton("applicant", a.id)}</div>
          </article>
        `;
      })
      .join("");

    return `
      <section class="panel" style="padding:16px; margin-bottom:12px;">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">3D Applicant Board</h2>
            <p class="panel-sub">High-image, high-number layout for trust and speed</p>
          </div>
          ${cardMoreButton("applicant_pool", "all")}
        </div>
        <div class="applicant-grid">${cards}</div>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function analyticsPage() {
    const max = Math.max(...data.analytics.by_hour);
    const avgHourly = Math.round(data.analytics.by_hour.reduce((sum, value) => sum + value, 0) / data.analytics.by_hour.length);
    const peakHourly = Math.max(...data.analytics.by_hour);
    const bars = data.analytics.by_hour
      .map((v, idx) => {
        const h = Math.round((v / max) * 100);
        return `
          <div class="line-bar-wrap">
            <span class="line-bar-label">${String(idx + 8).padStart(2, "0")}</span>
            <div class="line-bar" style="height:${Math.max(8, h)}%"></div>
          </div>
        `;
      })
      .join("");

    const funnelMax = data.analytics.funnel[0].value;
    const funnelRows = data.analytics.funnel
      .map((f) => {
        const pct = Math.max(4, Math.round((f.value / funnelMax) * 100));
        return `
          <article class="funnel-row">
            <div class="head"><span>${f.label}</span><strong>${fmtNum(f.value)}</strong></div>
            <div class="bar"><span style="width:${pct}%"></span></div>
            <div class="card-actions" style="margin-top:8px;">${cardMoreButton("analytics_step", f.label)}</div>
          </article>
        `;
      })
      .join("");

    const creatorRows = data.analytics.creators
      .map(
        (c) => `
        <tr>
          <td>${c.name}</td>
          <td>${fmtNum(c.visits)}</td>
          <td>${fmtUsd(c.revenue)}</td>
          <td>${cardMoreButton("creator_performance", c.name)}</td>
        </tr>
      `,
      )
      .join("");

    const labStats = [
      { label: "Peak hour", value: `${peakHourly}`, note: "Highest hourly interaction point" },
      { label: "Average / hour", value: `${avgHourly}`, note: "Smoothed traffic read" },
      { label: "Repeat customers", value: fmtNum(data.analytics.repeat_customers), note: "Retention-linked visits" },
    ]
      .map(
        (item) => `
          <article class="lab-stat-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
            <p>${item.note}</p>
          </article>
        `,
      )
      .join("");

    return `
      <section class="analytics-lab-layout">
      <section class="kpi-grid analytics-kpi-grid">
        ${kpiCard("Impressions (7d)", fmtNum(data.analytics.impressions), "Top funnel reach")}
        ${kpiCard("QR Scans (7d)", fmtNum(data.analytics.qr_scans), "Intent interactions")}
        ${kpiCard("Verified Visits (7d)", fmtNum(data.analytics.verified_visits), "Attribution-confirmed")}
        ${kpiCard("Revenue (7d)", fmtUsd(data.analytics.revenue), "From verified conversion")}
      </section>
      <article class="panel analytics-lab-panel" style="padding:18px;">
        <div class="panel-head">
          <div><h2 class="panel-title">Chart Lab Surface</h2><p class="panel-sub">Grid instruments, traffic optics, and calibrated signal readouts</p></div>
          ${cardMoreButton("analytics_hourly", "hourly")}
        </div>
        <div class="analytics-lab-grid">
          <div class="analytics-lab-chart">
            <div class="line-chart line-chart-lab">${bars}</div>
          </div>
          <div class="analytics-lab-stats">
            ${labStats}
          </div>
        </div>
      </article>
      <section class="two-col analytics-detail-grid">
        <article class="panel" style="padding:16px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Conversion Funnel</h2><p class="panel-sub">Step-by-step drop-off visibility</p></div>
          </div>
          <div class="funnel-list">${funnelRows}</div>
        </article>
        <article class="panel" style="padding:16px; margin-top:0;">
          <div class="panel-head">
            <div><h2 class="panel-title">Creator Revenue Table</h2><p class="panel-sub">Detailed breakdown by contributor</p></div>
          </div>
          <table class="table-lite">
            <thead><tr><th>Creator</th><th>Visits</th><th>Revenue</th><th>Action</th></tr></thead>
            <tbody>${creatorRows}</tbody>
          </table>
        </article>
      </section>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function qrPage() {
    const totalScans = data.qr_codes.reduce((sum, q) => sum + q.scans_today, 0);
    const totalVerified = data.qr_codes.reduce((sum, q) => sum + q.verified_today, 0);
    const totalFlags = data.qr_codes.reduce((sum, q) => sum + q.fraud_flags, 0);
    const verificationRate = totalScans ? Math.round((totalVerified / totalScans) * 100) : 0;
    const qrPreview = (seed) =>
      Array.from({ length: 25 }, (_, idx) => {
        const on = (idx * 7 + seed.length * 3 + seed.charCodeAt(idx % seed.length)) % 5 < 3;
        const finder = idx < 5 || idx % 5 === 0 || idx % 5 === 4 || idx >= 20;
        return `<span class="qr-module${on || finder ? " is-on" : ""}"></span>`;
      }).join("");

    const cards = data.qr_codes
      .map(
        (q) => `
          <article class="qr-code-card">
            <div class="qr-code-head">
              <div>
                <p class="qr-code-id">${q.id}</p>
                <h3>${q.creator}</h3>
                <p class="panel-sub">${q.campaign}</p>
              </div>
              <span class="badge">${q.status}</span>
            </div>
            <div class="qr-code-body">
              <div class="qr-code-preview" aria-hidden="true">
                <div class="qr-matrix">${qrPreview(q.id)}</div>
              </div>
              <div class="qr-code-metrics">
                <div class="qr-code-metric"><span>Scans</span><strong>${fmtNum(q.scans_today)}</strong></div>
                <div class="qr-code-metric"><span>Verified</span><strong>${fmtNum(q.verified_today)}</strong></div>
                <div class="qr-code-metric"><span>Flags</span><strong>${q.fraud_flags}</strong></div>
                ${cardMoreButton("qr", q.id)}
              </div>
            </div>
          </article>
        `,
      )
      .join("");

    const rows = data.qr_codes
      .map(
        (q) => `
        <tr>
          <td>${q.id}</td>
          <td>${q.creator}</td>
          <td>${q.campaign}</td>
          <td>${fmtNum(q.scans_today)}</td>
          <td>${fmtNum(q.verified_today)}</td>
          <td>${q.fraud_flags}</td>
          <td>${cardMoreButton("qr", q.id)}</td>
        </tr>
      `,
      )
      .join("");
    return `
      <section class="qr-page-layout">
        <article class="panel qr-stage-panel" style="padding:18px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Scan Verification Stage</h2><p class="panel-sub">Live QR objects, verified flow, and fraud pressure in one surface</p></div>
            ${cardMoreButton("qr_overview", "all")}
          </div>
          <div class="qr-stage-grid">
            <div class="qr-stage-visual" aria-hidden="true">
              <div class="qr-stage-glow qr-stage-glow-a"></div>
              <div class="qr-stage-glow qr-stage-glow-b"></div>
              <div class="qr-stage-plane qr-stage-plane-a"></div>
              <div class="qr-stage-plane qr-stage-plane-b"></div>
              <div class="qr-stage-plane qr-stage-plane-c"></div>
              <div class="qr-stage-matrix">
                ${qrPreview(`stage-${state.theme}`)}
              </div>
            </div>
            <div class="qr-stage-copy">
              <div class="qr-stage-stat"><span>Total scans</span><strong>${fmtNum(totalScans)}</strong></div>
              <div class="qr-stage-stat"><span>Verified rate</span><strong>${verificationRate}%</strong></div>
              <div class="qr-stage-stat"><span>Fraud flags</span><strong>${totalFlags}</strong></div>
              <p class="panel-sub">Codes with stronger verification stay visually dense while low-trust patterns get cleaner, more rigid scan geometry.</p>
            </div>
          </div>
        </article>

        <section class="qr-card-grid">
          ${cards}
        </section>

        <article class="panel" style="padding:16px;">
          <div class="panel-head">
            <div><h2 class="panel-title">QR Quality Board</h2><p class="panel-sub">Scan integrity, fraud flags, verified ratio</p></div>
          </div>
          <table class="table-lite">
            <thead><tr><th>QR</th><th>Creator</th><th>Campaign</th><th>Scans</th><th>Verified</th><th>Flags</th><th>Action</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </article>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function locationsPage() {
    const pinPositions = [
      { left: "27%", top: "56%" },
      { left: "57%", top: "34%" },
      { left: "72%", top: "62%" },
    ];
    const pins = data.locations
      .map((loc, idx) => {
        const pos = pinPositions[idx % pinPositions.length];
        return `
          <button class="map-pin" style="left:${pos.left};top:${pos.top};" data-pin-id="${loc.id}">
            <span class="pin-dot"></span>
            <span class="pin-card">
              <p class="name">${loc.name}</p>
              <p>${fmtNum(loc.visits_today)} visits today</p>
            </span>
          </button>
        `;
      })
      .join("");

    const cards = data.locations
      .map(
        (loc) => `
          <article class="map-side-card location-card">
            <h4>${loc.name}</h4>
            <p class="panel-sub">${loc.address}</p>
            <p class="panel-sub">Peak: ${loc.peak_hour} · Radius: ${loc.radius}m</p>
            <div class="location-card-meta">
              <span>${loc.visits_today} visits</span>
              <span>${loc.radius}m radius</span>
            </div>
            <div class="metric-row"><strong>${loc.visits_today} visits today</strong>${cardMoreButton("location", loc.id)}</div>
          </article>
        `,
      )
      .join("");

    const totalVisits = data.locations.reduce((sum, loc) => sum + loc.visits_today, 0);
    const busiest = data.locations.reduce((top, loc) => (loc.visits_today > top.visits_today ? loc : top), data.locations[0]);

    return `
      <section class="location-page-layout">
        <article class="panel location-map-panel" style="padding:16px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Live Location Map</h2><p class="panel-sub">Branch spacing, route cues, and neighborhood traffic in one spatial view</p></div>
          </div>
          <div class="location-map-shell">
            <div class="map-wrap">
              <div class="map-grid"></div>
              <div class="map-route"></div>
              ${pins}
            </div>
            <div class="location-map-summary">
              <article class="location-summary-card">
                <span>Total visits</span>
                <strong>${fmtNum(totalVisits)}</strong>
                <p>Across ${data.locations.length} active points today</p>
              </article>
              <article class="location-summary-card">
                <span>Peak branch</span>
                <strong>${busiest.name}</strong>
                <p>${fmtNum(busiest.visits_today)} visits · ${busiest.peak_hour}</p>
              </article>
              <article class="location-summary-card">
                <span>Coverage</span>
                <strong>${Math.max(...data.locations.map((loc) => loc.radius))}m</strong>
                <p>Largest active attribution radius</p>
              </article>
            </div>
          </div>
        </article>

        <article class="panel location-list-panel" style="padding:16px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Branch Cards</h2><p class="panel-sub">Map-linked detail cards for every operating point</p></div>
          </div>
          <div class="map-side-list">${cards}</div>
        </article>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function disputesPage() {
    const items = data.disputes
      .map(
        (d) => `
          <article class="timeline-item">
            <div class="metric-row"><h4>${d.type}</h4><strong>${fmtUsd(d.amount)}</strong></div>
            <p class="panel-sub">Priority: ${d.priority} · Owner: ${d.owner}</p>
            <p class="panel-sub">Opened: ${d.opened_at}</p>
            <p class="panel-sub"><strong>Status:</strong> ${d.status}</p>
            <div class="card-actions">${cardMoreButton("dispute", d.id)}</div>
          </article>
        `,
      )
      .join("");
    return `
      <section class="panel" style="padding:16px;">
        <div class="panel-head">
          <div><h2 class="panel-title">Dispute Timeline</h2><p class="panel-sub">Chronological risk and review workflow</p></div>
        </div>
        <div class="timeline">${items}</div>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function messagesPage() {
    const rows = data.messages
      .map(
        (m) => `
          <article class="message-item">
            <div class="message-avatar">✉</div>
            <div>
              <h4>${m.from} · ${m.subject}</h4>
              <p>${m.last}</p>
              <p class="panel-sub">${m.time}</p>
            </div>
            <div>
              <div class="unread-chip">${m.unread}</div>
              <div style="margin-top:8px;">${cardMoreButton("message", m.id)}</div>
            </div>
          </article>
        `,
      )
      .join("");
    return `
      <section class="panel" style="padding:16px;">
        <div class="panel-head">
          <div><h2 class="panel-title">Inbox</h2><p class="panel-sub">Thread-level details with unread and latest context</p></div>
        </div>
        <div class="message-list">${rows}</div>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function paymentsPage() {
    const p = data.payments;
    const totalLines = p.payout_breakdown.reduce((sum, row) => sum + row.value, 0);
    const positiveLines = p.payout_breakdown.filter((row) => row.value > 0);
    const payoutFlow = [
      { label: "Accrued", value: fmtUsd(totalLines), note: "Gross payout lines before release" },
      { label: "Pending", value: fmtUsd(p.pending), note: "Waiting verification release" },
      { label: "Scheduled", value: fmtUsd(p.next_payout), note: "Next merchant payout target" },
    ]
      .map(
        (item, index) => `
          <article class="payment-flow-step">
            <span class="payment-flow-index">0${index + 1}</span>
            <div>
              <p>${item.label}</p>
              <strong>${item.value}</strong>
              <small>${item.note}</small>
            </div>
          </article>
        `,
      )
      .join("");

    const breakdownCards = positiveLines
      .map(
        (row) => `
          <article class="payment-break-card">
            <span>${row.label}</span>
            <strong>${fmtUsd(row.value)}</strong>
            <div class="bar"><span style="width:${Math.max(18, Math.round((row.value / totalLines) * 100))}%"></span></div>
          </article>
        `,
      )
      .join("");

    const breakdownRows = p.payout_breakdown
      .map(
        (r) => `
          <tr>
            <td>${r.label}</td>
            <td>${r.value < 0 ? `- ${fmtUsd(Math.abs(r.value))}` : fmtUsd(r.value)}</td>
            <td>${cardMoreButton("payment_line", r.label)}</td>
          </tr>
        `,
      )
      .join("");
    return `
      <section class="payments-layout">
      <section class="finance-grid" style="margin-bottom:12px;">
        ${kpiCard("Next Payout", fmtUsd(p.next_payout), "Scheduled next cycle")}
        ${kpiCard("Pending", fmtUsd(p.pending), "Waiting verification release")}
        ${kpiCard("Paid 30D", fmtUsd(p.paid_30d), "Historical paid amount")}
        ${kpiCard("Failed Tx", p.failed_tx, "Requires merchant action")}
      </section>
      <section class="two-col payments-grid">
        <article class="panel payment-flow-panel" style="padding:18px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Settlement Flow</h2><p class="panel-sub">Accrual, hold, and release visualized as payout movement</p></div>
          </div>
          <div class="payment-flow-track">
            ${payoutFlow}
          </div>
        </article>
        <article class="panel payment-break-panel" style="padding:18px;">
          <div class="panel-head">
            <div><h2 class="panel-title">Payout Composition</h2><p class="panel-sub">Positive line items driving scheduled release</p></div>
          </div>
          <div class="payment-break-grid">
            ${breakdownCards}
          </div>
        </article>
      </section>
      <section class="panel" style="padding:16px;">
        <div class="panel-head">
          <div><h2 class="panel-title">Payout Breakdown</h2><p class="panel-sub">Line-item visibility for finance workflow</p></div>
        </div>
        <table class="table-lite">
          <thead><tr><th>Line</th><th>Amount</th><th>Action</th></tr></thead>
          <tbody>${breakdownRows}</tbody>
        </table>
      </section>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function billingPage() {
    const b = data.billing;
    const totalBilled = b.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const invoiceDeck = b.invoices
      .map(
        (invoice) => `
          <article class="invoice-sheet">
            <span>${invoice.id}</span>
            <strong>${fmtUsd(invoice.amount)}</strong>
            <p>${invoice.date}</p>
            <small>${invoice.paid ? "Paid" : "Open"}</small>
          </article>
        `,
      )
      .join("");
    const invoiceRows = b.invoices
      .map(
        (i) => `
          <tr>
            <td>${i.id}</td>
            <td>${i.date}</td>
            <td>${fmtUsd(i.amount)}</td>
            <td>${i.paid ? "Paid" : "Open"}</td>
            <td>${cardMoreButton("invoice", i.id)}</td>
          </tr>
        `,
      )
      .join("");
    return `
      <section class="billing-layout">
      <section class="finance-grid" style="margin-bottom:12px;">
        ${kpiCard("Plan", b.plan, "Current subscription tier")}
        ${kpiCard("Monthly Fee", fmtUsd(b.monthly_fee), "Platform fee")}
        ${kpiCard("Usage Fees", fmtUsd(b.usage_fees), "Performance/transactional")}
        ${kpiCard("Next Invoice", b.next_invoice_date, b.status)}
      </section>
      <section class="two-col billing-grid">
        <article class="panel billing-deck-panel" style="padding:18px;">
          <div class="panel-head"><div><h2 class="panel-title">Invoice Deck</h2><p class="panel-sub">Document stack preview for recent billing cycles</p></div></div>
          <div class="invoice-deck">
            ${invoiceDeck}
          </div>
        </article>
        <article class="panel billing-summary-panel" style="padding:18px;">
          <div class="panel-head"><div><h2 class="panel-title">Billing Summary</h2><p class="panel-sub">Current platform charges and scheduled invoice state</p></div></div>
          <div class="billing-summary-grid">
            <article class="billing-summary-card"><span>Total billed</span><strong>${fmtUsd(totalBilled)}</strong><p>Across ${b.invoices.length} recent invoices</p></article>
            <article class="billing-summary-card"><span>Current plan</span><strong>${b.plan}</strong><p>${fmtUsd(b.monthly_fee)} base fee this cycle</p></article>
            <article class="billing-summary-card"><span>Usage layer</span><strong>${fmtUsd(b.usage_fees)}</strong><p>Performance-linked charges this month</p></article>
          </div>
        </article>
      </section>
      <section class="panel" style="padding:16px;">
        <div class="panel-head"><div><h2 class="panel-title">Invoice History</h2><p class="panel-sub">Detailed billing records and status</p></div></div>
        <table class="table-lite">
          <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${invoiceRows}</tbody>
        </table>
      </section>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function integrationsPage() {
    const cards = data.integrations
      .map(
        (i) => `
          <article class="integration-card">
            <div class="integration-head">
              <h4>${i.name}</h4>
              <span class="health">${i.status}</span>
            </div>
            <p class="panel-sub">Last sync: ${i.last_sync}</p>
            <div class="bar" style="margin-top:8px;"><span style="width:${i.health}%"></span></div>
            <p class="panel-sub">Health score: ${i.health}%</p>
            <div class="card-actions">${cardMoreButton("integration", i.name)}</div>
          </article>
        `,
      )
      .join("");
    return `
      <section class="panel" style="padding:16px;">
        <div class="panel-head">
          <div><h2 class="panel-title">Connected Systems</h2><p class="panel-sub">Every integration has independent metrics and details</p></div>
        </div>
        <div class="integration-grid">${cards}</div>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function notificationsPage() {
    const rows = data.notifications
      .map(
        (n) => `
          <article class="timeline-item">
            <div class="metric-row"><h4>${n.title}</h4><strong class="severity-${n.severity.toLowerCase()}">${n.severity}</strong></div>
            <p class="panel-sub">${n.detail}</p>
            <p class="panel-sub">${n.time}</p>
            <div class="card-actions">${cardMoreButton("notification", n.id)}</div>
          </article>
        `,
      )
      .join("");
    return `
      <section class="panel" style="padding:16px;">
        <div class="panel-head"><div><h2 class="panel-title">Alert Center</h2><p class="panel-sub">Actionable notification feed with severity tags</p></div></div>
        <div class="timeline">${rows}</div>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function settingsPage() {
    const s = data.settings;
    const switches = Object.entries(s.alerts)
      .map(
        ([k, v]) => `
          <article class="switch-row">
            <span>${k.replaceAll("_", " ")}</span>
            <span class="state">${v ? "ON" : "OFF"}</span>
            ${cardMoreButton("setting", k)}
          </article>
        `,
      )
      .join("");
    return `
      <section class="two-col">
        <article class="panel" style="padding:16px;">
          <div class="panel-head"><div><h2 class="panel-title">Workspace Profile</h2><p class="panel-sub">Core account and business identity settings</p></div></div>
          <div class="modal-body-grid">
            ${detailItem("Business", s.profile_name)}
            ${detailItem("Timezone", s.timezone)}
            ${detailItem("Currency", s.currency)}
            ${detailItem("Language", s.language)}
          </div>
          <div class="card-actions" style="margin-top:12px;">${cardMoreButton("settings_profile", "profile")}</div>
        </article>
        <article class="panel" style="padding:16px;">
          <div class="panel-head"><div><h2 class="panel-title">Notification Policy</h2><p class="panel-sub">Granular alert controls with explicit states</p></div></div>
          <div class="switch-list">${switches}</div>
        </article>
      </section>
      <div id="detailSlot"></div>
    `;
  }

  function miniMetric(k, v) {
    return `<article class="finance-box"><h4>${k}</h4><p>${v}</p></article>`;
  }

  function miniData(k, v) {
    return `<article class="metric-box"><p class="v">${v}</p><p class="k">${k}</p></article>`;
  }

  function kpiCard(label, value, hint) {
    return `
      <article class="kpi-card">
        <p class="kpi-label">${label}</p>
        <p class="kpi-value">${value}</p>
        <p class="kpi-hint">${hint}</p>
      </article>
    `;
  }

  function detailItem(k, v) {
    return `<article class="modal-body-item"><p class="k">${k}</p><p class="v">${v}</p></article>`;
  }

  function heroSceneMarkup(page, navItem) {
    const symbol = navItem?.emoji || "•";
    const scenes = {
      dashboard: `
        <div class="hero-scene hero-scene-dashboard">
          <div class="scene-sheet scene-sheet-a"></div>
          <div class="scene-sheet scene-sheet-b"></div>
          <div class="scene-kpi-strip">
            <span>${symbol}</span><span>Revenue</span><strong>${fmtUsd(data.analytics.revenue)}</strong>
          </div>
        </div>
      `,
      campaigns: `
        <div class="hero-scene hero-scene-campaigns">
          <div class="scene-campaign-card is-main"><span>${symbol}</span><strong>Launch</strong></div>
          <div class="scene-campaign-card"><span>◧</span><strong>Traffic</strong></div>
          <div class="scene-campaign-card"><span>△</span><strong>UGC</strong></div>
        </div>
      `,
      applicants: `
        <div class="hero-scene hero-scene-applicants">
          <div class="scene-profile-card"><span>${symbol}</span><strong>94</strong><small>Match</small></div>
          <div class="scene-profile-card"><span>✦</span><strong>88</strong><small>CTR</small></div>
          <div class="scene-profile-card"><span>◎</span><strong>73</strong><small>Finish</small></div>
        </div>
      `,
      analytics: `
        <div class="hero-scene hero-scene-analytics">
          <div class="scene-chart-grid"></div>
          <div class="scene-chart-bars">
            <span style="height:28%"></span><span style="height:48%"></span><span style="height:36%"></span><span style="height:64%"></span><span style="height:54%"></span><span style="height:76%"></span>
          </div>
          <div class="scene-chart-line"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
      `,
      qr: `
        <div class="hero-scene hero-scene-qr">
          <div class="scene-qr-matrix">
            ${Array.from({ length: 25 }, (_, idx) => `<span class="${idx % 2 === 0 || idx < 5 || idx > 19 ? "is-on" : ""}"></span>`).join("")}
          </div>
          <div class="scene-scan-beam"></div>
        </div>
      `,
      locations: `
        <div class="hero-scene hero-scene-locations">
          <div class="scene-map-grid"></div>
          <div class="scene-map-route"></div>
          <span class="scene-map-pin pin-a">${symbol}</span>
          <span class="scene-map-pin pin-b">⌖</span>
          <span class="scene-map-pin pin-c">⌖</span>
        </div>
      `,
      disputes: `
        <div class="hero-scene hero-scene-disputes">
          <div class="scene-timeline-line"></div>
          <span class="scene-timeline-node is-active">◇</span>
          <span class="scene-timeline-node">◆</span>
          <span class="scene-timeline-node">◇</span>
        </div>
      `,
      messages: `
        <div class="hero-scene hero-scene-messages">
          <div class="scene-bubble is-main">${symbol} Approval note</div>
          <div class="scene-bubble">Reply queued</div>
          <div class="scene-bubble">2 unread</div>
        </div>
      `,
      payments: `
        <div class="hero-scene hero-scene-payments">
          <div class="scene-coin-stack">
            <span></span><span></span><span></span>
          </div>
          <div class="scene-flow-arrow">↗</div>
        </div>
      `,
      billing: `
        <div class="hero-scene hero-scene-billing">
          <div class="scene-invoice-stack">
            <article><span>${symbol}</span><strong>INV</strong></article>
            <article><span>▤</span><strong>Plan</strong></article>
            <article><span>◐</span><strong>Fees</strong></article>
          </div>
        </div>
      `,
      integrations: `
        <div class="hero-scene hero-scene-integrations">
          <span class="scene-node a">∞</span><span class="scene-node b">◧</span><span class="scene-node c">▢</span>
          <div class="scene-link one"></div><div class="scene-link two"></div>
        </div>
      `,
      notifications: `
        <div class="hero-scene hero-scene-notifications">
          <div class="scene-alert-card is-main"><span>◉</span><strong>1</strong></div>
          <div class="scene-alert-card"><span>•</span><strong>2</strong></div>
          <div class="scene-alert-wave"></div>
        </div>
      `,
      settings: `
        <div class="hero-scene hero-scene-settings">
          <div class="scene-slider"><span></span></div>
          <div class="scene-slider is-mid"><span></span></div>
          <div class="scene-slider is-low"><span></span></div>
        </div>
      `,
    };

    return scenes[page] || scenes.dashboard;
  }

  function renderPage(page) {
    const renderer = {
      dashboard: dashboardPage,
      campaigns: campaignsPage,
      applicants: applicantsPage,
      analytics: analyticsPage,
      qr: qrPage,
      locations: locationsPage,
      disputes: disputesPage,
      messages: messagesPage,
      payments: paymentsPage,
      billing: billingPage,
      integrations: integrationsPage,
      notifications: notificationsPage,
      settings: settingsPage,
    }[page];

    const themeData = themes[state.theme];
    const activeNavItem = data.nav.find((item) => item.id === page);
    const sectionLabel = activeNavItem?.section || "Core";
    const sceneMeta = pageSceneMeta[page] || pageSceneMeta.dashboard;
    const pageIndex = Math.max(
      0,
      data.nav.findIndex((item) => item.id === page),
    );
    const pageNumber = String(pageIndex + 1).padStart(2, "0");
    const content = renderer ? renderer() : dashboardPage();

    el.pageContainer.innerHTML = `
      <section class="hero-panel" data-title="${pageMeta[page].title}" data-page="${page}">
        <div class="hero-rail">
          <p class="hero-index">${pageNumber}</p>
          <p class="hero-rail-copy">${data.merchant.name}</p>
        </div>
        <div class="hero-copy">
          <p class="hero-eyebrow">${sectionLabel} · ${themeData.label}</p>
          <h2>${pageMeta[page].title}</h2>
          <p>${pageMeta[page].sub}</p>
          <div class="hero-chip-row">
            <span class="hero-chip">${activeNavItem?.emoji || "•"} ${activeNavItem?.label || pageMeta[page].title}</span>
            <span class="hero-chip">${sceneMeta.material}</span>
            <span class="hero-chip">Best for: ${themeData.fit}</span>
            <span class="hero-chip">${themeData.label} palette</span>
          </div>
          <div class="hero-note">${themeData.distinct} ${sceneMeta.mood}.</div>
        </div>
        <div class="hero-stage" aria-hidden="true" data-scene="${sceneMeta.marker}" data-page="${page}">
          <div class="hero-glow hero-glow-a"></div>
          <div class="hero-glow hero-glow-b"></div>
          <div class="hero-stage-grid"></div>
          ${heroSceneMarkup(page, activeNavItem)}
          <p class="hero-stage-note">${sceneMeta.detail}</p>
        </div>
        <div class="hero-actions">
          <button type="button" class="hero-action-btn" data-page="dashboard">Open Dashboard</button>
          <button type="button" class="hero-action-btn alt" data-page="settings">Open Settings</button>
        </div>
      </section>

      <section class="summary-strip">
        ${summaryCardsHTML(page)}
      </section>

      <section class="quick-chip-row">
        ${quickChipsHTML(page)}
      </section>

      <section class="layout-content">
        ${content}
      </section>
    `;
    animatePageElements();
  }

  function animatePageElements() {
    const revealTargets = document.querySelectorAll(
      ".hero-panel, .summary-card, .quick-chip-row, .kpi-card, .panel, .metric-item, .applicant-card, .message-item, .integration-card, .finance-box, .timeline-item, .funnel-row, .map-side-card, .switch-row, .full-detail",
    );
    revealTargets.forEach((node, idx) => {
      node.style.setProperty("--stagger-delay", `${Math.min(idx, 16) * 45}ms`);
      node.classList.add("reveal-in");
    });

    const bars = document.querySelectorAll(".line-bar");
    bars.forEach((bar, idx) => {
      bar.style.animationDelay = `${Math.min(idx, 10) * 45}ms`;
    });
  }

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function switchPageWithAnimation(nextPage) {
    if (nextPage === state.page) return;

    if (reduceMotion()) {
      state.page = nextPage;
      setTopbar(nextPage);
      renderNav();
      renderPage(nextPage);
      return;
    }

    const token = ++state.switchToken;
    el.pageContainer.classList.remove("page-switch-in");
    el.pageContainer.classList.add("page-switch-out");

    window.setTimeout(() => {
      if (token !== state.switchToken) return;
      state.page = nextPage;
      setTopbar(nextPage);
      renderNav();
      renderPage(nextPage);
      el.pageContainer.classList.remove("page-switch-out");
      requestAnimationFrame(() => {
        el.pageContainer.classList.add("page-switch-in");
      });
    }, 180);
  }

  function getCollectionByType(type) {
    const map = {
      campaign: data.campaigns,
      applicant: data.applicants,
      qr: data.qr_codes,
      location: data.locations,
      dispute: data.disputes,
      message: data.messages,
      notification: data.notifications,
      invoice: data.billing.invoices,
      integration: data.integrations,
    };
    return map[type];
  }

  function findRecord(type, id) {
    const collection = getCollectionByType(type);
    if (collection) return collection.find((x) => String(x.id || x.name) === String(id)) || null;

    if (type === "campaign_overview") return { id: "all_campaigns", ...data.kpi };
    if (type === "applicant_pool") return { id: "all_applicants", count: data.applicants.length };
    if (type === "analytics_step") return data.analytics.funnel.find((s) => s.label === id) || null;
    if (type === "creator_performance") return data.analytics.creators.find((c) => c.name === id) || null;
    if (type === "analytics_hourly") return { id: "hourly", values: data.analytics.by_hour };
    if (type === "payment_line")
      return data.payments.payout_breakdown.find((p) => p.label === id) || null;
    if (type === "setting") return { id, enabled: data.settings.alerts[id] };
    if (type === "settings_profile") return data.settings;
    return null;
  }

  function modalBodyFromRecord(record) {
    if (!record) return `<p>No detail found.</p>`;
    const entries = Object.entries(record).filter(([, v]) => typeof v !== "object");
    return `<div class="modal-body-grid">${entries
      .map(([k, v]) => detailItem(k.replaceAll("_", " "), String(v)))
      .join("")}</div>`;
  }

  function openModal(type, record, title) {
    state.modalType = type;
    state.modalRecord = record;
    el.modalKicker.textContent = type.replaceAll("_", " ").toUpperCase();
    el.modalTitle.textContent = title || "Detail";
    el.modalBody.innerHTML = modalBodyFromRecord(record);
    el.modalBackdrop.classList.add("open");
    el.modalBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    el.modalBackdrop.classList.remove("open");
    el.modalBackdrop.setAttribute("aria-hidden", "true");
  }

  function renderFullDetail() {
    if (!state.modalRecord) return;
    const detailSlot = document.getElementById("detailSlot");
    if (!detailSlot) return;
    const pretty = JSON.stringify(state.modalRecord, null, 2);
    detailSlot.innerHTML = `
      <article class="full-detail">
        <h3>Full Detail Page Preview · ${state.modalType}</h3>
        <p>Use this block as your team handoff format for real backend data mapping.</p>
        <pre style="white-space:pre-wrap; margin:10px 0 0; font-size:12px; color:#2f3544;">${pretty}</pre>
      </article>
    `;
    animatePageElements();
  }

  function setPage(page, options = {}) {
    if (options.animated) {
      switchPageWithAnimation(page);
      return;
    }

    state.page = page;
    setTopbar(page);
    renderNav();
    renderPage(page);
  }

  function renderNav() {
    if (el.sidebarNav) el.sidebarNav.innerHTML = navHTML("desktop");
    if (el.mobileNav) el.mobileNav.innerHTML = navHTML("mobile");
    renderTopFilters();
  }

  function closeDrawer() {
    el.mobileDrawer.classList.remove("open");
    el.mobileBackdrop.classList.remove("open");
    el.menuToggle.classList.remove("open");
  }

  function openDrawer() {
    el.mobileDrawer.classList.add("open");
    el.mobileBackdrop.classList.add("open");
    el.menuToggle.classList.add("open");
  }

  function bindEvents() {
    document.body.addEventListener("click", (event) => {
      const themeBtn = event.target.closest("[data-theme]");
      if (themeBtn) {
        const themeKey = themeBtn.getAttribute("data-theme");
        setTheme(themeKey);
      }

      const pageBtn = event.target.closest("[data-page]");
      if (pageBtn) {
        const p = pageBtn.getAttribute("data-page");
        triggerTopicLinkEffect();
        setPage(p, { animated: true });
        closeDrawer();
      }

      const moreBtn = event.target.closest(".more-btn");
      if (moreBtn) {
        const type = moreBtn.getAttribute("data-type");
        const id = moreBtn.getAttribute("data-id");
        const record = findRecord(type, id);
        const name = record?.name || record?.title || record?.id || id;
        openModal(type, record, name);
      }

      const pinBtn = event.target.closest("[data-pin-id]");
      if (pinBtn) {
        const id = pinBtn.getAttribute("data-pin-id");
        const loc = findRecord("location", id);
        openModal("location", loc, loc?.name || "Location");
      }
    });

    el.menuToggle.addEventListener("click", () => {
      if (el.mobileDrawer.classList.contains("open")) closeDrawer();
      else openDrawer();
    });
    el.closeDrawer.addEventListener("click", closeDrawer);
    el.mobileBackdrop.addEventListener("click", closeDrawer);

    el.modalClose.addEventListener("click", closeModal);
    el.modalDismiss.addEventListener("click", closeModal);
    el.modalBackdrop.addEventListener("click", (event) => {
      if (event.target === el.modalBackdrop) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
        closeModal();
      }
    });

    el.openFullDetail.addEventListener("click", () => {
      renderFullDetail();
      closeModal();
    });

    el.accountBtn.addEventListener("click", () => {
      triggerTopicLinkEffect();
      setPage("notifications", { animated: true });
    });
    el.settingBtn.addEventListener("click", () => {
      triggerTopicLinkEffect();
      setPage("settings", { animated: true });
    });
  }

  function init() {
    document.body.dataset.theme = state.theme;
    renderThemeSwitcher();
    renderNav();
    setTopbar(state.page);
    renderPage(state.page);
    bindEvents();
  }

  init();
})();
