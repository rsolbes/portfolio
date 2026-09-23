// Featured case study. Every figure here comes from the repository's own logs:
// docs/bitacora_carga.md, docs/bitacora_normalizacion.md,
// docs/pruebas_seguridad.md and experiments/salidas/conjunto_evaluacion.md.

export type StageStatus = "built" | "in-progress" | "planned";

export const thesis = {
  name: "presupuesto-nlq-mx",
  repo: "https://github.com/rsolbes/presupuesto-nlq-mx",
  context: "Undergraduate thesis · Facultad de Ingeniería Tampico, UAT",
  period: "2026 – 2027",
  headline:
    "Ask Mexico's federal budget a question in Spanish, and see the SQL that answered it.",
  problem:
    "Mexico publishes its federal budget as open data, but reading it takes both data skills and government-accounting knowledge. The figures live in tables keyed by alphanumeric codes that only make sense against external catalogs; the rules that explain them live in regulatory PDFs. The data is open, but most people can't use it.",
  approach:
    "A system that answers Spanish questions by one of two routes. The data route translates the question into SQL over a documented semantic layer, validates it, runs it under a read-only role and returns the table with the exact query. The document route retrieves passages from official regulations and answers with citations. A router picks the route, and the system abstains when the evidence can't support an answer.",
  stack: ["Python 3.14", "PostgreSQL", "psycopg 3", "sqlglot", "YAML", "LLM APIs"],
  metrics: [
    { value: 1285233, label: "fact rows loaded and reconciled" },
    { value: 6, label: "fiscal years normalized, 2020–2025" },
    { value: 12, label: "conformed dimensions" },
    { value: 11, suffix: "/11", label: "security checks passing" },
  ],
} as const;

export const pipeline = {
  input: { title: "Question", detail: "Spanish, natural language" },
  router: { title: "Router", detail: "LLM vs trained classifier vs both routes", status: "planned" as StageStatus },
  dataRoute: [
    { title: "Semantic context", detail: "Descriptive views + classification docs v1", status: "built" as StageStatus },
    { title: "SQL validation", detail: "One SELECT only; reject SET and set_config()", status: "planned" as StageStatus },
    { title: "Read-only execution", detail: "consulta_nlq role, 15 s limit", status: "built" as StageStatus },
    { title: "Table + executed SQL", detail: "The query is always shown", status: "planned" as StageStatus },
  ],
  docRoute: [
    { title: "Document index", detail: "Articles and clauses with provenance", status: "planned" as StageStatus },
    { title: "Retrieval", detail: "BM25 vs dense vs hybrid, ± reranking", status: "planned" as StageStatus },
    { title: "Grounded generation", detail: "Faithfulness measured separately", status: "planned" as StageStatus },
    { title: "Answer + citations", detail: "Every claim points to a source", status: "planned" as StageStatus },
  ],
  foundation: [
    { title: "PostgreSQL warehouse", detail: "Star schema · 1,285,233 rows · validated load", status: "built" as StageStatus },
    { title: "Evaluation set", detail: "61 questions drafted · human verification gate", status: "in-progress" as StageStatus },
  ],
};

export const sourceChoice = [
  { year: "2020", format: "xlsx", reason: "CSV drops 10 rows" },
  { year: "2021", format: "xlsx", reason: "CSV drops 2 rows and blanks amounts" },
  { year: "2022", format: "xlsx", reason: "CSV drops 3 rows, adds 828,067 filler rows" },
  { year: "2023", format: "xlsx", reason: "CSV drops 1 row and corrupts a key" },
  { year: "2024", format: "xlsx", reason: "CSV overstates branch 51 by MXN 9,699 M" },
  { year: "2025", format: "csv", reason: "Formats identical; CSV parses faster" },
];

export const securityChecks = [
  { name: "Runs as the role", kind: "control", expect: "consulta_nlq" },
  { name: "Reads the semantic layer", kind: "access", expect: "1" },
  { name: "Reads the raw control schema", kind: "access", expect: "1" },
  { name: "Cannot read base tables", kind: "barrier", expect: "42501" },
  { name: "Cannot write, even with read-only off", kind: "barrier", expect: "42501" },
  { name: "Cannot create temp tables", kind: "barrier", expect: "42501" },
  { name: "Confined to its database", kind: "barrier", expect: "refused" },
  { name: "Read-only by default", kind: "safeguard", expect: "on" },
  { name: "Writes blocked by default", kind: "safeguard", expect: "25006" },
  { name: "Statement timeout set", kind: "safeguard", expect: "15s" },
  { name: "Timeout enforced (20 s → 15 s)", kind: "safeguard", expect: "57014" },
] as const;

export const roleListing = `-- The semantic layer is the only way in.
REVOKE ALL ON ALL TABLES IN SCHEMA presupuesto FROM consulta_nlq;
REVOKE CONNECT, TEMPORARY ON DATABASE presupuesto_nlq FROM PUBLIC;
GRANT  USAGE  ON SCHEMA semantica TO consulta_nlq;
GRANT  SELECT ON ALL TABLES IN SCHEMA semantica TO consulta_nlq;

-- Safeguards, not barriers: a session can SET these.
ALTER ROLE consulta_nlq SET default_transaction_read_only = on;
ALTER ROLE consulta_nlq SET statement_timeout = '15s';
ALTER ROLE consulta_nlq CONNECTION LIMIT 5;`;

export const researchQuestions = [
  "How accurately does an LLM generate correct SQL from Spanish questions about public budget data?",
  "Which context (classification docs, retrieved examples) improves that accuracy?",
  "How faithfully are document answers grounded in the sources they cite?",
  "How precisely can each question be routed automatically?",
  "What share of unanswerable questions does the system recognize as such?",
];

export const experimentLadder = [
  { id: "C1", title: "Schema only", detail: "1a raw tables · 1b semantic views" },
  { id: "C2", title: "+ Documentation", detail: "Column comments and classification rules" },
  { id: "C3", title: "+ Retrieved examples", detail: "Similar solved questions in the prompt" },
  { id: "C4", title: "+ Self-correction", detail: "Retry on execution errors" },
];

export const evalDistribution = [
  { label: "Answer", now: 24, share: 39, target: 70 },
  { label: "Ambiguous", now: 5, share: 8, target: 15 },
  { label: "Abstain", now: 32, share: 52, target: 15 },
];
