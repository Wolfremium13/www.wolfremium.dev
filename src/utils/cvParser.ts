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

// Clean escape backslashes that markdown generator might include
function cleanText(text: string): string {
  return text
    .replace(/\\-/g, '-')
    .replace(/\\\+/g, '+')
    .replace(/\\#/g, '#')
    .replace(/\\_/g, '_')
    .replace(/\\\*/g, '*')
    .replace(/\\!/g, '!')
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .trim();
}

function translateDate(dateText: string, lang: 'en' | 'es'): string {
  if (lang === 'es') return dateText;
  const monthsMap: Record<string, string> = {
    'ene.': 'Jan',
    'feb.': 'Feb',
    'mar.': 'Mar',
    'abr.': 'Apr',
    'may.': 'May',
    'jun.': 'Jun',
    'jul.': 'Jul',
    'ago.': 'Aug',
    'sep.': 'Sep',
    'sept.': 'Sep',
    'oct.': 'Oct',
    'nov.': 'Nov',
    'dic.': 'Dec'
  };
  let translated = dateText;
  Object.keys(monthsMap).forEach(key => {
    translated = translated.replace(key, monthsMap[key]);
  });
  return translated;
}

function parseCertificatesFromJson(lang: 'en' | 'es'): Certification[] {
  const filePath = path.join(process.cwd(), 'docs', 'certificates.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const certs: Certification[] = JSON.parse(rawData);
  return certs.map(c => ({
    ...c,
    year: translateDate(c.year, lang)
  }));
}

export function parseCV(lang: 'en' | 'es'): CVData {
  const filename = lang === 'en' 
    ? 'kevin-hierro-carrasco-en-cv-2026.md' 
    : 'kevin-hierro-carrasco-es-cv-2026.md';
    
  const filePath = path.join(process.cwd(), 'docs', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const lines = content.split('\n');
  
  let name = 'Kevin Hierro Carrasco';
  let title = lang === 'en' ? 'Full Stack Engineer' : 'Ingeniero Full Stack';
  let email = '';
  let linkedin = '';
  let github = '';
  let website = '';
  let profile = '';
  
  const education: Education[] = [];
  const skills: { category: string; list: string[] }[] = [];
  const experience: Experience[] = [];
  const certifications: Certification[] = parseCertificatesFromJson(lang);
  const hasHtmlCerts = certifications.length > 0;
  
  let currentSection = '';
  let activeExperience: Experience | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    
    const line = cleanText(rawLine);
    const lowerLine = line.toLowerCase();
    
    // Check main title line: ### **Kevin Hierro Carrasco - Full Stack Engineer**
    if (line.startsWith('###')) {
      const match = line.match(/###\s+\*\*([^*]+)\s+-\s+([^*]+)\*\*/);
      if (match) {
        name = match[1].trim();
        title = match[2].trim();
      }
      continue;
    }
    
    // Check main section markers
    if (lowerLine.startsWith('**contact**') || lowerLine.startsWith('**contacto**')) {
      currentSection = 'contact';
      continue;
    }
    if (lowerLine.includes('professional profile') || lowerLine.includes('perfil profesional')) {
      currentSection = 'profile';
      const text = line.replace(/^\*\*Professional Profile\*\*\s*|^\*\*Perfil Profesional\*\*\s*/i, '');
      if (text) {
        profile = text.trim();
      }
      continue;
    }
    if (lowerLine.includes('education') || lowerLine.includes('educación')) {
      currentSection = 'education';
      continue;
    }
    if (lowerLine.includes('technical skills') || lowerLine.includes('habilidades técnicas')) {
      currentSection = 'skills';
      continue;
    }
    if (lowerLine.includes('professional experience') || lowerLine.includes('experiencia profesional')) {
      currentSection = 'experience';
      continue;
    }
    if (lowerLine.includes('certifications') || lowerLine.includes('certificaciones')) {
      currentSection = 'certifications';
      continue;
    }
    
    // Process sections
    if (currentSection === 'contact') {
      if (line.startsWith('*')) {
        if (line.includes('Email:') || line.includes('Correo electrónico:')) {
          const match = line.match(/\[([^\]]+)\]/);
          if (match) email = match[1];
        } else if (line.includes('LinkedIn:')) {
          const match = line.match(/\[([^\]]+)\]/);
          if (match) linkedin = match[1];
        } else if (line.includes('GitHub:')) {
          const match = line.match(/\[([^\]]+)\]/);
          if (match) github = match[1];
        } else if (line.includes('Website:')) {
          const match = line.match(/\[([^\]]+)\]/);
          if (match) website = match[1];
        }
      }
    } else if (currentSection === 'profile') {
      profile = line;
    } else if (currentSection === 'education') {
      if (line.startsWith('*')) {
        // * **Higher Vocational Training in Web Application Development** CIFP Cesar Manrique (2019 - 2021)
        const match = line.match(/\*\s+\*\*([^*]+)\*\*\s+([^(]+)\(([^)]+)\)/);
        if (match) {
          education.push({
            title: match[1].trim(),
            institution: match[2].trim(),
            period: match[3].trim()
          });
        }
      }
    } else if (currentSection === 'skills') {
      // * **Programming Languages:** C#, Kotlin, Python, PHP, JavaScript
      if (line.startsWith('*')) {
        const match = line.match(/\*\s+\*\*([^*:]+):?\*\*\s+(.+)/);
        if (match) {
          skills.push({
            category: match[1].trim(),
            list: match[2].split(',').map(s => s.trim())
          });
        }
      }
    } else if (currentSection === 'experience') {
      // Check if job header: **Software Crafter | Lean Mind | January 2024 - Present**
      if (line.startsWith('**') && line.endsWith('**') && line.includes('|')) {
        if (activeExperience) {
          experience.push(activeExperience);
        }
        
        const cleanHeader = line.replace(/^\*\*|\*\*$/g, '');
        const parts = cleanHeader.split('|').map(p => p.trim());
        
        activeExperience = {
          role: parts[0],
          company: parts[1],
          period: parts[2],
          bullets: [],
          technologies: []
        };
      } else if (line.startsWith('*') && activeExperience) {
        const text = line.substring(1).trim();
        // Check if technologies line: * *Technologies: C#, Oracle, Azure, Terraform, GitHub*.
        if (text.startsWith('*Technologies:') || text.startsWith('*Tecnologías:')) {
          const techList = text
            .replace(/^\*Technologies:|\*Tecnologías:|\*\.?$/g, '')
            .split(',')
            .map(s => s.trim());
          activeExperience.technologies = techList;
        } else {
          activeExperience.bullets.push(text);
        }
      }
    } else if (currentSection === 'certifications') {
      if (hasHtmlCerts) continue;
      // * [Google Cybersecurity Professional Certificate V2](https://www.credly.com/badges/cfb2ca8a-0619-47d3-ae38-caa0fc0e72cb/linked_in_profile) - Coursera (2025)
      if (line.startsWith('*')) {
        const match = line.match(/\*\s+\[([^\]]+)\]\(([^)]+)\)\s+-\s+([^(]+)\(([^)]+)\)/);
        if (match) {
          certifications.push({
            name: match[1].trim(),
            link: match[2].trim(),
            provider: match[3].trim(),
            year: match[4].trim()
          });
        } else {
          const backupMatch = line.match(/\*\s+\[([^\]]+)\]\(([^)]+)\)\s+-\s+(.+)/);
          if (backupMatch) {
            certifications.push({
              name: backupMatch[1].trim(),
              link: backupMatch[2].trim(),
              provider: backupMatch[3].trim(),
              year: ''
            });
          }
        }
      }
    }
  }
  
  // Push the last experience
  if (activeExperience) {
    experience.push(activeExperience);
  }
  
  return {
    name,
    title,
    email,
    linkedin,
    github,
    website,
    profile,
    education,
    skills,
    experience,
    certifications
  };
}

