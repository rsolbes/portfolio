export type StageStatus = "built" | "in-progress" | "planned";

export type Stage = { title: string; detail: string; status?: StageStatus };

export type NavItem = { id: "work" | "experience" | "contact"; label: string };

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

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  place?: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export type Certification = {
  name: string;
  code?: string;
  issuer: string;
  status: "earned" | "in-progress";
  date?: string;
  href?: string;
};
