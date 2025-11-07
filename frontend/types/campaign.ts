export interface Campaign {
  id: number;
  name: string;
  budget: number;
  spend: number;
  status: string;
}

export interface CreateCampaignData {
  name: string;
  budget: number;
  spend: number;
}