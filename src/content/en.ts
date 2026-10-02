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
      "Ranks 136K business customers of a retailer with about 100 branches by how likely they are to stop buying. Scores are updated monthly inside the company’s .NET ERP.",
    problem:
      "At-risk customers were flagged with a recency heuristic: a simple rule based on how recently they last bought. The business needed a ranked list it could act on, built from seven years of invoice history, with a risk percentage that can be trusted: a 30% risk should mean that about 3 in 10 of those customers stop buying.",
    architecture: [
      "385K customer-month snapshots from 7 years of invoices: 136K customers, 855K tickets, 104 branches, 30.5% base rate.",
      "Benchmarked a GRU over raw monthly sequences against LightGBM on RFM features (recency, frequency, monetary value). I chose LightGBM: the GRU was only slightly better on PR-AUC, while LightGBM was better calibrated and far cheaper to serve.",
      "Leakage-safe evaluation: time-based train, validation and test splits, forward-computed recency, and one shared feature function for training and scoring to prevent train/serve skew.",
    ],
    deployment:
      "Every month, a batch job scores all customers and writes the results back to SQL Server, and the ranking appears in the ERP’s reporting module. PR-AUC rose from 0.567 (the recency heuristic) to 0.617, so the ranking is better. The Brier score, which measures how accurate the probabilities are, fell from 0.260 to 0.167, so the displayed risk percentage can be trusted, not just used to rank.",
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
      "A public listings website and back office for a real-estate agency: a property catalog with maps and favorites, plus an admin console for properties, agents and users.",
    problem:
      "The agency needed its listings online and a way for staff to manage them without touching the database. Staff needed to publish properties with photo galleries, manage in-house and outside agents, control who can administer what, and see which listings get attention.",
    architecture: [
      "Two Angular 20 single-page apps: a public client (Ionic components, Leaflet maps, favorites, PDF brochures with jsPDF) and an admin console with route guards and an auth interceptor.",
      "Flask REST API with 37 endpoints over PostgreSQL, using pooled psycopg2 connections. Sign-in and session refresh are delegated to Supabase Auth.",
      "Property and agent images were moved out of the database and into Cloudflare R2 object storage through its S3-compatible API (boto3).",
      "Soft delete and restore for agents; per-listing view tracking feeds the admin dashboard.",
    ],
    deployment:
      "Built to be production-ready through my consulting practice, using a Gunicorn-served API, Docker, and static SPA builds with fallback routing. Changes were merged through pull requests (104 commits across two repositories). The client ended the project before launch.",
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
      "Two operating system simulators with live visualization: a paged memory manager built by a team of five, and a CPU scheduler.",
    problem:
      "Paging, TLB hits, page faults and scheduling policies are easy to describe but hard to visualize. The goal was to show, step by step, how an OS allocates memory and CPU time, and what happens when many processes run at once.",
    architecture: [
      "Memory manager: per-process page tables, a 4-entry TLB and FIFO page replacement over 2 MB of RAM and 4 MB of swap in 256 KB frames, with up to 50 processes and every parameter read from config.ini.",
      "Live GTK views of page tables, memory frames and TLB hit/miss statistics, plus swap operations, average access time, fragmentation and a timestamped event log.",
      "Scheduler: FCFS, SJF, Round Robin and Priority, with Gantt-chart visualization and per-algorithm performance metrics.",
    ],
    deployment:
      "Builds with a Makefile on Linux, or on Windows with MinGW. It includes technical and user manuals, plus documented test runs.",
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
      "Manages sales, inventory, customers and users for a small retailer, with role-based access, receipts and email notifications.",
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
    title: "Systems Assistant (Software Development)",
    org: "Unitam Uniformes",
    place: "Tampico, MX",
    points: [
      "Full-time development on UNITAM NT, the company’s ERP and point-of-sale platform (C#, .NET Framework 4.7.1, WinForms, DevExpress, SQL Server), used across about 100 retail branches.",
      "Shipped a customer-churn model: monthly batch scoring written back to SQL Server and surfaced in the ERP’s reports. See the case study above.",
      "Built reporting modules, using a five-layer architecture, that replaced reports people used to assemble by hand. Also wrote and optimized T-SQL procedures, fixing query timeouts and data-attribution bugs in regional sales reports.",
      "Integrated BBVA and Banamex payment terminals into the point of sale (in bank certification) and automated order generation for a key wholesale client.",
      "Gathered requirements from the marketing, sales and finance teams. My technical assessment showed that a TikTok Shop → Shopify → ERP integration wasn’t practical yet.",
    ],
    tags: ["C#", ".NET Framework", "DevExpress", "SQL Server", "T-SQL", "Python", "LightGBM"],
  },
  {
    period: "Jan – Jun 2026",
    title: "Academic Exchange, Computer Engineering",
    org: "Universidad de Burgos",
    place: "Spain",
    points: [
      "Data mining in Python (classification, clustering, association rules), network analysis with NetworkX, and reverse engineering and refactoring of Java code to meet formal quality metrics.",
    ],
    tags: ["Python", "Data mining", "NetworkX", "Java"],
  },
  {
    period: "Feb – Dec 2025",
    title: "Software Developer & IT Consultant",
    org: "Solbes Soluciones Inteligentes",
    place: "Tampico, MX",
    points: [
      "My own consulting practice, serving 10–12 local businesses from start to finish: requirements, development, deployment and support.",
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
      "Sole IT resource for the offices: kept on-site servers at about 99% uptime and set up dual-ISP failover, so if one internet provider fails, the other takes over.",
      "Administered Google Workspace and Google Cloud, and wrote Python tools for monitoring and automation, plus internal utilities and documentation portals.",
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
      "Software developer and Computer Engineering student shipping production machine learning inside an enterprise .NET ERP, moving into software engineering and enterprise AI. Text-to-SQL, retrieval and data systems built so every answer shows its evidence.",
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
      "Computer Engineering student and Systems Assistant in Tampico, Mexico, with three years of experience across software, data and IT infrastructure. I build machine learning models that run in production inside my employer’s .NET ERP. Now I’m moving into software engineering and enterprise AI, building systems that show the evidence behind every answer.",
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
    caption: "Federal budget warehouse, 2020–2025. Twelve dimension tables around one fact table. Hover over or tap a node.",
    notes: dimensionNotes,
  },
  abstract: {
    label: "Abstract",
    leadStrong: "I work where enterprise data meets language models.",
    leadRest:
      "At work, I built a calibrated churn model that predicts which customers are likely to stop buying. It runs inside a .NET ERP used by about 100 branches. In research, I’m building a system that answers Spanish questions about Mexico’s federal budget. It decides whether to answer with a generated SQL query or with passages from official regulations, and it declines to answer when the evidence isn’t there. What connects the two is building systems that are reproducible, least-privileged (each part gets only the access it needs), and honest about what they know.",
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
        body: "Every answer carries its proof: the SQL that ran, or the passage it cites. When the data can’t support an answer, the right response is to decline to answer.",
      },
      {
        title: "Reproducible by default",
        body: "Every source is recorded with its URL, date and hash. Prompts are version-controlled like code. Each configuration runs three times, and results are reported with the mean and spread.",
      },
      {
        title: "Defense in depth",
        body: "The database doesn’t trust the validator, and the validator doesn’t trust the model. Each layer is clearly labeled with what it can and can’t stop.",
      },
    ],
  },
  work: {
    label: "Selected work",
    title: "Case studies in data systems, applied AI and full-stack engineering.",
    lead: "For each one: the problem, the architecture, how it was deployed, and the real numbers behind it.",
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
      "Mexico publishes its federal budget as open data, but reading it takes both data skills and government-accounting knowledge. The figures are stored in tables keyed by alphanumeric codes that only make sense if you look them up in separate catalogs, and the rules that explain them are in regulatory PDFs. The data is open, but most people can’t use it.",
    approach:
      "The system answers Spanish questions in one of two ways. The data route turns the question into SQL over a documented semantic layer (descriptive views), validates it, runs it under a read-only database role, and returns the results along with the exact query. The document route retrieves passages from official regulations and answers with citations. A router decides which route to use, and the system declines to answer when the evidence isn’t strong enough.",
    metrics: [
      { value: 1285233, suffix: "", label: "fact rows loaded and reconciled" },
      { value: 6, suffix: "", label: "fiscal years normalized, 2020–2025" },
      { value: 12, suffix: "", label: "dimension tables" },
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
        "Either route can end with the system declining to answer. When the evidence can’t support an answer, saying so is the right result.",
    },
    tabs: { integrity: "Data integrity", privilege: "Least privilege", evaluation: "Evaluation design" },
    integrity: {
      title: "The CSV and XLSX files don’t match.",
      body: [
        "The Ministry of Finance publishes each fiscal year in both CSV and XLSX formats. A row-by-row comparison showed they don’t contain the same data, so I choose the source format separately for each year. Every correction is declared in a normalization log, because an unrecorded fix looks the same as tampering with the data.",
        "Each load runs as a single transaction. At the end, it checks that row counts and the totals for each stage (approved, accrued, paid) match the source exactly, down to the peso. If anything doesn’t match, the whole load is rolled back. So if a load log exists, validation passed.",
      ],
      headers: { year: "Year", source: "Source", why: "Why" },
      reasons: [
        "CSV drops 10 rows",
        "CSV drops 2 rows and blanks amounts",
        "CSV drops 3 rows, adds 828,067 filler rows",
        "CSV drops 1 row and corrupts a key",
        "CSV overstates branch 51 by MXN 9,699 million",
        "Both formats match; CSV loads faster",
      ],
      caption: "Table 1 · Source format per fiscal year, from docs/bitacora_normalizacion.md",
    },
    privilege: {
      title: "The database doesn’t trust the validator.",
      body: [
        "The system runs SQL written by a language model, so safety can’t depend on the validator being right. The query role can only read views: the semantic layer, plus a raw pass-through schema kept as the experiment’s control condition. In PostgreSQL, a view runs with its owner’s privileges, so views are the only way in and the base tables stay out of reach.",
        "Session settings are treated as *safeguards*, not *barriers*, because a session can change them with SET. That’s why the orchestrator must enforce its own timeout and reject SET and set_config(), a validation step that is still planned.",
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
        "Reads the raw schema (experiment control)",
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
        "Accuracy is measured by running each query and comparing its results, not its SQL text (execution accuracy), against a set of questions checked by hand. The questions come from two sources, analyzed separately: real transparency requests from citizens, quoted word for word, and questions written with an LLM’s help from a schema-coverage matrix, so they cover the schema systematically. If the system scores higher on the generated questions, the difference shows how biased those questions are.",
        "Only questions verified by a person are used in experiments. The documentation given to the model was frozen at version 1 on September 21, 2026, and every question is dated, so any gain can be reported separately for questions written before and after the freeze.",
      ],
      ladderLabel: "Experimental ladder · 3 runs each",
      ladder: [
        { id: "C1", title: "Schema only", detail: "1a raw tables · 1b semantic views" },
        { id: "C2", title: "+ Documentation", detail: "Column comments and classification rules" },
        { id: "C3", title: "+ Retrieved examples", detail: "Similar solved questions in the prompt" },
        { id: "C4", title: "+ Self-correction", detail: "Retry on execution errors" },
      ],
      behaviorLabel: "Expected behavior · 61 drafted",
      behaviors: ["Answer", "Ambiguous", "Decline"],
      behaviorNote:
        "Real citizen requests skew toward unanswerable questions: 78% of the first three batches asked for data the warehouse doesn’t hold. That’s why extra answerable questions are generated.",
      rqLabel: "Research questions",
      researchQuestions: [
        "How accurately can an LLM generate SQL from Spanish questions about public budget data?",
        "Which kinds of context (classification docs, retrieved examples) improve that accuracy?",
        "How faithfully are document answers grounded in the sources they cite?",
        "How accurately can the system pick the right route for each question?",
        "What share of unanswerable questions does the system correctly recognize as unanswerable?",
      ],
    },
  },
  financeCoach: {
    featured: "Featured · AI agent",
    context: "Personal project",
    period: "Oct 2026",
    status: "Live",
    name: "finance-coach",
    headline:
      "An AI money coach that plans every payment around every paycheck, and leaves the arithmetic to tested code.",
    viewRepo: "View repository",
    labels: {
      app: "The app",
      problem: "Problem",
      approach: "Approach",
      agent: "How the agent works",
      decisions: "Engineering decisions",
    },
    screens: [
      { id: "coach", label: "Coach", alt: "The coach planning payments paycheck by paycheck, with amounts and dates" },
      {
        id: "dashboard",
        label: "Dashboard",
        alt: "Dashboard with cash available, upcoming payments with a running balance, and the months ahead",
      },
      { id: "statement", label: "Statement import", alt: "Transactions read from a bank statement, ready to review before saving" },
      { id: "spending", label: "Spending", alt: "Spending by category, top merchants and the transaction list" },
    ],
    phoneAlt: "The dashboard on a phone, installed as an app",
    screensNote: "Screenshots use made-up data.",
    problem:
      "Banking apps show your balances, but not whether this month’s payments fit within this month’s paychecks. With weekly pay, several cards, interest-free installments (MSI) and small loans, the real question is about timing: what’s due before the next payday, and which part of each card balance must be paid in full to avoid interest.",
    approach:
      "A chat coach powered by Claude. It uses tools to look up the user’s real accounts, payment plans and transactions, and it can update them. Every number it quotes comes from a deterministic calculation engine, not from the model. Users upload bank statements and receipts as PDFs, phone screenshots or CSV files, and these become transactions the user reviews.",
    metrics: [
      { value: 19, suffix: "", label: "agent tools to read, calculate and act" },
      { value: 41, suffix: "", label: "automated tests on the engine and tools" },
      { value: 3, suffix: "", label: "input formats: PDF, screenshot, CSV" },
      { value: 2, suffix: "", label: "reply languages: Spanish and English" },
    ],
    agent: {
      ask: { title: "You ask", detail: "“Plan my next 4 paychecks”" },
      model: { title: "Claude", detail: "Streaming tool loop with adaptive thinking" },
      answer: { title: "Answer", detail: "Streamed back; every figure comes from a tool" },
      toolsTitle: "19 tools",
      groups: [
        {
          title: "Read",
          tools: [
            "get_financial_overview",
            "get_cash_flow",
            "get_monthly_projection",
            "get_spending_summary",
            "search_transactions",
            "list_records",
            "list_payment_targets",
          ],
        },
        { title: "Calculate", tools: ["calculate", "plan_payoff"] },
        {
          title: "Act",
          tools: [
            "save_record",
            "delete_record",
            "record_payment",
            "record_money_in",
            "log_transaction",
            "update_transaction",
            "delete_transaction",
            "set_profile",
            "remember",
            "forget",
          ],
        },
      ],
      engine: {
        title: "Calculation engine",
        detail: "Due dates from each card’s statement day · MSI vs. pay-in-full balance · cash balance through every payday",
      },
      store: { title: "libSQL / Turso", detail: "Accounts, plans, transactions, goals and chat history" },
    },
    decisions: [
      {
        title: "Math in code, not in the model",
        body: "The model never does arithmetic. Pure, tested functions compute schedules, due dates and balances; the coach reads their results or calls a calculate tool.",
      },
      {
        title: "Tools that act, with guardrails",
        body: "Inputs are validated with Zod before any tool runs. Recording a payment updates balances, installment progress and due dates in a single step, and a duplicate check stops the same payment from being recorded twice.",
      },
      {
        title: "Extraction with a human in the loop",
        body: "The model reads statements and receipts and returns structured output validated against a schema. If screenshots overlap, repeated rows are removed in the same request, and every row is reviewed before it’s saved.",
      },
      {
        title: "Cache-friendly, append-only history",
        body: "Each conversation keeps the same system prompt from start to finish, and new messages are only appended, never edited. This keeps prompt caching effective across turns.",
      },
    ],
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
    lead: "From IT infrastructure and independent consulting to enterprise .NET, and now machine learning inside an ERP used by about 100 branches.",
    labels: {
      timeline: "Timeline",
      recognition: "Recognition",
      certifications: "Certifications",
      verifiable: "verifiable credentials",
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
    body: "I’m open to software engineering and enterprise AI roles, internships and research collaborations, remote or on-site. As a Spanish citizen, I can work anywhere in the EU without needing visa sponsorship. I reply in English or Spanish.",
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
