'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreateCampaignData } from '@/types/campaign';

interface CampaignFormProps {
  onSubmit: (data: CreateCampaignData) => void;
  isLoading?: boolean;
}

export function CampaignForm({ onSubmit, isLoading = false }: CampaignFormProps) {
  const [formData, setFormData] = useState<CreateCampaignData>({
    name: '',
    budget: 0,
    spend: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', budget: 0, spend: 0 });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.budget || ''}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spend">Spend</Label>
            <Input
              id="spend"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.spend || ''}
              onChange={(e) => setFormData({ ...formData, spend: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Campaign'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}