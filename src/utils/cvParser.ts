import fs from 'fs';
import path from 'path';

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  link: string;
  provider: string;
  year: string;
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  profile: string;
  education: Education[];
  skills: { category: string; list: string[] }[];
  experience: Experience[];
  certifications: Certification[];
}

function parseCertificatesFromJson(): Certification[] {
  const filePath = path.join(process.cwd(), 'docs', 'certificates.json');
  if (!fs.existsSync(filePath)) return [];
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData) as Certification[];
}

export function parseCV(lang: 'en' | 'es'): CVData {
  const filename = lang === 'en' ? 'cv.en.json' : 'cv.es.json';
  const filePath = path.join(process.cwd(), 'docs', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  return {
    name: data.name,
    title: data.title,
    email: data.email,
    linkedin: data.linkedin,
    github: data.github,
    website: data.website,
    profile: data.profile,
    education: data.education as Education[],
    skills: data.skills as { category: string; list: string[] }[],
    experience: data.experience as Experience[],
    certifications: parseCertificatesFromJson()
  };
}

