from django.db import models

class Campaign(models.Model):
    name = models.CharField(max_length=100)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    spend = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name
    
    @property
    def status(self):
        if self.budget == 0:
            return "No Budget"
        
        spend_percentage = (self.spend / self.budget) * 100
        
        if spend_percentage >= 100:
            return "Over Budget"
        elif spend_percentage >= 80:
            return "Warning"
        else:
            return "On Track"
    