import { NextRequest, NextResponse } from 'next/server';
import { generateCVWithAI } from '../../../lib/openai';

export async function GET() {
  return NextResponse.json({ message: 'CV Generation API - Use POST method' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, templateHtml, selectedTemplate, language = 'da' } = body;

    // Validate input
    if (!formData || !templateHtml || !selectedTemplate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate required formData fields
    if (!formData.name || !formData.email || !formData.jobTitle) {
      return NextResponse.json(
        { error: 'Missing required form fields: name, email, jobTitle' },
        { status: 400 }
      );
    }

    console.log('🤖 Generating CV with OpenAI...');
    console.log('Language:', language);
    console.log('Template:', selectedTemplate);
    console.log('User:', formData.name);

    // Generate CV using OpenAI
    const generatedHtml = await generateCVWithAI(
      formData,
      templateHtml,
      selectedTemplate,
      language
    );

    console.log('✅ CV generated successfully!');

    // Encode HTML as base64 to avoid JSON parsing issues with control characters
    const base64Html = Buffer.from(generatedHtml, 'utf-8').toString('base64');

    return NextResponse.json({
      success: true,
      html: base64Html,
      encoded: true  // Flag to indicate base64 encoding
    });

  } catch (error) {
    console.error('CV generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 