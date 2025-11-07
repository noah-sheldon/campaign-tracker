# Campaign Budget Tracker

A minimal campaign budget tracking tool built with Django REST Framework and Next.js. Account managers can track spending across various advertising campaigns and monitor budget status.

## Features

- **Campaign Management**: Add, view, and delete advertising campaigns
- **Budget Tracking**: Monitor campaign budgets and current spending
- **Status Indicators**: Visual status indicators (On Track, Warning, Over Budget)
- **Responsive Design**: Mobile-friendly interface using shadcn/ui components
- **Real-time Updates**: Live data updates between form submissions and table display

## Tech Stack

### Backend
- **Django 5.2.8** - Web framework
- **Django REST Framework 3.16.1** - API framework
- **Django CORS Headers** - Cross-Origin Resource Sharing
- **SQLite** - Database (development)

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Slate theme, New York style)

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campaign-tracker
   ```

2. **Run with Docker Compose**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/campaigns/
   - Django Admin: http://localhost:8000/admin/

## Development Setup

### Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Activate virtual environment**
   ```bash
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Campaigns
- `GET /api/campaigns/` - List all campaigns
- `POST /api/campaigns/` - Create new campaign
- `GET /api/campaigns/{id}/` - Retrieve specific campaign
- `PUT /api/campaigns/{id}/` - Update campaign
- `DELETE /api/campaigns/{id}/` - Delete campaign

### Campaign Model
```json
{
  "id": 1,
  "name": "Summer Sale Campaign",
  "budget": 1000.00,
  "spend": 750.00,
  "status": "Warning"
}
```

### Status Logic
- **On Track**: Spend < 80% of budget
- **Warning**: Spend >= 80% but < 100% of budget
- **Over Budget**: Spend >= 100% of budget
- **No Budget**: Budget is 0

## Project Structure

```
campaign-tracker/
├── backend/                 # Django backend
│   ├── campaignbackend/    # Main Django app
│   │   ├── models.py       # Campaign model
│   │   ├── serializers.py  # DRF serializers
│   │   ├── views.py        # DRF viewsets
│   │   └── urls.py         # URL routing
│   ├── config/             # Django configuration
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container
├── frontend/               # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities and API calls
│   ├── types/             # TypeScript definitions
│   └── Dockerfile         # Frontend container
├── docker-compose.yml     # Multi-container setup
└── README.md             # This file
```

## Docker Configuration

The application is fully containerized using Docker:

- **Backend Container**: Python 3.14 with Django application
- **Frontend Container**: Node.js 18 with Next.js application
- **Volumes**: Development volumes for hot reloading
- **Networks**: Automatic service discovery between containers

## Deployment

GitHub Actions workflow is included for automated deployment. The workflow:

1. Builds Docker images
2. Runs tests
3. Deploys to production server using docker-compose

## Development Notes

- Frontend automatically proxies API requests to backend
- CORS is configured for local development
- Hot reloading enabled for both frontend and backend
- SQLite database persists in backend container volume

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details