// Language-neutral data shared by every locale: links, identifiers, numbers.

export const links = {
  // Cloudflare Email Routing forwards this to the personal inbox.
  email: "hola@rodrigosolbes.com",
  github: "https://github.com/rsolbes",
  // Set any of these to null to hide its button.
  linkedin: "https://www.linkedin.com/in/rsolbes/" as string | null,
  resume: "/Rodrigo-Solbes-CV.pdf" as string | null,
  thesisRepo: "https://github.com/rsolbes/presupuesto-nlq-mx",
  osSimulatorsRepo: "https://github.com/rsolbes/Producto_Integrador_SO",
  posRepo: "https://github.com/rsolbes/proyecto_pos",
  smartHomeRepo: "https://github.com/rsolbes/app_casita",
  puntodventaRepo: "https://github.com/rsolbes/puntodventa",
  loginCasitaAzulRepo: "https://github.com/rsolbes/login-casita-azul",
};

// Public verification pages behind LinkedIn's "Show credential" buttons.
// Left off on purpose (IT-support track, not the SWE / Enterprise AI market):
// Cisco CCST Cybersecurity, Networking and IT Support; Certiport Network
// Security Support Technician and IT Specialist: Device Configuration.
export const credentialUrls = {
  azureData: "https://www.credly.com/badges/ac7c2e61-5b5d-43f0-80ed-a5879a675454/public_url",
  itsDatabases: "https://www.credly.com/badges/95b426a5-0a74-4f7c-aa20-65e0f86e6809/public_url",
  genAi: "https://www.credly.com/badges/57c66002-0be5-4e06-9fd4-85c556f67f32/public_url",
  googleCyber: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/3GLGYF4WKYMN",
};

// Thesis figures, from the thesis repository's own logs.
export const thesisStack = ["Python 3.14", "PostgreSQL", "psycopg 3", "sqlglot", "YAML", "LLM APIs"];

export const sourceFormats = [
  { year: "2020", format: "xlsx" },
  { year: "2021", format: "xlsx" },
  { year: "2022", format: "xlsx" },
  { year: "2023", format: "xlsx" },
  { year: "2024", format: "xlsx" },
  { year: "2025", format: "csv" },
] as const;

export const securityCheckResults = [
  { kind: "control", expect: "consulta_nlq" },
  { kind: "access", expect: "1" },
  { kind: "access", expect: "1" },
  { kind: "barrier", expect: "42501" },
  { kind: "barrier", expect: "42501" },
  { kind: "barrier", expect: "42501" },
  { kind: "barrier", expect: "refused" },
  { kind: "safeguard", expect: "on" },
  { kind: "safeguard", expect: "25006" },
  { kind: "safeguard", expect: "15s" },
  { kind: "safeguard", expect: "57014" },
] as const;

export const evalCounts = [
  { now: 24, share: 39, target: 70 },
  { now: 5, share: 8, target: 15 },
  { now: 32, share: 52, target: 15 },
] as const;

// The twelve conformed dimensions of the thesis warehouse, with row counts
// from docs/bitacora_carga.md. Order places long names where they fit.
export const schemaDimensions = [
  { name: "programa_presupuestario", rows: 901 },
  { name: "unidad_responsable", rows: 1926 },
  { name: "ramo", rows: 50 },
  { name: "partida", rows: 459 },
  { name: "modalidad", rows: 23 },
  { name: "entidad_federativa", rows: 34 },
  { name: "actividad_institucional", rows: 375 },
  { name: "fuente_financiamiento", rows: 6 },
  { name: "finalidad", rows: 4 },
  { name: "funcion", rows: 28 },
  { name: "subfuncion", rows: 91 },
  { name: "tipo_gasto", rows: 9 },
] as const;

export type DimensionName = (typeof schemaDimensions)[number]["name"];
