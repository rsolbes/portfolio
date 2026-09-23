// Sources: Rodrigo_Solbes_CV.pdf and linkedin.com/in/rsolbes (September 2026).

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  place?: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Jul 2026 – Present",
    current: true,
    title: "Systems Auxiliary (Software Development)",
    org: "Unitam Uniformes",
    place: "Tampico, MX",
    points: [
      "Full-time development on UNITAM NT, the company's ERP and point-of-sale platform (C#, .NET Framework 4.7.1, WinForms, DevExpress, SQL Server), used across ~100 retail branches.",
      "Shipped a customer-churn model: monthly batch scoring written back to SQL Server and surfaced in the ERP's reports. See the case study above.",
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
      "GPA 9.13 / 10. Thesis in progress: natural-language querying of Mexico's public budget data (featured above).",
      "Coursework spans linear algebra, probability and statistics, numerical methods, algorithms, operating systems, networks and databases, with AI and embedded systems in the final year.",
    ],
    tags: ["Algorithms", "Operating systems", "Databases", "AI"],
  },
];

export type Certification = {
  name: string;
  code?: string;
  issuer: string;
  status: "earned" | "in-progress";
  date?: string;
  href?: string;
  note?: string;
};

// Credential links are the public verification pages behind LinkedIn's
// "Show credential" buttons. The block hides itself while the list is empty.
export const certifications: Certification[] = [
  {
    name: "Azure Data Fundamentals",
    code: "DP-900",
    issuer: "Microsoft",
    status: "earned",
    date: "Jul 2026",
    href: "https://www.credly.com/badges/ac7c2e61-5b5d-43f0-80ed-a5879a675454/public_url",
  },
  {
    name: "IT Specialist: Databases",
    issuer: "Certiport · Pearson VUE",
    status: "earned",
    date: "Jul 2026",
    href: "https://www.credly.com/badges/95b426a5-0a74-4f7c-aa20-65e0f86e6809/public_url",
  },
  {
    name: "Generative AI Foundations",
    issuer: "Certiport · Pearson VUE",
    status: "earned",
    date: "Jul 2026",
    href: "https://www.credly.com/badges/57c66002-0be5-4e06-9fd4-85c556f67f32/public_url",
  },
  {
    name: "Google Cybersecurity",
    code: "Professional Certificate",
    issuer: "Google",
    status: "earned",
    date: "Jul 2026",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/3GLGYF4WKYMN",
  },
];
// Left off on purpose (IT-support track, not the SWE / Enterprise AI market):
// Cisco CCST Cybersecurity, Networking and IT Support; Certiport Network
// Security Support Technician and IT Specialist: Device Configuration.
// All are on LinkedIn if a role calls for them.

export const awards = [
  { place: "1st place · team", event: "CTF MetaRed Mexico National Championship", year: "2025" },
  { place: "1st place · team", event: "ANIEI CTF at ANUIES-TIC", year: "2025" },
];

export const capabilities = [
  {
    area: "ML & Data",
    items: ["LightGBM", "PyTorch", "scikit-learn", "pandas", "Calibration", "Text-to-SQL", "RAG"],
  },
  {
    area: "Languages",
    items: ["Python", "C#", "SQL", "TypeScript", "C", "Java"],
  },
  {
    area: "Databases",
    items: ["SQL Server · T-SQL", "PostgreSQL", "MySQL", "Firebase", "Dimensional modeling"],
  },
  {
    area: "Enterprise .NET",
    items: [".NET Framework", "WinForms", "DevExpress", "Layered architecture", "Reporting"],
  },
  {
    area: "Web & APIs",
    items: ["Angular", "Flask", "REST", "Supabase", "Docker"],
  },
  {
    area: "Infra & Security",
    items: ["Linux", "GCP", "Networking", "Least privilege", "CTF"],
  },
];
