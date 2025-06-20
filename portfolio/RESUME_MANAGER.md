# Resume Manager Integration

This document describes the resume manager functionality integrated into the portfolio website.

## Overview

The resume manager is accessible at `/me` and provides a complete interface for managing your resume with AI assistance and PDF generation capabilities.

## Features

### 🔐 Authentication
- Secure login system
- Session management with localStorage
- Automatic logout functionality

### 👤 Profile Management
- Personal information editing
- Professional summary
- Contact details and social links
- Real-time form validation

### 💼 Experience Management
- Add new work experiences
- Edit existing experiences
- Date range management
- Detailed job descriptions

### 🤖 AI Assistant
- AI-powered question generation using Gemini 2.5 Flash
- Personalized suggestions to improve your resume
- Interactive Q&A interface with ultra-fast responses

### 📄 Resume Generation
- Generate short (1-page) resumes
- Generate long (detailed) resumes
- PDF download functionality
- Professional formatting

## Technical Implementation

### Frontend (Angular)
- **Component**: `ResumeManagerComponent`
- **Location**: `src/app/resume-manager/`
- **Features**:
  - Reactive forms for data input
  - HTTP client for API communication
  - Responsive design with CSS Grid
  - Font Awesome icons

### Backend Integration
- **API Base**: `http://localhost:8000`
- **Proxy Configuration**: `proxy.conf.json`
- **Endpoints**:
  - `/api/login` - User authentication
  - `/api/profile/{user_id}` - Profile management
  - `/api/experience/{user_id}` - Experience management
  - `/api/ai-questions/{user_id}` - AI assistance
  - `/api/generate-resume/{user_id}` - PDF generation

### Navigation
- Added resume manager link to main navigation
- Icon: Document/file icon
- Route: `/me`

## Getting Started

### Prerequisites
1. Resume builder backend running on port 8000
2. Angular development server
3. Required dependencies installed

### Quick Start
```bash
# Start both servers
./start-dev.sh

# Or start manually:
# Terminal 1 - Backend
cd ../resume_builder
python -m uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
ng serve --port 4200
```

### Access
- **Resume Manager**: http://localhost:4200/me
- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:4200

## Usage

### 1. Login
- Navigate to `/me`
- Enter your credentials
- Session is automatically saved

### 2. Profile Setup
- Fill in personal information
- Add professional summary
- Include contact details and social links

### 3. Add Experience
- Use the experience form to add work history
- Include company, title, dates, and description
- All experiences are saved automatically

### 4. AI Assistance
- Click "Get AI Questions" for personalized suggestions
- Answer questions to improve your resume
- Use AI insights for better content

### 5. Generate Resume
- Choose between short or long format
- Download PDF directly to your device
- Files are named with date for organization

## File Structure

```
portfolio/
├── src/app/resume-manager/
│   ├── resume-manager.component.ts
│   ├── resume-manager.component.html
│   └── resume-manager.component.css
├── proxy.conf.json
├── start-dev.sh
└── RESUME_MANAGER.md
```

## Styling

The resume manager uses a modern, professional design with:
- Gradient backgrounds
- Card-based layouts
- Responsive grid systems
- Hover effects and animations
- Consistent color scheme with the portfolio

## Security

- Form validation on both client and server
- Secure API communication
- Session management
- Input sanitization

## Troubleshooting

### Common Issues

1. **Backend not running**
   - Ensure resume_builder is started on port 8000
   - Check for Python dependencies

2. **CORS errors**
   - Verify proxy configuration
   - Check backend CORS settings

3. **PDF generation fails**
   - Ensure PyLaTeX is installed
   - Check backend logs for errors

4. **AI features not working**
   - Verify Gemini API key is set
   - Check API quota and limits

### Debug Mode
- Open browser developer tools
- Check Network tab for API calls
- Review Console for errors
- Verify localStorage for session data

## Future Enhancements

- [ ] Education management
- [ ] Skills management
- [ ] Multiple resume templates
- [ ] Resume preview before download
- [ ] Export to different formats
- [ ] Resume analytics and insights 