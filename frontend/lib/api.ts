import { Campaign, CreateCampaignData } from '@/types/campaign';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class CampaignApi {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getCampaigns(): Promise<Campaign[]> {
    return this.request<Campaign[]>('/campaigns/');
  }

  async getCampaign(id: number): Promise<Campaign> {
    return this.request<Campaign>(`/campaigns/${id}/`);
  }

  async createCampaign(data: CreateCampaignData): Promise<Campaign> {
    return this.request<Campaign>('/campaigns/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCampaign(id: number, data: Partial<CreateCampaignData>): Promise<Campaign> {
    return this.request<Campaign>(`/campaigns/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCampaign(id: number): Promise<void> {
    return this.request<void>(`/campaigns/${id}/`, {
      method: 'DELETE',
    });
  }
}

export const campaignApi = new CampaignApi();