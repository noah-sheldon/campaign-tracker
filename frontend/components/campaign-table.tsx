'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Campaign } from '@/types/campaign';

interface CampaignTableProps {
  campaigns: Campaign[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export function CampaignTable({ campaigns, onDelete, isLoading = false }: CampaignTableProps) {
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; campaign: Campaign | null }>({
    isOpen: false,
    campaign: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (campaign: Campaign) => {
    setDeleteDialog({ isOpen: true, campaign });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.campaign) return;
    
    setIsDeleting(true);
    try {
      await onDelete(deleteDialog.campaign.id);
      setDeleteDialog({ isOpen: false, campaign: null });
    } catch (error) {
      console.error('Error deleting campaign:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, campaign: null });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'text-green-600 bg-green-50';
      case 'Warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'Over Budget':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border rounded-md">
            No campaigns found. Add a new campaign to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg text-gray-900 leading-tight">
                    {campaign.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      campaign.status
                    )}`}
                  >
                    {campaign.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget:</span>
                    <span className="text-sm font-medium">{formatCurrency(campaign.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Spend:</span>
                    <span className="text-sm font-medium">{formatCurrency(campaign.spend)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(campaign.budget - campaign.spend)}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(campaign)}
                    className="w-full sm:w-auto"
                  >
                    Delete Campaign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-0">Name</TableHead>
                <TableHead className="w-24 text-right">Budget</TableHead>
                <TableHead className="w-24 text-right">Spend</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No campaigns found. Add a new campaign to get started.
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium min-w-0">
                      <div className="truncate pr-2" title={campaign.name}>
                        {campaign.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatCurrency(campaign.budget)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatCurrency(campaign.spend)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status === "Over Budget" ? "Over" : campaign.status === "On Track" ? "Track" : "Warning"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(campaign)}
                        className="text-xs px-2 py-1"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Campaign"
        description={
          deleteDialog.campaign
            ? `Are you sure you want to delete "${deleteDialog.campaign.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this campaign? This action cannot be undone.'
        }
        isLoading={isDeleting}
      />
    </div>
  );
}