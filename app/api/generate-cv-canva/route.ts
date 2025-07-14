import { NextRequest, NextResponse } from 'next/server';
import { generateCVWithCanva } from '../../../lib/canva-api';
import { generateCVWithAI } from '../../../lib/openai';
import type { CVData } from '../../../lib/canva-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, templateId, language = 'da' } = body;

    // Validate input
    if (!formData || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: formData and templateId' },
        { status: 400 }
      );
    }

    // Check if Canva API key is configured
    if (!process.env.CANVA_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Canva API not configured',
          message: 'CANVA_API_KEY is not set. Please apply for Canva API access first.'
        },
        { status: 503 }
      );
    }

    // Step 1: Generate AI-enhanced content using OpenAI
    console.log('🤖 Generating AI-enhanced CV content...');
    const aiEnhancedContent = await generateCVWithAI(formData, '', '', language);
    
    // Parse AI response to extract structured data
    const enhancedData = parseAIResponseToStructuredData(aiEnhancedContent, formData);

    // Step 2: Create CV design using Canva API
    console.log('🎨 Creating CV design with Canva API...');
    const canvaResponse = await generateCVWithCanva(enhancedData, templateId);

    if (canvaResponse.status === 'error') {
      return NextResponse.json(
        { 
          error: 'Failed to create CV design',
          message: canvaResponse.message
        },
        { status: 500 }
      );
    }

    console.log('✅ CV generated successfully with Canva!');
    
    return NextResponse.json({
      success: true,
      designId: canvaResponse.designId,
      downloadUrl: canvaResponse.downloadUrl,
      message: 'CV generated successfully with Canva API'
    });

  } catch (error) {
    console.error('❌ Error generating CV with Canva:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate CV',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to parse AI response into structured data
function parseAIResponseToStructuredData(aiResponse: string, originalFormData: any): CVData {
  // This is a simplified parser - you might need to adjust based on your AI response format
  try {
    // For now, we'll structure the data based on the original form data
    // In a real implementation, you'd parse the AI response more intelligently
    
    return {
      name: originalFormData.name || '',
      email: originalFormData.email || '',
      phone: originalFormData.phone || '',
      address: originalFormData.address || '',
      jobTitle: originalFormData.jobTitle || '',
      aboutMe: extractAboutMe(aiResponse) || originalFormData.aboutMe || '',
      experiences: parseExperiences(originalFormData.experiences || []),
      education: parseEducation(originalFormData.education || []),
      skills: {
        hard: originalFormData.skills?.hard || [],
        soft: originalFormData.skills?.soft || []
      },
      achievements: originalFormData.achievements || []
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Fallback to original form data
    return {
      name: originalFormData.name || '',
      email: originalFormData.email || '',
      phone: originalFormData.phone || '',
      address: originalFormData.address || '',
      jobTitle: originalFormData.jobTitle || '',
      aboutMe: originalFormData.aboutMe || '',
      experiences: originalFormData.experiences || [],
      education: originalFormData.education || [],
      skills: {
        hard: originalFormData.skills?.hard || [],
        soft: originalFormData.skills?.soft || []
      },
      achievements: originalFormData.achievements || []
    };
  }
}

function extractAboutMe(aiResponse: string): string {
  // Simple extraction - you might want to make this more sophisticated
  const aboutMeMatch = aiResponse.match(/(?:Om mig|About me)[:\s]*(.*?)(?:\n\n|\n(?=[A-Z]))/i);
  return aboutMeMatch ? aboutMeMatch[1].trim() : '';
}

function parseExperiences(experiences: any[]): any[] {
  return experiences.map(exp => ({
    jobTitle: exp.jobTitle || '',
    company: exp.company || '',
    period: exp.period || '',
    responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [exp.responsibilities || '']
  }));
}

function parseEducation(education: any[]): any[] {
  return education.map(edu => ({
    degree: edu.degree || '',
    university: edu.university || '',
    period: edu.period || '',
    courses: edu.courses || ''
  }));
} 