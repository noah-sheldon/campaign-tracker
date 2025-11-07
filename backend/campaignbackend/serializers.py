from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'budget', 'spend', 'status']
