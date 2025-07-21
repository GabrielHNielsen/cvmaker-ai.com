'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Plus, X, Camera, Sparkles, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Star, Award } from 'lucide-react'
import Link from 'next/link'
import Select from 'react-select'

// Type for university data
interface University {
  name: string
  link?: string
  major?: string
}

// Static university list for better performance
const staticUniversities: University[] = [
  // Danish Universities
  { name: "Københavns Universitet" },
  { name: "Danmarks Tekniske Universitet" },
  { name: "Aarhus Universitet" },
  { name: "Aalborg Universitet" },
  { name: "Syddansk Universitet" },
  { name: "Roskilde Universitet" },
  { name: "Copenhagen Business School" },
  { name: "IT-Universitetet i København" },
  
  // International Universities
  { name: "Harvard University" },
  { name: "Massachusetts Institute of Technology" },
  { name: "Stanford University" },
  { name: "University of Oxford" },
  { name: "University of Cambridge" },
  { name: "California Institute of Technology" },
  { name: "ETH Zurich" },
  { name: "University College London" },
  { name: "Imperial College London" },
  { name: "University of Chicago" },
  { name: "Princeton University" },
  { name: "Yale University" },
  { name: "University of Pennsylvania" },
  { name: "University of Toronto" },
  { name: "University of Edinburgh" },
  { name: "King's College London" },
  { name: "London School of Economics" },
  { name: "University of Manchester" },
  { name: "University of California, Berkeley" },
  { name: "University of California, Los Angeles" },
  { name: "University of Michigan" },
  { name: "Cornell University" },
  { name: "Columbia University" },
  { name: "University of Washington" },
  { name: "Carnegie Mellon University" },
  { name: "University of Texas at Austin" },
  { name: "Georgia Institute of Technology" },
  { name: "University of Illinois at Urbana-Champaign" },
  { name: "Purdue University" },
  { name: "University of Wisconsin-Madison" },
  { name: "Technical University of Munich" },
  { name: "Ludwig Maximilian University of Munich" },
  { name: "RWTH Aachen University" },
  { name: "University of Heidelberg" },
  { name: "Humboldt University of Berlin" },
  { name: "Free University of Berlin" },
  { name: "University of Göttingen" },
  { name: "University of Freiburg" },
  { name: "Karlsruhe Institute of Technology" },
  { name: "Technical University of Berlin" },
  { name: "Sorbonne University" },
  { name: "École Polytechnique" },
  { name: "École Normale Supérieure" },
  { name: "University of Paris" },
  { name: "Université PSL" },
  { name: "CentraleSupélec" },
  { name: "INSEAD" },
  { name: "Bocconi University" },
  { name: "Sapienza University of Rome" },
  { name: "University of Bologna" },
  { name: "Politecnico di Milano" },
  { name: "University of Milan" },
  { name: "University of Padua" },
  { name: "University of Florence" },
  { name: "Karolinska Institute" },
  { name: "KTH Royal Institute of Technology" },
  { name: "Stockholm University" },
  { name: "University of Gothenburg" },
  { name: "Lund University" },
  { name: "Uppsala University" },
  { name: "University of Oslo" },
  { name: "Norwegian University of Science and Technology" },
  { name: "University of Bergen" },
  { name: "University of Helsinki" },
  { name: "Aalto University" },
  { name: "University of Turku" },
  { name: "Delft University of Technology" },
  { name: "University of Amsterdam" },
  { name: "Eindhoven University of Technology" },
  { name: "Leiden University" },
  { name: "Utrecht University" },
  { name: "University of Groningen" },
  { name: "Wageningen University" }
]

// Format universities for Select component
const formatUniversityOptions = (universities: University[]) => {
  return universities.map(uni => ({
    value: uni.name,
    label: uni.name,
    country: "Various" // Simplified for now
  }))
}

const universityOptions = formatUniversityOptions(staticUniversities)

// Custom filter function for universities
const filterUniversities = (inputValue: string) => {
  if (!inputValue) return []
  
  const searchValue = inputValue.toLowerCase()
  return universityOptions.filter(option =>
    option.label.toLowerCase().includes(searchValue)
  ).slice(0, 50) // Limit to 50 results for performance
}

// Language options with flags
const languageOptions = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'da', label: 'Dansk', flag: '🇩🇰' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
  { value: 'pt', label: 'Português', flag: '🇵🇹' },
  { value: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { value: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { value: 'no', label: 'Norsk', flag: '🇳🇴' },
  { value: 'fi', label: 'Suomi', flag: '🇫🇮' }
]

// Translations
const translations = {
  en: {
    backToDashboard: 'Back to Dashboard',
    createCV: 'Create CV',
    selectLanguage: 'Select Language',
    profilePhoto: 'Profile Photo',
    uploadPhoto: 'Upload Photo',
    changePhoto: 'Change Photo',
    removePhoto: 'Remove Photo',
    name: 'Name',
    nameRequired: 'Name is required',
    fullName: 'Your full name',
    contactInfo: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    jobTitle: 'Job Title',
    jobTitleRequired: 'Job title is required',
    jobTitlePlaceholder: 'e.g. Software Developer',
    aboutMe: 'About Me',
    aboutMePlaceholder: 'Describe yourself and your qualifications...',
    chatgptTip: 'Tip: In the future, ChatGPT API will be able to help generate this section',
    education: 'Education',
    add: 'Add',
    educationLabel: 'Education',
    university: 'University/School',
    degree: 'Degree/Exam',
    courses: 'Relevant Courses',
    skills: 'Skills',
    hardSkills: 'Hard Skills',
    hardSkillsPlaceholder: 'e.g. JavaScript, Python, Photoshop',
    softSkills: 'Soft Skills',
    softSkillsPlaceholder: 'e.g. Teamwork, Communication, Problem Solving',
    experience: 'Professional Experience',
    experienceLabel: 'Experience',
    jobTitleField: 'Job Title',
    company: 'Company',
    responsibilities: 'Responsibilities and Results',
    achievements: 'Achievements (optional)',
    achievementsPlaceholder: 'Special achievements, awards or certificates',
    generateCV: 'Generate CV',
    validationMessage: 'Fill in name, job title and select a template to continue',
    selectTemplate: 'Select CV Template',
    searchUniversities: 'Type to search universities',
    customUniversity: 'Type university name and press Enter if not found'
  },
  da: {
    backToDashboard: 'Tilbage til Dashboard',
    createCV: 'Opret CV',
    selectLanguage: 'Vælg Sprog',
    profilePhoto: 'Profilbillede',
    uploadPhoto: 'Upload Billede',
    changePhoto: 'Skift Billede',
    removePhoto: 'Fjern Billede',
    name: 'Navn',
    nameRequired: 'påkrævet',
    fullName: 'Dit fulde navn',
    contactInfo: 'Kontaktoplysninger',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adresse',
    jobTitle: 'Jobtitel',
    jobTitleRequired: 'påkrævet',
    jobTitlePlaceholder: 'F.eks. Software Udvikler',
    aboutMe: 'Om mig',
    aboutMePlaceholder: 'Beskriv dig selv og dine kvalifikationer...',
    chatgptTip: 'Tip: I fremtiden vil ChatGPT API kunne hjælpe med at generere dette afsnit',
    education: 'Uddannelse',
    add: 'Tilføj',
    educationLabel: 'Uddannelse',
    university: 'Universitet/Skole',
    degree: 'Grad/Eksamen',
    courses: 'Relevante kurser',
    skills: 'Færdigheder',
    hardSkills: 'Hårde færdigheder',
    hardSkillsPlaceholder: 'F.eks. JavaScript, Python, Photoshop',
    softSkills: 'Bløde færdigheder',
    softSkillsPlaceholder: 'F.eks. Teamwork, Kommunikation, Problemløsning',
    experience: 'Erhvervserfaring',
    experienceLabel: 'Erfaring',
    jobTitleField: 'Jobtitel',
    company: 'Virksomhed',
    responsibilities: 'Ansvarsområder og resultater',
    achievements: 'Præstationer (valgfrit)',
    achievementsPlaceholder: 'Særlige præstationer, udmærkelser eller certifikater',
    generateCV: 'Generer CV',
    validationMessage: 'Udfyld navn, jobtitel og vælg en skabelon for at fortsætte',
    selectTemplate: 'Vælg CV-skabelon',
    searchUniversities: 'Skriv for at søge universiteter',
    customUniversity: 'Skriv universitetsnavnet og tryk Enter hvis ikke fundet'
  },
  de: {
    backToDashboard: 'Zurück zum Dashboard',
    createCV: 'Lebenslauf erstellen',
    selectLanguage: 'Sprache wählen',
    profilePhoto: 'Profilbild',
    uploadPhoto: 'Foto hochladen',
    changePhoto: 'Foto ändern',
    removePhoto: 'Foto entfernen',
    name: 'Name',
    nameRequired: 'erforderlich',
    fullName: 'Ihr vollständiger Name',
    contactInfo: 'Kontaktinformationen',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    jobTitle: 'Berufsbezeichnung',
    jobTitleRequired: 'erforderlich',
    jobTitlePlaceholder: 'z.B. Software-Entwickler',
    aboutMe: 'Über mich',
    aboutMePlaceholder: 'Beschreiben Sie sich und Ihre Qualifikationen...',
    chatgptTip: 'Tipp: In Zukunft wird die ChatGPT-API helfen können, diesen Abschnitt zu generieren',
    education: 'Bildung',
    add: 'Hinzufügen',
    educationLabel: 'Bildung',
    university: 'Universität/Schule',
    degree: 'Abschluss/Prüfung',
    courses: 'Relevante Kurse',
    skills: 'Fähigkeiten',
    hardSkills: 'Fachkenntnisse',
    hardSkillsPlaceholder: 'z.B. JavaScript, Python, Photoshop',
    softSkills: 'Soft Skills',
    softSkillsPlaceholder: 'z.B. Teamwork, Kommunikation, Problemlösung',
    experience: 'Berufserfahrung',
    experienceLabel: 'Erfahrung',
    jobTitleField: 'Berufsbezeichnung',
    company: 'Unternehmen',
    responsibilities: 'Verantwortlichkeiten und Ergebnisse',
    achievements: 'Erfolge (optional)',
    achievementsPlaceholder: 'Besondere Erfolge, Auszeichnungen oder Zertifikate',
    generateCV: 'Lebenslauf generieren',
    validationMessage: 'Name, Berufsbezeichnung ausfüllen und Vorlage auswählen, um fortzufahren',
    selectTemplate: 'Lebenslauf-Vorlage wählen',
    searchUniversities: 'Tippen Sie, um Universitäten zu suchen',
    customUniversity: 'Universitätsname eingeben und Enter drücken falls nicht gefunden'
  },
  fr: {
    backToDashboard: 'Retour au tableau de bord',
    createCV: 'Créer un CV',
    selectLanguage: 'Sélectionner la langue',
    profilePhoto: 'Photo de profil',
    uploadPhoto: 'Télécharger une photo',
    changePhoto: 'Changer la photo',
    removePhoto: 'Supprimer la photo',
    name: 'Nom',
    nameRequired: 'requis',
    fullName: 'Votre nom complet',
    contactInfo: 'Informations de contact',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    jobTitle: 'Titre du poste',
    jobTitleRequired: 'requis',
    jobTitlePlaceholder: 'par ex. Développeur logiciel',
    aboutMe: 'À propos de moi',
    aboutMePlaceholder: 'Décrivez-vous et vos qualifications...',
    chatgptTip: 'Astuce : À l\'avenir, l\'API ChatGPT pourra aider à générer cette section',
    education: 'Formation',
    add: 'Ajouter',
    educationLabel: 'Formation',
    university: 'Université/École',
    degree: 'Diplôme/Examen',
    courses: 'Cours pertinents',
    skills: 'Compétences',
    hardSkills: 'Compétences techniques',
    hardSkillsPlaceholder: 'par ex. JavaScript, Python, Photoshop',
    softSkills: 'Compétences relationnelles',
    softSkillsPlaceholder: 'par ex. Travail d\'équipe, Communication, Résolution de problèmes',
    experience: 'Expérience professionnelle',
    experienceLabel: 'Expérience',
    jobTitleField: 'Titre du poste',
    company: 'Entreprise',
    responsibilities: 'Responsabilités et résultats',
    achievements: 'Réalisations (optionnel)',
    achievementsPlaceholder: 'Réalisations spéciales, prix ou certificats',
    generateCV: 'Générer le CV',
    validationMessage: 'Remplir le nom, le titre du poste et sélectionner un modèle pour continuer',
    selectTemplate: 'Sélectionner un modèle de CV',
    searchUniversities: 'Tapez pour rechercher des universités',
    customUniversity: 'Tapez le nom de l\'université et appuyez sur Entrée si non trouvé'
  },
  es: {
    backToDashboard: 'Volver al panel',
    createCV: 'Crear CV',
    selectLanguage: 'Seleccionar idioma',
    profilePhoto: 'Foto de perfil',
    uploadPhoto: 'Subir foto',
    changePhoto: 'Cambiar foto',
    removePhoto: 'Eliminar foto',
    name: 'Nombre',
    nameRequired: 'requerido',
    fullName: 'Su nombre completo',
    contactInfo: 'Información de contacto',
    email: 'Email',
    phone: 'Teléfono',
    address: 'Dirección',
    jobTitle: 'Título del trabajo',
    jobTitleRequired: 'requerido',
    jobTitlePlaceholder: 'ej. Desarrollador de software',
    aboutMe: 'Sobre mí',
    aboutMePlaceholder: 'Descríbete y tus calificaciones...',
    chatgptTip: 'Consejo: En el futuro, la API de ChatGPT podrá ayudar a generar esta sección',
    education: 'Educación',
    add: 'Agregar',
    educationLabel: 'Educación',
    university: 'Universidad/Escuela',
    degree: 'Título/Examen',
    courses: 'Cursos relevantes',
    skills: 'Habilidades',
    hardSkills: 'Habilidades técnicas',
    hardSkillsPlaceholder: 'ej. JavaScript, Python, Photoshop',
    softSkills: 'Habilidades blandas',
    softSkillsPlaceholder: 'ej. Trabajo en equipo, Comunicación, Resolución de problemas',
    experience: 'Experiencia profesional',
    experienceLabel: 'Experiencia',
    jobTitleField: 'Título del trabajo',
    company: 'Empresa',
    responsibilities: 'Responsabilidades y resultados',
    achievements: 'Logros (opcional)',
    achievementsPlaceholder: 'Logros especiales, premios o certificados',
    generateCV: 'Generar CV',
    validationMessage: 'Completar nombre, título del trabajo y seleccionar una plantilla para continuar',
    selectTemplate: 'Seleccionar plantilla de CV',
    searchUniversities: 'Escriba para buscar universidades',
    customUniversity: 'Escriba el nombre de la universidad y presione Enter si no se encuentra'
  },
  it: {
    backToDashboard: 'Torna alla dashboard',
    createCV: 'Crea CV',
    selectLanguage: 'Seleziona lingua',
    profilePhoto: 'Foto profilo',
    uploadPhoto: 'Carica foto',
    changePhoto: 'Cambia foto',
    removePhoto: 'Rimuovi foto',
    name: 'Nome',
    nameRequired: 'richiesto',
    fullName: 'Il tuo nome completo',
    contactInfo: 'Informazioni di contatto',
    email: 'Email',
    phone: 'Telefono',
    address: 'Indirizzo',
    jobTitle: 'Titolo del lavoro',
    jobTitleRequired: 'richiesto',
    jobTitlePlaceholder: 'es. Sviluppatore software',
    aboutMe: 'Su di me',
    aboutMePlaceholder: 'Descrivi te stesso e le tue qualifiche...',
    chatgptTip: 'Suggerimento: In futuro, l\'API ChatGPT potrà aiutare a generare questa sezione',
    education: 'Istruzione',
    add: 'Aggiungi',
    educationLabel: 'Istruzione',
    university: 'Università/Scuola',
    degree: 'Laurea/Esame',
    courses: 'Corsi pertinenti',
    skills: 'Competenze',
    hardSkills: 'Competenze tecniche',
    hardSkillsPlaceholder: 'es. JavaScript, Python, Photoshop',
    softSkills: 'Competenze trasversali',
    softSkillsPlaceholder: 'es. Lavoro di squadra, Comunicazione, Risoluzione dei problemi',
    experience: 'Esperienza professionale',
    experienceLabel: 'Esperienza',
    jobTitleField: 'Titolo del lavoro',
    company: 'Azienda',
    responsibilities: 'Responsabilità e risultati',
    achievements: 'Risultati (opzionale)',
    achievementsPlaceholder: 'Risultati speciali, premi o certificati',
    generateCV: 'Genera CV',
    validationMessage: 'Completa nome, titolo del lavoro e seleziona un modello per continuare',
    selectTemplate: 'Seleziona modello CV',
    searchUniversities: 'Digita per cercare università',
    customUniversity: 'Digita il nome dell\'università e premi Invio se non trovato'
  },
  pt: {
    backToDashboard: 'Voltar ao painel',
    createCV: 'Criar CV',
    selectLanguage: 'Selecionar idioma',
    profilePhoto: 'Foto de perfil',
    uploadPhoto: 'Carregar foto',
    changePhoto: 'Alterar foto',
    removePhoto: 'Remover foto',
    name: 'Nome',
    nameRequired: 'obrigatório',
    fullName: 'Seu nome completo',
    contactInfo: 'Informações de contato',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    jobTitle: 'Cargo',
    jobTitleRequired: 'obrigatório',
    jobTitlePlaceholder: 'ex. Desenvolvedor de software',
    aboutMe: 'Sobre mim',
    aboutMePlaceholder: 'Descreva-se e suas qualificações...',
    chatgptTip: 'Dica: No futuro, a API do ChatGPT poderá ajudar a gerar esta seção',
    education: 'Educação',
    add: 'Adicionar',
    educationLabel: 'Educação',
    university: 'Universidade/Escola',
    degree: 'Grau/Exame',
    courses: 'Cursos relevantes',
    skills: 'Habilidades',
    hardSkills: 'Habilidades técnicas',
    hardSkillsPlaceholder: 'ex. JavaScript, Python, Photoshop',
    softSkills: 'Habilidades interpessoais',
    softSkillsPlaceholder: 'ex. Trabalho em equipe, Comunicação, Resolução de problemas',
    experience: 'Experiência profissional',
    experienceLabel: 'Experiência',
    jobTitleField: 'Cargo',
    company: 'Empresa',
    responsibilities: 'Responsabilidades e resultados',
    achievements: 'Conquistas (opcional)',
    achievementsPlaceholder: 'Conquistas especiais, prêmios ou certificados',
    generateCV: 'Gerar CV',
    validationMessage: 'Preencha nome, cargo e selecione um modelo para continuar',
    selectTemplate: 'Selecionar modelo de CV',
    searchUniversities: 'Digite para pesquisar universidades',
    customUniversity: 'Digite o nome da universidade e pressione Enter se não encontrado'
  },
  nl: {
    backToDashboard: 'Terug naar dashboard',
    createCV: 'CV maken',
    selectLanguage: 'Taal selecteren',
    profilePhoto: 'Profielfoto',
    uploadPhoto: 'Foto uploaden',
    changePhoto: 'Foto wijzigen',
    removePhoto: 'Foto verwijderen',
    name: 'Naam',
    nameRequired: 'vereist',
    fullName: 'Uw volledige naam',
    contactInfo: 'Contactgegevens',
    email: 'Email',
    phone: 'Telefoon',
    address: 'Adres',
    jobTitle: 'Functietitel',
    jobTitleRequired: 'vereist',
    jobTitlePlaceholder: 'bijv. Software ontwikkelaar',
    aboutMe: 'Over mij',
    aboutMePlaceholder: 'Beschrijf jezelf en je kwalificaties...',
    chatgptTip: 'Tip: In de toekomst kan de ChatGPT API helpen bij het genereren van deze sectie',
    education: 'Onderwijs',
    add: 'Toevoegen',
    educationLabel: 'Onderwijs',
    university: 'Universiteit/School',
    degree: 'Graad/Examen',
    courses: 'Relevante cursussen',
    skills: 'Vaardigheden',
    hardSkills: 'Technische vaardigheden',
    hardSkillsPlaceholder: 'bijv. JavaScript, Python, Photoshop',
    softSkills: 'Zachte vaardigheden',
    softSkillsPlaceholder: 'bijv. Teamwerk, Communicatie, Probleemoplossing',
    experience: 'Professionele ervaring',
    experienceLabel: 'Ervaring',
    jobTitleField: 'Functietitel',
    company: 'Bedrijf',
    responsibilities: 'Verantwoordelijkheden en resultaten',
    achievements: 'Prestaties (optioneel)',
    achievementsPlaceholder: 'Speciale prestaties, awards of certificaten',
    generateCV: 'CV genereren',
    validationMessage: 'Vul naam, functietitel in en selecteer een sjabloon om door te gaan',
    selectTemplate: 'CV-sjabloon selecteren',
    searchUniversities: 'Typ om universiteiten te zoeken',
    customUniversity: 'Typ universiteitsnaam en druk Enter als niet gevonden'
  },
  sv: {
    backToDashboard: 'Tillbaka till instrumentpanel',
    createCV: 'Skapa CV',
    selectLanguage: 'Välj språk',
    profilePhoto: 'Profilbild',
    uploadPhoto: 'Ladda upp bild',
    changePhoto: 'Byt bild',
    removePhoto: 'Ta bort bild',
    name: 'Namn',
    nameRequired: 'krävs',
    fullName: 'Ditt fullständiga namn',
    contactInfo: 'Kontaktuppgifter',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adress',
    jobTitle: 'Jobbtitel',
    jobTitleRequired: 'krävs',
    jobTitlePlaceholder: 't.ex. Mjukvaruutvecklare',
    aboutMe: 'Om mig',
    aboutMePlaceholder: 'Beskriv dig själv och dina kvalifikationer...',
    chatgptTip: 'Tips: I framtiden kommer ChatGPT API att kunna hjälpa till att generera denna sektion',
    education: 'Utbildning',
    add: 'Lägg till',
    educationLabel: 'Utbildning',
    university: 'Universitet/Skola',
    degree: 'Examen/Prov',
    courses: 'Relevanta kurser',
    skills: 'Färdigheter',
    hardSkills: 'Tekniska färdigheter',
    hardSkillsPlaceholder: 't.ex. JavaScript, Python, Photoshop',
    softSkills: 'Mjuka färdigheter',
    softSkillsPlaceholder: 't.ex. Teamarbete, Kommunikation, Problemlösning',
    experience: 'Yrkeslivserfarenhet',
    experienceLabel: 'Erfarenhet',
    jobTitleField: 'Jobbtitel',
    company: 'Företag',
    responsibilities: 'Ansvar och resultat',
    achievements: 'Prestationer (valfritt)',
    achievementsPlaceholder: 'Särskilda prestationer, utmärkelser eller certifikat',
    generateCV: 'Generera CV',
    validationMessage: 'Fyll i namn, jobbtitel och välj en mall för att fortsätta',
    selectTemplate: 'Välj CV-mall',
    searchUniversities: 'Skriv för att söka universitet',
    customUniversity: 'Skriv universitetsnamn och tryck Enter om inte hittat'
  },
  no: {
    backToDashboard: 'Tilbake til dashbord',
    createCV: 'Lag CV',
    selectLanguage: 'Velg språk',
    profilePhoto: 'Profilbilde',
    uploadPhoto: 'Last opp bilde',
    changePhoto: 'Bytt bilde',
    removePhoto: 'Fjern bilde',
    name: 'Navn',
    nameRequired: 'påkrevd',
    fullName: 'Ditt fulle navn',
    contactInfo: 'Kontaktinformasjon',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adresse',
    jobTitle: 'Jobbtittel',
    jobTitleRequired: 'påkrevd',
    jobTitlePlaceholder: 'f.eks. Programvareutvikler',
    aboutMe: 'Om meg',
    aboutMePlaceholder: 'Beskriv deg selv og dine kvalifikasjoner...',
    chatgptTip: 'Tips: I fremtiden vil ChatGPT API kunne hjelpe til med å generere denne seksjonen',
    education: 'Utdanning',
    add: 'Legg til',
    educationLabel: 'Utdanning',
    university: 'Universitet/Skole',
    degree: 'Grad/Eksamen',
    courses: 'Relevante kurs',
    skills: 'Ferdigheter',
    hardSkills: 'Tekniske ferdigheter',
    hardSkillsPlaceholder: 'f.eks. JavaScript, Python, Photoshop',
    softSkills: 'Myke ferdigheter',
    softSkillsPlaceholder: 'f.eks. Teamarbeid, Kommunikasjon, Problemløsning',
    experience: 'Yrkeserfaring',
    experienceLabel: 'Erfaring',
    jobTitleField: 'Jobbtittel',
    company: 'Selskap',
    responsibilities: 'Ansvar og resultater',
    achievements: 'Prestasjoner (valgfritt)',
    achievementsPlaceholder: 'Spesielle prestasjoner, utmerkelser eller sertifikater',
    generateCV: 'Generer CV',
    validationMessage: 'Fyll ut navn, jobbtittel og velg en mal for å fortsette',
    selectTemplate: 'Velg CV-mal',
    searchUniversities: 'Skriv for å søke universiteter',
    customUniversity: 'Skriv universitetsnavnet og trykk Enter hvis ikke funnet'
  },
  fi: {
    backToDashboard: 'Takaisin kojetauluun',
    createCV: 'Luo CV',
    selectLanguage: 'Valitse kieli',
    profilePhoto: 'Profiilikuva',
    uploadPhoto: 'Lataa kuva',
    changePhoto: 'Vaihda kuva',
    removePhoto: 'Poista kuva',
    name: 'Nimi',
    nameRequired: 'vaaditaan',
    fullName: 'Koko nimesi',
    contactInfo: 'Yhteystiedot',
    email: 'Sähköposti',
    phone: 'Puhelin',
    address: 'Osoite',
    jobTitle: 'Työnimike',
    jobTitleRequired: 'vaaditaan',
    jobTitlePlaceholder: 'esim. Ohjelmistokehittäjä',
    aboutMe: 'Minusta',
    aboutMePlaceholder: 'Kuvaile itseäsi ja pätevyyttäsi...',
    chatgptTip: 'Vinkki: Tulevaisuudessa ChatGPT API voi auttaa tämän osion luomisessa',
    education: 'Koulutus',
    add: 'Lisää',
    educationLabel: 'Koulutus',
    university: 'Yliopisto/Koulu',
    degree: 'Tutkinto/Tentti',
    courses: 'Asiaankuuluvat kurssit',
    skills: 'Taidot',
    hardSkills: 'Tekniset taidot',
    hardSkillsPlaceholder: 'esim. JavaScript, Python, Photoshop',
    softSkills: 'Pehmeät taidot',
    softSkillsPlaceholder: 'esim. Tiimityö, Viestintä, Ongelmanratkaisu',
    experience: 'Työkokemus',
    experienceLabel: 'Kokemus',
    jobTitleField: 'Työnimike',
    company: 'Yritys',
    responsibilities: 'Vastuualueet ja tulokset',
    achievements: 'Saavutukset (valinnainen)',
    achievementsPlaceholder: 'Erityiset saavutukset, palkinnot tai sertifikaatit',
    generateCV: 'Luo CV',
    validationMessage: 'Täytä nimi, työnimike ja valitse malli jatkaaksesi',
    selectTemplate: 'Valitse CV-malli',
    searchUniversities: 'Kirjoita etsiäksesi yliopistoja',
    customUniversity: 'Kirjoita yliopiston nimi ja paina Enter jos ei löydy'
  }
}

// Custom option component for Select
const CustomOption = ({ data, innerRef, innerProps, isSelected, isFocused }: any) => (
  <div
    ref={innerRef}
    {...innerProps}
    className={`px-3 py-2 cursor-pointer flex items-center space-x-2 ${
      isSelected ? 'bg-teal-600 text-white' : isFocused ? 'bg-gray-100' : 'text-gray-900'
    }`}
  >
    <span className="text-xl">{data.flag}</span>
    <span>{data.label}</span>
  </div>
)

// Custom single value component for Select
const CustomSingleValue = ({ data }: any) => (
  <div className="flex items-center space-x-2">
    <span className="text-xl">{data.flag}</span>
    <span>{data.label}</span>
  </div>
)

// Custom university option component
const UniversityOption = ({ data, innerRef, innerProps, isSelected, isFocused }: any) => (
  <div
    ref={innerRef}
    {...innerProps}
    className={`px-3 py-2 cursor-pointer ${
      isSelected ? 'bg-teal-600 text-white' : isFocused ? 'bg-gray-100' : 'text-gray-900'
    }`}
  >
    <div className="font-medium">{data.label}</div>
  </div>
)

// University Select Component
const UniversitySelect = ({ value, onChange, placeholder, translations }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredOptions = filterUniversities(searchValue)

  const handleInputChange = (newValue: string) => {
    setSearchValue(newValue)
    setIsMenuOpen(newValue.length > 0)
  }

  const handleChange = (selectedOption: any) => {
    const newValue = selectedOption ? selectedOption.value : ''
    onChange(newValue)
    setSearchValue('')
    setIsMenuOpen(false)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      const existingOption = filteredOptions.find(opt => opt.value.toLowerCase() === searchValue.toLowerCase())
      if (!existingOption) {
        // Allow custom input if university not found
        event.preventDefault()
        onChange(searchValue.trim())
        setSearchValue('')
        setIsMenuOpen(false)
      }
    }
  }

  // Always show the current value
  const currentValue = value ? { value, label: value } : null

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '40px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      '&:hover': {
        borderColor: '#d1d5db'
      },
      '&:focus-within': {
        borderColor: '#14b8a6',
        boxShadow: '0 0 0 2px rgba(20, 184, 166, 0.2)'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999
    }),
    option: () => ({})
  }

  return (
    <Select
      value={currentValue}
      inputValue={searchValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      options={filteredOptions}
      components={{
        Option: UniversityOption
      }}
      styles={customStyles}
      menuIsOpen={isMenuOpen}
      onMenuClose={() => {
        setIsMenuOpen(false)
        setSearchValue('')
      }}
      onMenuOpen={() => setIsMenuOpen(true)}
      placeholder={placeholder}
      isClearable
      isSearchable
      noOptionsMessage={() => searchValue ? translations.customUniversity : translations.searchUniversities}
    />
  )
}

// Update the interface to include template selection
interface Template {
  id: string;
  name: string;
  path: string;
  preview: string;
}



// Add template configuration with HTML templates
const templates: Template[] = [
  {
    id: 'blue-professional',
    name: 'Blue Professional',
    path: '/templates/html/blue-professional.html',
    preview: '/Blue professional Professional CV Resume.svg'
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    path: '/templates/html/modern-professional.html',
    preview: '/Modern Professional CV Resume.svg'
  },
  {
    id: 'simple-professional',
    name: 'Simple Professional',
    path: '/templates/html/simple-professional.html',
    preview: '/Simple Professional CV Resume.svg'
  },
  {
    id: 'blue-gray-simple',
    name: 'Blue & Gray Simple',
    path: '/templates/html/blue-gray-simple.html',
    preview: '/Blue and Gray Simple Professional CV Resume.svg'
  },
  {
    id: 'pink-simple-profile',
    name: 'Pink Simple Profile',
    path: '/templates/html/pink-simple-profile.html',
    preview: '/Pink Simple Profile Resume.svg'
  },
  {
    id: 'neutral-professional',
    name: 'Neutral Professional',
    path: '/templates/html/neutral-professional.html',
    preview: '/Neutral Professional Sales Representative Resume .svg'
  },
];

const generateCV = async (formData: any, selectedTemplate: string, language: string = 'da') => {
  try {
    // Find the selected template
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) {
      throw new Error('Template not found');
    }

    // Load the HTML template
    const templateUrl = `/templates/html/${selectedTemplate}.html`;
    const response = await fetch(templateUrl);
    
    if (!response.ok) {
      throw new Error('Template could not be loaded');
    }
    
    const htmlTemplate = await response.text();

    // Show loading state
    const loadingWindow = window.open('', '_blank');
    if (loadingWindow) {
      loadingWindow.document.write(`
        <html>
          <head>
            <title>Genererer CV...</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              .loader {
                text-align: center;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="loader">
              <div class="spinner"></div>
              <h2>Genererer dit CV...</h2>
              <p>⚠️ AI er deaktiveret - Opretter grundlæggende CV uden AI-optimering</p>
            </div>
          </body>
        </html>
      `);
    }

    // Call API to generate CV with AI
    const apiResponse = await fetch('/api/generate-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        templateHtml: htmlTemplate,
        selectedTemplate,
        language
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error || 'API request failed');
    }

    const result = await apiResponse.json();
    
    if (!result.success || !result.html) {
      throw new Error('Invalid response from CV generation API');
    }

    // Decode HTML if it's base64 encoded
    let htmlContent = result.html;
    if (result.encoded) {
      // UTF-8 safe base64 decoding (handles æøå and other multibyte chars)
      const binary = atob(result.html);
      const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
      htmlContent = new TextDecoder().decode(bytes);
    }

    // Display the generated CV
    if (loadingWindow) {
      loadingWindow.document.open();
      loadingWindow.document.write(htmlContent);
      loadingWindow.document.close();
    } else {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } else {
        throw new Error('Could not open new window. Please allow popups.');
      }
    }
    
  } catch (error) {
    console.error('CV generation failed:', error);
    alert(`Fejl ved generering af CV: ${error instanceof Error ? error.message : 'Ukendt fejl'}`);
  }
};

// Component to display HTML template preview
const TemplatePreview = ({ template, isSelected, onClick }: { template: Template; isSelected: boolean; onClick: () => void }) => {
  const getTemplatePreview = (templateId: string) => {
    const previews = {
      'blue-professional': {
        color: 'from-blue-500 to-blue-700',
        icon: <Briefcase className="w-8 h-8 text-white" />,
        description: 'Professional & Clean'
      },
      'modern-professional': {
        color: 'from-purple-500 to-pink-600',
        icon: <Sparkles className="w-8 h-8 text-white" />,
        description: 'Modern & Creative'
      },
      'simple-professional': {
        color: 'from-gray-500 to-gray-700',
        icon: <User className="w-8 h-8 text-white" />,
        description: 'Simple & Elegant'
      },
      'blue-gray-simple': {
        color: 'from-slate-500 to-slate-700',
        icon: <Mail className="w-8 h-8 text-white" />,
        description: 'Blue Gray Classic'
      },
      'pink-simple-profile': {
        color: 'from-pink-500 to-rose-600',
        icon: <Star className="w-8 h-8 text-white" />,
        description: 'Pink & Personal'
      },
      'neutral-professional': {
        color: 'from-green-500 to-green-700',
        icon: <Award className="w-8 h-8 text-white" />,
        description: 'Neutral & Professional'
      }
    };
    return previews[templateId as keyof typeof previews] || previews['blue-professional'];
  };

  const preview = getTemplatePreview(template.id);

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
        isSelected
          ? 'ring-4 ring-teal-400 shadow-2xl scale-105'
          : 'hover:ring-2 hover:ring-teal-200'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
          ✓
        </div>
      )}
      
      <div className="p-6 h-full flex flex-col">
        {/* Template Preview */}
        <div className={`flex-1 rounded-xl bg-gradient-to-br ${preview.color} p-8 mb-4 flex flex-col items-center justify-center relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-white/20 transform rotate-12 translate-x-4 translate-y-4"></div>
            <div className="absolute inset-0 bg-white/10 transform -rotate-6 translate-x-2 translate-y-2"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {preview.icon}
            <div className="mt-4 text-white">
              <div className="text-xl font-bold mb-1">CV</div>
              <div className="text-sm opacity-90">{preview.description}</div>
            </div>
          </div>
        </div>
        
        {/* Template Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
          <p className="text-sm text-gray-500">{preview.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function CreateCV() {
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    aboutMe: '',
    education: [{ university: '', degree: '', courses: '' }],
    skills: { hard: '', soft: '' },
    experience: [{ jobTitle: '', company: '', responsibilities: '' }],
    achievements: ''
  })

  const t = translations[selectedLanguage.value as keyof typeof translations] || translations.en

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { university: '', degree: '', courses: '' }]
    }))
  }

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { jobTitle: '', company: '', responsibilities: '' }]
    }))
  }

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const isFormValid = formData.name && formData.jobTitle && selectedTemplate

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '44px',
      height: '44px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: '#f9fafb',
      '&:hover': {
        borderColor: '#14b8a6',
        backgroundColor: '#ffffff'
      },
      '&:focus-within': {
        borderColor: '#14b8a6',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1)'
      }
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '2px 16px',
      height: '42px',
      display: 'flex',
      alignItems: 'center'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      height: '100%'
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: '8px',
      color: '#6b7280'
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      fontSize: '14px',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }),
    option: () => ({})
  }

  const handleLanguageChange = (newValue: any) => {
    if (newValue) {
      setSelectedLanguage(newValue)
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setProfilePhoto(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Service temporarily disabled
    alert('🚫 Tjenesten er midlertidigt utilgængelig. CV-generering virker ikke lige nu.')
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="flex h-screen">
        {/* Left side - Form (2/5) */}
        <div className="w-2/5 bg-white/70 backdrop-blur-sm shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-gray-200/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="group flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors">
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-teal-100 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </div>
                <span className="font-medium">{t.backToDashboard}</span>
              </Link>
            </div>
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.createCV}</h1>
              <p className="text-gray-600">Fill in your details to create a professional CV</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Language Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.selectLanguage}
                </label>
                <Select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  options={languageOptions}
                  components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue
                  }}
                  styles={customStyles}
                  isSearchable
                  placeholder={t.selectLanguage}
                />
              </div>

              {/* Profile Photo */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.profilePhoto}
                </label>
                <div className="flex items-center space-x-6">
                  {profilePhoto ? (
                    <div className="relative">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 border-3 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex flex-col space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-700 cursor-pointer inline-block text-center transition-all shadow-md hover:shadow-lg"
                    >
                      {profilePhoto ? t.changePhoto : t.uploadPhoto}
                    </label>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.name} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                    placeholder={t.fullName}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span>{t.contactInfo}</span>
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                      placeholder={t.email}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                      placeholder={t.phone}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                      placeholder={t.address}
                    />
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.jobTitle} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                    placeholder={t.jobTitlePlaceholder}
                  />
                </div>
              </div>

              {/* About Me */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.aboutMe}
                </label>
                <textarea
                  value={formData.aboutMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all resize-none"
                  placeholder={t.aboutMePlaceholder}
                />
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.chatgptTip}</span>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span>{t.education}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t.add}</span>
                  </button>
                </div>
                {formData.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full">
                        {t.educationLabel} {index + 1}
                      </span>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <UniversitySelect
                        value={edu.university}
                        onChange={(value: string) => updateEducation(index, 'university', value)}
                        placeholder={t.university}
                        translations={t}
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all"
                        placeholder={t.degree}
                      />
                      <input
                        type="text"
                        value={edu.courses}
                        onChange={(e) => updateEducation(index, 'courses', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all"
                        placeholder={t.courses}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span>{t.skills}</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{t.hardSkills}</label>
                    <input
                      type="text"
                      value={formData.skills.hard}
                      onChange={(e) => setFormData(prev => ({ ...prev, skills: { ...prev.skills, hard: e.target.value } }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                      placeholder={t.hardSkillsPlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{t.softSkills}</label>
                    <input
                      type="text"
                      value={formData.skills.soft}
                      onChange={(e) => setFormData(prev => ({ ...prev, skills: { ...prev.skills, soft: e.target.value } }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all"
                      placeholder={t.softSkillsPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <span>{t.experience}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t.add}</span>
                  </button>
                </div>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full">
                        {t.experienceLabel} {index + 1}
                      </span>
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all"
                        placeholder={t.jobTitleField}
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all"
                        placeholder={t.company}
                      />
                      <textarea
                        value={exp.responsibilities}
                        onChange={(e) => updateExperience(index, 'responsibilities', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all resize-none"
                        placeholder={t.responsibilities}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>{t.achievements}</span>
                </label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 focus:bg-white transition-all resize-none"
                  placeholder={t.achievementsPlaceholder}
                />
              </div>

              {/* Service Temporarily Unavailable Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">🚫</span>
                  </div>
                  <div>
                    <h4 className="text-red-800 font-bold text-lg">CV Generator Midlertidigt Utilgængelig</h4>
                  </div>
                </div>
                <div className="bg-white border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm mb-3">
                    <strong>Tjenesten virker ikke lige nu</strong> - Vi arbejder på at løse problemet.
                  </p>
                  <div className="space-y-2 text-sm text-red-600">
                    <p>• CV-generering er midlertidigt deaktiveret</p>
                    <p>• Vi opdaterer systemet for bedre ydeevne</p>
                    <p>• Forventet online igen snart</p>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">
                      💡 Tip: Prøv igen om lidt, eller kontakt support hvis problemet fortsætter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disabled Generate Button */}
              <div className="pt-8 border-t border-gray-200">
                <button
                  type="button"
                  disabled={true}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  🚫 Tjeneste Utilgængelig
                </button>
                <p className="text-sm text-red-500 mt-3 text-center">
                  CV-generering er midlertidigt deaktiveret for vedligeholdelse
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Templates (3/5) */}
        <div className="w-3/5 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex flex-col relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="p-8 pb-6 flex-shrink-0 relative z-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">{t.selectTemplate}</h2>
              <p className="text-teal-100 text-lg">Choose the perfect design for your professional CV</p>
            </div>
          </div>
          
          <div className="px-8 pb-8 overflow-y-auto flex-1 relative z-10">
            <div className="grid grid-cols-2 gap-8">
              {templates.map((template) => (
                <TemplatePreview
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 