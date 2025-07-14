# Canva Integration Guide for CV Maker

## Oversigt

Ved at integrere med Canva's API kan vi automatisk udfylde dine smukke Canva CV-designs med data fra vores form. Dette giver dig det bedste af begge verdener: professionelle designs + automatisk udfyldning.

## Setup Process

### 1. Forbered dine Canva Templates

1. **Åbn dine eksisterende Canva designs**
2. **Installer "Data autofill" app**:
   - Gå til Apps i Canva editor
   - Søg efter "Data autofill" 
   - Klik "Add to design"

3. **Sæt data fields på dine templates**:
   - Vælg tekst-elementer i dit design
   - Klik "Data Field" knappen (kun synlig når Data autofill app er åben)
   - Navngiv fields efter vores form data:

```
NAVN - for navn
EMAIL - for email  
TELEFON - for telefon nummer
ADRESSE - for adresse
JOB_TITEL - for job titel
OM_MIG - for about me tekst
UDDANNELSE - for uddannelse sektion
ERFARING - for erhvervserfaring
HAARDE_FAERDIGHEDER - for hard skills
BLOEDE_FAERDIGHEDER - for soft skills
PRÆSTATIONER - for achievements
PROFIL_BILLEDE - for profil foto (image field)
```

4. **Publicer som Brand Templates**:
   - Klik "Share" knappen
   - Vælg "Publish as brand template"
   - Kopiér template ID fra URL

### 2. Developer Setup

1. **Opret Canva Developer Account**:
   - Gå til https://www.canva.com/developers
   - Opret en integration
   - Få Client ID og Client Secret

2. **Environment Variables**:
```bash
NEXT_PUBLIC_CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
```

3. **Template IDs**:
Opdater template konfiguration i koden med dine Brand Template IDs:

```typescript
const canvaTemplates = {
  'blue-professional': 'CANVA_TEMPLATE_ID_1',
  'modern-professional': 'CANVA_TEMPLATE_ID_2',
  'simple-professional': 'CANVA_TEMPLATE_ID_3',
  // osv...
};
```

### 3. Implementation

Med Canva integration får brugerne:

1. **Samme smukke designs** fra Canva
2. **Automatisk udfyldning** af form data
3. **Link til Canva editor** for finpudsning
4. **Direct PDF export** fra Canva

### 4. User Flow

1. Bruger udfylder form i vores app
2. Vælger Canva template
3. Klikker "Generer CV"
4. Vi sender data til Canva Autofill API
5. Canva opretter nyt design med data
6. Bruger får link til at se/redigere i Canva
7. Bruger kan eksportere som PDF fra Canva

## Fordele ved Canva Integration

✅ **Bevar alle dine smukke designs** - ingen konvertering til SVG  
✅ **Professionel kvalitet** - Canva's design engine  
✅ **Nem redigering** - brugere kan finpudse i Canva  
✅ **Automatisk udfyldning** - ingen manuel kopiering  
✅ **PDF export** - højkvalitets output  
✅ **Brand konsistens** - brand templates sikrer ensartethed  

## Tekniske Detaljer

### API Endpoints
- **Brand Templates**: `/rest/v1/brand-templates`
- **Autofill**: `/rest/v1/autofills`  
- **Assets**: `/rest/v1/assets` (for billede upload)
- **Export**: `/rest/v1/exports`

### Rate Limits
- Design Request Export: 10 requests/10 seconds
- Design Add Native Element: 20 requests/10 seconds

### Authentication
OAuth 2.0 med PKCE flow for sikkerhed.

## Næste Skridt

1. Setup Canva Developer account
2. Forbered dine templates med data fields
3. Implementer OAuth flow
4. Test med ét template først
5. Udvid til alle templates

Dette giver dig en kraftfuld løsning der kombinerer vores brugervenlige form med Canva's professionelle design-kvalitet! 