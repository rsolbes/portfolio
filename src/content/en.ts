// English copy. Every string on the page lives here or in es.ts; es.ts must
// match this shape (TypeScript enforces it), so a missing translation fails
// the build instead of shipping.
//
// Light markup: *text* renders as emphasis where a field says so.

import { credentialUrls, links, type DimensionName } from "./shared";
import type { CaseStudy, Certification, NavItem, Stage, TimelineEntry } from "./types";

const nav: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const dimensionNotes: Record<DimensionName, string> = {
  programa_presupuestario: "Budget program",
  unidad_responsable: "Responsible unit within a branch",
  ramo: "Administrative branch: ministry or agency",
  partida: "Object-of-expenditure line item",
  modalidad: "Program modality, by letter code",
  entidad_federativa: "State: geographic classification",
  actividad_institucional: "Institutional activity",
  fuente_financiamiento: "Funding source",
  finalidad: "Functional classification, level 1",
  funcion: "Functional classification, level 2",
  subfuncion: "Functional classification, level 3",
  tipo_gasto: "Type of expenditure",
};

const dataRoute: Stage[] = [
  { title: "Semantic context", detail: "Descriptive views + classification docs v1", status: "built" },
  { title: "SQL validation", detail: "One SELECT only; reject SET and set_config()", status: "planned" },
  { title: "Read-only execution", detail: "consulta_nlq role, 15 s limit", status: "built" },
  { title: "Table + executed SQL", detail: "The query is always shown", status: "planned" },
];

const docRoute: Stage[] = [
  { title: "Document index", detail: "Articles and clauses with provenance", status: "planned" },
  { title: "Retrieval", detail: "BM25 vs dense vs hybrid, ± reranking", status: "planned" },
  { title: "Grounded generation", detail: "Faithfulness measured separately", status: "planned" },
  { title: "Answer + citations", detail: "Every claim points to a source", status: "planned" },
];

const foundation: Stage[] = [
  { title: "PostgreSQL warehouse", detail: "Star schema · 1,285,233 rows · validated load", status: "built" },
  { title: "Evaluation set", detail: "61 questions drafted · human verification gate", status: "in-progress" },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "churn",
    title: "Customer Churn Prediction",
    kicker: "Applied ML · In production",
    period: "2026",
    visibility: "private",
    privateNote: "Company work · Unitam",
    summary:
      "Ranks 136K business customers of a retailer with ~100 branches by their probability of lapsing, scored monthly inside the company’s .NET ERP.",
    problem:
      "Lapsing customers were flagged with a recency heuristic. The business needed a ranked list it could act on, with a risk percentage that means what it says, built from seven years of invoice history.",
    architecture: [
      "385K customer-month snapshots from 7 years of invoices: 136K customers, 855K tickets, 104 branches, 30.5% base rate.",
      "Benchmarked a GRU over raw monthly sequences against LightGBM on RFM features. Shipped LightGBM: the GRU’s PR-AUC edge was marginal, and LightGBM was better calibrated and far cheaper to serve.",
      "Leakage-safe evaluation: time-based train, validation and test splits, forward-computed recency, and one shared feature function for training and scoring to prevent train/serve skew.",
    ],
    deployment:
      "Monthly batch scoring writes back to SQL Server, and the ranking surfaces in the ERP’s reporting module. PR-AUC rose from 0.567 (the recency heuristic) to 0.617, and Brier score fell from 0.260 to 0.167, so the displayed risk percentage is calibrated, not just a ranking.",
    stack: ["Python", "LightGBM", "PyTorch", "pandas", "SQL Server", "C# · .NET"],
    facts: [
      { value: "0.617", label: "PR-AUC (was 0.567)" },
      { value: "0.167", label: "Brier (was 0.260)" },
      { value: "385K", label: "training snapshots" },
    ],
  },
  {
    slug: "casita-azul",
    title: "Casita Azul Real-Estate Platform",
    kicker: "Full-stack · Client project",
    period: "Aug – Dec 2025",
    visibility: "private",
    privateNote: "Private repositories",
    summary:
      "Public listings site and back office for a real-estate agency: a property catalog with maps and favorites, plus an admin console for properties, agents and users.",
    problem:
      "The agency needed its listings online and a way for staff to manage them without touching the database: publish properties with photo galleries, manage in-house and external agents, control who can administer what, and see which listings get attention.",
    architecture: [
      "Two Angular 20 single-page apps: a public client (Ionic components, Leaflet maps, favorites, PDF brochures with jsPDF) and an admin console with route guards and an auth interceptor.",
      "Flask REST API with 37 endpoints over PostgreSQL, using pooled psycopg2 connections. Sign-in and session refresh are delegated to Supabase Auth.",
      "Property and agent images moved out of the database into Cloudflare R2 object storage through its S3-compatible API (boto3).",
      "Soft delete and restore for agents; per-listing view tracking feeds the admin dashboard.",
    ],
    deployment:
      "Built production-ready through my consulting practice: a Gunicorn-served API, Docker, and static SPA builds with fallback routing, with changes merged through pull requests (104 commits across two repositories). The client ended the project before launch.",
    stack: ["Angular 20", "TypeScript", "Flask", "PostgreSQL", "Supabase Auth", "Cloudflare R2", "Docker"],
    facts: [
      { value: "37", label: "API endpoints" },
      { value: "104", label: "commits" },
      { value: "2", label: "Angular apps" },
    ],
  },
  {
    slug: "os-simulators",
    title: "OS Simulators: Memory & CPU Scheduling",
    kicker: "Systems · C · GTK",
    period: "Nov – Dec 2025",
    visibility: "public",
    repo: links.osSimulatorsRepo,
    summary:
      "Two operating-systems simulators with live visualization: a paged memory manager built by a team of five, and a CPU scheduler.",
    problem:
      "Paging, TLB hits, page faults and scheduling policies are easy to describe and hard to see. The goal was to show, step by step, how an OS allocates memory and CPU time, and what happens under pressure with many processes running.",
    architecture: [
      "Memory manager: per-process page tables, a 4-entry TLB and FIFO page replacement over 2 MB of RAM and 4 MB of swap in 256 KB frames, with up to 50 processes and every parameter read from config.ini.",
      "Live GTK views of page tables, memory frames and TLB hit/miss statistics, plus swap operations, average access time, fragmentation and a timestamped event log.",
      "Scheduler: FCFS, SJF, Round Robin and Priority, with Gantt-chart visualization and per-algorithm performance metrics.",
    ],
    deployment:
      "Builds with a Makefile on Linux, or on Windows with MinGW. Ships with technical and user manuals and documented test runs.",
    stack: ["C99", "GTK", "Make", "Linux · MinGW"],
    facts: [
      { value: "50", label: "max processes" },
      { value: "4", label: "scheduling policies" },
      { value: "FIFO", label: "page replacement" },
    ],
  },
  {
    slug: "pos",
    title: "Point-of-Sale System",
    kicker: "Full-stack · Retail",
    period: "Aug – Dec 2025",
    visibility: "public",
    repo: links.posRepo,
    summary:
      "Sales, inventory, customers and users for a small retailer, with role-based access, receipts and email notifications.",
    problem:
      "A retail business needed to register sales in real time, keep inventory accurate, manage customers and staff, and give managers reports, with each role seeing only what it should.",
    architecture: [
      "Flask application over MySQL, with the SQL schema and stored procedures versioned in the repository.",
      "Three roles (seller, manager, admin), enforced in the backend and reflected in the UI.",
      "Validation on both client and server, including a guard against negative stock; a separate processor sends SMTP notifications.",
    ],
    deployment:
      "Runs as a Flask server backed by MySQL, with SMTP settings kept in their own configuration file.",
    retrospective:
      "Next iteration: replace MD5 password hashing with Argon2id and move SMTP credentials into environment variables.",
    stack: ["Python", "Flask", "MySQL", "JavaScript"],
  },
];

const timeline: TimelineEntry[] = [
  {
    period: "Jul 2026 – Present",
    current: true,
    title: "Systems Auxiliary (Software Development)",
    org: "Unitam Uniformes",
    place: "Tampico, MX",
    points: [
      "Full-time development on UNITAM NT, the company’s ERP and point-of-sale platform (C#, .NET Framework 4.7.1, WinForms, DevExpress, SQL Server), used across ~100 retail branches.",
      "Shipped a customer-churn model: monthly batch scoring written back to SQL Server and surfaced in the ERP’s reports. See the case study above.",
      "Built reporting modules in a five-layer architecture that replaced hand-assembled reports, and wrote or optimized T-SQL procedures, fixing query timeouts and data-attribution bugs in regional sales reporting.",
      "Integrated BBVA and Banamex payment terminals into the point of sale (in bank certification) and automated order generation for a key wholesale client.",
      "Gathered requirements with marketing, sales and finance; my technical assessment ruled out a TikTok Shop → Shopify → ERP integration at this stage.",
    ],
    tags: ["C#", ".NET Framework", "DevExpress", "SQL Server", "T-SQL", "Python", "LightGBM"],
  },
  {
    period: "Jan – Jun 2026",
    title: "Academic Exchange, Computer Engineering",
    org: "Universidad de Burgos",
    place: "Spain",
    points: [
      "Data mining in Python (classification, clustering, association), network analysis with NetworkX, and reverse engineering and refactoring of Java codebases against formal quality metrics.",
    ],
    tags: ["Python", "Data mining", "NetworkX", "Java"],
  },
  {
    period: "Feb – Dec 2025",
    title: "Software Developer & IT Consultant",
    org: "Solbes Soluciones Inteligentes",
    place: "Tampico, MX",
    points: [
      "Independent practice serving 10–12 local businesses end to end, from requirements through deployment and support.",
      "Delivered client software, including a real-estate platform and a questionnaire app for a psychology practice, plus point-of-sale systems with inventory and reporting. Automation scripts cut manual data entry by 60%.",
      "Deployed servers, networks and security-camera systems for small-business clients.",
    ],
    tags: ["Python", "TypeScript", "Angular", "Flask", "PostgreSQL", "Docker"],
  },
  {
    period: "Jan 2023 – Sep 2025",
    title: "IT Support & Infrastructure (part-time)",
    org: "CIYASA S.A. de C.V.",
    place: "Tampico, MX",
    points: [
      "Sole IT resource for the offices: on-site servers at ~99% uptime and a dual-ISP failover network with no single point of failure.",
      "Administered Google Workspace and Cloud, and wrote Python tools for monitoring and automation, plus internal utilities and documentation portals.",
    ],
    tags: ["Python", "Linux", "GCP", "Networking"],
  },
  {
    period: "Aug 2022 – May 2027",
    title: "B.Eng. Computer Engineering",
    org: "Universidad Autónoma de Tamaulipas",
    place: "Tampico, MX",
    points: [
      "GPA 9.13 / 10. Thesis in progress: natural-language querying of Mexico’s public budget data (featured above).",
      "Coursework spans linear algebra, probability and statistics, numerical methods, algorithms, operating systems, networks and databases, with AI and embedded systems in the final year.",
    ],
    tags: ["Algorithms", "Operating systems", "Databases", "AI"],
  },
];

const certifications: Certification[] = [
  { name: "Azure Data Fundamentals", code: "DP-900", issuer: "Microsoft", status: "earned", date: "Jul 2026", href: credentialUrls.azureData },
  { name: "IT Specialist: Databases", issuer: "Certiport · Pearson VUE", status: "earned", date: "Jul 2026", href: credentialUrls.itsDatabases },
  { name: "Generative AI Foundations", issuer: "Certiport · Pearson VUE", status: "earned", date: "Jul 2026", href: credentialUrls.genAi },
  { name: "Google Cybersecurity", code: "Professional Certificate", issuer: "Google", status: "earned", date: "Jul 2026", href: credentialUrls.googleCyber },
];

export const en = {
  meta: {
    title: "Rodrigo Solbes · Software & AI Engineering",
    description:
      "Software developer and Computer Engineering student shipping production machine learning inside an enterprise .NET ERP, moving into Software Engineering and Enterprise AI. Text-to-SQL, retrieval and data systems built so every answer shows its evidence.",
    ogLocale: "en_US",
  },
  site: { name: "Rodrigo Solbes", location: "Tampico, Mexico" },
  ui: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    backToTopAria: "back to top",
    githubProfile: "GitHub profile",
    themeToggle: "Toggle light and dark theme",
    themeTitle: "Toggle theme",
    languageSwitch: { label: "ES", aria: "Ver esta página en español" },
    status: { built: "Built", "in-progress": "In progress", planned: "Planned" },
    opensNewTab: "opens in a new tab",
    copied: "Copied to clipboard",
    now: "now",
    target: "target",
  },
  nav,
  hero: {
    nowBadge: "Now",
    nowText: "Thesis: Spanish questions → SQL over public budget data",
    tagline: "Engineering software and AI systems *you can verify.*",
    intro:
      "Computer Engineering student and Systems Auxiliary in Tampico, Mexico, with three years across software, data and IT infrastructure. I ship production machine learning inside an enterprise .NET ERP, and I’m moving into Software Engineering and Enterprise AI, building systems where every answer shows its evidence.",
    ctaPrimary: "Read the case studies",
    ctaContact: "Get in touch",
    facts: [
      { label: "Focus", value: "Applied ML · Text-to-SQL" },
      { label: "Based in", value: "Tampico, MX · EN / ES" },
      { label: "Eligible to work", value: "Mexico · EU (Spanish citizen)" },
      { label: "Degree", value: "B.Eng. CompE · UAT ’27" },
    ],
  },
  figure: {
    status: "loaded · reconciled",
    title: "Star schema of the Mexican federal budget warehouse",
    description: "A central fact table, hecho_gasto, with 1,285,233 rows, joined to twelve dimension tables.",
    rows: "rows",
    caption: "Federal budget warehouse, 2020–2025. Twelve conformed dimensions around one fact table. Hover a node.",
    notes: dimensionNotes,
  },
  abstract: {
    label: "Abstract",
    leadStrong: "I work where enterprise data meets language models.",
    leadRest:
      "At work, I ship a calibrated churn model inside a .NET ERP that serves about a hundred branches. In research, I’m building a system that answers Spanish questions about Mexico’s federal budget, choosing between generated SQL and retrieved regulation, and abstaining when the evidence isn’t there. What connects the two: systems that are reproducible, least-privileged, and honest about what they know.",
    keywordsLabel: "Keywords",
    keywords: [
      "text-to-SQL",
      "retrieval-augmented generation",
      "churn modeling",
      "probability calibration",
      "dimensional modeling",
      "least privilege",
      "enterprise .NET",
    ],
    principles: [
      {
        title: "Evidence over assertion",
        body: "Every answer carries its proof: the SQL that ran, or the passage it cites. When the data can’t support an answer, the right output is an abstention.",
      },
      {
        title: "Reproducible by default",
        body: "Sources recorded with URL, date and hash. Prompts versioned like code. Three runs per configuration, reported with mean and spread.",
      },
      {
        title: "Defense in depth",
        body: "The database doesn’t trust the validator, and the validator doesn’t trust the model. Each layer is named for what it can and can’t stop.",
      },
    ],
  },
  work: {
    label: "Selected work",
    title: "Case studies in data systems, applied AI and full-stack engineering.",
    lead: "The problem, the architecture and how it ships, with the real numbers behind each one.",
  },
  thesis: {
    featured: "Featured",
    context: "Undergraduate thesis · Facultad de Ingeniería Tampico, UAT",
    period: "2026 – 2027",
    name: "presupuesto-nlq-mx",
    headline: "Ask Mexico’s federal budget a question in Spanish, and see the SQL that answered it.",
    viewRepo: "View repository",
    labels: { problem: "Problem", approach: "Approach", architecture: "Architecture", notes: "Engineering notes" },
    problem:
      "Mexico publishes its federal budget as open data, but reading it takes both data skills and government-accounting knowledge. The figures live in tables keyed by alphanumeric codes that only make sense against external catalogs; the rules that explain them live in regulatory PDFs. The data is open, but most people can’t use it.",
    approach:
      "A system that answers Spanish questions by one of two routes. The data route translates the question into SQL over a documented semantic layer, validates it, runs it under a read-only role and returns the table with the exact query. The document route retrieves passages from official regulations and answers with citations. A router picks the route, and the system abstains when the evidence can’t support an answer.",
    metrics: [
      { value: 1285233, suffix: "", label: "fact rows loaded and reconciled" },
      { value: 6, suffix: "", label: "fiscal years normalized, 2020–2025" },
      { value: 12, suffix: "", label: "conformed dimensions" },
      { value: 11, suffix: "/11", label: "security checks passing" },
    ],
    pipeline: {
      figure: "Fig. 2",
      caption: "System architecture and build status",
      input: { title: "Question", detail: "Spanish, natural language" } as Stage,
      router: { title: "Router", detail: "LLM vs trained classifier vs both routes", status: "planned" } as Stage,
      dataLane: "Data route · text-to-SQL",
      docLane: "Document route · RAG",
      dataRoute,
      docRoute,
      foundationsLabel: "Foundations",
      foundation,
      abstention:
        "Either route can end in an abstention. When the evidence can’t support an answer, saying so is the correct output.",
    },
    tabs: { integrity: "Data integrity", privilege: "Least privilege", evaluation: "Evaluation design" },
    integrity: {
      title: "The CSV and the XLSX disagree.",
      body: [
        "The Ministry of Finance publishes every fiscal year as both CSV and XLSX. A row-level cross-check showed they aren’t equivalent, so the source format is chosen per year. Every correction is declared in a normalization log, because a silent fix can’t be told apart from altering the data.",
        "Loads run in a single transaction and end by reconciling row counts and per-stage totals (approved, accrued, paid) against the source, to the peso. Any mismatch rolls back the whole load. If the load log exists, validation passed.",
      ],
      headers: { year: "Year", source: "Source", why: "Why" },
      reasons: [
        "CSV drops 10 rows",
        "CSV drops 2 rows and blanks amounts",
        "CSV drops 3 rows, adds 828,067 filler rows",
        "CSV drops 1 row and corrupts a key",
        "CSV overstates branch 51 by MXN 9,699 M",
        "Formats identical; CSV parses faster",
      ],
      caption: "Table 1 · Source format per fiscal year, from docs/bitacora_normalizacion.md",
    },
    privilege: {
      title: "The database doesn’t trust the validator.",
      body: [
        "The system runs SQL written by a language model, so safety can’t depend on the validator being right. The query role can only read the semantic views. In PostgreSQL a view runs with its owner’s privileges, which makes the semantic layer the only way in.",
        "Session settings are treated as *safeguards*, not *barriers*: a session can SET them. So the orchestrator must enforce its own timeout and reject SET and set_config().",
      ],
      listing: `-- The semantic layer is the only way in.
REVOKE ALL ON ALL TABLES IN SCHEMA presupuesto FROM consulta_nlq;
REVOKE CONNECT, TEMPORARY ON DATABASE presupuesto_nlq FROM PUBLIC;
GRANT  USAGE  ON SCHEMA semantica TO consulta_nlq;
GRANT  SELECT ON ALL TABLES IN SCHEMA semantica TO consulta_nlq;

-- Safeguards, not barriers: a session can SET these.
ALTER ROLE consulta_nlq SET default_transaction_read_only = on;
ALTER ROLE consulta_nlq SET statement_timeout = '15s';
ALTER ROLE consulta_nlq CONNECTION LIMIT 5;`,
      listingCaption:
        "Listing 1 · Least-privilege role, abridged from src/sql/03_rol_consulta.sql (comments translated)",
      checks: [
        "Runs as the role",
        "Reads the semantic layer",
        "Reads the raw control schema",
        "Cannot read base tables",
        "Cannot write, even with read-only off",
        "Cannot create temp tables",
        "Confined to its database",
        "Read-only by default",
        "Writes blocked by default",
        "Statement timeout set",
        "Timeout enforced (20 s → 15 s)",
      ],
      checksCaption:
        "Table 2 · 11 of 11 checks pass against exact values or SQLSTATE codes (tests/verificar_rol_consulta.py). Barriers highlighted.",
    },
    evaluation: {
      title: "Measure the bias, don’t hide it.",
      body: [
        "Accuracy is scored by execution, comparing result sets instead of SQL text, against a hand-verified question set. Questions have two origins, analyzed separately: citizens’ real transparency requests, quoted verbatim, and LLM-assisted questions generated from a schema-coverage matrix. If the system scores higher on generated questions, the gap measures their bias.",
        "Only questions a human has verified enter an experiment. The documentation given to the model was frozen at v1 on 2026-09-21, and every question is dated, so any gain can be reported separately for questions written before and after the freeze.",
      ],
      ladderLabel: "Experimental ladder · 3 runs each",
      ladder: [
        { id: "C1", title: "Schema only", detail: "1a raw tables · 1b semantic views" },
        { id: "C2", title: "+ Documentation", detail: "Column comments and classification rules" },
        { id: "C3", title: "+ Retrieved examples", detail: "Similar solved questions in the prompt" },
        { id: "C4", title: "+ Self-correction", detail: "Retry on execution errors" },
      ],
      behaviorLabel: "Expected behavior · 61 drafted",
      behaviors: ["Answer", "Ambiguous", "Abstain"],
      behaviorNote:
        "Real citizen requests skew toward unanswerable questions: 78% of the first three batches asked for data the warehouse doesn’t hold. That is why answerable questions are generated.",
      rqLabel: "Research questions",
      researchQuestions: [
        "How accurately does an LLM generate correct SQL from Spanish questions about public budget data?",
        "Which context (classification docs, retrieved examples) improves that accuracy?",
        "How faithfully are document answers grounded in the sources they cite?",
        "How precisely can each question be routed automatically?",
        "What share of unanswerable questions does the system recognize as such?",
      ],
    },
  },
  caseStudiesUi: {
    repository: "Repository",
    forProject: "for",
    tabs: { problem: "Problem", architecture: "Architecture", deployment: "Deployment" },
    alsoOnGithub: "Also on GitHub",
  },
  caseStudies,
  archive: [
    {
      name: "smart-home",
      detail: "ESP32 sensors (temperature, humidity, motion, light) with a real-time Firebase dashboard and device control",
      lang: "ESP32 · Firebase",
      href: links.smartHomeRepo,
    },
    {
      name: "puntodventa",
      detail: "Cross-platform point-of-sale prototype with Firebase",
      lang: "Flutter",
      href: links.puntodventaRepo,
    },
    {
      name: "login-casita-azul",
      detail: "First Angular prototype of the Casita Azul sign-in flow",
      lang: "Angular",
      href: links.loginCasitaAzulRepo,
    },
  ],
  experience: {
    label: "Experience & credentials",
    title: "Three years from server rooms to production ML.",
    lead: "IT infrastructure, independent consulting and enterprise .NET, now shipping machine learning inside an ERP that serves about a hundred branches.",
    labels: {
      timeline: "Timeline",
      recognition: "Recognition",
      certifications: "Certifications",
      verifiable: "verifiable",
      capabilities: "Capabilities",
      verify: "Verify credential",
      earned: "Earned",
      inProgress: "In progress",
      ctf: "Capture the Flag",
    },
    timeline,
    awards: [
      { place: "1st place · team", event: "CTF MetaRed Mexico National Championship", year: "2025" },
      { place: "1st place · team", event: "ANIEI CTF at ANUIES-TIC", year: "2025" },
    ],
    certifications,
    capabilities: [
      { area: "ML & Data", items: ["LightGBM", "PyTorch", "scikit-learn", "pandas", "Calibration", "Text-to-SQL", "RAG"] },
      { area: "Languages", items: ["Python", "C#", "SQL", "TypeScript", "C", "Java"] },
      { area: "Databases", items: ["SQL Server · T-SQL", "PostgreSQL", "MySQL", "Firebase", "Dimensional modeling"] },
      { area: "Enterprise .NET", items: [".NET Framework", "WinForms", "DevExpress", "Layered architecture", "Reporting"] },
      { area: "Web & APIs", items: ["Angular", "Flask", "REST", "Supabase", "Docker"] },
      { area: "Infra & Security", items: ["Linux", "GCP", "Networking", "Least privilege", "CTF"] },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let’s build systems people can *check*.",
    body: "Open to software engineering and enterprise AI roles, internships and research collaborations, remote or on-site. As a Spanish citizen, I can work anywhere in the EU with no visa sponsorship. I reply in English or Spanish.",
    email: "Email me",
    resume: "Résumé (PDF)",
    // Served from public/. Set to null to hide the button.
    resumeHref: "/Rodrigo-Solbes-CV.pdf" as string | null,
  },
  footer: {
    colophon: "Set in Geist, Geist Mono and Newsreader. Built with Next.js, Tailwind CSS and Motion.",
    backToTop: "Back to top",
  },
};

export type Dictionary = typeof en;
