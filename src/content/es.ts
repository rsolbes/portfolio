// Versión en español. Debe tener exactamente la misma forma que en.ts
// (TypeScript lo verifica): si falta una traducción, el build falla.
//
// Marcado ligero: *texto* se muestra con énfasis donde el campo lo indica.

import type { Dictionary } from "./en";
import { credentialUrls, links, type DimensionName } from "./shared";
import type { CaseStudy, Certification, NavItem, Stage, TimelineEntry } from "./types";

const nav: NavItem[] = [
  { id: "work", label: "Trabajo" },
  { id: "experience", label: "Experiencia" },
  { id: "contact", label: "Contacto" },
];

const dimensionNotes: Record<DimensionName, string> = {
  programa_presupuestario: "Programa presupuestario",
  unidad_responsable: "Unidad responsable dentro de un ramo",
  ramo: "Ramo administrativo: secretaría o dependencia",
  partida: "Partida del clasificador por objeto del gasto",
  modalidad: "Modalidad del programa, por clave de letra",
  entidad_federativa: "Entidad federativa: clasificación geográfica",
  actividad_institucional: "Actividad institucional",
  fuente_financiamiento: "Fuente de financiamiento",
  finalidad: "Clasificación funcional, nivel 1",
  funcion: "Clasificación funcional, nivel 2",
  subfuncion: "Clasificación funcional, nivel 3",
  tipo_gasto: "Tipo de gasto",
};

const dataRoute: Stage[] = [
  { title: "Contexto semántico", detail: "Vistas descriptivas + documentación de clasificaciones v1", status: "built" },
  { title: "Validación del SQL", detail: "Un solo SELECT; rechaza SET y set_config()", status: "planned" },
  { title: "Ejecución de solo lectura", detail: "Rol consulta_nlq, límite de 15 s", status: "built" },
  { title: "Tabla + SQL ejecutado", detail: "La consulta siempre a la vista", status: "planned" },
];

const docRoute: Stage[] = [
  { title: "Índice documental", detail: "Artículos y fracciones con su procedencia", status: "planned" },
  { title: "Recuperación", detail: "BM25 vs densa vs híbrida, ± reordenamiento", status: "planned" },
  { title: "Generación fundamentada", detail: "La fidelidad se mide por separado", status: "planned" },
  { title: "Respuesta + citas", detail: "Cada afirmación apunta a su fuente", status: "planned" },
];

const foundation: Stage[] = [
  { title: "Almacén en PostgreSQL", detail: "Esquema en estrella · 1,285,233 filas · carga validada", status: "built" },
  { title: "Conjunto de evaluación", detail: "61 preguntas redactadas · verificación humana", status: "in-progress" },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "churn",
    title: "Predicción de abandono de clientes",
    kicker: "ML aplicado · En producción",
    period: "2026",
    visibility: "private",
    privateNote: "Trabajo en empresa · Unitam",
    summary:
      "Ordena a 136 mil clientes empresariales de una cadena con ~100 sucursales según su probabilidad de dejar de comprar, con una puntuación mensual dentro del ERP en .NET de la empresa.",
    problem:
      "Los clientes en riesgo se detectaban con una heurística de recencia. El negocio necesitaba una lista ordenada con la que pudiera actuar, con un porcentaje de riesgo que signifique lo que dice, construida a partir de siete años de historial de facturación.",
    architecture: [
      "385 mil cortes cliente-mes a partir de 7 años de facturas: 136 mil clientes, 855 mil tickets, 104 sucursales y una tasa base de 30.5%.",
      "Comparé una GRU sobre secuencias mensuales crudas contra LightGBM con variables RFM. Se implementó LightGBM: la ventaja de la GRU en PR-AUC era marginal, y LightGBM estaba mejor calibrado y era mucho más barato de servir.",
      "Evaluación sin fuga de información: particiones temporales de entrenamiento, validación y prueba, recencia calculada hacia adelante y una sola función de variables compartida entre entrenamiento y puntuación, para evitar desfases entre ambos.",
    ],
    deployment:
      "La puntuación mensual por lotes se escribe de vuelta en SQL Server y el ranking aparece en el módulo de reportes del ERP. El PR-AUC subió de 0.567 (la heurística de recencia) a 0.617 y el Brier score bajó de 0.260 a 0.167, así que el porcentaje de riesgo mostrado está calibrado: no es solo un orden.",
    stack: ["Python", "LightGBM", "PyTorch", "pandas", "SQL Server", "C# · .NET"],
    facts: [
      { value: "0.617", label: "PR-AUC (antes 0.567)" },
      { value: "0.167", label: "Brier (antes 0.260)" },
      { value: "385K", label: "cortes de entrenamiento" },
    ],
  },
  {
    slug: "casita-azul",
    title: "Plataforma inmobiliaria Casita Azul",
    kicker: "Full-stack · Proyecto para cliente",
    period: "ago – dic 2025",
    visibility: "private",
    privateNote: "Repositorios privados",
    summary:
      "Sitio público de propiedades y panel administrativo para una inmobiliaria: catálogo con mapas y favoritos, y una consola para gestionar propiedades, agentes y usuarios.",
    problem:
      "La inmobiliaria necesitaba publicar sus propiedades y que su personal las administrara sin tocar la base de datos: publicar inmuebles con galerías de fotos, gestionar agentes internos y externos, controlar quién administra qué y ver qué propiedades generan interés.",
    architecture: [
      "Dos aplicaciones Angular 20 de una sola página: un cliente público (componentes Ionic, mapas con Leaflet, favoritos, fichas en PDF con jsPDF) y una consola de administración con guards de rutas e interceptor de autenticación.",
      "API REST en Flask con 37 endpoints sobre PostgreSQL, con conexiones psycopg2 en pool. El inicio y la renovación de sesión se delegan a Supabase Auth.",
      "Las imágenes de propiedades y agentes salieron de la base de datos hacia almacenamiento de objetos en Cloudflare R2, mediante su API compatible con S3 (boto3).",
      "Borrado lógico y restauración de agentes; el conteo de visitas por propiedad alimenta el dashboard administrativo.",
    ],
    deployment:
      "Construido listo para producción desde mi práctica de consultoría: API servida con Gunicorn, Docker y builds estáticos de las SPA con enrutamiento de respaldo, con cambios integrados mediante pull requests (104 commits en dos repositorios). El cliente canceló el proyecto antes del lanzamiento.",
    stack: ["Angular 20", "TypeScript", "Flask", "PostgreSQL", "Supabase Auth", "Cloudflare R2", "Docker"],
    facts: [
      { value: "37", label: "endpoints de API" },
      { value: "104", label: "commits" },
      { value: "2", label: "apps Angular" },
    ],
  },
  {
    slug: "os-simulators",
    title: "Simuladores de SO: memoria y planificación de CPU",
    kicker: "Sistemas · C · GTK",
    period: "nov – dic 2025",
    visibility: "public",
    repo: links.osSimulatorsRepo,
    summary:
      "Dos simuladores de sistemas operativos con visualización en vivo: un administrador de memoria paginada, hecho en un equipo de cinco, y un planificador de CPU.",
    problem:
      "La paginación, los aciertos de TLB, los fallos de página y las políticas de planificación son fáciles de describir y difíciles de ver. El objetivo era mostrar, paso a paso, cómo un sistema operativo asigna memoria y tiempo de CPU, y qué pasa bajo presión con muchos procesos en ejecución.",
    architecture: [
      "Administrador de memoria: tablas de páginas por proceso, TLB de 4 entradas y reemplazo FIFO sobre 2 MB de RAM y 4 MB de swap en marcos de 256 KB, con hasta 50 procesos y todos los parámetros leídos de config.ini.",
      "Vistas en vivo con GTK de tablas de páginas, marcos de memoria y estadísticas de aciertos y fallos de TLB, además de operaciones de swap, tiempo promedio de acceso, fragmentación y una bitácora de eventos con marca de tiempo.",
      "Planificador: FCFS, SJF, Round Robin y Prioridad, con diagrama de Gantt y métricas de desempeño por algoritmo.",
    ],
    deployment:
      "Se compila con un Makefile en Linux, o en Windows con MinGW. Incluye manuales técnico y de usuario, y pruebas documentadas.",
    stack: ["C99", "GTK", "Make", "Linux · MinGW"],
    facts: [
      { value: "50", label: "procesos máx." },
      { value: "4", label: "políticas de planificación" },
      { value: "FIFO", label: "reemplazo de páginas" },
    ],
  },
  {
    slug: "pos",
    title: "Sistema de punto de venta",
    kicker: "Full-stack · Comercio",
    period: "ago – dic 2025",
    visibility: "public",
    repo: links.posRepo,
    summary:
      "Ventas, inventario, clientes y usuarios para un pequeño comercio, con acceso por roles, tickets y notificaciones por correo.",
    problem:
      "Un comercio necesitaba registrar ventas en tiempo real, mantener el inventario exacto, administrar clientes y personal, y dar reportes a los gerentes, con cada rol viendo solo lo que le corresponde.",
    architecture: [
      "Aplicación Flask sobre MySQL, con el esquema SQL y los procedimientos almacenados versionados en el repositorio.",
      "Tres roles (vendedor, gerente, administrador), aplicados en el backend y reflejados en la interfaz.",
      "Validación en cliente y servidor, incluida una protección contra inventario negativo; un proceso aparte envía notificaciones por SMTP.",
    ],
    deployment: "Corre como servidor Flask con MySQL, con la configuración SMTP en su propio archivo.",
    retrospective:
      "Siguiente iteración: reemplazar el hash MD5 de contraseñas por Argon2id y mover las credenciales SMTP a variables de entorno.",
    stack: ["Python", "Flask", "MySQL", "JavaScript"],
  },
];

const timeline: TimelineEntry[] = [
  {
    period: "jul 2026 – actual",
    current: true,
    title: "Auxiliar de Sistemas (Desarrollo de Software)",
    org: "Unitam Uniformes",
    place: "Tampico, MX",
    points: [
      "Desarrollo de tiempo completo en UNITAM NT, el ERP y punto de venta de la empresa (C#, .NET Framework 4.7.1, WinForms, DevExpress, SQL Server), usado en ~100 sucursales.",
      "Implementé un modelo de abandono de clientes: puntuación mensual por lotes escrita en SQL Server y visible en los reportes del ERP. Ver el caso de estudio arriba.",
      "Construí módulos de reportes en una arquitectura de cinco capas que reemplazaron reportes armados a mano, y escribí u optimicé procedimientos en T-SQL, corrigiendo timeouts y errores de atribución en reportes de ventas regionales.",
      "Integré terminales de pago de BBVA y Banamex al punto de venta (en certificación bancaria) y automaticé la generación de pedidos para un cliente mayorista clave.",
      "Levanté requerimientos con marketing, ventas y finanzas; mi evaluación técnica descartó, por ahora, una integración TikTok Shop → Shopify → ERP.",
    ],
    tags: ["C#", ".NET Framework", "DevExpress", "SQL Server", "T-SQL", "Python", "LightGBM"],
  },
  {
    period: "ene – jun 2026",
    title: "Intercambio académico, Ingeniería Informática",
    org: "Universidad de Burgos",
    place: "España",
    points: [
      "Minería de datos en Python (clasificación, clustering, asociación), análisis de redes con NetworkX, e ingeniería inversa y refactorización de código Java con métricas formales de calidad.",
    ],
    tags: ["Python", "Minería de datos", "NetworkX", "Java"],
  },
  {
    period: "feb – dic 2025",
    title: "Desarrollador de Software y Consultor de TI",
    org: "Solbes Soluciones Inteligentes",
    place: "Tampico, MX",
    points: [
      "Práctica independiente para 10–12 negocios locales, de principio a fin: desde los requerimientos hasta el despliegue y el soporte.",
      "Entregué software para clientes, incluida una plataforma inmobiliaria y una app de cuestionarios para un consultorio de psicología, además de sistemas de punto de venta con inventario y reportes. Scripts de automatización redujeron la captura manual en 60%.",
      "Instalé servidores, redes y sistemas de videovigilancia para pequeñas empresas.",
    ],
    tags: ["Python", "TypeScript", "Angular", "Flask", "PostgreSQL", "Docker"],
  },
  {
    period: "ene 2023 – sep 2025",
    title: "Soporte e Infraestructura de TI (medio tiempo)",
    org: "CIYASA S.A. de C.V.",
    place: "Tampico, MX",
    points: [
      "Único responsable de TI en las oficinas: servidores locales con ~99% de disponibilidad y una red con doble ISP y conmutación por falla, sin punto único de falla.",
      "Administré Google Workspace y Cloud, y escribí herramientas en Python para monitoreo y automatización, además de utilidades internas y portales de documentación.",
    ],
    tags: ["Python", "Linux", "GCP", "Redes"],
  },
  {
    period: "ago 2022 – may 2027",
    title: "Ingeniería en Sistemas Computacionales",
    org: "Universidad Autónoma de Tamaulipas",
    place: "Tampico, MX",
    points: [
      "Promedio 9.13 / 10. Tesis en curso: consultas en lenguaje natural sobre el presupuesto público de México (destacada arriba).",
      "Plan de estudios con álgebra lineal, probabilidad y estadística, métodos numéricos, algoritmos, sistemas operativos, redes y bases de datos, e IA y sistemas embebidos en el último año.",
    ],
    tags: ["Algoritmos", "Sistemas operativos", "Bases de datos", "IA"],
  },
];

const certifications: Certification[] = [
  { name: "Azure Data Fundamentals", code: "DP-900", issuer: "Microsoft", status: "earned", date: "jul 2026", href: credentialUrls.azureData },
  { name: "IT Specialist: Databases", issuer: "Certiport · Pearson VUE", status: "earned", date: "jul 2026", href: credentialUrls.itsDatabases },
  { name: "Generative AI Foundations", issuer: "Certiport · Pearson VUE", status: "earned", date: "jul 2026", href: credentialUrls.genAi },
  { name: "Google Cybersecurity", code: "Certificado profesional", issuer: "Google", status: "earned", date: "jul 2026", href: credentialUrls.googleCyber },
];

export const es: Dictionary = {
  meta: {
    title: "Rodrigo Solbes · Ingeniería de Software e IA",
    description:
      "Desarrollador de software y estudiante de Ingeniería en Sistemas Computacionales que lleva machine learning a producción dentro de un ERP empresarial en .NET, dando el salto a la Ingeniería de Software y la IA empresarial. Text-to-SQL, recuperación de información y sistemas de datos en los que cada respuesta muestra su evidencia.",
    ogLocale: "es_MX",
  },
  site: { name: "Rodrigo Solbes", location: "Tampico, México" },
  ui: {
    skipToContent: "Saltar al contenido",
    primaryNav: "Principal",
    backToTopAria: "volver arriba",
    githubProfile: "Perfil de GitHub",
    themeToggle: "Cambiar entre tema claro y oscuro",
    themeTitle: "Cambiar tema",
    languageSwitch: { label: "EN", aria: "View this page in English" },
    status: { built: "Construido", "in-progress": "En curso", planned: "Planeado" },
    opensNewTab: "se abre en una pestaña nueva",
    copied: "Copiado al portapapeles",
    now: "actual",
    target: "meta",
  },
  nav,
  hero: {
    nowBadge: "Ahora",
    nowText: "Tesis: preguntas en español → SQL sobre el presupuesto público",
    tagline: "Ingeniería de software y sistemas de IA *que puedes verificar.*",
    intro:
      "Estudiante de Ingeniería en Sistemas Computacionales y Auxiliar de Sistemas en Tampico, México, con tres años entre software, datos e infraestructura de TI. Llevo machine learning a producción dentro de un ERP empresarial en .NET y estoy dando el salto a la Ingeniería de Software y la IA empresarial, construyendo sistemas en los que cada respuesta muestra su evidencia.",
    ctaPrimary: "Ver casos de estudio",
    ctaContact: "Contacto",
    facts: [
      { label: "Enfoque", value: "ML aplicado · Text-to-SQL" },
      { label: "Ubicación", value: "Tampico, MX · ES / EN" },
      { label: "Puedo trabajar en", value: "México · UE (ciudadano español)" },
      { label: "Carrera", value: "Ing. en Sistemas · UAT ’27" },
    ],
  },
  figure: {
    status: "cargado · conciliado",
    title: "Esquema en estrella del almacén del presupuesto federal de México",
    description:
      "Una tabla de hechos central, hecho_gasto, con 1,285,233 filas, unida a doce tablas de dimensiones.",
    rows: "filas",
    caption:
      "Almacén del presupuesto federal, 2020–2025. Doce dimensiones conformadas alrededor de una tabla de hechos. Pasa el cursor sobre un nodo.",
    notes: dimensionNotes,
  },
  abstract: {
    label: "Resumen",
    leadStrong: "Trabajo donde los datos empresariales se encuentran con los modelos de lenguaje.",
    leadRest:
      "En mi empleo, opero un modelo calibrado de abandono de clientes dentro de un ERP en .NET que atiende a cerca de cien sucursales. En investigación, construyo un sistema que responde preguntas en español sobre el presupuesto federal de México, eligiendo entre SQL generado y normatividad recuperada, y absteniéndose cuando la evidencia no está. Lo que une ambas cosas: sistemas reproducibles, con mínimo privilegio y honestos sobre lo que saben.",
    keywordsLabel: "Palabras clave",
    keywords: [
      "text-to-SQL",
      "generación aumentada por recuperación",
      "modelado de abandono",
      "calibración de probabilidades",
      "modelado dimensional",
      "mínimo privilegio",
      ".NET empresarial",
    ],
    principles: [
      {
        title: "Evidencia antes que afirmaciones",
        body: "Cada respuesta lleva su prueba: el SQL que se ejecutó o el fragmento que cita. Cuando los datos no sustentan una respuesta, la salida correcta es abstenerse.",
      },
      {
        title: "Reproducible por defecto",
        body: "Fuentes registradas con URL, fecha y hash. Prompts versionados como código. Tres corridas por configuración, reportadas con media y dispersión.",
      },
      {
        title: "Defensa en profundidad",
        body: "La base de datos no confía en el validador, y el validador no confía en el modelo. Cada capa se nombra por lo que puede y no puede detener.",
      },
    ],
  },
  work: {
    label: "Trabajo seleccionado",
    title: "Casos de estudio en sistemas de datos, IA aplicada e ingeniería full-stack.",
    lead: "El problema, la arquitectura y cómo llega a producción, con las cifras reales detrás de cada uno.",
  },
  thesis: {
    featured: "Destacado",
    context: "Tesis de licenciatura · Facultad de Ingeniería Tampico, UAT",
    period: "2026 – 2027",
    name: "presupuesto-nlq-mx",
    headline: "Hazle una pregunta en español al presupuesto federal de México y ve el SQL que la respondió.",
    viewRepo: "Ver repositorio",
    labels: { problem: "Problema", approach: "Enfoque", architecture: "Arquitectura", notes: "Notas de ingeniería" },
    problem:
      "México publica su presupuesto federal como datos abiertos, pero leerlo exige saber de análisis de datos y de contabilidad gubernamental. Las cifras viven en tablas con claves alfanuméricas que solo tienen sentido junto a catálogos externos; las reglas que las explican viven en PDFs normativos. Los datos son abiertos, pero la mayoría de la gente no puede usarlos.",
    approach:
      "Un sistema que responde preguntas en español por una de dos rutas. La ruta de datos traduce la pregunta a SQL sobre una capa semántica documentada, lo valida, lo ejecuta con un rol de solo lectura y devuelve la tabla junto con la consulta exacta. La ruta documental recupera fragmentos de la normatividad oficial y responde con citas. Un enrutador elige la ruta, y el sistema se abstiene cuando la evidencia no alcanza para responder.",
    metrics: [
      { value: 1285233, suffix: "", label: "filas de hechos cargadas y conciliadas" },
      { value: 6, suffix: "", label: "ejercicios fiscales normalizados, 2020–2025" },
      { value: 12, suffix: "", label: "dimensiones conformadas" },
      { value: 11, suffix: "/11", label: "pruebas de seguridad aprobadas" },
    ],
    pipeline: {
      figure: "Fig. 2",
      caption: "Arquitectura del sistema y estado de construcción",
      input: { title: "Pregunta", detail: "En español, lenguaje natural" },
      router: { title: "Enrutador", detail: "LLM vs clasificador entrenado vs ambas rutas", status: "planned" },
      dataLane: "Ruta de datos · text-to-SQL",
      docLane: "Ruta documental · RAG",
      dataRoute,
      docRoute,
      foundationsLabel: "Cimientos",
      foundation,
      abstention:
        "Cualquiera de las dos rutas puede terminar en abstención. Cuando la evidencia no sustenta una respuesta, decirlo es la salida correcta.",
    },
    tabs: { integrity: "Integridad de datos", privilege: "Mínimo privilegio", evaluation: "Diseño de evaluación" },
    integrity: {
      title: "El CSV y el XLSX no coinciden.",
      body: [
        "La Secretaría de Hacienda publica cada ejercicio fiscal en CSV y en XLSX. Un cruce fila por fila mostró que no son equivalentes, así que el formato de origen se elige por año. Toda corrección queda declarada en una bitácora de normalización, porque una corrección silenciosa es indistinguible de alterar el dato.",
        "La carga corre en una sola transacción y termina conciliando conteos de filas y totales por etapa (aprobado, devengado, pagado) contra la fuente, al peso. Cualquier diferencia revierte la carga completa. Si la bitácora de carga existe, la validación pasó.",
      ],
      headers: { year: "Año", source: "Fuente", why: "Motivo" },
      reasons: [
        "El CSV pierde 10 filas",
        "El CSV pierde 2 filas y deja importes en blanco",
        "El CSV pierde 3 filas y agrega 828,067 de relleno",
        "El CSV pierde 1 fila y corrompe una llave",
        "El CSV reporta MXN 9,699 M de más en el ramo 51",
        "Formatos idénticos; el CSV se lee más rápido",
      ],
      caption: "Tabla 1 · Formato de origen por ejercicio, de docs/bitacora_normalizacion.md",
    },
    privilege: {
      title: "La base de datos no confía en el validador.",
      body: [
        "El sistema ejecuta SQL escrito por un modelo de lenguaje, así que la seguridad no puede depender de que el validador acierte. El rol de consulta solo puede leer las vistas semánticas. En PostgreSQL una vista se ejecuta con los privilegios de su dueño, lo que convierte a la capa semántica en la única puerta de entrada.",
        "Los ajustes de sesión se tratan como *salvaguardas*, no como *barreras*: la propia sesión puede cambiarlos con SET. Por eso el orquestador debe imponer su propio tiempo límite y rechazar SET y set_config().",
      ],
      listing: `-- La capa semántica es la única puerta de entrada.
REVOKE ALL ON ALL TABLES IN SCHEMA presupuesto FROM consulta_nlq;
REVOKE CONNECT, TEMPORARY ON DATABASE presupuesto_nlq FROM PUBLIC;
GRANT  USAGE  ON SCHEMA semantica TO consulta_nlq;
GRANT  SELECT ON ALL TABLES IN SCHEMA semantica TO consulta_nlq;

-- Salvaguardas, no barreras: la sesión puede cambiarlas con SET.
ALTER ROLE consulta_nlq SET default_transaction_read_only = on;
ALTER ROLE consulta_nlq SET statement_timeout = '15s';
ALTER ROLE consulta_nlq CONNECTION LIMIT 5;`,
      listingCaption: "Listado 1 · Rol de mínimo privilegio, resumido de src/sql/03_rol_consulta.sql",
      checks: [
        "Corre realmente como el rol",
        "Lee la capa semántica",
        "Lee el esquema crudo de control",
        "No lee las tablas base",
        "No escribe aun sin solo lectura",
        "No crea tablas temporales",
        "Confinado a su base",
        "Solo lectura por defecto",
        "Escritura bloqueada por defecto",
        "Tiempo límite configurado",
        "Tiempo límite efectivo (20 s → 15 s)",
      ],
      checksCaption:
        "Tabla 2 · 11 de 11 pruebas aprobadas contra valores exactos o códigos SQLSTATE (tests/verificar_rol_consulta.py). Barreras resaltadas.",
    },
    evaluation: {
      title: "Medir el sesgo, no esconderlo.",
      body: [
        "La exactitud se mide por ejecución, comparando conjuntos de resultados y no el texto del SQL, contra un conjunto de preguntas verificado a mano. Las preguntas tienen dos orígenes que se analizan por separado: solicitudes de transparencia reales de ciudadanos, citadas textualmente, y preguntas generadas con asistencia de un LLM a partir de una matriz de cobertura del esquema. Si el sistema acierta más en las generadas, esa diferencia mide su sesgo.",
        "Solo las preguntas verificadas por una persona entran a un experimento. La documentación que recibe el modelo se congeló en su v1 el 2026-09-21 y cada pregunta tiene fecha, así que la mejora puede reportarse por separado para las preguntas anteriores y posteriores al congelamiento.",
      ],
      ladderLabel: "Escalera experimental · 3 corridas cada una",
      ladder: [
        { id: "C1", title: "Solo esquema", detail: "1a tablas crudas · 1b vistas semánticas" },
        { id: "C2", title: "+ Documentación", detail: "Comentarios de columnas y reglas de clasificación" },
        { id: "C3", title: "+ Ejemplos recuperados", detail: "Preguntas resueltas similares en el prompt" },
        { id: "C4", title: "+ Autocorrección", detail: "Reintento ante errores de ejecución" },
      ],
      behaviorLabel: "Comportamiento esperado · 61 redactadas",
      behaviors: ["Responder", "Ambigua", "Abstenerse"],
      behaviorNote:
        "Las solicitudes ciudadanas reales tienden a ser no respondibles: el 78% de los tres primeros lotes pedía datos que el almacén no contiene. Por eso las preguntas respondibles se generan.",
      rqLabel: "Preguntas de investigación",
      researchQuestions: [
        "¿Con qué exactitud genera un LLM consultas SQL correctas a partir de preguntas en español sobre datos presupuestarios públicos?",
        "¿Qué elementos de contexto (documentación de clasificaciones, ejemplos) mejoran esa exactitud?",
        "¿Con qué fidelidad se sustentan las respuestas documentales en las fuentes citadas?",
        "¿Con qué precisión puede enrutarse automáticamente cada pregunta?",
        "¿Qué proporción de preguntas no respondibles reconoce el sistema como tales?",
      ],
    },
  },
  caseStudiesUi: {
    repository: "Repositorio",
    forProject: "de",
    tabs: { problem: "Problema", architecture: "Arquitectura", deployment: "Despliegue" },
    alsoOnGithub: "También en GitHub",
  },
  caseStudies,
  archive: [
    {
      name: "smart-home",
      detail: "Sensores ESP32 (temperatura, humedad, movimiento, luz) con dashboard en tiempo real en Firebase y control de dispositivos",
      lang: "ESP32 · Firebase",
      href: links.smartHomeRepo,
    },
    {
      name: "puntodventa",
      detail: "Prototipo multiplataforma de punto de venta con Firebase",
      lang: "Flutter",
      href: links.puntodventaRepo,
    },
    {
      name: "login-casita-azul",
      detail: "Primer prototipo en Angular del inicio de sesión de Casita Azul",
      lang: "Angular",
      href: links.loginCasitaAzulRepo,
    },
  ],
  experience: {
    label: "Experiencia y credenciales",
    title: "Tres años del cuarto de servidores al ML en producción.",
    lead: "Infraestructura de TI, consultoría independiente y .NET empresarial; hoy llevo machine learning a producción dentro de un ERP que atiende a cerca de cien sucursales.",
    labels: {
      timeline: "Trayectoria",
      recognition: "Reconocimientos",
      certifications: "Certificaciones",
      verifiable: "verificables",
      capabilities: "Capacidades",
      verify: "Verificar credencial",
      earned: "Obtenida",
      inProgress: "En curso",
      ctf: "Capture the Flag",
    },
    timeline,
    awards: [
      { place: "1.er lugar · equipo", event: "CTF MetaRed Mexico National Championship", year: "2025" },
      { place: "1.er lugar · equipo", event: "ANIEI CTF en ANUIES-TIC", year: "2025" },
    ],
    certifications,
    capabilities: [
      { area: "ML y datos", items: ["LightGBM", "PyTorch", "scikit-learn", "pandas", "Calibración", "Text-to-SQL", "RAG"] },
      { area: "Lenguajes", items: ["Python", "C#", "SQL", "TypeScript", "C", "Java"] },
      { area: "Bases de datos", items: ["SQL Server · T-SQL", "PostgreSQL", "MySQL", "Firebase", "Modelado dimensional"] },
      { area: ".NET empresarial", items: [".NET Framework", "WinForms", "DevExpress", "Arquitectura en capas", "Reportes"] },
      { area: "Web y APIs", items: ["Angular", "Flask", "REST", "Supabase", "Docker"] },
      { area: "Infraestructura y seguridad", items: ["Linux", "GCP", "Redes", "Mínimo privilegio", "CTF"] },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Construyamos sistemas que la gente pueda *comprobar*.",
    body: "Abierto a puestos de ingeniería de software e IA empresarial, prácticas y colaboraciones de investigación, en remoto o presencial. Como ciudadano español, puedo trabajar en cualquier país de la UE sin patrocinio de visa. Respondo en español o inglés.",
    email: "Escríbeme",
    resume: "CV (PDF, en inglés)",
  },
  footer: {
    colophon: "Tipografías Geist, Geist Mono y Newsreader. Hecho con Next.js, Tailwind CSS y Motion.",
    backToTop: "Volver arriba",
  },
};
