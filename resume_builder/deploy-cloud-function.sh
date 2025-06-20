#!/bin/bash

# Google Cloud Functions Deployment Script
# Make sure you have gcloud CLI installed and configured

PROJECT_ID="your-project-id"  # Replace with your actual project ID
FUNCTION_NAME="resume-builder"
REGION="us-central1"
RUNTIME="python311"
TRIGGER="http"
ENTRY_POINT="resume_builder"

echo "Deploying Resume Builder to Google Cloud Functions..."

# Set the project
gcloud config set project $PROJECT_ID

# Deploy the function
gcloud functions deploy $FUNCTION_NAME \
    --gen2 \
    --runtime=$RUNTIME \
    --region=$REGION \
    --source=. \
    --entry-point=$ENTRY_POINT \
    --trigger=$TRIGGER \
    --allow-unauthenticated \
    --memory=512MB \
    --timeout=540s \
    --set-env-vars="GEMINI_API_KEY=$GEMINI_API_KEY" \
    --set-env-vars="GOOGLE_APPLICATION_CREDENTIALS=default"

echo "Deployment complete!"
echo "Function URL: https://$REGION-$PROJECT_ID.cloudfunctions.net/$FUNCTION_NAME"
echo ""
echo "Update your Angular environment.prod.ts with this URL:"
echo "apiBaseUrl: 'https://$REGION-$PROJECT_ID.cloudfunctions.net/$FUNCTION_NAME'" 