'use client';

import { useState, useEffect } from 'react';
import { CampaignTable } from '@/components/campaign-table';
import { CampaignForm } from '@/components/campaign-form';
import { Campaign, CreateCampaignData } from '@/types/campaign';
import { campaignApi } from '@/lib/api';

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await campaignApi.getCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError('Failed to load campaigns. Make sure the Django server is running.');
      console.error('Error fetching campaigns:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCampaign = async (data: CreateCampaignData) => {
    try {
      setIsSubmitting(true);
      const newCampaign = await campaignApi.createCampaign(data);
      setCampaigns(prev => [...prev, newCampaign]);
      setError(null);
    } catch (err) {
      setError('Failed to create campaign');
      console.error('Error creating campaign:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCampaign = async (id: number) => {
    try {
      await campaignApi.deleteCampaign(id);
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete campaign');
      console.error('Error deleting campaign:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign Budget Tracker
          </h1>
          <p className="text-gray-600">
            Monitor and manage your advertising campaign budgets and spending
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign List</h2>
              <CampaignTable
                campaigns={campaigns}
                onDelete={handleDeleteCampaign}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <CampaignForm
              onSubmit={handleCreateCampaign}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
