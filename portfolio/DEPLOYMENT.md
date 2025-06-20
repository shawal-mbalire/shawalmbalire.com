# Deployment Guide

This guide covers deploying the resume builder system for both development and production environments.

## Development Environment

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Angular CLI (`npm install -g @angular/cli`)
- Google Cloud CLI (`gcloud`)

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

### Access URLs
- **Frontend**: http://localhost:4200
- **Resume Manager**: http://localhost:4200/me
- **Backend API**: http://localhost:8000

## Production Deployment

### 1. Google Cloud Functions (Backend)

#### Prerequisites
- Google Cloud account with billing enabled
- Google Cloud CLI installed and configured
- Firebase project set up

#### Setup Steps

1. **Create Google Cloud Project** (if not exists):
   ```bash
   gcloud projects create YOUR_PROJECT_ID
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Enable Required APIs**:
   ```bash
   gcloud services enable cloudfunctions.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable firestore.googleapis.com
   gcloud services enable firebase.googleapis.com
   ```

3. **Set up Firebase**:
   ```bash
   firebase init firestore
   firebase deploy --only firestore
   ```

4. **Set Environment Variables**:
   ```bash
   # Set your Gemini API key
   export GEMINI_API_KEY="your-gemini-api-key"
   
   # Set Firebase credentials (if using service account)
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
   ```

5. **Deploy Cloud Function**:
   ```bash
   cd resume_builder
   ./deploy-cloud-function.sh
   ```

6. **Update the script with your project ID**:
   Edit `deploy-cloud-function.sh` and replace `your-project-id` with your actual project ID.

#### Cloud Function Configuration
- **Runtime**: Python 3.11
- **Memory**: 512MB
- **Timeout**: 540 seconds
- **Region**: us-central1
- **Trigger**: HTTP

### 2. Angular Frontend (Production)

#### Build for Production
```bash
# Build the application
ng build --configuration production

# The built files will be in dist/portfolio/
```

#### Deploy Options

##### Option A: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy --only hosting
```

##### Option B: Google Cloud Storage
```bash
# Create a bucket
gsutil mb gs://your-portfolio-bucket

# Make it public
gsutil iam ch allUsers:objectViewer gs://your-portfolio-bucket

# Upload files
gsutil -m cp -r dist/portfolio/* gs://your-portfolio-bucket/

# Set website configuration
gsutil web set -m index.html -e 404.html gs://your-portfolio-bucket
```

##### Option C: Netlify/Vercel
```bash
# Build and deploy to Netlify
ng build --configuration production
netlify deploy --prod --dir=dist/portfolio

# Or for Vercel
vercel --prod
```

### 3. Environment Configuration

#### Update Production Environment
Edit `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/resume-builder'
};
```

Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.

### 4. Security Configuration

#### CORS Settings
Update the Cloud Function CORS settings in `cloud_function.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],  # Your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Firebase Security Rules
Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /experiences/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /education/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /skills/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Monitoring and Maintenance

### Cloud Function Monitoring
```bash
# View logs
gcloud functions logs read resume-builder --region=us-central1

# Monitor metrics
gcloud functions describe resume-builder --region=us-central1
```

### Firebase Monitoring
- Use Firebase Console for Firestore monitoring
- Set up alerts for usage and errors
- Monitor authentication events

### Cost Optimization
- Set up Cloud Function concurrency limits
- Use Firebase Spark plan for development
- Monitor API usage for Gemini AI

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in Cloud Function
   - Verify frontend domain is in allowed origins

2. **Authentication Issues**:
   - Verify Firebase configuration
   - Check service account permissions

3. **API Key Issues**:
   - Ensure Gemini API key is set correctly
   - Check API quota and billing

4. **Deployment Failures**:
   - Check gcloud authentication
   - Verify project permissions
   - Review Cloud Build logs

### Debug Commands
```bash
# Test Cloud Function locally
functions-framework --target=resume_builder --port=8080

# Check function status
gcloud functions describe resume-builder --region=us-central1

# View recent logs
gcloud functions logs read resume-builder --region=us-central1 --limit=50
```

## Performance Optimization

### Frontend
- Enable Angular production mode
- Use lazy loading for routes
- Optimize bundle size
- Enable compression

### Backend
- Set appropriate memory allocation
- Use connection pooling
- Implement caching strategies
- Monitor cold start times

## Security Checklist

- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Firebase security rules set
- [ ] API keys not exposed in client code
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] Error handling in place 