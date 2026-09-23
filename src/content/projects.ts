export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  period: string;
  visibility: "public" | "private";
  /** Shown instead of a repo link for private work. */
  privateNote?: string;
  repo?: string;
  summary: string;
  problem: string;
  architecture: string[];
  deployment: string;
  retrospective?: string;
  stack: string[];
  facts?: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "churn",
    title: "Customer Churn Prediction",
    kicker: "Applied ML · In production",
    period: "2026",
    visibility: "private",
    privateNote: "Company work · Unitam",
    summary:
      "Ranks 136K business customers of a retailer with ~100 branches by their probability of lapsing, scored monthly inside the company's .NET ERP.",
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
    repo: "https://github.com/rsolbes/Producto_Integrador_SO",
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
    repo: "https://github.com/rsolbes/proyecto_pos",
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

export const archive = [
  {
    name: "smart-home",
    detail: "ESP32 sensors (temperature, humidity, motion, light) with a real-time Firebase dashboard and device control",
    lang: "ESP32 · Firebase",
    href: "https://github.com/rsolbes/app_casita",
  },
  {
    name: "puntodventa",
    detail: "Cross-platform point-of-sale prototype with Firebase",
    lang: "Flutter",
    href: "https://github.com/rsolbes/puntodventa",
  },
  {
    name: "login-casita-azul",
    detail: "First Angular prototype of the Casita Azul sign-in flow",
    lang: "Angular",
    href: "https://github.com/rsolbes/login-casita-azul",
  },
];
