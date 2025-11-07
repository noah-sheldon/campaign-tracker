# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

Campaign Tracker is a Django-based web application for tracking marketing campaign budgets and spending. The project structure is:

- `/backend/` - Django REST API backend
  - `campaignbackend/` - Main Django app containing Campaign models, serializers, and views
  - `config/` - Django project configuration (settings, URLs, WSGI/ASGI)
  - `venv/` - Python virtual environment with Django 5.2.8 and Django REST Framework
  - `manage.py` - Django management script
  - `db.sqlite3` - SQLite database file

- `/frontend/` - Currently empty, likely placeholder for future frontend implementation

## Core Models

The main model is `Campaign` in `backend/campaignbackend/models.py`:
- `name` (CharField) - Campaign name
- `budget` (DecimalField) - Total campaign budget
- `spend` (DecimalField) - Current spending amount

## Development Commands

### Backend Development
```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
source venv/bin/activate

# Run Django development server
./venv/bin/python manage.py runserver

# Database migrations
./venv/bin/python manage.py makemigrations
./venv/bin/python manage.py migrate

# Create superuser
./venv/bin/python manage.py createsuperuser

# Django shell
./venv/bin/python manage.py shell

# Run tests
./venv/bin/python manage.py test
```

Note: There appears to be an import error in `admin.py` (line 2) - it incorrectly imports `Campaign` from `django.models` instead of `.models`.

## API Structure

- Django REST Framework is configured
- Serializers exist for Campaign model:
  - `CampaignListSerializer` - Basic fields (id, name, status)
  - `CampaignDetailSerializer` - Full fields with calculated ROI
- URLs are configured through `config/urls.py` → `campaignbackend/urls.py`
- Current view is a simple home page returning text response

## Key Configuration

- Django 5.2.8 with Django REST Framework 3.16.1
- SQLite database (development)
- Debug mode enabled
- Secret key exposed (development only)
- Standard Django middleware stack