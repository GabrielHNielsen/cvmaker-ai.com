// Canva API Integration for CVMaker.AI
// This file will handle Canva API calls for CV generation

interface CanvaConfig {
  apiKey: string;
  baseUrl: string;
  version: string;
}

interface CVData {
  name: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  aboutMe: string;
  experiences: Experience[];
  education: Education[];
  skills: {
    hard: string[];
    soft: string[];
  };
  achievements: string[];
}

interface Experience {
  jobTitle: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  university: string;
  period: string;
  courses?: string;
}

interface CanvaDesignRequest {
  templateId: string;
  data: CVData;
  format: 'pdf' | 'png' | 'jpg';
}

interface CanvaDesignResponse {
  designId: string;
  downloadUrl: string;
  status: 'success' | 'error';
  message?: string;
}

class CanvaAPIClient {
  private config: CanvaConfig;

  constructor() {
    this.config = {
      apiKey: process.env.CANVA_API_KEY || '',
      baseUrl: 'https://api.canva.com/rest/v1',
      version: 'v1'
    };

    if (!this.config.apiKey) {
      throw new Error('CANVA_API_KEY is not set in environment variables');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Canva API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get available CV templates
  async getTemplates(): Promise<any[]> {
    try {
      const response = await this.makeRequest('/designs/templates?category=resume');
      return response.templates || [];
    } catch (error) {
      console.error('Error fetching Canva templates:', error);
      throw error;
    }
  }

  // Create CV design from template
  async createCVDesign(request: CanvaDesignRequest): Promise<CanvaDesignResponse> {
    try {
      // This will be implemented once we have API access
      // For now, return a placeholder response
      console.log('Creating CV design with data:', request);
      
      // Placeholder implementation
      return {
        designId: 'placeholder-design-id',
        downloadUrl: 'placeholder-download-url',
        status: 'success'
      };
    } catch (error) {
      console.error('Error creating CV design:', error);
      return {
        designId: '',
        downloadUrl: '',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Export CV as PDF
  async exportCVAsPDF(designId: string): Promise<string> {
    try {
      const response = await this.makeRequest(`/designs/${designId}/export`, {
        method: 'POST',
        body: JSON.stringify({
          format: 'pdf',
          quality: 'high'
        })
      });

      return response.downloadUrl;
    } catch (error) {
      console.error('Error exporting CV as PDF:', error);
      throw error;
    }
  }

  // Update design with new data
  async updateDesignData(designId: string, data: CVData): Promise<boolean> {
    try {
      await this.makeRequest(`/designs/${designId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          elements: this.mapCVDataToCanvaElements(data)
        })
      });

      return true;
    } catch (error) {
      console.error('Error updating design data:', error);
      return false;
    }
  }

  // Helper function to map CV data to Canva elements
  private mapCVDataToCanvaElements(data: CVData) {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      jobTitle: data.jobTitle,
      aboutMe: data.aboutMe,
      experiences: data.experiences,
      education: data.education,
      skills: data.skills,
      achievements: data.achievements
    };
  }
}

// Export functions for use in API routes
export async function generateCVWithCanva(cvData: CVData, templateId: string): Promise<CanvaDesignResponse> {
  const canvaClient = new CanvaAPIClient();
  
  const request: CanvaDesignRequest = {
    templateId,
    data: cvData,
    format: 'pdf'
  };

  return await canvaClient.createCVDesign(request);
}

export async function getAvailableTemplates(): Promise<any[]> {
  const canvaClient = new CanvaAPIClient();
  return await canvaClient.getTemplates();
}

export { CanvaAPIClient };
export type { CVData, CanvaDesignRequest, CanvaDesignResponse }; 