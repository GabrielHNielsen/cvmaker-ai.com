import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Interface for CV generation
export interface CVGenerationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  aboutMe: string;
  education: Array<{
    university: string;
    degree: string;
    courses: string;
  }>;
  skills: {
    hard: string;
    soft: string;
  };
  experience: Array<{
    jobTitle: string;
    company: string;
    responsibilities: string;
  }>;
  achievements: string;
  profilePhoto?: string;
}

// Enhanced CV generation prompt
const ENHANCED_CV_PROMPT = [
  'Du er en professionel CV-specialist og ekspert i moderne rekruttering. Din opgave er at skabe et ekstraordinært imponerende CV der vil gøre ansøgeren uimodståelig for arbejdsgivere.',
  '',
  '## KRITISKE REGLER - OVERHOLD DISSE 100%:',
  '',
  '### 1. SPROGKRAV:',
  '- Skriv ALT indhold på {language} - ingen undtagelser',
  '- Brug professionelt, kraftfuldt og overbevisende sprog',
  '- Anvend brancherelevant terminologi',
  '- Tilpas til {language} arbejdsmarked og kultur',
  '',
  '### 2. DESIGN BEVARELSE:',
  '- Rør ALDRIG CSS, HTML struktur eller styling',
  '- Bevar alle div, span, p, ul, li elementer præcist',
  '- Erstat KUN tekstindhold i eksisterende tags',
  '- Hold layout og design 100% uændret',
  '',
  '### 3. INDHOLDSSTRATEGIER:',
  '',
  '#### OM MIG/ABOUT ME (gør det STÆRKT og OVERBEVISENDE):',
  '- Skriv 4-5 kraftfulde sætninger der viser personlighed og ekspertise',
  '- Start med stærk opening: "Passioneret [rolle] med X års erfaring..."',
  '- Fremhæv unikke styrker og resultater',
  '- Slut med karrieremål eller vision',
  '- Længde: 60-100 ord på {language}',
  '- EKSEMPEL (dansk): "Passioneret softwareudvikler med 5+ års erfaring inden for moderne webudvikling. Specialiseret i at skabe brugervenlige applikationer der forbedrer forretningsresultater med op til 40%. Stærke evner inden for problemløsning og teamledelse. Motiveret af at bygge innovative løsninger der gør en reel forskel for brugere og virksomheder."',
  '',
  '#### ERHVERVSERFARING (gør det IMPONERENDE):',
  '- Omskriv hver rolle til at lyde ekstraordinær',
  '- Brug 4-6 bullet points per job',
  '- Start med kraftige handlingsverber: udviklede, implementerede, ledede, optimerede, transformerede',
  '- Tilføj konkrete resultater: "forbedrede effektivitet med 30%", "reducerede loading tid med 50%"',
  '- Inkluder relevante teknologier og metoder',
  '- Vis progression og vækst',
  '- EKSEMPEL bullet: "• Ledede udvikling af e-commerce platform der øgede salget med 45% og forbedrede brugeroplevelsen markant"',
  '',
  '#### FÆRDIGHEDER (gør dem SPECIFIKKE og IMPONERENDE):',
  '- Del op i "Tekniske færdigheder" og "Personlige færdigheder"',
  '- Vær meget specifik: ikke bare "JavaScript" men "JavaScript (ES6+), React, Node.js"',
  '- Tilføj relevant kontekst: "Avanceret niveau", "5+ års erfaring"',
  '- Tekniske: Liste de mest efterspurgte skills i branchen',
  '- Personlige: Fokuser på leadership, kommunikation, problemløsning',
  '',
  '#### UDDANNELSE (fyld det godt ud):',
  '- Tilføj relevante kurser, certifikater, projekter',
  '- Fremhæv akademiske resultater hvis relevant',
  '- Inkluder "Specialisering inden for: [relevante områder]"',
  '- Tilføj "Relevante coursework: [liste]" hvis plads skal fyldes',
  '',
  '#### PRÆSTATIONER/ACHIEVEMENTS (gør det STOLT):',
  '- Skriv 2-4 imponerende præstationer',
  '- Fokuser på målbare resultater',
  '- Inkluder awards, anerkendelser, specielle projekter',
  '- Brug tal og procenter hvor muligt',
  '',
  '### 4. PROFESSIONEL FORBEDRING:',
  '- Erstat alt "make something up" med intelligent, relevant indhold',
  '- Gør hver sætning virkningsfuld og overbevisende',
  '- Brug industri-specifikke termer og trending teknologier',
  '- Skab en sammenhængende fortælling om karriereudvikling',
  '- Sørg for at CV\'et skiller sig ud fra konkurrenterne',
  '',
  '### 5. DANSKE PROFESSIONELLE STANDARDER:',
  '- Brug "Erhvervserfaring" ikke "Arbejdserfaring"',
  '- Skriv "Uddannelse" ikke "Education"',
  '- Brug "Færdigheder" for skills',
  '- Anvend danske virksomhedsnavne (A/S, ApS) når du genererer eksempler',
  '- Tilpas til dansk arbejdskultur: samarbejde, innovation, balance',
  '',
  '## CONTENT FYLDING STRATEGI:',
  '- Hver sektion skal se fyldt og professionel ud',
  '- Hvis original tekst er for kort: udvid med relevant professionalisme',
  '- Skab visuel balance - ingen afsnit må se tomme ud',
  '- Brug bullet points intelligent til at fylde plads naturligt',
  '',
  '## OUTPUT KRAV:',
  '- Returner KUN komplet HTML kode - INGEN markdown',
  '- Start med <!DOCTYPE html> og slut med </html>',
  '- Alle placeholders skal erstattes med virkelig indhold',
  '- Design skal forblive præcis det samme',
  '- Alt tekst på {language}',
  '',
  'INPUT DATA:',
  '- Formular Data: {formData}',
  '- HTML Template: {htmlTemplate}',
  '- Målsprog: {language}',
  '',
  'GENERER NU ET EKSTRAORDINÆRT IMPONERENDE CV DER VIL FÅ ARBEJDSGIVERE TIL AT RINGE ØJEBLIKKELIGT!'
].join('\n');

// Language-specific additions
const LANGUAGE_SPECIFIC_ADDITIONS = {
  'da': `
    Use Danish professional terminology:
    - "Erhvervserfaring" not "Arbejdserfaring"
    - "Færdigheder" not "Evner"
    - Use formal Danish business language
    - Include Danish cultural context
  `,
  'en': `
    Use American/British professional terminology:
    - Action-oriented language
    - Quantifiable achievements
    - Industry-standard terminology
  `,
  'de': `
    Use German professional terminology:
    - "Berufserfahrung" for work experience
    - "Fähigkeiten" for skills
    - Use formal German business language
  `,
  'fr': `
    Use French professional terminology:
    - "Expérience professionnelle" for work experience
    - "Compétences" for skills
    - Use formal French business language
  `
};

// Helper function to detect industry from job title
const detectIndustry = (jobTitle: string): string => {
  const title = jobTitle.toLowerCase();
  
  if (title.includes('developer') || title.includes('programmer') || title.includes('engineer')) {
    return 'technology';
  } else if (title.includes('manager') || title.includes('director') || title.includes('executive')) {
    return 'management';
  } else if (title.includes('designer') || title.includes('creative')) {
    return 'creative';
  } else if (title.includes('sales') || title.includes('marketing')) {
    return 'sales_marketing';
  } else if (title.includes('analyst') || title.includes('accountant')) {
    return 'finance';
  }
  
  return 'general';
};

// Template analysis helper
const analyzeTemplate = (htmlTemplate: string) => {
  const sections = [];
  if (htmlTemplate.includes('about-me') || htmlTemplate.includes('cv-about-me')) sections.push('About Me');
  if (htmlTemplate.includes('experience') || htmlTemplate.includes('cv-experience')) sections.push('Experience');
  if (htmlTemplate.includes('education') || htmlTemplate.includes('cv-education')) sections.push('Education');
  if (htmlTemplate.includes('skills') || htmlTemplate.includes('cv-hard-skill')) sections.push('Skills');
  
  return {
    sections,
    estimatedLength: htmlTemplate.length,
    hasImage: htmlTemplate.includes('profile-photo') || htmlTemplate.includes('cv-profile-photo')
  };
};

// Main CV generation function
export const generateCVWithAI = async (
  formData: CVGenerationData,
  templateHtml: string,
  selectedTemplate: string,
  language: string = 'da'
): Promise<string> => {
  try {
    // Analyze template for better understanding
    const templateAnalysis = analyzeTemplate(templateHtml);
    
    // Prepare enhanced prompt
    const prompt = ENHANCED_CV_PROMPT
      .replace('{formData}', JSON.stringify(formData, null, 2))
      .replace('{htmlTemplate}', templateHtml)
      .replace(/{language}/g, language)
      .replace('{profileImage}', formData.profilePhoto ? 'Provided' : 'Not provided');

    // Add language-specific context
    const languageContext = LANGUAGE_SPECIFIC_ADDITIONS[language as keyof typeof LANGUAGE_SPECIFIC_ADDITIONS] || '';

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: prompt + languageContext
      },
      {
        role: 'user',
        content: `
Additional context:
- Template style: ${selectedTemplate}
- Expected sections: ${templateAnalysis.sections.join(', ')}
- Available space: ${templateAnalysis.estimatedLength} characters
- Industry: ${detectIndustry(formData.jobTitle)}
- Language: ${language}

Please ensure the content fills the template appropriately without breaking the design.
Generate professional, compelling content that makes this CV stand out.
        `
      }
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Using GPT-4o for now (can switch to gpt-4.1 when available)
      messages,
      max_tokens: 4000,
      temperature: 0.2, // Low for consistency
      top_p: 0.8,
      frequency_penalty: 0.3,
      presence_penalty: 0.1
    });

    let generatedHtml = response.choices[0].message.content;
    
    if (!generatedHtml) {
      throw new Error('No content generated from OpenAI API');
    }

    // Clean up markdown code blocks if present
    generatedHtml = generatedHtml.replace(/\`\`\`html\n?/g, '').replace(/\`\`\`\n?$/g, '').replace(/\`\`\`/g, '');
    
    // Ensure proper HTML structure
    if (!generatedHtml.includes('<!DOCTYPE html>')) {
      generatedHtml = '<!DOCTYPE html>\n' + generatedHtml;
    }
    
    // Add head section if missing
    if (!generatedHtml.includes('<head>')) {
      generatedHtml = generatedHtml.replace(
        '<html>',
        '<html>\n<head>\n<title>CV</title>\n</head>'
      );
    }
    
    // Add title if missing
    if (!generatedHtml.includes('<title>')) {
      generatedHtml = generatedHtml.replace(
        '<head>',
        '<head>\n<title>CV</title>'
      );
    }

    return generatedHtml;
  } catch (error) {
    console.error('AI CV generation failed:', error);
    throw new Error(`CV generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Validation function to ensure output quality
export const validateGeneratedCV = (generatedHtml: string, originalTemplate: string): boolean => {
  // Basic validation checks
  if (!generatedHtml || generatedHtml.length < 1000) {
    return false;
  }

  // Check if it's still HTML
  if (!generatedHtml.includes('<html') && !generatedHtml.includes('<!DOCTYPE')) {
    return false;
  }

  // Check if essential elements are present
  const essentialElements = ['<head>', '<body>', '<title>'];
  return essentialElements.every(element => generatedHtml.includes(element));
}; 