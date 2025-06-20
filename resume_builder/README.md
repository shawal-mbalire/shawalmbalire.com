# Resume Builder with AI Assistant

A comprehensive resume building system with AI-powered assistance using Google's Gemini Flash model for faster, more efficient responses.

## Features

### 🤖 AI-Powered Resume Enhancement
- **Gemini Flash Model**: Uses Google's latest Gemini 1.5 Flash model for faster, more accurate AI responses
- **Smart Question Generation**: AI generates personalized questions to improve your resume
- **Experience Optimization**: AI suggests improvements for job descriptions and bullet points
- **Skills Recommendations**: Get AI-powered skill suggestions based on your profile
- **Summary Optimization**: AI helps craft compelling professional summaries
- **Resume Scoring**: Get a comprehensive score and feedback on your resume

### 📄 Resume Management
- **Profile Management**: Complete personal and professional information
- **Experience Tracking**: Add and manage work experiences with detailed descriptions
- **Education Records**: Track educational background and achievements
- **Skills Inventory**: Organize skills by categories
- **PDF Generation**: Generate professional PDF resumes in short and long formats

### 🔐 Security & Authentication
- **Firebase Authentication**: Secure user authentication and session management
- **Data Privacy**: All data stored securely in Firebase Firestore
- **Role-based Access**: Users can only access their own data

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Firebase Admin SDK**: Authentication and database management
- **Google Gemini AI**: Advanced AI model for resume enhancement
- **PyLaTeX**: LaTeX document generation for PDF resumes

### Frontend
- **Angular**: Modern web framework for building user interfaces
- **Bootstrap**: Responsive CSS framework for styling
- **Font Awesome**: Icon library for enhanced UI

### Infrastructure
- **Google Cloud Functions**: Serverless backend deployment
- **Firebase Firestore**: NoSQL database for data storage
- **Firebase Hosting**: Static website hosting

## AI Model: Gemini 2.5 Flash

This project uses Google's **Gemini 2.5 Flash** model, which offers:

### 🚀 Performance Benefits
- **Ultra-Fast Response Times**: Latest generation model optimized for speed
- **Lower Latency**: Significantly reduced waiting time for AI interactions
- **Cost Effective**: More efficient token usage compared to previous models
- **High Quality**: Maintains excellent output quality despite faster processing
- **Enhanced Context**: Better understanding of complex resume content

### 🎯 Use Cases in Resume Builder
- **Question Generation**: Quickly generates personalized questions based on user profiles
- **Content Optimization**: Fast suggestions for improving resume content
- **Skills Analysis**: Rapid analysis of user profiles for skill recommendations
- **Feedback Generation**: Quick comprehensive feedback on resume quality
- **Summary Enhancement**: Advanced text optimization for professional summaries

## Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google Cloud account
- Firebase project
- Gemini API key

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd resume_builder
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Configure Firebase**:
   ```bash
   firebase init
   firebase login
   ```

5. **Set up Gemini API**:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add to your `.env` file: `GEMINI_API_KEY=your_api_key_here`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd ../portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   ng serve
   ```

## Usage

### Development

1. **Start the backend**:
   ```bash
   cd resume_builder
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Start the frontend**:
   ```bash
   cd portfolio
   ng serve --port 4200
   ```

3. **Access the application**:
   - Frontend: http://localhost:4200
   - Resume Manager: http://localhost:4200/me
   - Backend API: http://localhost:8000

### Production Deployment

See `DEPLOYMENT.md` for detailed production deployment instructions.

## API Endpoints

### Authentication
- `POST /api/login` - User authentication

### Profile Management
- `GET /api/resume-preview/{user_id}` - Get user's resume data
- `POST /api/profile/{user_id}` - Update user profile

### Experience Management
- `POST /api/experience/{user_id}` - Add new experience

### AI Features
- `GET /api/ai-questions/{user_id}` - Get AI-generated questions
- `POST /api/generate-resume/{user_id}` - Generate PDF resume

## AI Assistant Features

### Question Generation
The AI analyzes your profile and generates personalized questions to help improve your resume:

```python
# Example AI question generation
questions = ai_assistant.generate_questions(user_profile)
# Returns: ["What specific metrics can you quantify from your recent projects?", ...]
```

### Experience Optimization
AI helps improve your job descriptions:

```python
# Example experience improvement
improved_description = ai_assistant.improve_experience_description(experience)
# Returns: Action-oriented, quantified description
```

### Skills Recommendations
Get AI-powered skill suggestions:

```python
# Example skills suggestions
skills = ai_assistant.generate_skills_suggestions(user_profile, target_role="Software Engineer")
# Returns: ["Python", "React", "AWS", "Docker", ...]
```

### Resume Feedback
Comprehensive feedback and scoring:

```python
# Example resume feedback
feedback = ai_assistant.generate_resume_feedback(resume_data)
# Returns: {"feedback": "...", "score": 85, "suggestions": [...]}
```

## Configuration

### Environment Variables
```bash
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

### Firebase Configuration
Set up Firebase security rules for data protection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Performance Optimization

### AI Model Optimization
- **Gemini Flash**: Faster response times for better user experience
- **Caching**: Implement caching for frequently requested AI responses
- **Batch Processing**: Process multiple AI requests efficiently

### Database Optimization
- **Indexing**: Proper Firestore indexes for fast queries
- **Pagination**: Implement pagination for large datasets
- **Data Structure**: Optimized data structure for efficient queries

## Security Considerations

- **API Key Protection**: Never expose API keys in client-side code
- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Implement rate limiting for AI API calls
- **Data Encryption**: Ensure data is encrypted in transit and at rest

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `DEPLOYMENT.md`
- Review Firebase and Gemini AI documentation

## Roadmap

- [ ] Multi-language support
- [ ] Advanced resume templates
- [ ] Integration with job boards
- [ ] Resume analytics dashboard
- [ ] Collaborative editing features
- [ ] Mobile app development 