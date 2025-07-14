import { NextRequest, NextResponse } from 'next/server';
import { getAvailableTemplates } from '../../../lib/canva-api';

export async function GET() {
  try {
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

    const templates = await getAvailableTemplates();
    
    return NextResponse.json({
      success: true,
      templates,
      count: templates.length
    });

  } catch (error) {
    console.error('Error fetching Canva templates:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch templates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 