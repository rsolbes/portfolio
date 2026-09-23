export const site = {
  name: "Rodrigo Solbes",
  role: "Software & AI Engineering",
  location: "Tampico, Mexico",
  timezone: "UTC−6",
  // Shown on the page and used for the contact button.
  email: "rsolbes@hotmail.com",
  github: "https://github.com/rsolbes",
  linkedin: "https://www.linkedin.com/in/rsolbes/" as string | null,
  // Served from public/. Replace the file to update it; set to null to hide the button.
  resume: "/Rodrigo-Solbes-CV.pdf" as string | null,
  description:
    "Software developer and Computer Engineering student shipping production machine learning inside an enterprise .NET ERP, moving into Software Engineering and Enterprise AI. Text-to-SQL, retrieval and data systems built so every answer shows its evidence.",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
